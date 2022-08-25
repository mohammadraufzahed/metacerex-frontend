import { atom } from "recoil";
import type { TickerTable } from "../types/API";

export const tickers = atom<TickerTable[]>({
  key: "tickers",
  default: [],
});
