import { atom } from "recoil";

export const financialBoxStatus = atom<
  "idle" | "idleMobile" | "open" | "max" | "mobileOpen"
>({
  key: "financialbox",
  default: window.innerWidth < 1024 ? "idleMobile" : "idle",
});
