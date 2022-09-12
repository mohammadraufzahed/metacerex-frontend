import { httpClient } from "../axios";
import { API_LIMIT } from "../constants/APILimit";
import { PaginatedOrdersOpen } from "../types/API";

export async function getOpenOrders(
  offset: number = 0
): Promise<PaginatedOrdersOpen> {
  return await httpClient
    .get("spot/orders/open/", {
      params: {
        limit: API_LIMIT,
        offset,
      },
    })
    .then((data) => data.data);
}
