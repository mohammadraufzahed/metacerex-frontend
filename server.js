import fs from "node:fs";
import path from "node:path";
import express from "express";
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

  const app = express();
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
  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      let template, render;
      if (!isProd) {
        template = fs.readFileSync(resolve(["index.html"]), {
          encoding: "utf-8",
        });
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
        const appHtml = render(url, context);
        const html = template.replace("<!--app-html-->", appHtml);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } else {
        template = indexProd;
        // @ts-ignore
        render = (await import("./dist/server/index.js")).prodRender;
        render(url, res);
      }
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
    console.log(`process ${process.pid} handled the request`);
  });
  return { app, vite };
}
if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`http://0.0.0.0:${PORT}`);
    })
  );
}
