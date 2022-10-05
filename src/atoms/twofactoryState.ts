import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "twofactory",
  storage: sessionStorage,
});

export const twofactoryState = atom<boolean>({
  key: "twofactory",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
