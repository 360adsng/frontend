import { baseFetchJson } from "../baseFetch";
import type { PublicInfluencerPlatform } from "../auth/types";

export type MyPlatformsResponse = { platforms: PublicInfluencerPlatform[] };
export type SinglePlatformResponse = {
  platform: PublicInfluencerPlatform | null | undefined;
};

export async function getMyPlatforms(): Promise<MyPlatformsResponse> {
  return baseFetchJson<MyPlatformsResponse>("/influencers/me/platforms", {
    method: "GET",
  });
}

export type UpdateMyPlatformsPayload = {
  platforms: Array<{
    name: string;
    platformUrl: string;
    username: string;
    numberOfFollowers: number;
    estimatedImpressions: number;
    amountRate: number;
  }>;
};

export async function patchMyPlatforms(
  payload: UpdateMyPlatformsPayload,
): Promise<MyPlatformsResponse> {
  return baseFetchJson<MyPlatformsResponse>("/influencers/me/platforms", {
    method: "PATCH",
    body: payload,
  } as unknown as RequestInit);
}

export type CreateMyPlatformPayload = {
  name: string;
  platformUrl: string;
  username: string;
  numberOfFollowers: number;
  estimatedImpressions: number;
  amountRate: number;
};

export async function postMyPlatform(
  payload: CreateMyPlatformPayload,
): Promise<SinglePlatformResponse> {
  return baseFetchJson<SinglePlatformResponse>("/influencers/me/platforms", {
    method: "POST",
    body: payload,
  } as unknown as RequestInit);
}

export type UpdateMyPlatformPayload = Partial<CreateMyPlatformPayload>;

export async function patchMyPlatform(
  id: number,
  payload: UpdateMyPlatformPayload,
): Promise<SinglePlatformResponse> {
  return baseFetchJson<SinglePlatformResponse>(
    `/influencers/me/platforms/${id}`,
    { method: "PATCH", body: payload } as unknown as RequestInit,
  );
}

export type InfluencerDirectoryItem = {
  id: number;
  mediaName: string;
  photo: string | null;
  allowNegotiation: boolean;
  followers: number;
};

export type InfluencerDirectoryResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: InfluencerDirectoryItem[];
};

export type InfluencerDirectoryDetails = {
  id: number;
  mediaName: string;
  photo: string | null;
  followers: number;
  allowNegotiation: boolean;
  bio: string | null;
  influencerType: string;
  platforms: Array<{
    id: number;
    name: string;
    platformUrl: string;
    username: string;
    numberOfFollowers: number;
    estimatedImpressions: number;
    amountRate: number;
  }>;
};

export type InfluencerDirectoryQuery = Partial<{
  page: number;
  limit: number;
  q: string;
  influencerType: string;
  allowNegotiation: boolean;
}>;

function toQueryString(q: InfluencerDirectoryQuery): string {
  const sp = new URLSearchParams();
  if (q.page) sp.set("page", String(q.page));
  if (q.limit) sp.set("limit", String(q.limit));
  if (q.q) sp.set("q", q.q);
  if (q.influencerType) sp.set("influencerType", q.influencerType);
  if (q.allowNegotiation !== undefined)
    sp.set("allowNegotiation", String(q.allowNegotiation));
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export async function listInfluencerDirectory(
  query: InfluencerDirectoryQuery,
): Promise<InfluencerDirectoryResponse> {
  return baseFetchJson<InfluencerDirectoryResponse>(
    `/influencers/directory${toQueryString(query)}`,
    { method: "GET" },
  );
}

export async function getInfluencerDirectoryById(
  id: number,
): Promise<InfluencerDirectoryDetails> {
  return baseFetchJson<InfluencerDirectoryDetails>(
    `/influencers/directory/${id}`,
    {
      method: "GET",
    },
  );
}

export type CreateInfluencerBookingPayload = {
  durationPlan: "immediate" | "days" | "weeks" | "months";
  selectedDates?: string[];
  periodStart?: string;
  periodDurationCount?: number;
  creativeKind: "none" | "image" | "video";
  creativeVideoUrl?: string;
  platformIds: number[];
  message: string;
};

export type CreateInfluencerBookingResponse = { id: number };

export function createInfluencerBooking(
  influencerProfileId: number,
  payload: CreateInfluencerBookingPayload,
  imageFile?: File,
): Promise<CreateInfluencerBookingResponse> {
  const form = new FormData();
  form.append("payload", JSON.stringify(payload));
  if (imageFile) form.append("file", imageFile);
  return baseFetchJson<CreateInfluencerBookingResponse>(
    `/influencers/directory/${influencerProfileId}/bookings`,
    {
      method: "POST",
      body: form,
    },
  );
}

/** Same lifecycle strings as billboard bookings. */
export type InfluencerNegotiationPhase =
  | "none"
  | "awaiting_vendor"
  | "awaiting_booker"
  | "agreed";

export type InfluencerBooking = {
  id: number;
  status: string;
  paymentStatus: string;
  durationPlan: string;
  selectedDates: string[];
  billableDays: number;
  campaignStartDate: string | null;
  campaignEndDate: string | null;
  quotedTotal: number;
  creativeKind: string;
  creativeImageUrl: string | null;
  creativeVideoUrl: string | null;
  activeProofImageUrl: string | null;
  activeAt: string | null;
  completedAt: string | null;
  disputeReason?: string | null;
  disputedAt?: string | null;
  disputeChatHasThread?: boolean;
  influencerWasNegotiable: boolean;
  minimumNegotiableAmount: number | null;
  negotiatedAmount: number | null;
  negotiationPhase?: InfluencerNegotiationPhase;
  vendorCounterAmount?: number | null;
  message: string | null;
  influencer: {
    id: number;
    mediaName: string;
    photo: string | null;
    firstName?: string | null;
    lastName?: string | null;
    bio?: string | null;
    influencerType?: string | null;
  } | null;
  platforms: Array<{
    id: number;
    name: string;
    platformUrl: string;
    username: string;
    amountRate: number;
    numberOfFollowers: number;
    estimatedImpressions: number;
  }>;
};

export function getInfluencerBookingById(
  id: number,
): Promise<InfluencerBooking> {
  return baseFetchJson<InfluencerBooking>(`/influencers/bookings/${id}`, {
    method: "GET",
  });
}

export function completeInfluencerBooking(
  bookingId: number,
): Promise<{
  bookingId: number;
  status: string;
  paymentStatus?: string;
  settlement?: Record<string, unknown>;
}> {
  return baseFetchJson(`/influencers/bookings/${bookingId}/complete`, {
    method: "POST",
  });
}

export function disputeInfluencerBooking(
  bookingId: number,
  payload: { reason: string },
): Promise<{
  bookingId: number;
  status: string;
  paymentStatus?: string;
  disputeReason: string | null;
  disputedAt: string | null;
}> {
  return baseFetchJson(`/influencers/bookings/${bookingId}/dispute`, {
    method: "POST",
    body: payload,
  });
}

export function negotiateInfluencerBooking(
  id: number,
  negotiatedAmount: number,
): Promise<{
  id: number;
  status: string;
  paymentStatus: string;
  negotiatedAmount: number | null;
  minimumNegotiableAmount: number | null;
  negotiationPhase?: InfluencerNegotiationPhase;
  vendorCounterAmount?: number | null;
}> {
  return baseFetchJson(`/influencers/bookings/${id}/negotiate`, {
    method: "POST",
    body: { negotiatedAmount },
  });
}

export type BookerInfluencerNegotiationResponsePayload =
  | { action: "accept" }
  | { action: "reject" };

export function postBookerInfluencerNegotiationResponse(
  bookingId: number,
  payload: BookerInfluencerNegotiationResponsePayload,
): Promise<{
  message: string;
  id: number;
  status?: string;
  paymentStatus?: string;
  negotiationPhase: InfluencerNegotiationPhase;
  vendorCounterAmount: number | null;
  negotiatedAmount: number | null;
}> {
  return baseFetchJson(
    `/influencers/bookings/${bookingId}/negotiation-response`,
    { method: "POST", body: payload },
  );
}

export type InfluencerBookingsQueryParams = {
  status?: string;
};

export type InfluencerBookingListItem = {
  id: number;
  quotedTotal: number;
  currency: string;
  status: string;
  paymentStatus?: string;
  createdAt: string;
  listingId: number | null;
  listingName: string | null;
  campaignStartDate: string | null;
  campaignEndDate: string | null;
  minimumNegotiableAmount: number | null;
  negotiatedAmount: number | null;
  negotiationPhase?: InfluencerNegotiationPhase;
  vendorCounterAmount?: number | null;
};

export function getMyInfluencerBookings(
  params: InfluencerBookingsQueryParams = {},
): Promise<InfluencerBookingListItem[]> {
  const usp = new URLSearchParams();
  if (params.status?.trim()) usp.set("status", params.status.trim());
  const q = usp.toString();
  return baseFetchJson<InfluencerBookingListItem[]>(
    `/influencers/bookings${q ? `?${q}` : ""}`,
    { method: "GET" },
  );
}

export type VendorInfluencerBookingListItem = InfluencerBookingListItem & {
  bookerId: number | null;
  bookerName: string | null;
};

export function getMyVendorInfluencerBookings(
  params: InfluencerBookingsQueryParams = {},
): Promise<VendorInfluencerBookingListItem[]> {
  const usp = new URLSearchParams();
  if (params.status?.trim()) usp.set("status", params.status.trim());
  const q = usp.toString();
  return baseFetchJson<VendorInfluencerBookingListItem[]>(
    `/influencers/vendor/bookings${q ? `?${q}` : ""}`,
    { method: "GET" },
  );
}

export type VendorInfluencerNegotiationPayload =
  | { action: "accept" }
  | { action: "counter"; counterAmount: number };

export function postVendorInfluencerNegotiation(
  bookingId: number,
  payload: VendorInfluencerNegotiationPayload,
): Promise<{
  message: string;
  id: number;
  negotiationPhase: InfluencerNegotiationPhase;
  vendorCounterAmount: number | null;
  negotiatedAmount: number | null;
}> {
  return baseFetchJson(
    `/influencers/vendor/bookings/${bookingId}/negotiation`,
    {
      method: "POST",
      body: payload,
    },
  );
}

export type MarkVendorInfluencerBookingActiveResponse = {
  id: number;
  status: string;
  paymentStatus?: string;
  activeProofImageUrl: string | null;
  activeAt: string | null;
};

export function markVendorInfluencerBookingActive(
  bookingId: number,
  proofImage: File,
): Promise<MarkVendorInfluencerBookingActiveResponse> {
  const form = new FormData();
  form.append("file", proofImage);
  return baseFetchJson<MarkVendorInfluencerBookingActiveResponse>(
    `/influencers/vendor/bookings/${bookingId}/active`,
    { method: "POST", body: form },
  );
}

export function rejectVendorInfluencerBooking(
  bookingId: number,
  body?: { reason?: string },
): Promise<unknown> {
  return baseFetchJson(`/influencers/vendor/bookings/${bookingId}/reject`, {
    method: "POST",
    body:
      body?.reason != null && body.reason.trim() !== ""
        ? { reason: body.reason.trim() }
        : {},
  });
}

export type VendorInfluencerBooking = {
  id: number;
  quotedTotal: number;
  currency: string;
  status: string;
  paymentStatus: string;
  influencerWasNegotiable: boolean;
  minimumNegotiableAmount: number | null;
  negotiatedAmount: number | null;
  negotiationPhase?: InfluencerNegotiationPhase;
  vendorCounterAmount?: number | null;
  campaignStartDate: string | null;
  campaignEndDate: string | null;
  durationPlan: string;
  selectedDates: string[];
  periodStart: string | null;
  periodDurationCount: number | null;
  periodDurationUnit: string | null;
  creativeKind: string;
  creativeImageUrl: string | null;
  creativeVideoUrl: string | null;
  activeProofImageUrl: string | null;
  activeAt: string | null;
  rejectedAt?: string | null;
  completedAt?: string | null;
  disputeReason?: string | null;
  disputedAt?: string | null;
  disputeChatHasThread?: boolean;
  createdAt?: string;
  message: string | null;
  billableDays: number;
  booker?: {
    id: number;
    email: string;
    accountType: string;
    businessName: string | null;
    firstName: string | null;
    lastName: string | null;
  } | null;
  influencer: {
    id: number;
    mediaName: string;
    photo: string | null;
    platforms: Array<{
      id: number;
      name: string;
      amountRate: number;
      numberOfFollowers: number;
    }>;
  } | null;
};

export function getVendorInfluencerBookingById(
  id: number,
): Promise<VendorInfluencerBooking> {
  return baseFetchJson<VendorInfluencerBooking>(
    `/influencers/vendor/bookings/${id}`,
    {
      method: "GET",
    },
  );
}

export type InfluencerVendorDashboardRevenuePoint = {
  weekStart: string;
  revenue: number;
};

export type InfluencerVendorDashboardCampaignRow = {
  id: number;
  listingName: string | null;
  createdAt: string;
  amount: number;
  status: string;
  paymentStatus: string;
  disputeReason?: string | null;
  disputedAt?: string | null;
  disputeChatHasThread?: boolean;
};

/** Mirrors billboard owner dashboard shape for the influencer vendor home page. */
export type InfluencerVendorDashboardResponse = {
  walletBalanceAmount: number;
  numberOfPlatforms: number;
  numberOfActiveBookings: number;
  numberOfCompletedBookings: number;
  revenuePerWeek: InfluencerVendorDashboardRevenuePoint[];
  last5Campaigns: InfluencerVendorDashboardCampaignRow[];
};

export function getInfluencerVendorDashboard(): Promise<InfluencerVendorDashboardResponse> {
  return baseFetchJson<InfluencerVendorDashboardResponse>(
    "/influencers/vendor/dashboard",
    { method: "GET" },
  );
}
