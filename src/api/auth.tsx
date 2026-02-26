import AuthService from "@/services/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { LoginCredentials } from "@/types";

const LOGIN_KEY = ["login-key"];
const LOGOUT_KEY = ["logout-key"];
const USER_KEY = ["user-key"];

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: LOGIN_KEY,
    mutationFn: (data: LoginCredentials) => new AuthService().login(data),
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: LOGOUT_KEY,
    mutationFn: () => new AuthService().logout(),
  });
};

export const useGetUserQuery = () => {
  const authService = new AuthService();
  const token = authService.getToken();
  return useQuery({
    queryKey: USER_KEY,
    queryFn: () => new AuthService().getUser(),
    enabled: !!token,
    retry: false,
  });
};
