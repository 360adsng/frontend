import { baseFetchJson } from "../baseFetch";

export type NotificationReferenceType =
  | "billboard_booking"
  | "influencer_booking"
  | "support_ticket"
  | "payout";

export type NotificationDto = {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  requestId: number | null;
  referenceType: NotificationReferenceType | null;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type NotificationsListResponse = {
  data: NotificationDto[];
  meta: PaginatedMeta;
};

export function getUnreadNotificationCount(): Promise<{ count: number }> {
  return baseFetchJson<{ count: number }>("/notifications/unread/count", {
    method: "GET",
  });
}

export function listNotifications(params: {
  page?: number;
  limit?: number;
}): Promise<NotificationsListResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;
  const qs = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  return baseFetchJson<NotificationsListResponse>(
    `/notifications?${qs.toString()}`,
    { method: "GET" },
  );
}

export function markAllNotificationsRead(): Promise<{ updatedCount: number }> {
  return baseFetchJson<{ updatedCount: number }>("/notifications/read-all", {
    method: "PATCH",
  });
}
