import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "register_data",
  storage: sessionStorage,
});

export const registerAtom = atom<{
  mobile?: string;
  status: "register" | "mobileConfirm";
  email?: string;
  uuid: string;
} | null>({
  key: "register",
  default: {
    status: "register",
    uuid: "",
  },
  effects_UNSTABLE: [persistAtom],
});
