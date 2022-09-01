import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import type { CustomTokenObtain } from "../types/API";

const { persistAtom } = recoilPersist({
  key: "userToken",
  storage: sessionStorage,
});

export const userToken = atom<CustomTokenObtain | null>({
  key: "userToken",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
