"use client";

import { useEffect, useState } from "react";
import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import {
  useAdminBillboardBookingRequests,
  useAdminInfluencerBookingRequests,
} from "@endpoint/admin/useAdminBookingRequests";

export type AdminRequestTab = "billboard" | "influencer";

type RequestListSearch = {
  tab: AdminRequestTab;
  page: number;
  limit: number;
  status: string;
  paymentStatus: string;
  negotiationPhase: string;
  bookerId: string;
  vendorId: string;
  search: string;
};

function parseAdminRequestSearch(raw: Record<string, unknown>): RequestListSearch {
  const t = String(raw.tab ?? "").toLowerCase();
  const tab: AdminRequestTab = t === "influencer" ? "influencer" : "billboard";
  const page = Math.max(1, Number(raw.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(raw.limit) || 20));
  return {
    tab,
    page,
    limit,
    status: String(raw.status ?? "").trim(),
    paymentStatus: String(raw.paymentStatus ?? "").trim(),
    negotiationPhase: String(raw.negotiationPhase ?? "").trim(),
    bookerId: String(raw.bookerId ?? "").trim(),
    vendorId: String(raw.vendorId ?? "").trim(),
    search: String(raw.search ?? "").trim(),
  };
}

function formatMoney(amount: number, currency: string): string {
  const ccy = currency === "NGN" ? "NGN" : currency;
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: ccy,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    const sym = currency === "NGN" ? "₦" : `${currency} `;
    return `${sym}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }
}

function formatDt(iso: string | null | undefined) {
  if (!iso) return "—";
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

const BB_STATUS_OPTS = ["", "pending", "active", "rejected", "completed", "dispute"];
const PAY_OPTS = ["", "unpaid", "paid", "refunded"];
const NEG_OPTS = ["", "none", "awaiting_vendor", "awaiting_booker", "agreed"];

function AdminRequestPage() {
  const navigate = useNavigate();
  const s = Route.useSearch();
  const [draftSearch, setDraftSearch] = useState(s.search);

  useEffect(() => {
    setDraftSearch(s.search);
  }, [s.search]);

  const uid = Number.parseInt(s.bookerId, 10);
  const vid = Number.parseInt(s.vendorId, 10);
  const bookerFilter =
    s.bookerId.trim() !== "" && Number.isFinite(uid) && uid > 0 ? uid : undefined;
  const vendorFilter =
    s.vendorId.trim() !== "" && Number.isFinite(vid) && vid > 0 ? vid : undefined;

  const listQueryBase = {
    page: s.page,
    limit: s.limit,
    status: s.status || undefined,
    paymentStatus: s.paymentStatus || undefined,
    negotiationPhase: s.negotiationPhase || undefined,
    bookerId: bookerFilter,
    vendorId: vendorFilter,
    search: s.search.trim() ? s.search.trim() : undefined,
  };

  const bbList = useAdminBillboardBookingRequests(
    s.tab === "billboard" ? listQueryBase : { page: 1, limit: 20 },
  );
  const infList = useAdminInfluencerBookingRequests(
    s.tab === "influencer" ? listQueryBase : { page: 1, limit: 20 },
  );

  const active = s.tab === "billboard" ? bbList : infList;
  const meta = active.data?.meta;
  const rowsBb = bbList.data?.data ?? [];
  const rowsInf = infList.data?.data ?? [];

  const setSearch = (next: Partial<RequestListSearch>) => {
    void navigate({
      to: "/admin/request",
      search: (prev) =>
        parseAdminRequestSearch({ ...(prev as Record<string, unknown>), ...next }),
      replace: true,
    });
  };

  const goPage = (p: number) => setSearch({ page: p });

  const tabBtn = (t: AdminRequestTab) =>
    t === "billboard" ? (
      <>
        Billboard <span className="hidden font-normal sm:inline">bookings</span>
      </>
    ) : (
      <>
        Influencer <span className="hidden font-normal sm:inline">bookings</span>
      </>
    );

  const applyDraftSearch = () => {
    setSearch({ search: draftSearch.trim(), page: 1 });
  };

  return (
    <section className="min-h-[70vh] bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-2xl text-stone-900">Requests</h1>
        <p className="mt-1 text-sm text-stone-600">
          Advertising booking pipelines: billboard placements and influencer
          campaigns. Filter by status, payment, or participants.
        </p>

        <div className="mt-6 flex gap-2 border-b border-stone-300">
          <button
            type="button"
            onClick={() => setSearch({ tab: "billboard", page: 1 })}
            className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              s.tab === "billboard"
                ? "-mb-[1px] border-ads360yellowBtn-100 text-stone-900"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            {tabBtn("billboard")}
          </button>
          <button
            type="button"
            onClick={() => setSearch({ tab: "influencer", page: 1 })}
            className={`border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              s.tab === "influencer"
                ? "-mb-[1px] border-ads360yellowBtn-100 text-stone-900"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            {tabBtn("influencer")}
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-10 border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:flex-wrap md:items-end">
          <label className="flex min-w-[140px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Status</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={s.status}
              onChange={(e) => setSearch({ status: e.target.value, page: 1 })}
            >
              <option value="">All</option>
              {BB_STATUS_OPTS.filter(Boolean).map((v) => (
                <option key={v} value={v}>
                  {v.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-[140px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Payment</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={s.paymentStatus}
              onChange={(e) =>
                setSearch({ paymentStatus: e.target.value, page: 1 })
              }
            >
              <option value="">All</option>
              {PAY_OPTS.filter(Boolean).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-[180px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Negotiation</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={s.negotiationPhase}
              onChange={(e) =>
                setSearch({ negotiationPhase: e.target.value, page: 1 })
              }
            >
              <option value="">All</option>
              {NEG_OPTS.filter(Boolean).map((v) => (
                <option key={v} value={v}>
                  {v.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-[120px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Booker ID</span>
            <input
              type="text"
              inputMode="numeric"
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
              value={s.bookerId}
              onChange={(e) =>
                setSearch({ bookerId: e.target.value.trim(), page: 1 })
              }
            />
          </label>
          <label className="flex min-w-[120px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Vendor ID</span>
            <input
              type="text"
              inputMode="numeric"
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
              value={s.vendorId}
              onChange={(e) =>
                setSearch({ vendorId: e.target.value.trim(), page: 1 })
              }
            />
          </label>
          <label className="flex min-w-[200px] flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Search</span>
            <input
              type="search"
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
              placeholder={
                s.tab === "billboard"
                  ? "ID, listing, email, phone…"
                  : "ID, influencer name, email…"
              }
              value={draftSearch}
              onChange={(e) => setDraftSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyDraftSearch();
              }}
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
            onClick={applyDraftSearch}
          >
            Apply search
          </button>
        </div>

        <div className="mt-4 overflow-x-auto rounded-10 border border-stone-200 bg-white shadow-sm">
          {s.tab === "billboard" ? (
            <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
              <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-600">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Listing</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bbList.isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-stone-500">
                      Loading…
                    </td>
                  </tr>
                ) : bbList.isError ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-red-700">
                      {bbList.error instanceof Error
                        ? bbList.error.message
                        : "Failed to load."}
                    </td>
                  </tr>
                ) : rowsBb.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-stone-500">
                      No billboard requests match.
                    </td>
                  </tr>
                ) : (
                  rowsBb.map((r) => (
                    <tr key={r.id} className="hover:bg-stone-50/80">
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">
                        #{r.id}
                      </td>
                      <td className="max-w-[220px] px-4 py-3 text-stone-800">
                        <span className="line-clamp-2">
                          {r.listingName ?? "—"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-medium tabular-nums">
                        {formatMoney(
                          Number(r.negotiatedAmount ?? r.quotedTotal),
                          r.currency,
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">{r.status}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {r.paymentStatus}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-stone-600 tabular-nums">
                        {formatDt(r.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Link
                          to="/admin/request/billboard/$id"
                          params={{ id: String(r.id) }}
                          className="font-semibold text-ads360yellow-100 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
              <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-600">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Influencer</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {infList.isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-stone-500">
                      Loading…
                    </td>
                  </tr>
                ) : infList.isError ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-red-700">
                      {infList.error instanceof Error
                        ? infList.error.message
                        : "Failed to load."}
                    </td>
                  </tr>
                ) : rowsInf.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-stone-500">
                      No influencer requests match.
                    </td>
                  </tr>
                ) : (
                  rowsInf.map((r) => (
                    <tr key={r.id} className="hover:bg-stone-50/80">
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">
                        #{r.id}
                      </td>
                      <td className="max-w-[220px] px-4 py-3 text-stone-800">
                        {r.influencerDisplayName ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-medium tabular-nums">
                        {formatMoney(
                          Number(r.negotiatedAmount ?? r.quotedTotal),
                          r.currency,
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">{r.status}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {r.paymentStatus}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-stone-600 tabular-nums">
                        {formatDt(r.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Link
                          to="/admin/request/influencer/$id"
                          params={{ id: String(r.id) }}
                          className="font-semibold text-ads360yellow-100 hover:underline"
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

export const Route = createFileRoute("/_admin/admin/request/")({
  validateSearch: (raw: Record<string, unknown>) =>
    parseAdminRequestSearch(raw),
  component: AdminRequestPage,
});

