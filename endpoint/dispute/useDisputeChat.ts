import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../baseFetch";
import { adminBookingRequestsKeys } from "../admin/useAdminBookingRequests";
import {
  getDisputeMessages,
  postAdminDisputeCancelRefund,
  postAdminDisputeComplete,
  postDisputeMessage,
  type DisputeBookingKindApi,
} from "./disputeChat";

export const disputeChatKeys = {
  all: ["dispute-chat"] as const,
  thread: (kind: DisputeBookingKindApi, bookingId: number) =>
    [...disputeChatKeys.all, kind, bookingId] as const,
};

function formatMutationError(e: unknown): string {
  if (e instanceof ApiError) {
    const m = e.body?.message;
    if (typeof m === "string" && m.trim()) return m;
    if (Array.isArray(m) && m.length) return m.join(", ");
    return e.message;
  }
  if (e instanceof Error) return e.message;
  return "Something went wrong.";
}

export function useDisputeMessages(
  bookingKind: DisputeBookingKindApi,
  bookingId: number,
  enabled: boolean,
) {
  return useQuery({
    queryKey: disputeChatKeys.thread(bookingKind, bookingId),
    queryFn: () => getDisputeMessages(bookingKind, bookingId),
    enabled: enabled && bookingId > 0,
    refetchInterval: 12_000,
    refetchOnWindowFocus: true,
  });
}

export function usePostDisputeMessage(
  bookingKind: DisputeBookingKindApi,
  bookingId: number,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body: string; image?: File | null }) =>
      postDisputeMessage(
        bookingKind,
        bookingId,
        vars.body,
        vars.image ?? undefined,
      ),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: disputeChatKeys.thread(bookingKind, bookingId),
      });
    },
    onError: (e: unknown) => {
      toast.error(formatMutationError(e));
    },
  });
}

export function useAdminDisputeComplete(
  bookingKind: DisputeBookingKindApi,
  bookingId: number,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => postAdminDisputeComplete(bookingKind, bookingId),
    onSuccess: async () => {
      toast.success("Request completed — funds settled to the vendor.");
      await qc.invalidateQueries({
        queryKey: disputeChatKeys.thread(bookingKind, bookingId),
      });
      const adminKey =
        bookingKind === "billboard"
          ? adminBookingRequestsKeys.billboardDetail(bookingId)
          : adminBookingRequestsKeys.influencerDetail(bookingId);
      await qc.invalidateQueries({ queryKey: adminKey });
    },
    onError: (e: unknown) => {
      toast.error(formatMutationError(e));
    },
  });
}

export function useAdminDisputeCancelRefund(
  bookingKind: DisputeBookingKindApi,
  bookingId: number,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { reason?: string }) =>
      postAdminDisputeCancelRefund(
        bookingKind,
        bookingId,
        vars.reason,
      ),
    onSuccess: async () => {
      toast.success(
        "Request cancelled — refund has been initiated to the campaign owner.",
      );
      await qc.invalidateQueries({
        queryKey: disputeChatKeys.thread(bookingKind, bookingId),
      });
      const adminKey =
        bookingKind === "billboard"
          ? adminBookingRequestsKeys.billboardDetail(bookingId)
          : adminBookingRequestsKeys.influencerDetail(bookingId);
      await qc.invalidateQueries({ queryKey: adminKey });
    },
    onError: (e: unknown) => {
      toast.error(formatMutationError(e));
    },
  });
}
