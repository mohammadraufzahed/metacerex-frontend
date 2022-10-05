import { httpClient } from "../axios";
import { TOTPState } from "../types/API";

export async function getTOTPState(): Promise<TOTPState> {
  return await httpClient.get("users/totp/state/").then((res) => res.data);
}
