import axios, { AxiosError, AxiosRequestConfig } from "axios";
import type { AxiosInstance } from "axios";
import useCustomToast from "./hooks/useCustomToast";
import { CustomTokenObtain } from "./types/API";

export const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    "X-API-KEY": import.meta.env.VITE_X_API_KEY,
  },
});

export const onchainClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ONCHAIN_API_BASE,
  headers: {
    "X-API-KEY": import.meta.env.VITE_X_API_KEY,
  },
});

const requestInterceptor = (config: AxiosRequestConfig<any>) => {
  try {
    const user = JSON.parse(sessionStorage.getItem("userToken") ?? "");
    if (user.userToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${user.userToken.access}`,
        "X-CSID": user.userToken.session_id,
      };
    }
  } catch (e) {}
  return config;
};

const axiosErrorHandler = async (err: AxiosError<any, any>) => {
  if (err.response) {
    if (
      err.response.status === 401 &&
      err.response.data.errors.code == "token_not_valid"
    ) {
      const userTokenObject: { userToken: CustomTokenObtain } = JSON.parse(
        sessionStorage.getItem("userToken") ?? ""
      );
      if (userTokenObject.userToken && userTokenObject.userToken.refresh) {
        await httpClient
          .post("users/token/refresh/", {
            refresh: userTokenObject.userToken.refresh,
          })
          .then((data) => {
            if (data.data.access) {
              const userToken: {
                userToken: CustomTokenObtain;
              } | null = JSON.parse(sessionStorage.getItem("userToken") ?? "");
              if (userToken) {
                sessionStorage.setItem(
                  "userToken",
                  JSON.stringify({
                    userToken: {
                      ...userToken.userToken,
                      access: data.data.access,
                    },
                  })
                );
              }
            }
          });
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
};

httpClient.interceptors.request.use(requestInterceptor);
onchainClient.interceptors.request.use(requestInterceptor);

httpClient.interceptors.response.use((res) => res, axiosErrorHandler);

const callToastError = (message: string) =>
  useCustomToast("bottom-right", "error", message);
