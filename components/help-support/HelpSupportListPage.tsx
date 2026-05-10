"use client";

import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  useCreateSupportTicket,
  useMySupportTickets,
} from "@endpoint/support/useSupport";
import { CreateTicketModal } from "./CreateTicketModal";
import { ContactAndInfoTab } from "./ContactAndInfoTab";
import type { TicketPriority, TicketStatus } from "./types";

type TabKey = "tickets" | "contact";

function priorityBadge(p: TicketPriority) {
  const map: Record<TicketPriority, string> = {
    high: "bg-red-50 text-red-800 border-red-200",
    medium: "bg-amber-50 text-amber-900 border-amber-200",
    low: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };
  return map[p];
}

function statusBadge(s: TicketStatus) {
  const map: Record<TicketStatus, string> = {
    open: "bg-sky-50 text-sky-900 border-sky-200",
    pending: "bg-violet-50 text-violet-900 border-violet-200",
    resolved: "bg-stone-100 text-stone-800 border-stone-200",
    closed: "bg-stone-200 text-stone-700 border-stone-300",
  };
  return map[s];
}

function formatDt(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

type Props = {
  /** e.g. `/users/help-support` or `/vendors/billboards/help-support` */
  basePath: string;
};

export function HelpSupportListPage({ basePath }: Props) {
  const { data, isLoading, isError, refetch } = useMySupportTickets();
  const createTicket = useCreateSupportTicket();
  const [tab, setTab] = useState<TabKey>("tickets");
  const [modalOpen, setModalOpen] = useState(false);

  const rows = useMemo(() => {
    const list = data ?? [];
    return [...list].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }, [data]);

  return (
    <section className="min-h-screen bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-serif text-2xl text-stone-900 md:text-3xl">
              Help &amp; support
            </h1>
            <p className="mt-1 text-sm text-stone-600">
              Create a ticket or review your conversations with our team.
            </p>
          </div>
          {tab === "tickets" ? (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="rounded-10 border-2 border-ads360yellow-100 bg-ads360yellow-100 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
            >
              Create ticket
            </button>
          ) : null}
        </div>

        <div className="mb-6 flex flex-wrap gap-2 border-b border-stone-200 pb-2">
          <button
            type="button"
            onClick={() => setTab("tickets")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === "tickets"
                ? "bg-stone-900 text-white"
                : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
            }`}
          >
            My tickets
          </button>
          <button
            type="button"
            onClick={() => setTab("contact")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === "contact"
                ? "bg-stone-900 text-white"
                : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
            }`}
          >
            Contact &amp; info
          </button>
        </div>

        {tab === "contact" ? (
          <ContactAndInfoTab />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              {isLoading ? (
                <p className="px-4 py-10 text-center text-sm text-stone-500">
                  Loading tickets…
                </p>
              ) : isError ? (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm text-stone-600">
                    Could not load tickets.
                  </p>
                  <button
                    type="button"
                    onClick={() => void refetch()}
                    className="mt-3 text-sm font-medium text-ads360yellow-100 hover:underline"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Ticket</th>
                      <th className="px-4 py-3 font-semibold">Title</th>
                      <th className="px-4 py-3 font-semibold">Priority</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Updated</th>
                      <th className="px-4 py-3 font-semibold text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-10 text-center text-stone-500"
                        >
                          No tickets yet. Create one to get started.
                        </td>
                      </tr>
                    ) : (
                      rows.map((t) => (
                        <tr
                          key={t.id}
                          className="border-b border-stone-100 last:border-0 hover:bg-stone-50/80"
                        >
                          <td className="px-4 py-3 font-mono text-xs text-stone-600">
                            #{t.id}
                          </td>
                          <td className="px-4 py-3 font-medium text-stone-900">
                            {t.title}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${priorityBadge(t.priority)}`}
                            >
                              {t.priority}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusBadge(t.status)}`}
                            >
                              {t.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-stone-600">
                            {formatDt(t.updatedAt)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Link
                              to={`${basePath}/${t.id}`}
                              className="inline-flex rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800 hover:bg-stone-50"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>

      <CreateTicketModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isSubmitting={createTicket.isPending}
        onSubmit={async (input) => {
          await createTicket.mutateAsync({
            title: input.title,
            message: input.message,
            priority: input.priority,
            imageFile: input.imageFile,
          });
        }}
      />
    </section>
  );
}
