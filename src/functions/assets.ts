import { httpClient } from "../axios";
import useCustomToast from "../hooks/useCustomToast";
import { AssetBalanceResponse, AssetList } from "../types/API";

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

export async function setFavAsset(asset: string) {
  await httpClient
    .put("cryptobase/asset/fave/", {
      asset,
    })
    .then((res) => {
      if (res.status === 200) {
        const status: {
          asset: string;
          is_faved: boolean;
        } = res.data;
        const message = `${status.asset.toUpperCase()} با موفقیت ${
          status.is_faved
            ? "به ارزهای منتخب اضافه شد"
            : "از ارزهای منتخب حذف شد."
        }`;
        useCustomToast("bottom-right", "success", message);
        return res;
      }
    });
}

export async function getAsset(assets: string[]): Promise<AssetBalanceResponse> {
  return await httpClient.get("spot/wallet/balance/", {
    params: {
      assets: assets.join(",")
    }
  }).then(res => res.data)
}