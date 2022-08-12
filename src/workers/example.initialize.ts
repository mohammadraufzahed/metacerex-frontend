import type { WorkerJobFunction } from "../types/Worker";

export const ExampleInitialize: WorkerJobFunction = (worker) => {
  worker.postMessage("Hi");
};
