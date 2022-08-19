import { createRoot, hydrateRoot } from "react-dom/client";
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

const root = document.getElementById("root") as HTMLDivElement;

if (root.hasChildNodes()) {
  hydrateRoot(root, <AppRender />);
} else {
  createRoot(root).render(<AppRender />);
}
registerWorkers();
