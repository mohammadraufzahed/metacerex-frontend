import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import type { TickerTable } from "../types/API";

const { persistAtom } = recoilPersist({
  key: "tickers_fav",
  storage: localStorage,
});

export const tickers_fav = atom<TickerTable[]>({
  key: "tickers_fav",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
