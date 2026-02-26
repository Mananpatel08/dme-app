import CookiePersistence from "@/utils/cookiePersistence";
import { BrowserPersistence } from "@/utils/simplePersistence";
import { Client } from "../apiClient";
import { LoginCredentials, LoginResponse, User } from "@/types";

const client = new Client();
const storage = new BrowserPersistence();
const localCookie = new CookiePersistence();

export default class AuthService {
  setToken(token: string): void {
    if (token) {
      const ttl = 8 * 60 * 60; // 8 hours
      storage.setItem("token", token, ttl);
      localCookie.setItem("token", token, ttl);
      document.cookie = `token=${token}; path=/; max-age=${ttl};`;
    }
  }

  isAuthenticated(): boolean {
    const token = storage.getItem("token");
    return !!token;
  }

  removeToken(): void {
    storage.removeItem("token");
    localCookie.removeItem("token");
    document.cookie = `token=; path=/; max-age=0;`;
    window.location.href = "/login";
  }

  getToken(): string | undefined {
    return storage.getItem("token") as string | undefined;
  }

  getAccessToken(): string | undefined {
    return localCookie.getItem("token") as string | undefined;
  }

  async login(data: LoginCredentials): Promise<LoginResponse> {
    const response = await client.api({
      method: "POST",
      url: "/api/login/",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    return response.data;
  }

  async logout(): Promise<void> {
    const response = await client.api({
      method: "POST",
      url: "/api/logout/",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  }

  async getUser(): Promise<User> {
    const response = await client.api({
      method: "GET",
      url: "/api/me/",
    });
    return response.data.data;
  }
}
