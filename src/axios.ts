import axios, { AxiosError } from "axios";
import type { AxiosInstance } from "axios";
import { getRecoil, setRecoil } from "recoil-nexus";
import { userToken } from "./atoms/userToken";
import useCustomToast from "./hooks/useCustomToast";
import { useNavigate } from "react-router-dom";

export const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    "X-API-KEY": import.meta.env.VITE_X_API_KEY,
  },
});

httpClient.interceptors.request.use((config) => {
  const accessKey = getRecoil(userToken)?.access;
  if (accessKey) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessKey}`,
    };
  }
  return config;
});

httpClient.interceptors.response.use(
  (res) => res,
  async (err: AxiosError<any, any>) => {
    if (err.response) {
      if (err.response.status === 401) {
        if (err.response.data.errors.code == "token_not_valid") {
          const userTokenObject = getRecoil(userToken);
          if (userTokenObject?.refresh) {
            await httpClient
              .post("users/token/refresh/", {
                refresh: userTokenObject.refresh,
              })
              .then((data) => {
                if (data.status == 200) {
                  setRecoil(userToken, {
                    ...userTokenObject,
                    access: data.data.access,
                    refresh: undefined,
                  });
                }
              });
          } else {
            callToastError("لطفا وارد شوید");
            setTimeout(
              () =>
                (window.location.href = "" + window.location.origin + "/auth"),
              3000
            );
          }
        }
      } else if (err.response.data.detail) {
        callToastError(err.response.data.detail);
      } else if (Array.isArray(err.response.data)) {
        err.response.data.map((item) => callToastError(item));
      } else if (typeof err.response.data === "object") {
        Object.entries(err.response.data).map((item) => {
          const data = item[1];
          if (typeof data === "string") {
            callToastError(data);
          } else if (Array.isArray(data)) {
            data.map((data) => callToastError(data));
          } else if (typeof data == "object") {
            Object.entries(data ?? {}).map((item) => callToastError(item[1]));
          }
        });
      }
    }
  }
);

const callToastError = (message: string) =>
  useCustomToast("bottom-right", "error", message);
const callToastSuccess = (message: string) =>
  useCustomToast("bottom-right", "success", message);
