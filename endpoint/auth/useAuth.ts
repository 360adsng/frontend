import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ApiError,
  clearAuthTokens,
  saveAccountType,
  saveAuthTokens,
} from "../baseFetch";
import {
  invalidateSessionAfterLogin,
  removeSessionQueriesOnLogout,
} from "../query/sessionScopedQueries";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  vendorOnboarding,
} from "./auth";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: async (data: LoginResponse) => {
      saveAuthTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      saveAccountType(data.accountType);
      await invalidateSessionAfterLogin(queryClient);
      toast.success("Logged in successfully.");
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await removeSessionQueriesOnLogout(queryClient);
      clearAuthTokens();
      toast.success("Logged out.");
    },
    onError: async (error) => {
      // Even if the backend fails (expired token), we still clear locally.
      await removeSessionQueriesOnLogout(queryClient);
      clearAuthTokens();
      toast.error(errorMessage(error));
    },
  });
}

export function useVendorOnboarding() {
  return useMutation({
    mutationFn: vendorOnboarding,
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}
