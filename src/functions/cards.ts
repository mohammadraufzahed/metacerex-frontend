import { httpClient } from "../axios";
import { API_LIMIT } from "../constants/APILimit";
import { PaginatedCardList } from "../types/API";

export async function getCards(): Promise<PaginatedCardList> {
  return await httpClient
    .get("shetab/card/", {
      data: {
        limit: API_LIMIT,
        offset: 0,
      },
    })
    .then((res) => res.data);
}
