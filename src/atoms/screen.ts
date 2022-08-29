import { atom } from "recoil";

export const screen = atom<{
  width: number;
  height: number;
}>({
  key: "screen",
  default: { width: window.innerWidth, height: window.innerHeight },
});
