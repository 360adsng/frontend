import { baseFetchJson } from "../baseFetch";
import { uploadFileToR2 } from "../storage/r2";

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
  let attachmentUrl: string | undefined;
  if (payload.imageFile) {
    const { publicUrl } = await uploadFileToR2(payload.imageFile, "support");
    attachmentUrl = publicUrl;
  }
  return baseFetchJson<SupportTicketDetail>("/support/tickets", {
    method: "POST",
    body: {
      title: payload.title,
      message: payload.message,
      priority: payload.priority,
      ...(attachmentUrl ? { attachmentUrl } : {}),
    },
  } as unknown as RequestInit);
}

export async function addSupportMessage(
  ticketId: number,
  body: string,
  imageFile?: File | null,
): Promise<SupportTicketDetail> {
  let attachmentUrl: string | undefined;
  if (imageFile) {
    const { publicUrl } = await uploadFileToR2(imageFile, "support");
    attachmentUrl = publicUrl;
  }
  return baseFetchJson<SupportTicketDetail>(
    `/support/tickets/${ticketId}/messages`,
    {
      method: "POST",
      body: {
        body,
        ...(attachmentUrl ? { attachmentUrl } : {}),
      },
    } as unknown as RequestInit,
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
