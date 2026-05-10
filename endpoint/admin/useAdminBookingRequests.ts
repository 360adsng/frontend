import { useQuery } from "@tanstack/react-query";
import {
  getAdminBillboardBookingRequestDetail,
  getAdminBillboardBookingRequests,
  getAdminInfluencerBookingRequestDetail,
  getAdminInfluencerBookingRequests,
  type AdminBillboardRequestsQuery,
  type AdminInfluencerRequestsQuery,
} from "./adminBookingRequests";

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
