import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { registerWorkers } from "./registerWorkers";

const AppRender: React.FC = () => (
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);

hydrateRoot(document.getElementById("root") as HTMLElement, <AppRender />);
registerWorkers();
