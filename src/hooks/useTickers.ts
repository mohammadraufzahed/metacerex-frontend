import { httpClient } from "../axios";
import type { TickerTable } from "../types/API";

export async function useTickers(): Promise<TickerTable[]> {
  const request = await httpClient.get("cryptobase/tickers", {
    params: {
      quote_asset: "usdt",
    },
  });
  return request.data.results;
}
