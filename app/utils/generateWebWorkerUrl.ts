export function generateWebWorkerUrl(worker: Function) {
  let workerString = worker.toString().replace("() => {\n", "");
  workerString = workerString.slice(9, workerString.length - 1);
  return URL.createObjectURL(
    new Blob([workerString], { type: "text/javascript" })
  );
}
