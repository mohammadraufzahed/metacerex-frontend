import { atom } from "recoil";
import { getRecoil } from "recoil-nexus";
import { screen } from "./screen";

const screenR = getRecoil(screen);

export const financialBoxStatus = atom<
  "idle" | "idleMobile" | "open" | "max" | "mobileOpen"
>({
  key: "financialbox",
  default: screenR.width < 1060 ? "idleMobile" : "idle",
});
