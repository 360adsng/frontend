import { baseFetchJson } from "../baseFetch";
import type {
  TransactionDto,
  TransactionStatus,
  TransactionType,
} from "../wallet/wallet";

export type AdminAccountType =
  | "admin"
  | "regular_user"
  | "business_user"
  | "billboard_owner"
  | "influencer";

export type AdminUserListItem = {
  id: number;
  email: string;
  phone: string;
  accountType: AdminAccountType;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  blockedAt: string | null;
  blockedReason: string | null;
};

export type AdminUsersListResponse = {
  data: AdminUserListItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type AdminUsersListQuery = {
  page?: number;
  limit?: number;
  search?: string;
  accountType?: AdminAccountType;
  blocked?: boolean;
};

export function buildAdminUsersQueryString(q: AdminUsersListQuery): string {
  const p = new URLSearchParams();
  if (q.page != null) p.set("page", String(q.page));
  if (q.limit != null) p.set("limit", String(q.limit));
  if (q.search?.trim()) p.set("search", q.search.trim());
  if (q.accountType) p.set("accountType", q.accountType);
  if (q.blocked === true) p.set("blocked", "true");
  if (q.blocked === false) p.set("blocked", "false");
  const s = p.toString();
  return s ? `?${s}` : "";
}

export async function getAdminUsersList(
  query: AdminUsersListQuery = {},
): Promise<AdminUsersListResponse> {
  const qs = buildAdminUsersQueryString(query);
  return baseFetchJson<AdminUsersListResponse>(`/admin/users${qs}`);
}

export type AdminWalletSummary = {
  balance: number;
  currency: string;
  incomingBalance: number;
  outgoingBalance: number;
};

export type AdminVendorStatsBillboard = {
  kind: "billboard_owner";
  listingsCount: number;
  completedCampaignsCount: number;
  totalRevenueNgn: number;
};

export type AdminVendorStatsInfluencer = {
  kind: "influencer";
  completedCampaignsCount: number;
  totalBookingsCount: number;
  totalRevenueNgn: number;
};

export type AdminVendorStats =
  | AdminVendorStatsBillboard
  | AdminVendorStatsInfluencer;

export type AdminInfluencerPlatform = {
  id: number;
  name: string;
  platformUrl: string;
  username: string;
  numberOfFollowers: number;
  amountRate: number;
  estimatedImpressions: number;
};

export type AdminBillboardListingSummary = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  billboardType: string;
  creativeFulfillmentType: string;
  isAvailable: boolean;
  pricing: {
    daily?: number;
    weekly?: number;
    monthly?: number;
    quarterly?: number;
    semiAnnual?: number;
    annual?: number;
  };
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminSavedBank = {
  id: number;
  bankName: string;
  bankCode: string;
  accountName: string;
  accountNumber: string;
  isPrimary: boolean;
  createdAt: string;
};

export type AdminUserDetail = {
  id: number;
  email: string;
  phone: string;
  accountType: AdminAccountType;
  createdAt: string;
  updatedAt: string;
  blockedAt: string | null;
  blockedReason: string | null;
  blockedBy: number | null;
  walletBlockedAt: string | null;
  walletBlockedReason: string | null;
  walletBlockedBy: number | null;
  emailVerifiedAt: string | null;
  deletedAt?: string | null;
  individualProfile?: Record<string, unknown> | null;
  businessProfile?: Record<string, unknown> | null;
  billboardProfile?: Record<string, unknown> | null;
  influencerProfile?: Record<string, unknown> | null;
  adminProfile?: Record<string, unknown> | null;
  walletSummary?: AdminWalletSummary | null;
  vendorStats?: AdminVendorStats | null;
  /** Saved payout banks (not soft-deleted). */
  savedBanks: AdminSavedBank[];
  /** Influencer social platforms (rates & followers). */
  influencerPlatforms: AdminInfluencerPlatform[] | null;
};

export async function getAdminUserById(id: number): Promise<AdminUserDetail> {
  return baseFetchJson<AdminUserDetail>(`/admin/users/${id}`);
}

export async function getAdminBillboardListingsForOwner(
  ownerUserId: number,
): Promise<AdminBillboardListingSummary[]> {
  return baseFetchJson<AdminBillboardListingSummary[]>(
    `/admin/users/${ownerUserId}/billboard-listings`,
  );
}

export type AdminToggleBlockPayload = {
  blocked: boolean;
  reason?: string;
};

export async function patchAdminAccountBlock(
  userId: number,
  body: AdminToggleBlockPayload,
): Promise<{ message: string; userId: number }> {
  return baseFetchJson(`/admin/users/${userId}/account-block`, {
    method: "PATCH",
    body,
  });
}

export async function patchAdminWalletBlock(
  userId: number,
  body: AdminToggleBlockPayload,
): Promise<{ message: string; userId: number }> {
  return baseFetchJson(`/admin/users/${userId}/wallet-block`, {
    method: "PATCH",
    body,
  });
}

/** Matches backend assignable roles (super_admin excluded). */
export type AdminPatchableRole = "admin" | "moderator" | "finance";

export type PatchAdminUserRolesPayload = {
  roles: AdminPatchableRole[];
};

export async function patchAdminUserRoles(
  userId: number,
  body: PatchAdminUserRolesPayload,
): Promise<{ message: string; roles: AdminPatchableRole[] }> {
  return baseFetchJson(`/admin/users/${userId}/admin-roles`, {
    method: "PATCH",
    body,
  });
}

export type AdminVerifyVendorPayload = {
  decision: "approve" | "reject";
  reason?: string;
};

export async function patchAdminVendorVerification(
  userId: number,
  body: AdminVerifyVendorPayload,
): Promise<Record<string, unknown>> {
  return baseFetchJson(`/admin/vendors/${userId}/verification`, {
    method: "PATCH",
    body,
  });
}

export type AdminDashboardCounts = {
  disputesOpen: number;
  arconApplicationsPending: number;
  payoutsPending: number;
  billboard: {
    total: number;
    dispute: number;
    pending: number;
    active: number;
    completed: number;
    rejected: number;
  };
  influencer: {
    total: number;
    dispute: number;
    pending: number;
    active: number;
    completed: number;
    rejected: number;
  };
};

/** Minimal user shape returned by admin dashboards/queues. */
export type AdminDashboardBriefUser = {
  id: number;
  email: string;
  phone: string;
  accountType: AdminAccountType;
};

export type AdminDashboardDisputeQueueItem = {
  kind: "billboard" | "influencer";
  id: number;
  listingName: string | null;
  booker?: AdminDashboardBriefUser | null;
  vendor?: AdminDashboardBriefUser | null;
  status: string;
  paymentStatus: string;
  disputedAt: string | null;
  disputeReason: string | null;
  disputeChatHasThread: boolean;
  createdAt: string;
};

export type AdminDashboardArconQueueItem = {
  kind: "billboard";
  id: number;
  listingName: string | null;
  booker?: AdminDashboardBriefUser | null;
  turnaround: string | null;
  paymentStatus: string;
  createdAt: string;
};

export type AdminDashboardPayoutQueueItem = {
  id: number;
  amount: number;
  status: string;
  user?: AdminDashboardBriefUser | null;
  bankName: string;
  accountNumber: string;
  createdAt: string;
};

export type AdminDashboardRecentBookingRow = {
  id: number;
  listingName: string | null;
  amount: number;
  currency: string;
  status: string;
  paymentStatus: string;
  disputedAt: string | null;
  disputeReason: string | null;
  disputeChatHasThread: boolean;
  createdAt: string;
};

export type AdminDashboardActivityRow = {
  id: number;
  action: string;
  metadata: Record<string, unknown> | null;
  adminUserId: number;
  createdAt: string;
};

export type AdminDashboardResponse = {
  counts: AdminDashboardCounts;
  queues: {
    disputes: AdminDashboardDisputeQueueItem[];
    arconApplications: AdminDashboardArconQueueItem[];
    payouts: AdminDashboardPayoutQueueItem[];
  };
  recent: {
    billboardBookings: AdminDashboardRecentBookingRow[];
    influencerBookings: AdminDashboardRecentBookingRow[];
    adminActivity: AdminDashboardActivityRow[];
  };
};

export function getAdminDashboard(): Promise<AdminDashboardResponse> {
  return baseFetchJson<AdminDashboardResponse>("/admin/dashboard", {
    method: "GET",
  });
}

export type PatchAdminVendorCommissionPayload = {
  commission: number;
};

export async function patchAdminVendorCommission(
  userId: number,
  body: PatchAdminVendorCommissionPayload,
): Promise<{
  message: string;
  vendorId: number;
  accountType: AdminAccountType;
  commissionPercent: number;
}> {
  return baseFetchJson(`/admin/vendors/${userId}/commission`, {
    method: "PATCH",
    body,
  });
}

export type AdminPayoutStatus = "pending" | "accepted" | "rejected";

export type AdminPayoutRow = {
  id: number;
  amount: number | string;
  status: AdminPayoutStatus;
  transactionId: string | null;
  transactionRef: string | null;
  userId: number;
  rejectionReason: string | null;
  transactionDate: string | null;
  acceptedBy: number | null;
  rejectedBy: number | null;
  bankCode: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminPayoutDetail = AdminPayoutRow & {
  userEmail: string | null;
};

export type AdminPayoutsListQuery = {
  page?: number;
  limit?: number;
  status?: AdminPayoutStatus;
  userId?: number;
  search?: string;
};

export type AdminPayoutsListResponse = {
  data: AdminPayoutRow[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export function buildAdminPayoutsQueryString(q: AdminPayoutsListQuery): string {
  const p = new URLSearchParams();
  if (q.page != null) p.set("page", String(q.page));
  if (q.limit != null) p.set("limit", String(q.limit));
  if (q.status) p.set("status", q.status);
  if (q.userId != null) p.set("userId", String(q.userId));
  if (q.search?.trim()) p.set("search", q.search.trim());
  const s = p.toString();
  return s ? `?${s}` : "";
}

export async function getAdminPayoutsList(
  query: AdminPayoutsListQuery = {},
): Promise<AdminPayoutsListResponse> {
  const qs = buildAdminPayoutsQueryString(query);
  return baseFetchJson<AdminPayoutsListResponse>(`/admin/payouts${qs}`);
}

export async function getAdminPayoutById(
  id: number,
): Promise<AdminPayoutDetail> {
  return baseFetchJson<AdminPayoutDetail>(`/admin/payouts/${id}`);
}

export async function patchAdminPayoutAccept(
  id: number,
): Promise<{ message: string; payout: AdminPayoutRow }> {
  return baseFetchJson(`/admin/payouts/${id}/accept`, {
    method: "PATCH",
  });
}

export async function patchAdminPayoutReject(
  id: number,
  body: { reason: string },
): Promise<{ message: string; payout: AdminPayoutRow }> {
  return baseFetchJson(`/admin/payouts/${id}/reject`, {
    method: "PATCH",
    body,
  });
}

/** Platform treasury row(s): booking commissions credited here. */
export type AdminAppWalletRow = {
  id: number;
  balance: number;
  currency: string;
  updatedAt: string;
};

export type AdminAppWalletTransactionsListQuery = {
  page?: number;
  limit?: number;
  status?: TransactionStatus;
  referenceType?: string;
  vendorUserId?: number;
};

export type AdminAppWalletTransactionsListResponse = {
  data: TransactionDto[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export function buildAdminAppWalletTransactionsQueryString(
  q: AdminAppWalletTransactionsListQuery,
): string {
  const p = new URLSearchParams();
  if (q.page != null) p.set("page", String(q.page));
  if (q.limit != null) p.set("limit", String(q.limit));
  if (q.status) p.set("status", q.status);
  if (q.referenceType?.trim()) p.set("referenceType", q.referenceType.trim());
  if (q.vendorUserId != null && q.vendorUserId > 0) {
    p.set("vendorUserId", String(q.vendorUserId));
  }
  const s = p.toString();
  return s ? `?${s}` : "";
}

export async function getAdminAppWallets(): Promise<AdminAppWalletRow[]> {
  return baseFetchJson<AdminAppWalletRow[]>("/admin/app-wallet");
}

export async function getAdminAppWalletTransactions(
  query: AdminAppWalletTransactionsListQuery = {},
): Promise<AdminAppWalletTransactionsListResponse> {
  const qs = buildAdminAppWalletTransactionsQueryString(query);
  return baseFetchJson<AdminAppWalletTransactionsListResponse>(
    `/admin/app-wallet/transactions${qs}`,
  );
}

export type AdminAllTransactionsListQuery = {
  page?: number;
  limit?: number;
  type?: TransactionType;
  status?: TransactionStatus;
  currency?: string;
  referenceType?: string;
  /** Matches row userId OR vendorId */
  userId?: number;
  search?: string;
};

export type AdminAllTransactionsListResponse = {
  data: TransactionDto[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export function buildAdminAllTransactionsQueryString(
  q: AdminAllTransactionsListQuery,
): string {
  const p = new URLSearchParams();
  if (q.page != null) p.set("page", String(q.page));
  if (q.limit != null) p.set("limit", String(q.limit));
  if (q.type) p.set("type", q.type);
  if (q.status) p.set("status", q.status);
  if (q.currency?.trim()) p.set("currency", q.currency.trim());
  if (q.referenceType?.trim()) p.set("referenceType", q.referenceType.trim());
  if (q.userId != null && q.userId > 0) p.set("userId", String(q.userId));
  if (q.search?.trim()) p.set("search", q.search.trim());
  const s = p.toString();
  return s ? `?${s}` : "";
}

export async function getAdminTransactions(
  query: AdminAllTransactionsListQuery = {},
): Promise<AdminAllTransactionsListResponse> {
  const qs = buildAdminAllTransactionsQueryString(query);
  return baseFetchJson<AdminAllTransactionsListResponse>(
    `/admin/transactions${qs}`,
  );
}

/** POST /admin/create-invite — vendor onboarding link */
export type AdminCreateInvitePayload = {
  accountType: "billboard_owner" | "influencer";
  email: string;
  duration: number;
};

export type AdminCreateInviteResponse = {
  message: string;
  url: string;
};

export function postAdminCreateInvite(
  body: AdminCreateInvitePayload,
): Promise<AdminCreateInviteResponse> {
  return baseFetchJson<AdminCreateInviteResponse>("/admin/create-invite", {
    method: "POST",
    body,
  } as unknown as RequestInit);
}

export type AdminInviteLinkVendorAccountType = "billboard_owner" | "influencer";

export type AdminInviteLinkItem = {
  id: number;
  token: string;
  email: string;
  accountType: AdminInviteLinkVendorAccountType;
  expiresAt: string;
  isUsed: boolean;
  onboardingProgress: number;
  createdAt: string;
  updatedAt: string;
  invitedBy: { id: number; email: string } | null;
  onboardingUrl: string;
};

export type AdminInviteLinksListResponse = {
  data: AdminInviteLinkItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type AdminInviteLinksListQuery = {
  page?: number;
  limit?: number;
  search?: string;
  accountType?: AdminInviteLinkVendorAccountType;
  used?: boolean;
  expired?: boolean;
};

export function buildAdminInviteLinksQueryString(
  q: AdminInviteLinksListQuery,
): string {
  const p = new URLSearchParams();
  if (q.page != null) p.set("page", String(q.page));
  if (q.limit != null) p.set("limit", String(q.limit));
  if (q.search?.trim()) p.set("search", q.search.trim());
  if (q.accountType) p.set("accountType", q.accountType);
  if (q.used === true) p.set("used", "true");
  if (q.used === false) p.set("used", "false");
  if (q.expired === true) p.set("expired", "true");
  if (q.expired === false) p.set("expired", "false");
  const s = p.toString();
  return s ? `?${s}` : "";
}

export async function getAdminInviteLinks(
  query: AdminInviteLinksListQuery = {},
): Promise<AdminInviteLinksListResponse> {
  const qs = buildAdminInviteLinksQueryString(query);
  return baseFetchJson<AdminInviteLinksListResponse>(
    `/admin/invite-links${qs}`,
  );
}

export type AdminActivityLogAction =
  | "create_admin"
  | "create_invite"
  | "vendor_verify_approve"
  | "vendor_verify_reject"
  | "vendor_set_commission"
  | "payout_accept"
  | "payout_reject"
  | "account_block"
  | "wallet_block"
  | "admin_update_roles";

export type AdminActivityLogItem = {
  id: number;
  adminUserId: number;
  adminEmail: string | null;
  action: AdminActivityLogAction;
  metadata: Record<string, unknown> | null;
  createdAt: string;
};

export type AdminActivityLogsListResponse = {
  data: AdminActivityLogItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type AdminActivityLogsListQuery = {
  page?: number;
  limit?: number;
  /** Filter by acting admin email (substring, case-insensitive). */
  search?: string;
  action?: AdminActivityLogAction;
};

export function buildAdminActivityLogsQueryString(
  q: AdminActivityLogsListQuery,
): string {
  const p = new URLSearchParams();
  if (q.page != null) p.set("page", String(q.page));
  if (q.limit != null) p.set("limit", String(q.limit));
  if (q.search?.trim()) p.set("search", q.search.trim());
  if (q.action) p.set("action", q.action);
  const s = p.toString();
  return s ? `?${s}` : "";
}

export async function getAdminActivityLogs(
  query: AdminActivityLogsListQuery = {},
): Promise<AdminActivityLogsListResponse> {
  const qs = buildAdminActivityLogsQueryString(query);
  return baseFetchJson<AdminActivityLogsListResponse>(
    `/admin/activity-logs${qs}`,
  );
}

/** Roles allowed when creating an admin via `POST /admin/create-admin` (excludes `super_admin`). */
export type AdminCreatableRole = "admin" | "moderator" | "finance";

export type AdminCreateAdminPayload = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  roles: AdminCreatableRole[];
};

export type AdminCreateAdminResponse = {
  message: string;
  admin: {
    id: number;
    email: string;
    phone: string;
    accountType: string;
  };
};

export function postAdminCreateAdmin(
  body: AdminCreateAdminPayload,
): Promise<AdminCreateAdminResponse> {
  return baseFetchJson<AdminCreateAdminResponse>("/admin/create-admin", {
    method: "POST",
    body,
  } as unknown as RequestInit);
}
