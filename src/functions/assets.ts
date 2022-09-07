import { httpClient } from "../axios";
import { AssetList } from "../types/API";

export async function getDepositAssets(): Promise<AssetList[]> {
  return await httpClient
    .get("cryptobase/asset/list", {
      params: {
        is_depositable: true,
        is_withdrawable: true,
        qoute_asset: "USDT",
      },
    })
    .then((data) => data.data);
}
