import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../baseFetch";
import {
  changePassword,
  getMe,
  getMyBillboardCoverage,
  getUserDashboard,
  setMyBillboardCoverage,
  updateProfile,
  uploadProfilePhoto,
} from "./users";
import type { BillboardCoverageRow } from "./types";

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });
}

export function useUserDashboard() {
  return useQuery({
    queryKey: ["users", "dashboard"],
    queryFn: getUserDashboard,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: async (data) => {
      toast.success(data?.message ?? "Profile updated.");
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["me"] }),
        qc.invalidateQueries({ queryKey: ["billboard"] }),
      ]);
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data?.message ?? "Password changed.");
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useUploadProfilePhoto() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: async (data) => {
      toast.success(data?.message ?? "Photo uploaded.");
      await qc.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useMyBillboardCoverage() {
  return useQuery({
    queryKey: ["users", "me", "billboard-coverage"],
    queryFn: getMyBillboardCoverage,
  });
}

export function useSetMyBillboardCoverage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: setMyBillboardCoverage,
    onSuccess: async (data) => {
      toast.success(data?.message ?? "Coverage updated.");
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["users", "me", "billboard-coverage"] }),
        qc.invalidateQueries({ queryKey: ["me"] }),
      ]);
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}
