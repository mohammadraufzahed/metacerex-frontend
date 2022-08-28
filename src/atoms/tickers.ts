import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import type { TickerTable } from "../types/API";

const { persistAtom } = recoilPersist({
  key: "tickers",
  storage: localStorage,
});

export const tickers = atom<TickerTable[]>({
  key: "tickers",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
