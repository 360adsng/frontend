import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminActivityLogs,
  getAdminInviteLinks,
  patchAdminUserRoles,
  getAdminBillboardListingsForOwner,
  getAdminUserById,
  getAdminUsersList,
  patchAdminAccountBlock,
  patchAdminVendorCommission,
  patchAdminVendorVerification,
  patchAdminWalletBlock,
  type AdminActivityLogsListQuery,
  type AdminToggleBlockPayload,
  type AdminInviteLinksListQuery,
  type AdminUsersListQuery,
  type PatchAdminUserRolesPayload,
  type AdminVerifyVendorPayload,
  type PatchAdminVendorCommissionPayload,
} from "./admin";

export function useAdminInviteLinksList(params: AdminInviteLinksListQuery) {
  return useQuery({
    queryKey: ["admin", "invite-links", "list", params],
    queryFn: () => getAdminInviteLinks(params),
  });
}

export function useAdminActivityLogsList(params: AdminActivityLogsListQuery) {
  return useQuery({
    queryKey: ["admin", "activity-logs", "list", params],
    queryFn: () => getAdminActivityLogs(params),
  });
}

export function usePatchAdminUserRolesMutation(userId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: PatchAdminUserRolesPayload) =>
      patchAdminUserRoles(userId, body),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ["admin", "users", "detail", userId],
      });
      await qc.invalidateQueries({ queryKey: ["admin", "users", "list"] });
    },
  });
}

export function useAdminUsersList(params: AdminUsersListQuery) {
  return useQuery({
    queryKey: ["admin", "users", "list", params],
    queryFn: () => getAdminUsersList(params),
  });
}

export function useAdminUser(id: number | null) {
  return useQuery({
    queryKey: ["admin", "users", "detail", id],
    queryFn: () => getAdminUserById(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useAdminBillboardListingsForOwner(ownerUserId: number | null) {
  return useQuery({
    queryKey: ["admin", "users", ownerUserId, "billboard-listings"],
    queryFn: () => getAdminBillboardListingsForOwner(ownerUserId!),
    enabled: typeof ownerUserId === "number" && ownerUserId > 0,
  });
}

export function useAdminAccountBlockMutation(userId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: AdminToggleBlockPayload) =>
      patchAdminAccountBlock(userId, body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin", "users", "detail", userId] });
      await qc.invalidateQueries({ queryKey: ["admin", "users", "list"] });
    },
  });
}

export function useAdminWalletBlockMutation(userId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: AdminToggleBlockPayload) =>
      patchAdminWalletBlock(userId, body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin", "users", "detail", userId] });
      await qc.invalidateQueries({ queryKey: ["admin", "users", "list"] });
    },
  });
}

export function useAdminVendorVerificationMutation(userId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: AdminVerifyVendorPayload) =>
      patchAdminVendorVerification(userId, body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin", "users", "detail", userId] });
      await qc.invalidateQueries({ queryKey: ["admin", "users", "list"] });
    },
  });
}

export function useAdminVendorCommissionMutation(userId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: PatchAdminVendorCommissionPayload) =>
      patchAdminVendorCommission(userId, body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin", "users", "detail", userId] });
      await qc.invalidateQueries({ queryKey: ["admin", "users", "list"] });
    },
  });
}
