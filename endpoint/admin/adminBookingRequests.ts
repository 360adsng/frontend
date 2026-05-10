import { baseFetchJson } from "../baseFetch";

export type AdminBriefUser = {
  id: number;
  email: string;
  phone: string;
  accountType: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

/** Billboard bookings list row */
export type AdminBillboardRequestRow = {
  id: number;
  billboardListingId: number;
  listingName: string | null;
  bookerId: number;
  vendorId: number;
  booker: AdminBriefUser | null;
  vendor: AdminBriefUser | null;
  quotedTotal: number;
  negotiatedAmount: number | null;
  vendorCounterAmount: number | null;
  currency: string;
  status: string;
  paymentStatus: string;
  negotiationPhase: string;
  paymentMethod: string | null;
  listingWasNegotiable: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminBillboardRequestsQuery = {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
  negotiationPhase?: string;
  bookerId?: number;
  vendorId?: number;
  search?: string;
};

export type AdminBillboardRequestsListResponse = {
  data: AdminBillboardRequestRow[];
  meta: PaginationMeta;
};

export type AdminListingSummary = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  ownerId: number;
  owner: AdminBriefUser | null;
};

export type AdminBillboardRequestDetail = {
  id: number;
  billboardListingId: number;
  listing: AdminListingSummary | null;
  booker: AdminBriefUser | null;
  vendor: AdminBriefUser | null;
  durationPlan: string;
  selectedDates: string[];
  periodStart: string | null;
  periodDurationCount: number | null;
  periodDurationUnit: string | null;
  campaignStartDate: string | null;
  campaignEndDate: string | null;
  creativeKind: string;
  creativeImageUrl: string | null;
  creativeVideoUrl: string | null;
  activeProofImageUrl: string | null;
  activeAt: string | null;
  currency: string;
  quotedTotal: number;
  listingWasNegotiable: boolean;
  minimumNegotiableAmount: number | null;
  negotiatedAmount: number | null;
  vendorCounterAmount: number | null;
  negotiationPhase: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
  rejectedAt: string | null;
  completedAt: string | null;
  disputeReason: string | null;
  disputedAt: string | null;
  disputeChatHasThread: boolean;
  createdAt: string;
  updatedAt: string;
};

/** Influencer bookings list row */
export type AdminInfluencerRequestRow = {
  id: number;
  influencerProfileId: number;
  influencerDisplayName: string | null;
  bookerId: number;
  vendorId: number;
  booker: AdminBriefUser | null;
  vendor: AdminBriefUser | null;
  quotedTotal: number;
  negotiatedAmount: number | null;
  vendorCounterAmount: number | null;
  currency: string;
  status: string;
  paymentStatus: string;
  negotiationPhase: string;
  paymentMethod: string | null;
  influencerWasNegotiable: boolean;
  message: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdminInfluencerRequestsQuery = {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
  negotiationPhase?: string;
  bookerId?: number;
  vendorId?: number;
  search?: string;
};

export type AdminInfluencerRequestsListResponse = {
  data: AdminInfluencerRequestRow[];
  meta: PaginationMeta;
};

export type AdminInfluencerProfileSummary = {
  id: number;
  firstName: string;
  lastName: string;
  mediaName: string;
  userId: number;
  verificationStatus: string;
  profilePicture: string | null;
  address: string;
};

export type AdminInfluencerRequestDetail = {
  id: number;
  influencerProfileId: number;
  influencerProfile: AdminInfluencerProfileSummary | null;
  booker: AdminBriefUser | null;
  vendor: AdminBriefUser | null;
  durationPlan: string;
  selectedDates: string[];
  periodStart: string | null;
  periodDurationCount: number | null;
  periodDurationUnit: string | null;
  campaignStartDate: string | null;
  campaignEndDate: string | null;
  creativeKind: string;
  creativeImageUrl: string | null;
  creativeVideoUrl: string | null;
  activeProofImageUrl: string | null;
  activeAt: string | null;
  platformIds: number[];
  message: string | null;
  currency: string;
  quotedTotal: number;
  influencerWasNegotiable: boolean;
  minimumNegotiableAmount: number | null;
  negotiatedAmount: number | null;
  vendorCounterAmount: number | null;
  negotiationPhase: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
  rejectedAt: string | null;
  completedAt: string | null;
  disputeReason: string | null;
  disputedAt: string | null;
  disputeChatHasThread: boolean;
  createdAt: string;
  updatedAt: string;
};

export function buildAdminBillboardRequestsQueryString(
  q: AdminBillboardRequestsQuery,
): string {
  const p = new URLSearchParams();
  if (q.page != null) p.set("page", String(q.page));
  if (q.limit != null) p.set("limit", String(q.limit));
  if (q.status?.trim()) p.set("status", q.status.trim());
  if (q.paymentStatus?.trim()) p.set("paymentStatus", q.paymentStatus.trim());
  if (q.negotiationPhase?.trim()) {
    p.set("negotiationPhase", q.negotiationPhase.trim());
  }
  if (q.bookerId != null && q.bookerId > 0)
    p.set("bookerId", String(q.bookerId));
  if (q.vendorId != null && q.vendorId > 0)
    p.set("vendorId", String(q.vendorId));
  if (q.search?.trim()) p.set("search", q.search.trim());
  const s = p.toString();
  return s ? `?${s}` : "";
}

export function buildAdminInfluencerRequestsQueryString(
  q: AdminInfluencerRequestsQuery,
): string {
  return buildAdminBillboardRequestsQueryString(q);
}

export async function getAdminBillboardBookingRequests(
  query: AdminBillboardRequestsQuery = {},
): Promise<AdminBillboardRequestsListResponse> {
  const qs = buildAdminBillboardRequestsQueryString(query);
  return baseFetchJson<AdminBillboardRequestsListResponse>(
    `/admin/requests/billboards${qs}`,
  );
}

export async function getAdminBillboardBookingRequestDetail(
  id: number,
): Promise<AdminBillboardRequestDetail> {
  return baseFetchJson<AdminBillboardRequestDetail>(
    `/admin/requests/billboards/${id}`,
  );
}

export async function getAdminInfluencerBookingRequests(
  query: AdminInfluencerRequestsQuery = {},
): Promise<AdminInfluencerRequestsListResponse> {
  const qs = buildAdminInfluencerRequestsQueryString(query);
  return baseFetchJson<AdminInfluencerRequestsListResponse>(
    `/admin/requests/influencers${qs}`,
  );
}

export async function getAdminInfluencerBookingRequestDetail(
  id: number,
): Promise<AdminInfluencerRequestDetail> {
  return baseFetchJson<AdminInfluencerRequestDetail>(
    `/admin/requests/influencers/${id}`,
  );
}
