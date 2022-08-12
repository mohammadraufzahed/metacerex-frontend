import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { registerWorkers } from "./registerWorkers";

// Css Files
import "./styles/global.scss";
import "./styles/tailwind.css";

const AppRender: React.FC = () => (
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);

hydrateRoot(document.getElementById("root") as HTMLDivElement, <AppRender />);
registerWorkers();
