import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

type PropsT = {
  url: string;
};

const ServerApp: React.FC<PropsT> = ({ url }) => {
  return (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
};

export function render(url: string): string {
  return renderToString(<ServerApp url={url} />);
}
