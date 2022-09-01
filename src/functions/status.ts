import { httpClient } from "../axios";
import type { Status } from "../types/API";

export async function getStatus(): Promise<Status> {
  return await httpClient.get("utils/status/").then((data) => data.data);
}
