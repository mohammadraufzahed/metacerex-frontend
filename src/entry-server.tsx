import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import type { Response } from "express";

function ServerApp({ url }) {
  return (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

export function render(url: string) {
  return ReactDOMServer.renderToString(<ServerApp url={url} />);
}

export function prodRender(url: string, res: Response) {
  const stream = ReactDOMServer.renderToPipeableStream(
    <ServerApp url={url} />,
    {
      onShellReady() {
        res.status(200).set({ "Content-Type": "text/html" });
        stream.pipe(res);
      },
    }
  );
}
