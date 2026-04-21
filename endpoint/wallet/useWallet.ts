import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../baseFetch";
import {
  getSavedPaymentCards,
  getWallet,
  getWalletTransactions,
  postPayNow,
  postWalletDeposit,
  type PayNowPayload,
  type WalletDepositPayload,
  getNigerianBanks,
  verifyAccount,
  getPayoutBanks,
  getMyPayoutById,
  getMyPayouts,
  postPayoutRequest,
  postSavePayoutBank,
  type PayoutRequestPayload,
  type PayoutDto,
  type SavePayoutBankPayload,
} from "./wallet";

function depositErrorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Payment could not be started.";
}

export function useWallet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
  });
}

export function useWalletTransactions(limit = 100) {
  return useQuery({
    queryKey: ["wallet", "transactions", limit],
    queryFn: () => getWalletTransactions(limit),
  });
}

export function useSavedPaymentCards(enabled: boolean) {
  return useQuery({
    queryKey: ["wallet", "cards"],
    queryFn: getSavedPaymentCards,
    enabled,
  });
}

export function useWalletDeposit() {
  return useMutation({
    mutationFn: (body: WalletDepositPayload) => postWalletDeposit(body),
    onError: (error) => {
      toast.error(depositErrorMessage(error));
    },
  });
}

export function usePayNow() {
  return useMutation({
    mutationFn: (body: PayNowPayload) => postPayNow(body),
    onError: (error) => {
      toast.error(depositErrorMessage(error));
    },
  });
}

export function useInvalidateWalletQueries() {
  const qc = useQueryClient();
  return async () => {
    await qc.invalidateQueries({ queryKey: ["wallet"] });
    await qc.invalidateQueries({ queryKey: ["wallet", "transactions"] });
    await qc.invalidateQueries({ queryKey: ["wallet", "cards"] });
    await qc.invalidateQueries({ queryKey: ["wallet", "banks"] });
    await qc.invalidateQueries({ queryKey: ["users", "dashboard"] });
  };
}

export function useNigerianBanks(enabled = true) {
  return useQuery({
    queryKey: ["nigerian-banks"],
    queryFn: getNigerianBanks,
    enabled,
  });
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: (body: { accountNumber: string; bankCode: string }) =>
      verifyAccount(body.accountNumber, body.bankCode),
    onError: (error) => {
      toast.error(depositErrorMessage(error));
    },
  });
}

export function usePayoutBanks() {
  return useQuery({
    queryKey: ["wallet", "banks"],
    queryFn: getPayoutBanks,
  });
}

export function useSavePayoutBank() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: SavePayoutBankPayload) => postSavePayoutBank(body),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["wallet", "banks"] });
      toast.success("Bank saved");
    },
    onError: (error) => {
      toast.error(depositErrorMessage(error));
    },
  });
}

export function usePayoutRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: PayoutRequestPayload) => postPayoutRequest(body),
    onSuccess: async (res) => {
      await qc.invalidateQueries({ queryKey: ["wallet"] });
      await qc.invalidateQueries({ queryKey: ["wallet", "transactions"] });
      toast.success(res?.message ?? "Payout request created");
    },
    onError: (error) => {
      toast.error(depositErrorMessage(error));
    },
  });
}

export function useMyPayouts() {
  return useQuery({
    queryKey: ["wallet", "payouts"],
    queryFn: getMyPayouts,
  });
}

export function useMyPayoutById(id: number, enabled = true) {
  return useQuery({
    queryKey: ["wallet", "payouts", id],
    queryFn: () => getMyPayoutById(id),
    enabled: enabled && Number.isFinite(id) && id > 0,
  });
}

/** Payout banks list + save mutation for vendor wallet UI */
export function useVendorPayoutBanks() {
  const query = usePayoutBanks();
  const save = useSavePayoutBank();
  return {
    banks: query.data ?? [],
    refetchBanks: query.refetch,
    banksLoading: query.isLoading,
    banksError: query.isError,
    saveBank: save.mutateAsync,
    savePending: save.isPending,
  };
}
