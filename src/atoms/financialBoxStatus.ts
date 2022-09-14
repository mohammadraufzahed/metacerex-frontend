import { atom } from "recoil";
import { screen } from "../signals/screen";

export const financialBoxStatus = atom<
  "idle" | "idleMobile" | "open" | "max" | "mobileOpen"
>({
  key: "financialbox",
  default: screen.value.width < 1060 ? "idleMobile" : "idle",
});
