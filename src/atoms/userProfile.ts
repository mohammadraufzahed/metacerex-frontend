import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ProfileReadOnly } from "../types/API";

const {} = recoilPersist({
  key: "user_profile",
  storage: sessionStorage,
});

export const userProfile = atom<ProfileReadOnly | null>({
  key: "userProfile",
  default: null,
});
