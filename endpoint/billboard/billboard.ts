import { baseFetchJson } from "../baseFetch";

export type CreateBillboardListingPayload = {
  name: string;
  address: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  pricing: {
    daily?: number;
    weekly?: number;
    monthly?: number;
  };
  boardType: string;
  orientation?: string;
  isNegotiable: boolean;
  trafficDescription?: string;
  durationPerDisplay?: number;
  width?: number;
  height?: number;
  pixelWidth?: number;
  pixelHeight?: number;
  startTime: string;
  endTime: string;
  activeDays: number[];
  isAvailable: boolean;
  audienceTypes: string[];
  nearbyLandmarks?: string;
  illumination?: string;
  facingDirection?: string;
};

export type CreateBillboardListingResponse = {
  id: number;
  message: string;
  imageUrl: string;
};

export type PublicBillboardListing = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number | null;
  longitude: number | null;
  pricing: {
    daily?: number;
    weekly?: number;
    monthly?: number;
  };
  boardType: string;
  orientation: string | null;
  isNegotiable: boolean;
  trafficDescription: string | null;
  durationPerDisplay: number | null;
  width: number | null;
  height: number | null;
  pixelWidth: number | null;
  pixelHeight: number | null;
  startTime: string;
  endTime: string;
  activeDays: number[];
  isAvailable: boolean;
  audienceTypes: string[];
  nearbyLandmarks: string | null;
  illumination: string | null;
  facingDirection: string | null;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type BillboardListQueryParams = {
  page?: number;
  limit?: number;
  boardType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  negotiable?: boolean;
};

export type PaginatedBillboardListings = {
  data: PublicBillboardListing[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type CreateBillboardBookingPayload = {
  durationPlan: "immediate" | "days" | "weeks" | "months";
  selectedDates?: string[];
  periodStart?: string;
  periodDurationCount?: number;
  creativeKind: "image" | "video";
  creativeVideoUrl?: string;
};

export type NegotiationPhase =
  | "none"
  | "awaiting_vendor"
  | "awaiting_booker"
  | "agreed";

export type BillboardBooking = {
  id: number;
  quotedTotal: number;
  currency: string;
  status: string;
  paymentStatus?: string;
  listingWasNegotiable: boolean;
  minimumNegotiableAmount: number | null;
  negotiatedAmount: number | null;
  negotiationPhase?: NegotiationPhase;
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
  activeProofImageUrl?: string | null;
  activeAt?: string | null;
  rejectedAt?: string | null;
  completedAt?: string | null;
  listing: {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    imageUrl: string;
    pricing: { daily?: number; weekly?: number; monthly?: number };
    isNegotiable: boolean;
  } | null;
  /** Present on advertiser booking detail only */
  billboardOwner?: {
    id: number;
    email: string;
    businessName: string | null;
    firstName: string | null;
    lastName: string | null;
  } | null;
};

function billboardListQueryString(
  params: BillboardListQueryParams,
): string {
  const usp = new URLSearchParams();
  if (params.page != null) usp.set("page", String(params.page));
  if (params.limit != null) usp.set("limit", String(params.limit));
  if (params.boardType) usp.set("boardType", params.boardType);
  if (params.location?.trim()) usp.set("location", params.location.trim());
  if (params.minPrice != null) usp.set("minPrice", String(params.minPrice));
  if (params.maxPrice != null) usp.set("maxPrice", String(params.maxPrice));
  if (params.negotiable !== undefined) {
    usp.set("negotiable", String(params.negotiable));
  }
  const q = usp.toString();
  return q ? `?${q}` : "";
}

export function getMyBillboardListings(
  params: BillboardListQueryParams = {},
): Promise<PaginatedBillboardListings> {
  return baseFetchJson<PaginatedBillboardListings>(
    `/billboard/listings/mine${billboardListQueryString(params)}`,
    { method: "GET" },
  );
}

export function getBrowseBillboardListings(
  params: BillboardListQueryParams = {},
): Promise<PaginatedBillboardListings> {
  return baseFetchJson<PaginatedBillboardListings>(
    `/billboard/listings${billboardListQueryString(params)}`,
    { method: "GET" },
  );
}

export function getBillboardListingById(
  id: number,
): Promise<PublicBillboardListing> {
  return baseFetchJson<PublicBillboardListing>(`/billboard/listings/${id}`, {
    method: "GET",
  });
}

export function getMyBillboardListingById(
  id: number,
): Promise<PublicBillboardListing> {
  return baseFetchJson<PublicBillboardListing>(
    `/billboard/listings/mine/${id}`,
    { method: "GET" },
  );
}

export function createBillboardListing(
  payload: CreateBillboardListingPayload,
  imageFile: File,
): Promise<CreateBillboardListingResponse> {
  const form = new FormData();
  form.append("payload", JSON.stringify(payload));
  form.append("file", imageFile);
  return baseFetchJson<CreateBillboardListingResponse>("/billboard/listings", {
    method: "POST",
    body: form,
  });
}

export function createBillboardBooking(
  listingId: number,
  payload: CreateBillboardBookingPayload,
  imageFile?: File,
): Promise<BillboardBooking> {
  const form = new FormData();
  form.append("payload", JSON.stringify(payload));
  if (imageFile) form.append("file", imageFile);
  return baseFetchJson<BillboardBooking>(`/billboard/listings/${listingId}/bookings`, {
    method: "POST",
    body: form,
  });
}

export function getBillboardBookingById(id: number): Promise<BillboardBooking> {
  return baseFetchJson<BillboardBooking>(`/billboard/bookings/${id}`, {
    method: "GET",
  });
}

export function negotiateBillboardBooking(
  id: number,
  negotiatedAmount: number,
): Promise<{
  id: number;
  status: string;
  negotiatedAmount: number;
  minimumNegotiableAmount: number | null;
  negotiationPhase?: NegotiationPhase;
  vendorCounterAmount?: number | null;
}> {
  return baseFetchJson(`/billboard/bookings/${id}/negotiate`, {
    method: "POST",
    body: { negotiatedAmount },
  });
}

export type VendorNegotiationPayload =
  | { action: "accept" }
  | { action: "counter"; counterAmount: number };

export function postVendorBillboardNegotiation(
  bookingId: number,
  payload: VendorNegotiationPayload,
): Promise<{
  message: string;
  id: number;
  negotiationPhase: NegotiationPhase;
  vendorCounterAmount: number | null;
  negotiatedAmount: number | null;
}> {
  return baseFetchJson(`/billboard/vendor/bookings/${bookingId}/negotiation`, {
    method: "POST",
    body: payload,
  });
}

export type BookerNegotiationResponsePayload =
  | { action: "accept" }
  | { action: "reject" };

export function postBookerNegotiationResponse(
  bookingId: number,
  payload: BookerNegotiationResponsePayload,
): Promise<{
  message: string;
  id: number;
  status?: string;
  paymentStatus?: string;
  negotiationPhase: NegotiationPhase;
  vendorCounterAmount: number | null;
  negotiatedAmount: number | null;
  rejectedAt?: string | null;
}> {
  return baseFetchJson(
    `/billboard/bookings/${bookingId}/negotiation-response`,
    { method: "POST", body: payload },
  );
}

export type BillboardBookingsQueryParams = {
  status?: string;
};

export type BillboardBookingListItem = {
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
  negotiationPhase?: NegotiationPhase;
  vendorCounterAmount?: number | null;
};

export function getMyBillboardBookings(
  params: BillboardBookingsQueryParams = {},
): Promise<BillboardBookingListItem[]> {
  const usp = new URLSearchParams();
  if (params.status?.trim()) usp.set("status", params.status.trim());
  const q = usp.toString();
  return baseFetchJson<BillboardBookingListItem[]>(
    `/billboard/bookings${q ? `?${q}` : ""}`,
    { method: "GET" },
  );
}

export type VendorBillboardBookingListItem = BillboardBookingListItem & {
  bookerId: number | null;
  bookerName: string | null;
};

export type VendorDashboardRevenuePoint = {
  weekStart: string;
  revenue: number;
};

export type VendorDashboardCampaign = {
  id: number;
  listingName: string | null;
  createdAt: string;
  amount: number;
  status: string;
  paymentStatus: string;
};

export type BillboardOwnerDashboardResponse = {
  walletBalanceAmount: number;
  numberOfBillboards: number;
  numberOfActiveBookings: number;
  numberOfCompletedBookings: number;
  revenuePerWeek: VendorDashboardRevenuePoint[];
  last5Campaigns: VendorDashboardCampaign[];
};

export function getBillboardOwnerDashboard(): Promise<BillboardOwnerDashboardResponse> {
  return baseFetchJson<BillboardOwnerDashboardResponse>(
    "/billboard/billboard-owner/dashboard",
    { method: "GET" },
  );
}

export function getMyVendorBillboardBookings(
  params: BillboardBookingsQueryParams = {},
): Promise<VendorBillboardBookingListItem[]> {
  const usp = new URLSearchParams();
  if (params.status?.trim()) usp.set("status", params.status.trim());
  const q = usp.toString();
  return baseFetchJson<VendorBillboardBookingListItem[]>(
    `/billboard/vendor/bookings${q ? `?${q}` : ""}`,
    { method: "GET" },
  );
}

export type VendorBillboardBooking = BillboardBooking & {
  createdAt?: string;
  paymentStatus?: string;
  activeProofImageUrl?: string | null;
  booker?: {
    id: number;
    email: string;
    accountType: string;
    businessName: string | null;
    firstName: string | null;
    lastName: string | null;
  } | null;
};

export function getVendorBillboardBookingById(
  id: number,
): Promise<VendorBillboardBooking> {
  return baseFetchJson<VendorBillboardBooking>(`/billboard/vendor/bookings/${id}`, {
    method: "GET",
  });
}

export type MarkVendorBookingActiveResponse = {
  id: number;
  status: string;
  paymentStatus?: string;
  activeProofImageUrl: string | null;
  activeAt: string | null;
};

export function markVendorBookingActive(
  bookingId: number,
  proofImage: File,
): Promise<MarkVendorBookingActiveResponse> {
  const form = new FormData();
  form.append("file", proofImage);
  return baseFetchJson<MarkVendorBookingActiveResponse>(
    `/billboard/vendor/bookings/${bookingId}/active`,
    { method: "POST", body: form },
  );
}

export function completeBillboardBooking(
  bookingId: number,
): Promise<{
  bookingId: number;
  status: string;
  paymentStatus?: string;
  settlement?: Record<string, unknown>;
}> {
  return baseFetchJson(`/billboard/bookings/${bookingId}/complete`, {
    method: "POST",
  });
}

export function rejectVendorBillboardBooking(
  bookingId: number,
  body?: { reason?: string },
): Promise<unknown> {
  return baseFetchJson(`/billboard/vendor/bookings/${bookingId}/reject`, {
    method: "POST",
    body: body?.reason != null && body.reason.trim() !== "" ? { reason: body.reason.trim() } : {},
  });
}
