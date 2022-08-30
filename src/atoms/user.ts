import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import type { CustomTokenObtain } from "../types/API";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: sessionStorage,
});

export const user = atom<CustomTokenObtain | null>({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
