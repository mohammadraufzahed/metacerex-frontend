import { onchainClient } from "../axios";
import { OnchainTopGroup } from "../types/API";

export async function getOnchainGroups(): Promise<OnchainTopGroup[]> {
  return await onchainClient.get("topgroup").then((res) => res.data);
}

export async function getOnchainChart(id: number, resolution: string) {
  return await onchainClient
    .get("chart/", {
      params: {
        id: id,
        a: "eth",
        r: resolution,
        s: 1195237122,
        e: 1668593922,
      },
    })
    .then((res) => res.data);
}
