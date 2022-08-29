import { atom } from "recoil";

export const tickerSearch = atom<null | string>({
  key: "tickersSearch",
  default: null,
});
