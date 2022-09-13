import { atom } from "recoil";

export const tradingviewAtom = atom<string>({
  key: "tradingview",
  default: "btc",
});
