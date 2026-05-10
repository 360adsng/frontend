import { baseFetchJson } from "../baseFetch";

/** Matches backend `SupportTicketPriority` / UI types. */
export type SupportTicketPriority = "high" | "medium" | "low";
export type SupportTicketStatus =
  | "open"
  | "pending"
  | "resolved"
  | "closed";

export type SupportMessageDto = {
  id: string;
  ticketId: string;
  author: "user" | "admin";
  authorLabel: string;
  body: string;
  createdAt: string;
  attachmentUrl?: string | null;
};

export type SupportTicketSummary = {
  id: string;
  title: string;
  priority: SupportTicketPriority;
  status: SupportTicketStatus;
  createdAt: string;
  updatedAt: string;
};

export type SupportTicketDetail = SupportTicketSummary & {
  messages: SupportMessageDto[];
};

export function getMySupportTickets(): Promise<SupportTicketSummary[]> {
  return baseFetchJson<SupportTicketSummary[]>("/support/tickets", {
    method: "GET",
  });
}

export function getSupportTicket(id: number): Promise<SupportTicketDetail> {
  return baseFetchJson<SupportTicketDetail>(`/support/tickets/${id}`, {
    method: "GET",
  });
}

export async function createSupportTicket(payload: {
  title: string;
  message: string;
  priority: SupportTicketPriority;
  imageFile?: File | null;
}): Promise<SupportTicketDetail> {
  const form = new FormData();
  form.append("title", payload.title);
  form.append("message", payload.message);
  form.append("priority", payload.priority);
  if (payload.imageFile) {
    form.append("file", payload.imageFile);
  }
  return baseFetchJson<SupportTicketDetail>("/support/tickets", {
    method: "POST",
    body: form,
  });
}

export function addSupportMessage(
  ticketId: number,
  body: string,
  imageFile?: File | null,
): Promise<SupportTicketDetail> {
  if (imageFile) {
    const form = new FormData();
    form.append("body", body);
    form.append("file", imageFile);
    return baseFetchJson<SupportTicketDetail>(
      `/support/tickets/${ticketId}/messages`,
      {
        method: "POST",
        body: form,
      },
    );
  }
  return baseFetchJson<SupportTicketDetail>(
    `/support/tickets/${ticketId}/messages`,
    {
      method: "POST",
      body: { body },
    },
  );
}

/** Route param is a numeric string from the API; returns null if invalid. */
export function parseSupportTicketId(param: string): number | null {
  const trimmed = param.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const n = Number(trimmed);
  if (!Number.isSafeInteger(n) || n < 1) return null;
  return n;
}
