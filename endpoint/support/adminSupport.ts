import { baseFetchJson } from "../baseFetch";
import type {
  SupportTicketDetail,
  SupportTicketPriority,
  SupportTicketStatus,
  SupportTicketSummary,
} from "./support";

export type AdminSupportTicketRow = SupportTicketSummary & {
  userId: number;
  userEmail: string | null;
};

export type AdminSupportTicketsListResponse = {
  data: AdminSupportTicketRow[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type AdminSupportTicketDetail = SupportTicketDetail & {
  userId?: number;
  userEmail?: string | null;
};

export type AdminSupportTicketsListQuery = {
  page?: number;
  limit?: number;
  status?: SupportTicketStatus;
  priority?: SupportTicketPriority;
  userId?: number;
  search?: string;
};

export function buildAdminSupportTicketsQueryString(
  q: AdminSupportTicketsListQuery,
): string {
  const p = new URLSearchParams();
  if (q.page != null) p.set("page", String(q.page));
  if (q.limit != null) p.set("limit", String(q.limit));
  if (q.status) p.set("status", q.status);
  if (q.priority) p.set("priority", q.priority);
  if (q.userId != null) p.set("userId", String(q.userId));
  if (q.search?.trim()) p.set("search", q.search.trim());
  const s = p.toString();
  return s ? `?${s}` : "";
}

export async function getAdminSupportTickets(
  query: AdminSupportTicketsListQuery = {},
): Promise<AdminSupportTicketsListResponse> {
  const qs = buildAdminSupportTicketsQueryString(query);
  return baseFetchJson<AdminSupportTicketsListResponse>(
    `/admin/support/tickets${qs}`,
  );
}

export async function getAdminSupportTicket(
  id: number,
): Promise<AdminSupportTicketDetail> {
  return baseFetchJson<AdminSupportTicketDetail>(
    `/admin/support/tickets/${id}`,
  );
}

export async function addAdminSupportMessage(
  ticketId: number,
  body: string,
  imageFile?: File | null,
): Promise<AdminSupportTicketDetail> {
  if (imageFile) {
    const form = new FormData();
    form.append("body", body);
    form.append("file", imageFile);
    return baseFetchJson<AdminSupportTicketDetail>(
      `/admin/support/tickets/${ticketId}/messages`,
      { method: "POST", body: form },
    );
  }
  return baseFetchJson<AdminSupportTicketDetail>(
    `/admin/support/tickets/${ticketId}/messages`,
    {
      method: "POST",
      body: { body },
    },
  );
}

export async function patchAdminSupportTicketStatus(
  ticketId: number,
  status: SupportTicketStatus,
): Promise<SupportTicketSummary> {
  return baseFetchJson<SupportTicketSummary>(
    `/admin/support/tickets/${ticketId}`,
    {
      method: "PATCH",
      body: { status },
    },
  );
}
