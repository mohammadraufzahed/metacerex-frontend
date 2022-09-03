import { atom } from "recoil";

export const newsSearch = atom<string>({
  key: "news_search",
  default: "",
});
