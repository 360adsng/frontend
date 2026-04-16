import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ApiError,
  clearAuthTokens,
  saveAccountType,
  saveAuthTokens,
} from "../baseFetch";
import { login, logout, register } from "./auth";
import type { LoginResponse } from "./types";

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

export function useRegister() {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Account created successfully.");
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (data: LoginResponse) => {
      saveAuthTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      saveAccountType(data.accountType);
      toast.success("Logged in successfully.");
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuthTokens();
      toast.success("Logged out.");
    },
    onError: (error) => {
      // Even if the backend fails (expired token), we still clear locally.
      clearAuthTokens();
      toast.error(errorMessage(error));
    },
  });
}
