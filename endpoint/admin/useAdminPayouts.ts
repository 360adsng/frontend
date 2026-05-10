import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAdminPayoutById,
  getAdminPayoutsList,
  patchAdminPayoutAccept,
  patchAdminPayoutReject,
  type AdminPayoutsListQuery,
} from "./admin";

export function useAdminPayoutsList(params: AdminPayoutsListQuery) {
  return useQuery({
    queryKey: ["admin", "payouts", "list", params],
    queryFn: () => getAdminPayoutsList(params),
  });
}

export function useAdminPayout(id: number | null) {
  return useQuery({
    queryKey: ["admin", "payouts", "detail", id],
    queryFn: () => getAdminPayoutById(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useAdminPayoutAcceptMutation(payoutId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => patchAdminPayoutAccept(payoutId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin", "payouts", "list"] });
      await qc.invalidateQueries({
        queryKey: ["admin", "payouts", "detail", payoutId],
      });
    },
  });
}

export function useAdminPayoutRejectMutation(payoutId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { reason: string }) =>
      patchAdminPayoutReject(payoutId, body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin", "payouts", "list"] });
      await qc.invalidateQueries({
        queryKey: ["admin", "payouts", "detail", payoutId],
      });
    },
  });
}
