import axios from "axios";
import type { AxiosInstance } from "axios";

export const httpClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    "X-API-KEY": import.meta.env.VITE_X_API_KEY,
  },
});
