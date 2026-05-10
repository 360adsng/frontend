export type TicketPriority = "high" | "medium" | "low";

export type TicketStatus = "open" | "pending" | "resolved" | "closed";

export type SupportMessage = {
  id: string;
  ticketId: string;
  author: "user" | "admin";
  authorLabel: string;
  body: string;
  createdAt: string;
  attachmentUrl?: string | null;
};

export type SupportTicket = {
  id: string;
  title: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  messages: SupportMessage[];
};
