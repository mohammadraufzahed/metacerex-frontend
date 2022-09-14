import { atom } from "recoil";

export const financialBoxStatus = atom<
  "idle" | "idleMobile" | "open" | "max" | "mobileOpen"
>({
  key: "financialbox",
  default: window.innerWidth < 1060 ? "idleMobile" : "idle",
});
