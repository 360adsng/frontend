"use client";

import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export type BookingTableRow = {
  id: number | string;
  listing?: string | null;
  createdAt?: string | Date | null;
  amount?: number | string | null;
  status?: string | null;
  /** Booking payment lifecycle (omit on negotiation-only views). */
  paymentStatus?: string | null;
  actionHref: string;
  actionLabel?: string;
};

function formatDate(v: string | Date | null | undefined): string {
  if (!v) return "-";
  const d = typeof v === "string" ? new Date(v) : v;
  if (!Number.isFinite(d.getTime())) return String(v).slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function formatNaira(v: number | string | null | undefined): string {
  if (v == null) return "-";
  const n = typeof v === "string" ? Number(v) : v;
  if (!Number.isFinite(n)) return String(v);
  return `₦${n.toLocaleString()}`;
}

function StatusPill({ status }: { status: string }) {
  const s = status.trim().toLowerCase();
  const styles =
    s === "completed"
      ? "bg-green-100 text-green-700 border-green-200"
      : s === "active"
        ? "bg-blue-100 text-blue-700 border-blue-200"
        : s === "rejected"
          ? "bg-red-100 text-red-700 border-red-200"
          : s === "pending"
            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
            : s === "negotiating"
              ? "bg-amber-100 text-amber-800 border-amber-200"
              : "bg-stone-100 text-stone-700 border-stone-200";

  const label =
    s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : "Unknown";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles}`}
    >
      {label}
    </span>
  );
}

function PaymentPill({ paymentStatus }: { paymentStatus: string }) {
  const s = paymentStatus.trim().toLowerCase();
  const styles =
    s === "paid"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : s === "refunded"
        ? "bg-violet-100 text-violet-800 border-violet-200"
        : s === "unpaid"
          ? "bg-amber-100 text-amber-900 border-amber-200"
          : "bg-stone-100 text-stone-700 border-stone-200";

  const label =
    s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : "Unknown";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles}`}
    >
      {label}
    </span>
  );
}

function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (next: number) => void;
}) {
  if (pageCount <= 1) return null;
  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <button
        type="button"
        disabled={!canPrev}
        onClick={() => onChange(page - 1)}
        className="rounded-10 border border-stone-200 bg-white px-3 py-2 text-sm disabled:opacity-50"
      >
        Previous
      </button>
      <div className="text-sm text-stone-600">
        Page {page} of {pageCount}
      </div>
      <button
        type="button"
        disabled={!canNext}
        onClick={() => onChange(page + 1)}
        className="rounded-10 border border-stone-200 bg-white px-3 py-2 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export function BookingsTable({
  rows,
  isLoading,
  isError,
  emptyText = "No records found",
  statusOptions,
  statusFilterLabel = "Filter by status",
  defaultStatus = "all",
  pageSize = 10,
  /** Set false on negotiation list pages only. */
  showPaymentStatus = true,
}: {
  rows: BookingTableRow[] | undefined;
  isLoading?: boolean;
  isError?: boolean;
  emptyText?: string;
  statusOptions?: Array<{ value: string; label: string }>;
  statusFilterLabel?: string;
  defaultStatus?: string;
  pageSize?: number;
  showPaymentStatus?: boolean;
}) {
  const [status, setStatus] = useState<string>(defaultStatus);
  const [page, setPage] = useState<number>(1);
  const colSpan = showPaymentStatus ? 7 : 6;

  const filtered = useMemo(() => {
    const raw = rows ?? [];
    const st = status.trim();
    if (st === "abandoned") {
      const fourDaysMs = 4 * 24 * 60 * 60 * 1000;
      return raw.filter((r) => {
        const s = String(r.status ?? "").toLowerCase();
        if (s !== "pending") return false;
        const t = new Date(String(r.createdAt ?? "")).getTime();
        if (!Number.isFinite(t)) return false;
        return Date.now() - t >= fourDaysMs;
      });
    }
    if (!st || st === "all") return raw;
    return raw.filter((r) => String(r.status ?? "").toLowerCase() === st);
  }, [rows, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  const options =
    statusOptions ??
    [
      { value: "all", label: "All" },
      { value: "pending", label: "Pending" },
      { value: "active", label: "Active" },
      { value: "rejected", label: "Rejected" },
      { value: "completed", label: "Completed" },
    ];

  return (
    <div>
      <div className="flex items-center justify-end gap-2">
        <div className="text-sm text-stone-600">{statusFilterLabel}</div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="rounded-10 border border-ads360yellow-100 bg-white px-3 py-2 text-sm"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full overflow-x-auto mt-4 rounded-10 border border-[#D0B301]/30 bg-white">
        <table className="min-w-full">
          <thead className="bg-[#D0B301]/15">
            <tr className="text-left text-xs font-semibold text-stone-700">
              <th className="py-4 px-4 border-b border-[#D0B301]/25">ID</th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">LISTING</th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">
                DATE CREATED
              </th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">AMOUNT</th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">STATUS</th>
              {showPaymentStatus ? (
                <th className="py-4 px-4 border-b border-[#D0B301]/25">
                  PAYMENT
                </th>
              ) : null}
              <th className="py-4 px-4 border-b border-[#D0B301]/25">ACTION</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {isLoading ? (
              <tr>
                <td colSpan={colSpan} className="py-10 px-4 text-center text-stone-500">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={colSpan} className="py-10 px-4 text-center text-stone-500">
                  Unable to load records
                </td>
              </tr>
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="py-10 px-4 text-center text-stone-500">
                  {emptyText}
                </td>
              </tr>
            ) : (
              paged.map((r) => (
                <tr key={String(r.id)} className="border-b last:border-b-0">
                  <td className="py-5 px-4 text-stone-800">NG#{r.id}</td>
                  <td className="py-5 px-4 text-stone-800">
                    {r.listing ?? "-"}
                  </td>
                  <td className="py-5 px-4 text-stone-700">
                    {formatDate(r.createdAt)}
                  </td>
                  <td className="py-5 px-4 text-stone-800">
                    {formatNaira(r.amount)}
                  </td>
                  <td className="py-5 px-4">
                    <StatusPill status={String(r.status ?? "unknown")} />
                  </td>
                  {showPaymentStatus ? (
                    <td className="py-5 px-4">
                      <PaymentPill
                        paymentStatus={String(
                          r.paymentStatus ?? "unpaid",
                        )}
                      />
                    </td>
                  ) : null}
                  <td className="py-5 px-4">
                    <Link
                      to={r.actionHref}
                      className="inline-flex items-center rounded-10 border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                    >
                      {r.actionLabel ?? "View"}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={safePage}
        pageCount={pageCount}
        onChange={(n) => setPage(n)}
      />
    </div>
  );
}

