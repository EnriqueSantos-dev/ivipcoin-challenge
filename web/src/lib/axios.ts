import axios, { isAxiosError } from "axios";

import { getAccessToken } from "@/helpers/auth-local-storage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!isAxiosError(error)) {
      return Promise.reject(error);
    }

    const dataResponse = error.response?.data as {
      status: string;
      message: string;
      error: string;
      erros?: Record<string, string[]>;
    };

    if (!dataResponse?.message) {
      error.message = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
      return Promise.reject(error);
    }

    error.message = dataResponse.message;
    return Promise.reject(error);
  }
);
