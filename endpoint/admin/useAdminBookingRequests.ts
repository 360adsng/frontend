import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  attachAdminBillboardArconCertificate,
  getAdminBillboardBookingRequestDetail,
  getAdminBillboardBookingRequests,
  getAdminInfluencerBookingRequestDetail,
  getAdminInfluencerBookingRequests,
  cancelAdminBillboardBookingPayment,
  repairAdminBillboardPaymentLedger,
  refundAdminBillboardArconFee,
  reconcileAdminBillboardFlutterwavePayment,
  reconcileAdminInfluencerFlutterwavePayment,
  type AdminBillboardRequestsQuery,
  type AdminInfluencerRequestsQuery,
} from "./adminBookingRequests";
import { adminDashboardKeys } from "./useAdminDashboard";

export const adminBookingRequestsKeys = {
  all: ["admin", "booking-requests"] as const,
  billboardsList: (q: AdminBillboardRequestsQuery) =>
    [...adminBookingRequestsKeys.all, "billboards", q] as const,
  billboardDetail: (id: number) =>
    [...adminBookingRequestsKeys.all, "billboard", id] as const,
  influencersList: (q: AdminInfluencerRequestsQuery) =>
    [...adminBookingRequestsKeys.all, "influencers", q] as const,
  influencerDetail: (id: number) =>
    [...adminBookingRequestsKeys.all, "influencer", id] as const,
};

export function useAdminBillboardBookingRequests(
  params: AdminBillboardRequestsQuery,
) {
  return useQuery({
    queryKey: adminBookingRequestsKeys.billboardsList(params),
    queryFn: () => getAdminBillboardBookingRequests(params),
  });
}

export function useAdminBillboardBookingRequest(id: number | null) {
  return useQuery({
    queryKey: adminBookingRequestsKeys.billboardDetail(id ?? 0),
    queryFn: () => getAdminBillboardBookingRequestDetail(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useAdminInfluencerBookingRequests(
  params: AdminInfluencerRequestsQuery,
) {
  return useQuery({
    queryKey: adminBookingRequestsKeys.influencersList(params),
    queryFn: () => getAdminInfluencerBookingRequests(params),
  });
}

export function useAdminInfluencerBookingRequest(id: number | null) {
  return useQuery({
    queryKey: adminBookingRequestsKeys.influencerDetail(id ?? 0),
    queryFn: () => getAdminInfluencerBookingRequestDetail(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useAttachAdminBillboardArconCertificate(bookingId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (arconCertificateUrl: string) =>
      attachAdminBillboardArconCertificate(bookingId, arconCertificateUrl),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: adminBookingRequestsKeys.billboardDetail(bookingId),
      });
      await qc.invalidateQueries({ queryKey: adminDashboardKeys.all });
      toast.success("ARCON certificate saved");
    },
    onError: (e: Error) => {
      toast.error(e.message || "Could not save certificate");
    },
  });
}

export function useAdminCancelBillboardBookingPayment(bookingId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (reason?: string) =>
      cancelAdminBillboardBookingPayment(bookingId, reason),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: adminBookingRequestsKeys.billboardDetail(bookingId),
      });
      await qc.invalidateQueries({ queryKey: adminBookingRequestsKeys.all });
      await qc.invalidateQueries({ queryKey: adminDashboardKeys.all });
      toast.success("Booking cancelled and full refund issued");
    },
    onError: (e: Error) => {
      toast.error(e.message || "Could not cancel booking payment");
    },
  });
}

export function useAdminRepairBillboardPaymentLedger(bookingId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => repairAdminBillboardPaymentLedger(bookingId),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: adminBookingRequestsKeys.billboardDetail(bookingId),
      });
      await qc.invalidateQueries({ queryKey: adminBookingRequestsKeys.all });
      await qc.invalidateQueries({ queryKey: adminDashboardKeys.all });
      toast.success("Payment split repaired (vendor hold + platform ARCON)");
    },
    onError: (e: Error) => {
      toast.error(e.message || "Could not repair payment ledger");
    },
  });
}

export function useAdminRefundBillboardArconFee(bookingId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (reason?: string) =>
      refundAdminBillboardArconFee(bookingId, reason),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: adminBookingRequestsKeys.billboardDetail(bookingId),
      });
      await qc.invalidateQueries({ queryKey: adminBookingRequestsKeys.all });
      await qc.invalidateQueries({ queryKey: adminDashboardKeys.all });
      toast.success("ARCON fee refunded to booker");
    },
    onError: (e: Error) => {
      toast.error(e.message || "Could not refund ARCON fee");
    },
  });
}

export function useAdminReconcileFlutterwavePayment(
  kind: "billboard" | "influencer",
  bookingId: number,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () =>
      kind === "billboard"
        ? reconcileAdminBillboardFlutterwavePayment(bookingId)
        : reconcileAdminInfluencerFlutterwavePayment(bookingId),
    onSuccess: async (result) => {
      const detailKey =
        kind === "billboard"
          ? adminBookingRequestsKeys.billboardDetail(bookingId)
          : adminBookingRequestsKeys.influencerDetail(bookingId);
      await qc.invalidateQueries({ queryKey: detailKey });
      await qc.invalidateQueries({ queryKey: adminBookingRequestsKeys.all });
      await qc.invalidateQueries({ queryKey: adminDashboardKeys.all });
      const fwStatus = String(result.flutterwaveStatus ?? "").toLowerCase();
      const paid = ["successful", "succeeded", "success"].includes(fwStatus);
      if (result.duplicate) {
        toast.info("Payment was already recorded");
      } else if (result.skipped) {
        toast.warning("Flutterwave reported no matching pending transaction");
      } else if (paid) {
        toast.success("Payment verified and applied");
      } else {
        toast.warning(
          `Flutterwave status: ${result.flutterwaveStatus || "unknown"}`,
        );
      }
    },
    onError: (e: Error) => {
      toast.error(e.message || "Could not verify Flutterwave payment");
    },
  });
}
