import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../baseFetch";
import {
  createBillboardListing,
  createBillboardBooking,
  getBillboardListingById,
  getBillboardBookingById,
  getMyBillboardBookings,
  getMyVendorBillboardBookings,
  getVendorBillboardBookingById,
  getBrowseBillboardListings,
  getMyBillboardListingById,
  getMyBillboardListings,
  negotiateBillboardBooking,
  postBookerNegotiationResponse,
  postVendorBillboardNegotiation,
  markVendorBookingActive,
  completeBillboardBooking,
  rejectVendorBillboardBooking,
  getBillboardOwnerDashboard,
  type BillboardBookingListItem,
  type BillboardBookingsQueryParams,
  type BillboardListQueryParams,
  type BillboardBooking,
  type BookerNegotiationResponsePayload,
  type CreateBillboardBookingPayload,
  type CreateBillboardListingPayload,
  type VendorNegotiationPayload,
  type BillboardOwnerDashboardResponse,
} from "./billboard";

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

export type CreateBillboardListingVariables = {
  payload: CreateBillboardListingPayload;
  imageFile: File;
};

export function useMyBillboardListings(params: BillboardListQueryParams = {}) {
  return useQuery({
    queryKey: ["billboard", "listings", "mine", params],
    queryFn: () => getMyBillboardListings(params),
  });
}

export function useBrowseBillboardListings(
  params: BillboardListQueryParams = {},
) {
  return useQuery({
    queryKey: ["billboard", "listings", "browse", params],
    queryFn: () => getBrowseBillboardListings(params),
  });
}

export function useBillboardListing(id: number | null) {
  return useQuery({
    queryKey: ["billboard", "listing", id],
    queryFn: () => getBillboardListingById(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useMyBillboardListing(id: number | null) {
  return useQuery({
    queryKey: ["billboard", "listing", "mine", id],
    queryFn: () => getMyBillboardListingById(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useCreateBillboardListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ payload, imageFile }: CreateBillboardListingVariables) =>
      createBillboardListing(payload, imageFile),
    onSuccess: async (data) => {
      toast.success(data?.message ?? "Billboard listing created.");
      await qc.invalidateQueries({ queryKey: ["billboard", "listings"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export type CreateBillboardBookingVariables = {
  listingId: number;
  payload: CreateBillboardBookingPayload;
  imageFile?: File;
};

export function useCreateBillboardBooking() {
  return useMutation({
    mutationFn: ({ listingId, payload, imageFile }: CreateBillboardBookingVariables) =>
      createBillboardBooking(listingId, payload, imageFile),
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useBillboardBooking(id: number | null) {
  return useQuery({
    queryKey: ["billboard", "booking", id],
    queryFn: () => getBillboardBookingById(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useNegotiateBillboardBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { id: number; negotiatedAmount: number }) =>
      negotiateBillboardBooking(vars.id, vars.negotiatedAmount),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["billboard", "bookings"] });
      await qc.invalidateQueries({ queryKey: ["billboard", "booking"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useVendorBillboardNegotiation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      bookingId: number;
      payload: VendorNegotiationPayload;
    }) => postVendorBillboardNegotiation(vars.bookingId, vars.payload),
    onSuccess: async (data) => {
      toast.success(data?.message ?? "Updated");
      await qc.invalidateQueries({ queryKey: ["billboard", "bookings"] });
      await qc.invalidateQueries({ queryKey: ["billboard", "booking"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useBookerNegotiationResponse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      bookingId: number;
      payload: BookerNegotiationResponsePayload;
    }) => postBookerNegotiationResponse(vars.bookingId, vars.payload),
    onSuccess: async (data) => {
      toast.success(data?.message ?? "Updated");
      await qc.invalidateQueries({ queryKey: ["billboard", "bookings"] });
      await qc.invalidateQueries({ queryKey: ["billboard", "booking"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useMyBillboardBookings(params: BillboardBookingsQueryParams = {}) {
  return useQuery({
    queryKey: ["billboard", "bookings", "mine", params],
    queryFn: () => getMyBillboardBookings(params),
  });
}

export function useMyNegotiatingBillboardBookings() {
  return useMyBillboardBookings({ status: "negotiating" });
}

export function useMyPaidBillboardBookings() {
  // Back-compat: backend maps legacy status=paid -> paymentStatus=PAID.
  return useMyBillboardBookings({ status: "paid" });
}

export function useMyVendorBillboardBookings(
  params: BillboardBookingsQueryParams = {},
) {
  return useQuery({
    queryKey: ["billboard", "bookings", "vendor", params],
    queryFn: () => getMyVendorBillboardBookings(params),
  });
}

export function useBillboardOwnerDashboard() {
  return useQuery({
    queryKey: ["billboard", "dashboard", "owner"],
    queryFn: getBillboardOwnerDashboard,
  });
}

export function useMyVendorNegotiatingBillboardBookings() {
  return useMyVendorBillboardBookings({ status: "negotiating" });
}

export function useMyVendorPaidBillboardBookings() {
  // Back-compat: backend maps legacy status=paid -> paymentStatus=PAID.
  return useMyVendorBillboardBookings({ status: "paid" });
}

export function useVendorBillboardBooking(id: number | null) {
  return useQuery({
    queryKey: ["billboard", "booking", "vendor", id],
    queryFn: () => getVendorBillboardBookingById(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useMarkVendorBookingActive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { bookingId: number; proofImage: File }) =>
      markVendorBookingActive(vars.bookingId, vars.proofImage),
    onSuccess: async () => {
      toast.success("Campaign accepted and marked active");
      await qc.invalidateQueries({ queryKey: ["billboard", "bookings"] });
      await qc.invalidateQueries({ queryKey: ["billboard", "booking"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useCompleteBillboardBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: number) => completeBillboardBooking(bookingId),
    onSuccess: async () => {
      toast.success("Campaign completed");
      await qc.invalidateQueries({ queryKey: ["billboard", "bookings"] });
      await qc.invalidateQueries({ queryKey: ["billboard", "booking"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useRejectVendorBillboardBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { bookingId: number; reason?: string }) =>
      rejectVendorBillboardBooking(vars.bookingId, { reason: vars.reason }),
    onSuccess: async () => {
      toast.success("Campaign rejected; refund processed where applicable");
      await qc.invalidateQueries({ queryKey: ["billboard", "bookings"] });
      await qc.invalidateQueries({ queryKey: ["billboard", "booking"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error));
    },
  });
}
