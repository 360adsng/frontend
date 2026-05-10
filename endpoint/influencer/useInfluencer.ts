import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../baseFetch";
import {
  createInfluencerBooking,
  getMyPlatforms,
  getInfluencerDirectoryById,
  getInfluencerBookingById,
  completeInfluencerBooking,
  disputeInfluencerBooking,
  getMyInfluencerBookings,
  negotiateInfluencerBooking,
  postBookerInfluencerNegotiationResponse,
  getMyVendorInfluencerBookings,
  getVendorInfluencerBookingById,
  getInfluencerVendorDashboard,
  markVendorInfluencerBookingActive,
  rejectVendorInfluencerBooking,
  postVendorInfluencerNegotiation,
  patchMyPlatform,
  patchMyPlatforms,
  postMyPlatform,
  listInfluencerDirectory,
  type CreateMyPlatformPayload,
  type CreateInfluencerBookingPayload,
  type CreateInfluencerBookingResponse,
  type BookerInfluencerNegotiationResponsePayload,
  type InfluencerBookingsQueryParams,
  type InfluencerDirectoryQuery,
  type VendorInfluencerNegotiationPayload,
  type UpdateMyPlatformPayload,
  type UpdateMyPlatformsPayload,
} from "./influencer";

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

export function useMyPlatforms() {
  return useQuery({
    queryKey: ["influencer", "platforms"],
    queryFn: getMyPlatforms,
  });
}

export function useUpdateMyPlatforms() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateMyPlatformsPayload) => patchMyPlatforms(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["influencer", "platforms"] });
      toast.success("Rate card updated.");
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useCreateMyPlatform() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMyPlatformPayload) => postMyPlatform(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["influencer", "platforms"] });
      toast.success("Platform added.");
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useEditMyPlatform() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }: { id: number; patch: UpdateMyPlatformPayload }) =>
      patchMyPlatform(id, patch),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["influencer", "platforms"] });
      toast.success("Platform updated.");
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useInfluencerDirectory(query: InfluencerDirectoryQuery) {
  return useQuery({
    queryKey: ["ads", "influencer-directory", query],
    queryFn: () => listInfluencerDirectory(query),
  });
}

export function useInfluencerDirectoryById(id: number) {
  return useQuery({
    queryKey: ["ads", "influencer-directory", "by-id", id],
    queryFn: () => getInfluencerDirectoryById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
}

export type CreateInfluencerBookingVariables = {
  influencerProfileId: number;
  payload: CreateInfluencerBookingPayload;
  imageFile?: File;
};

export function useCreateInfluencerBooking() {
  const qc = useQueryClient();
  return useMutation<CreateInfluencerBookingResponse, unknown, CreateInfluencerBookingVariables>({
    mutationFn: ({ influencerProfileId, payload, imageFile }) =>
      createInfluencerBooking(influencerProfileId, payload, imageFile),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["ads", "influencer-booking"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "bookings", "mine"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useInfluencerBooking(id: number | null) {
  return useQuery({
    queryKey: ["ads", "influencer-booking", id],
    queryFn: () => getInfluencerBookingById(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useCompleteInfluencerBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: number) => completeInfluencerBooking(bookingId),
    onSuccess: async () => {
      toast.success("Campaign completed");
      await qc.invalidateQueries({ queryKey: ["ads", "influencer-booking"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "bookings", "mine"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-bookings"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-booking"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-dashboard"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useDisputeInfluencerBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { bookingId: number; reason: string }) =>
      disputeInfluencerBooking(vars.bookingId, {
        reason: vars.reason.trim(),
      }),
    onSuccess: async () => {
      toast.success("Dispute recorded. Support may follow up if needed.");
      await qc.invalidateQueries({ queryKey: ["ads", "influencer-booking"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "bookings", "mine"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-bookings"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-booking"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-dashboard"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useMyInfluencerBookings(params: InfluencerBookingsQueryParams = {}) {
  return useQuery({
    queryKey: ["influencer", "bookings", "mine", params],
    queryFn: () => getMyInfluencerBookings(params),
  });
}

export function useMyNegotiatingInfluencerBookings() {
  return useMyInfluencerBookings({ status: "negotiating" });
}

export function useNegotiateInfluencerBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; negotiatedAmount: number }) =>
      negotiateInfluencerBooking(vars.id, vars.negotiatedAmount),
    onSuccess: async (_data, vars) => {
      await qc.invalidateQueries({ queryKey: ["ads", "influencer-booking", vars.id] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useBookerInfluencerNegotiationResponse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      bookingId: number;
      payload: BookerInfluencerNegotiationResponsePayload;
    }) => postBookerInfluencerNegotiationResponse(vars.bookingId, vars.payload),
    onSuccess: async (_data, vars) => {
      await qc.invalidateQueries({
        queryKey: ["ads", "influencer-booking", vars.bookingId],
      });
      toast.success("Updated");
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useMyVendorInfluencerBookings(
  params: InfluencerBookingsQueryParams = {},
) {
  return useQuery({
    queryKey: ["influencer", "vendor-bookings", params],
    queryFn: () => getMyVendorInfluencerBookings(params),
  });
}

export function useInfluencerVendorDashboard() {
  return useQuery({
    queryKey: ["influencer", "vendor-dashboard"],
    queryFn: getInfluencerVendorDashboard,
  });
}

export function useMyVendorNegotiatingInfluencerBookings() {
  return useMyVendorInfluencerBookings({ status: "negotiating" });
}

export function useVendorInfluencerBooking(id: number | null) {
  return useQuery({
    queryKey: ["influencer", "vendor-booking", id],
    queryFn: () => getVendorInfluencerBookingById(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useMarkVendorInfluencerBookingActive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { bookingId: number; proofImage: File }) =>
      markVendorInfluencerBookingActive(vars.bookingId, vars.proofImage),
    onSuccess: async () => {
      toast.success("Campaign accepted and marked active");
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-bookings"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-booking"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-dashboard"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useRejectVendorInfluencerBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { bookingId: number; reason?: string }) =>
      rejectVendorInfluencerBooking(vars.bookingId, { reason: vars.reason }),
    onSuccess: async () => {
      toast.success("Campaign rejected; refund processed where applicable");
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-bookings"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-booking"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-dashboard"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useVendorInfluencerNegotiation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      bookingId: number;
      payload: VendorInfluencerNegotiationPayload;
    }) => postVendorInfluencerNegotiation(vars.bookingId, vars.payload),
    onSuccess: async (data) => {
      toast.success(data?.message ?? "Updated");
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-bookings"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-booking"] });
      await qc.invalidateQueries({ queryKey: ["influencer", "vendor-dashboard"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

