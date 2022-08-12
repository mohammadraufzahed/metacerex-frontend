import type { WorkerJobFunction } from "../types/Worker";

export function registerWorker(worker: string, initialize: WorkerJobFunction) {
  const WorkerInstance: Worker = new Worker(worker);
  initialize(WorkerInstance);
}
