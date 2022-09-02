import { httpClient } from "../axios";
import { API_LIMIT } from "../constants/APILimit";
import { PaginatedUserLogs } from "../types/API";

export async function getUserLogs(
  nextPage: number
): Promise<PaginatedUserLogs> {
  return await httpClient
    .get("users/user/logs/", {
      params: {
        limit: API_LIMIT,
        offset: nextPage,
      },
    })
    .then((data) => data.data);
}
