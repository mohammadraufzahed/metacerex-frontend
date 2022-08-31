import axios, { AxiosError } from "axios";
import type { AxiosInstance } from "axios";
import { getRecoil } from "recoil-nexus";
import { user } from "./atoms/user";
import useCustomToast from "./hooks/useCustomToast";

export const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    "X-API-KEY": import.meta.env.VITE_X_API_KEY,
  },
});

httpClient.interceptors.request.use((config) => {
  const accessKey = getRecoil(user)?.access;
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
  (err: AxiosError<any, any>) => {
    let errorMessage: string = "";
    if (!err.response) {
      if (err.message.includes("Unable to refresh access"))
        errorMessage = "امکان برقراری ارتباط با سرور وجود ندارد";
    } else {
      if (err.response.status == 401) {
        if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        } else {
          errorMessage = "برای ادامه نیاز به ورود با حساب خود دارید";
        }
      } else if (err.response.status == 500) {
        errorMessage = "هنگام اتصال به سرور خطایی رخ داده است";
      } else if (err.response.status == 404) {
        errorMessage = "نشانی درخواست شده پیدا نشد";
      } else if (err.response.data.detail) {
        errorMessage = err.response.data.detail;
      } else if (err.response.data.response) {
        errorMessage = err.response.data.response;
      } else if (typeof err.response.data[0] == "string") {
        errorMessage = err.response.data;
      }
    }
    useCustomToast("bottom-right", "error", errorMessage);
  }
);
