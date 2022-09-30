import { httpClient } from "../axios";
import useCustomToast from "../hooks/useCustomToast";
import type { ProfileReadOnly } from "../types/API";

export async function getIdentity(): Promise<ProfileReadOnly> {
  return await httpClient.get("users/profile/", {
  }).then((data) => data.data);
}

export async function setIdentity(identity: object): Promise<void> {
  return await httpClient.patch("users/profile/", identity).then((data) => {
    if (data.status === 200) {
      useCustomToast("bottom-right", "success", "اطلاعات با موفقیت ذخیره شد");
    }
  });
}
