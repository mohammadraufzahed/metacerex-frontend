import { atom } from "recoil";

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
});
