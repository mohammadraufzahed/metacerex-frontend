import { setRecoil } from "recoil-nexus";
import { count } from "~/atoms/text";
import type { WorkerJobFunction } from "~/types/Worker";

export const WebSocketWorkerInitilize: WorkerJobFunction = (worker) => {
  worker.onmessage = (e) => {
    setRecoil(count, e.data);
  };
  setInterval(() => {
    worker.postMessage(true);
  }, 1000);
};
