import fs from "node:fs";
import path from "node:path";
import fastify from "fastify";
import { fileURLToPath } from "node:url";
import process from "node:process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
const isProdMain = process.env.NODE_ENV === "production";
const PORT = process.env.PORT ?? 9000;

export async function createServer(
  root = process.cwd(),
  isProd = isProdMain,
  hmrPort
) {
  const resolve = (p) => path.resolve(__dirname, ...p);
  const indexProd = isProd
    ? fs.readFileSync(resolve(["dist", "client", "index.html"]), {
        encoding: "utf-8",
      })
    : "";

  const app = fastify({
    logger: true,
  });
  await app.register((await import("@fastify/middie")).default);
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await (
      await import("vite")
    ).createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      (await import("serve-static")).default(resolve(["dist", "client"]), {
        index: false,
      })
    );
  }
  app.get("*", async (req, res) => {
    try {
      const url = req.url;
      let template, render;
      if (!isProd) {
        template = fs.readFileSync(resolve(["index.html"]), {
          encoding: "utf-8",
        });
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
        const html = render(url);
        template = template.replace("<!--app-html-->", appHtml);
      } else {
        // @ts-ignore
        template = indexProd;
        render = (await import("./dist/server/entry-server.js")).render;
        const html = render(url);
        template = template.replace(
          '<div id="root"></div>',
          `<div id="root">${html}</div>`
        );
      }
      res.status(200);
      res.header("Content-Type", "text/html");
      res.send(template);
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      res.status(500);
      res.send(e.stack);
    }
    console.log(`process ${process.pid} handled the request`);
  });
  return { app, vite };
}
if (!isTest) {
  createServer().then(({ app }) =>
    app.listen({ host: "0.0.0.0", port: PORT }, () => {
      console.log(`http://0.0.0.0:${PORT}`);
    })
  );
}
