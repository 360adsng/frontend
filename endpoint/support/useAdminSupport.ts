import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../baseFetch";
import type { SupportTicketStatus } from "./support";
import {
  addAdminSupportMessage,
  getAdminSupportTicket,
  getAdminSupportTickets,
  patchAdminSupportTicketStatus,
  type AdminSupportTicketsListQuery,
} from "./adminSupport";

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong.";
}

export const adminSupportQueryKeys = {
  all: ["admin", "support"] as const,
  list: (q: AdminSupportTicketsListQuery) =>
    [...adminSupportQueryKeys.all, "tickets", q] as const,
  ticket: (id: number) =>
    [...adminSupportQueryKeys.all, "ticket", id] as const,
};

export function useAdminSupportTicketsList(params: AdminSupportTicketsListQuery) {
  return useQuery({
    queryKey: adminSupportQueryKeys.list(params),
    queryFn: () => getAdminSupportTickets(params),
  });
}

export function useAdminSupportTicket(id: number | null) {
  return useQuery({
    queryKey: adminSupportQueryKeys.ticket(id ?? 0),
    queryFn: () => getAdminSupportTicket(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useAdminAddSupportMessage(ticketId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { body: string; imageFile?: File | null }) =>
      addAdminSupportMessage(ticketId, vars.body, vars.imageFile),
    onSuccess: async () => {
      toast.success("Reply sent");
      await qc.invalidateQueries({
        queryKey: adminSupportQueryKeys.ticket(ticketId),
      });
      await qc.invalidateQueries({ queryKey: adminSupportQueryKeys.all });
    },
    onError: (error: unknown) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useAdminPatchTicketStatus(ticketId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (status: SupportTicketStatus) =>
      patchAdminSupportTicketStatus(ticketId, status),
    onSuccess: async () => {
      toast.success("Ticket updated");
      await qc.invalidateQueries({
        queryKey: adminSupportQueryKeys.ticket(ticketId),
      });
      await qc.invalidateQueries({ queryKey: adminSupportQueryKeys.all });
    },
    onError: (error: unknown) => {
      toast.error(errorMessage(error));
    },
  });
}
