import { httpClient } from "../axios";
import { PaginatedCardList } from "../types/API";

export async function getCards(): Promise<PaginatedCardList> {
  return await httpClient.get("shetab/card/").then((data) => data.data);
}
