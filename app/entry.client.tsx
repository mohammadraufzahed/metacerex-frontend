import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";
import { registerWorker } from "./registerWorker";

hydrate(<RemixBrowser />, document);
