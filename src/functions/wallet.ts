import { httpClient } from "../axios";
import { API_LIMIT } from "../constants/APILimit";
import { PaginatedWallet } from "../types/API";

export async function getWallet(
  offset: any,
  q: string,
  quote_asset: string
): Promise<PaginatedWallet> {
  return httpClient
    .get(
      "spot/wallet/",

      {
        params: { limit: API_LIMIT, offset, q, quote_asset },
      }
    )
    .then((res) => {
      console.dir(res.request);
      return res.data;
    });
}

export async function getPortfolio(): Promise<{ value: number }> {
  return httpClient.get("spot/wallet/portfolio/").then((res) => res.data);
}
