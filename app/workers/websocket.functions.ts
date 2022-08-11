import type { WorkerJobFunction } from "~/types/Worker";

export const WebSocketWorkerInitilize: WorkerJobFunction = (worker) => {
  worker.onmessage = (e) => {};
  setInterval(() => {
    worker.postMessage(true);
  }, 1000);
};
