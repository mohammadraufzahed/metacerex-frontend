import { httpClient } from "../axios";
import { API_LIMIT } from "../constants/APILimit";
import type { PaginatedTickerTable } from "../types/API";

export async function getTickers(
  pageParams: any,
  is_faved_only: string = "no",
  q: string = ""
): Promise<PaginatedTickerTable> {
  return await httpClient
    .get(pageParams ?? "cryptobase/tickers/", {
      params: pageParams
        ? null
        : {
            quote_asset: "usdt",
            limit: API_LIMIT,
            is_faved_only,
            q,
          },
    })
    .then((res) => res.data);
}
