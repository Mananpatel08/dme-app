import axios, { AxiosInstance } from "axios";
import CookiePersistence from "@/utils/cookiePersistence";
delete axios.defaults.headers.common["ngrok-skip-browser-warning"];

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class Client {
  api: AxiosInstance;

  constructor() {
    axios.defaults.baseURL = `${baseURL}`;
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.responseEncoding = "utf8";

    this.api = axios.create({
      baseURL,
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = new CookiePersistence().getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers["accept-language"] = "en";
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response?.status === 401 &&
          typeof window !== "undefined" &&
          window.location.pathname !== "/login"
        ) {
          localStorage.clear();
          new CookiePersistence().removeItem("token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );
  }
}
