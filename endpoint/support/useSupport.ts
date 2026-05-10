import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../baseFetch";
import {
  addSupportMessage,
  createSupportTicket,
  getMySupportTickets,
  getSupportTicket,
  type SupportTicketDetail,
} from "./support";
import type { SupportTicketPriority } from "./support";

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

export const supportQueryKeys = {
  all: ["support"] as const,
  tickets: () => [...supportQueryKeys.all, "tickets"] as const,
  ticket: (id: number) => [...supportQueryKeys.all, "ticket", id] as const,
};

export function useMySupportTickets() {
  return useQuery({
    queryKey: supportQueryKeys.tickets(),
    queryFn: getMySupportTickets,
  });
}

export function useSupportTicket(id: number | null) {
  return useQuery({
    queryKey: supportQueryKeys.ticket(id ?? 0),
    queryFn: () => getSupportTicket(id!),
    enabled: typeof id === "number" && id > 0,
  });
}

export function useCreateSupportTicket() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      title: string;
      message: string;
      priority: SupportTicketPriority;
      imageFile?: File | null;
    }) => createSupportTicket(payload),
    onSuccess: async (data: SupportTicketDetail) => {
      toast.success("Ticket created");
      await qc.invalidateQueries({ queryKey: supportQueryKeys.tickets() });
      const numId = Number(data.id);
      if (Number.isFinite(numId)) {
        await qc.invalidateQueries({
          queryKey: supportQueryKeys.ticket(numId),
        });
      }
    },
    onError: (error: unknown) => {
      toast.error(errorMessage(error));
    },
  });
}

export function useAddSupportMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      ticketId: number;
      body: string;
      imageFile?: File | null;
    }) => addSupportMessage(vars.ticketId, vars.body, vars.imageFile),
    onSuccess: async (_data, vars) => {
      toast.success("Message sent");
      await qc.invalidateQueries({
        queryKey: supportQueryKeys.ticket(vars.ticketId),
      });
      await qc.invalidateQueries({ queryKey: supportQueryKeys.tickets() });
    },
    onError: (error: unknown) => {
      toast.error(errorMessage(error));
    },
  });
}
