import { registerWorker } from "./utils/registerWorker";
import ExampleWorker from "./workers/example.worker?url";
import { ExampleInitialize } from "./workers/example.initialize";

export function registerWorkers() {
  registerWorker(ExampleWorker, ExampleInitialize);
}
