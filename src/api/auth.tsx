import AuthService from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import type { LoginCredentials } from "@/types";

const LOGIN_KEY = ["login-key"];

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: LOGIN_KEY,
    mutationFn: (data: LoginCredentials) => new AuthService().login(data),
  });
};
