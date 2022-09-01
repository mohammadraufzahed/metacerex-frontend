import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import type { Status } from "../types/API";

const { persistAtom } = recoilPersist({
  key: "status_data",
  storage: localStorage,
});
export const statusData = atom<Status | null>({
  key: "status",
  effects_UNSTABLE: [persistAtom],
  default: null,
});
