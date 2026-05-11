"use client";

import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAdminSupportTicketsList } from "@endpoint/support/useAdminSupport";
import type {
  SupportTicketPriority,
  SupportTicketStatus,
} from "@endpoint/support/support";

function priorityBadge(p: SupportTicketPriority) {
  const map: Record<SupportTicketPriority, string> = {
    high: "bg-red-50 text-red-800 border-red-200",
    medium: "bg-amber-50 text-amber-900 border-amber-200",
    low: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };
  return map[p];
}

function statusBadge(s: SupportTicketStatus) {
  const map: Record<SupportTicketStatus, string> = {
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

type SupportListSearch = {
  page: number;
  limit: number;
  search: string;
  status: "" | SupportTicketStatus;
  priority: "" | SupportTicketPriority;
  userId: string;
};

function parseSupportListSearch(
  raw: Record<string, unknown>,
): SupportListSearch {
  const page = Math.max(1, Number(raw.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(raw.limit) || 20));
  const search = String(raw.search ?? "").trim();
  const st = String(raw.status ?? "").toLowerCase();
  const status: SupportListSearch["status"] =
    st === "open" || st === "pending" || st === "resolved" || st === "closed"
      ? st
      : "";
  const pr = String(raw.priority ?? "").toLowerCase();
  const priority: SupportListSearch["priority"] =
    pr === "high" || pr === "medium" || pr === "low" ? pr : "";
  const userId = String(raw.userId ?? "").trim();
  return { page, limit, search, status, priority, userId };
}

function AdminSupportPage() {
  const navigate = useNavigate();
  const s = Route.useSearch();
  const [draftSearch, setDraftSearch] = useState(s.search);

  useEffect(() => {
    setDraftSearch(s.search);
  }, [s.search]);

  const uidNum = Number.parseInt(s.userId, 10);
  const userIdFilter =
    s.userId.trim() !== "" && Number.isFinite(uidNum) && uidNum > 0
      ? uidNum
      : undefined;

  const list = useAdminSupportTicketsList({
    page: s.page,
    limit: s.limit,
    search: s.search || undefined,
    status: s.status || undefined,
    priority: s.priority || undefined,
    userId: userIdFilter,
  });

  const meta = list.data?.meta;
  const rows = list.data?.data ?? [];

  const setSearch = (next: Partial<SupportListSearch>) => {
    void navigate({
      to: "/admin/support",
      search: (prev) =>
        parseSupportListSearch({ ...(prev as Record<string, unknown>), ...next }),
      replace: true,
    });
  };

  const goPage = (p: number) => setSearch({ page: p });

  return (
    <section className="min-h-screen bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-2xl text-stone-900">Support tickets</h1>
        <p className="mt-1 text-sm text-stone-600">
          All customer support conversations. Open a ticket to reply or change
          status.
        </p>

        <div className="mt-6 flex flex-col gap-3 rounded-10 border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:flex-wrap md:items-end">
          <label className="flex min-w-[200px] flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Search</span>
            <input
              type="search"
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
              placeholder="Title or user email…"
              value={draftSearch}
              onChange={(e) => setDraftSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch({ search: draftSearch.trim(), page: 1 });
                }
              }}
            />
          </label>
          <label className="flex min-w-[140px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Status</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={s.status}
              onChange={(e) =>
                setSearch({
                  status: e.target.value as SupportListSearch["status"],
                  page: 1,
                })
              }
            >
              <option value="">All</option>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </label>
          <label className="flex min-w-[140px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Priority</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={s.priority}
              onChange={(e) =>
                setSearch({
                  priority: e.target.value as SupportListSearch["priority"],
                  page: 1,
                })
              }
            >
              <option value="">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label className="flex min-w-[120px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">User ID</span>
            <input
              type="text"
              inputMode="numeric"
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
              placeholder="Optional"
              value={s.userId}
              onChange={(e) =>
                setSearch({ userId: e.target.value.trim(), page: 1 })
              }
            />
          </label>
          <label className="flex w-full min-w-[100px] max-w-[120px] flex-col gap-1 text-sm md:w-auto">
            <span className="font-medium text-stone-700">Per page</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={String(s.limit)}
              onChange={(e) =>
                setSearch({ limit: Number(e.target.value), page: 1 })
              }
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="rounded-lg border-2 border-stone-900 bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 md:ml-auto"
            onClick={() => setSearch({ search: draftSearch.trim(), page: 1 })}
          >
            Apply
          </button>
        </div>

        <div className="mt-4 overflow-x-auto rounded-10 border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
            <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-600">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {list.isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-stone-500"
                  >
                    Loading…
                  </td>
                </tr>
              ) : null}
              {list.isError ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-red-700"
                  >
                    {list.error instanceof Error
                      ? list.error.message
                      : "Failed to load tickets."}
                  </td>
                </tr>
              ) : null}
              {!list.isLoading && !list.isError && rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-stone-500"
                  >
                    No tickets match your filters.
                  </td>
                </tr>
              ) : null}
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-stone-50/80">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-stone-800">
                    #{row.id}
                  </td>
                  <td className="max-w-[200px] px-4 py-3">
                    <span className="block font-mono text-xs text-stone-600">
                      #{row.userId}
                    </span>
                    <span className="block truncate text-stone-700">
                      {row.userEmail ?? "—"}
                    </span>
                  </td>
                  <td className="max-w-[240px] px-4 py-3 font-medium text-stone-900">
                    {row.title}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${priorityBadge(row.priority)}`}
                    >
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusBadge(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-stone-600">
                    {formatDt(row.updatedAt)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Link
                      to="/admin/support/$id"
                      params={{ id: String(row.id) }}
                      className="font-medium text-stone-900 underline-offset-2 hover:underline"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {meta && meta.totalPages > 0 ? (
          <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm text-stone-600 sm:flex-row">
            <p>
              Page {meta.page} of {meta.totalPages} ({meta.total} total)
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={meta.page <= 1}
                className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 font-medium text-stone-800 disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => goPage(meta.page - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                disabled={meta.page >= meta.totalPages}
                className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 font-medium text-stone-800 disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => goPage(meta.page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_admin/admin/support/")({
  validateSearch: (raw: Record<string, unknown>) =>
    parseSupportListSearch(raw),
  component: AdminSupportPage,
});

