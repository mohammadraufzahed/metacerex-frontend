import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export function render(url, context) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  );
}

export async function prodRender(url, context, res) {
  const stream = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>,
    {
      onShellReady() {
        stream.pipe(res);
      },
    }
  );
}
