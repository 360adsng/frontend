"use client";

import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type {
  AdminActivityLogAction,
  AdminActivityLogItem,
} from "@endpoint/admin/admin";
import { useAdminActivityLogsList } from "@endpoint/admin/useAdminUsers";
import { AdminActivityDetailDrawer } from "@components/admin/AdminActivityDetailDrawer";

type LogsSearch = {
  page: number;
  limit: number;
  search: string;
  action: "" | AdminActivityLogAction;
};

const ACTION_OPTIONS: { value: AdminActivityLogAction; label: string }[] = [
  { value: "create_admin", label: "Create admin" },
  { value: "create_invite", label: "Create invite" },
  { value: "vendor_verify_approve", label: "Vendor approve" },
  { value: "vendor_verify_reject", label: "Vendor reject" },
  { value: "vendor_set_commission", label: "Set commission" },
  { value: "payout_accept", label: "Payout accept" },
  { value: "payout_reject", label: "Payout reject" },
  { value: "account_block", label: "Account block" },
  { value: "wallet_block", label: "Wallet block" },
  { value: "admin_update_roles", label: "Admin roles updated" },
];

function parseLogsSearch(raw: Record<string, unknown>): LogsSearch {
  const page = Math.max(1, Number(raw.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(raw.limit) || 20));
  const search = String(raw.search ?? "").trim();
  const a = String(raw.action ?? "").trim();
  const allowed = new Set(ACTION_OPTIONS.map((o) => o.value));
  const action = allowed.has(a as AdminActivityLogAction)
    ? (a as AdminActivityLogAction)
    : "";
  return { page, limit, search, action };
}

function formatActionLabel(action: string): string {
  const row = ACTION_OPTIONS.find((o) => o.value === action);
  return row?.label ?? action.replace(/_/g, " ");
}

function summarySnippet(meta: Record<string, unknown> | null): string {
  if (meta == null || Object.keys(meta).length === 0) {
    return "No metadata";
  }
  const keys = Object.keys(meta);
  const [k] = keys;
  const v = meta[k];
  if (v === null || v === undefined) {
    return `${keys.length} field(s)`;
  }
  if (typeof v === "object") {
    return `${keys.length} field(s) · ${k}: …`;
  }
  const text = String(v).trim();
  const cut = text.length > 56 ? `${text.slice(0, 56)}…` : text;
  return `${k}: ${cut}`;
}

function AdminActivityLogsPage() {
  const navigate = useNavigate();
  const s = Route.useSearch();
  const [draftSearch, setDraftSearch] = useState(s.search);
  const [detailRow, setDetailRow] = useState<AdminActivityLogItem | null>(
    null,
  );

  useEffect(() => {
    setDraftSearch(s.search);
  }, [s.search]);

  const list = useAdminActivityLogsList({
    page: s.page,
    limit: s.limit,
    search: s.search || undefined,
    action: s.action || undefined,
  });

  const meta = list.data?.meta;
  const rows = list.data?.data ?? [];

  const setSearch = (next: Partial<LogsSearch>) => {
    void navigate({
      to: "/admin/activity-logs",
      search: (prev) =>
        parseLogsSearch({ ...(prev as Record<string, unknown>), ...next }),
      replace: true,
    });
  };

  const goPage = (p: number) => setSearch({ page: p });

  return (
    <section className="min-h-[70vh] bg-ads360-hash px-4 py-10 md:px-10">
      <AdminActivityDetailDrawer
        open={detailRow !== null}
        onClose={() => setDetailRow(null)}
        row={detailRow}
        actionLabel={
          detailRow ? formatActionLabel(detailRow.action) : ""
        }
      />
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-2xl text-stone-900">Admin activity</h1>
        <p className="mt-1 text-sm text-stone-600">
          Audit log of actions performed by admins (most recent first).
        </p>

        <div className="mt-6 flex flex-col gap-3 rounded-10 border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:flex-wrap md:items-end">
          <label className="flex min-w-[200px] flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">
              Acting admin email
            </span>
            <input
              type="search"
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
              placeholder="Substring match…"
              value={draftSearch}
              onChange={(e) => setDraftSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch({ search: draftSearch.trim(), page: 1 });
                }
              }}
            />
          </label>
          <label className="flex min-w-[200px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Action</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={s.action}
              onChange={(e) =>
                setSearch({
                  action: e.target.value as LogsSearch["action"],
                  page: 1,
                })
              }
            >
              <option value="">All actions</option>
              {ACTION_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
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
            Apply filters
          </button>
        </div>

        <div className="mt-4 overflow-x-auto rounded-10 border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
            <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-600">
              <tr>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Admin</th>
                <th className="px-4 py-3 font-medium">Action</th>
                <th className="px-4 py-3 font-medium">Summary</th>
                <th className="w-[100px] px-4 py-3 font-medium text-right">
                  {""}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {list.isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-stone-500">
                    Loading…
                  </td>
                </tr>
              ) : null}
              {list.isError ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-red-700">
                    {list.error instanceof Error
                      ? list.error.message
                      : "Failed to load activity."}
                  </td>
                </tr>
              ) : null}
              {!list.isLoading && !list.isError && rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-stone-500">
                    No activity matches your filters.
                  </td>
                </tr>
              ) : null}
              {rows.map((row: AdminActivityLogItem) => (
                <tr key={row.id} className="align-middle hover:bg-stone-50/80">
                  <td className="whitespace-nowrap px-4 py-3 text-stone-600">
                    {new Date(row.createdAt).toLocaleString()}
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3">
                    <span className="font-medium text-stone-900">
                      {row.adminEmail ?? `User #${row.adminUserId}`}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-stone-800">
                    {formatActionLabel(row.action)}
                  </td>
                  <td className="max-w-md px-4 py-3 text-xs text-stone-600">
                    <span className="line-clamp-2">{summarySnippet(row.metadata)}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setDetailRow(row)}
                      className="font-medium text-stone-900 underline-offset-2 hover:underline"
                    >
                      View
                    </button>
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

export const Route = createFileRoute("/_admin/admin/activity-logs/")({
  validateSearch: (raw: Record<string, unknown>) => parseLogsSearch(raw),
  component: AdminActivityLogsPage,
});

