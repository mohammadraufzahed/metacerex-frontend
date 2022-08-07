import websocketWorker from "./workers/websocket.worker";
import { generateWebWorkerUrl } from "./utils/generateWebWorkerUrl";
import type { WorkerJobFunction } from "./types/Worker";
import { WebSocketWorkerInitilize } from "./workers/websocket.functions";

export const registerWorkers = () => {
  registerWorker(websocketWorker, [WebSocketWorkerInitilize]);
};

const registerWorker = (worker: Function, jobs: WorkerJobFunction[]) => {
  const WorkerURL: string = generateWebWorkerUrl(worker);
  const WorkerInstance: Worker = new Worker(WorkerURL);
  jobs.map((job) => {
    job(WorkerInstance);
  });
};
