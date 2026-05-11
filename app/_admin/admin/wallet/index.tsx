"use client";

import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  useAdminAppWallets,
  useAdminAppWalletTransactions,
} from "@endpoint/admin/useAdminAppWallet";
import type {
  TransactionStatus,
  TransactionType,
} from "@endpoint/wallet/wallet";
import { TransactionDescriptionDrawer } from "@components/admin/TransactionDescriptionDrawer";
import { transactionReasonFromMetadata } from "@components/admin/transactionReason";

const VIEW_DESC_BTN_CLASS =
  "inline-flex shrink-0 items-center rounded-lg border border-stone-900/25 bg-ads360yellowBtn-100 px-3 py-1.5 text-xs font-semibold text-stone-900 shadow-sm hover:brightness-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2";

const TYPE_LABELS: Partial<Record<TransactionType, string>> = {
  wallet_fund: "Wallet fund",
  wallet_withdrawal: "Wallet withdrawal",
  wallet_debit: "Wallet debit",
  billboard_booking: "Billboard booking",
  influencer_booking: "Influencer booking",
  billboard_payout: "Billboard payout",
  influencer_payout: "Influencer payout",
  refund: "Refund",
  admin_adjustment: "Adjustment",
  other: "Other",
};

const STATUS_LABELS: Record<TransactionStatus, string> = {
  pending: "Pending",
  completed: "Completed",
  failed: "Failed",
};

type WalletTxListSearch = {
  page: number;
  limit: number;
  status: "" | TransactionStatus;
  referenceType: string;
  vendorUserId: string;
};

function parseWalletTxSearch(raw: Record<string, unknown>): WalletTxListSearch {
  const page = Math.max(1, Number(raw.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(raw.limit) || 20));
  const st = String(raw.status ?? "").toLowerCase();
  const status: WalletTxListSearch["status"] =
    st === "pending" || st === "completed" || st === "failed" ? st : "";
  const referenceType = String(raw.referenceType ?? "").trim().slice(0, 64);
  const vendorUserId = String(raw.vendorUserId ?? "").trim();
  return { page, limit, status, referenceType, vendorUserId };
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

function statusPill(status: TransactionStatus) {
  const v = status.trim().toLowerCase();
  const cls =
    v === "completed"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : v === "failed"
        ? "bg-red-100 text-red-700 border-red-200"
        : "bg-amber-100 text-amber-900 border-amber-200";
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${cls}`}
    >
      {STATUS_LABELS[v as TransactionStatus] ?? status}
    </span>
  );
}

function typePill(type: TransactionType) {
  return (
    <span className="inline-flex rounded-full border border-stone-200 bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-800">
      {TYPE_LABELS[type] ?? type}
    </span>
  );
}

function AdminWalletPage() {
  const navigate = useNavigate();
  const s = Route.useSearch();
  const balances = useAdminAppWallets();

  const [draftReferenceType, setDraftReferenceType] = useState(s.referenceType);
  const [draftVendorUserId, setDraftVendorUserId] = useState(s.vendorUserId);
  const [descDrawer, setDescDrawer] = useState<{
    id: number;
    description: string;
    subtitle: string;
    reason?: string;
  } | null>(null);

  useEffect(() => {
    setDraftReferenceType(s.referenceType);
    setDraftVendorUserId(s.vendorUserId);
  }, [s.referenceType, s.vendorUserId]);

  const vendorFromUrl = Number.parseInt(s.vendorUserId, 10);
  const vendorFilter =
    s.vendorUserId.trim() !== "" &&
    Number.isFinite(vendorFromUrl) &&
    vendorFromUrl > 0
      ? vendorFromUrl
      : undefined;

  const txList = useAdminAppWalletTransactions({
    page: s.page,
    limit: s.limit,
    status: s.status || undefined,
    referenceType: s.referenceType.trim()
      ? s.referenceType.trim()
      : undefined,
    vendorUserId: vendorFilter,
  });

  const meta = txList.data?.meta;
  const rows = txList.data?.data ?? [];

  const setSearch = (next: Partial<WalletTxListSearch>) => {
    void navigate({
      to: "/admin/wallet",
      search: (prev) =>
        parseWalletTxSearch({ ...(prev as Record<string, unknown>), ...next }),
      replace: true,
    });
  };

  const goPage = (p: number) => setSearch({ page: p });

  const applyTextFilters = () => {
    setSearch({
      referenceType: draftReferenceType.trim(),
      vendorUserId: draftVendorUserId.trim(),
      page: 1,
    });
  };

  return (
    <section className="min-h-[70vh] bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="font-serif text-2xl text-stone-900">App wallet</h1>
          <p className="mt-1 text-sm text-stone-600">
            Platform treasury balance(s) and commission credits when paid bookings
            complete.
          </p>
        </div>

        <div className="rounded-10 border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
            Balance by currency
          </h2>
          {balances.isLoading ? (
            <p className="mt-3 text-sm text-stone-600">Loading…</p>
          ) : balances.isError ? (
            <p className="mt-3 text-sm text-red-700">
              {balances.error instanceof Error
                ? balances.error.message
                : "Failed to load balances."}
            </p>
          ) : !balances.data?.length ? (
            <p className="mt-3 text-sm text-stone-600">
              No app wallet rows yet — they are created when the first payable
              event runs for each currency (typically{" "}
              <span className="font-medium">NGN</span>).
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-4">
              {balances.data.map((w) => (
                <div
                  key={w.id}
                  className="min-w-[180px] flex-1 rounded-xl border border-amber-200/70 bg-[#FFF9E9] px-4 py-3"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                    {w.currency}
                  </p>
                  <p className="mt-1 font-serif text-2xl tracking-tight text-stone-900">
                    {formatMoney(w.balance, w.currency)}
                  </p>
                  <p className="mt-1 text-[11px] text-stone-500">
                    Updated {formatDt(w.updatedAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-stone-900">
                Platform commissions
              </h2>
              <p className="mt-1 max-w-xl text-sm text-stone-600">
                Only rows that credited the platform wallet (
                <code className="rounded bg-stone-100 px-1">metadata.to</code>{" "}
                = <span className="font-mono text-xs">app_wallet</span>). These
                are recorded as adjustments from the vendor’s booking.
              </p>
            </div>
            <Link
              to="/admin/wallet/transactions"
              className="shrink-0 text-sm font-semibold text-ads360yellow-100 hover:underline"
            >
              See all transactions →
            </Link>
          </div>

          <div className="mt-4 flex flex-col gap-3 rounded-10 border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:flex-wrap md:items-end">
            <label className="flex min-w-[140px] flex-col gap-1 text-sm">
              <span className="font-medium text-stone-700">Status</span>
              <select
                className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
                value={s.status}
                onChange={(e) =>
                  setSearch({
                    status: e.target.value as WalletTxListSearch["status"],
                    page: 1,
                  })
                }
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </label>
            <label className="flex min-w-[160px] flex-1 flex-col gap-1 text-sm">
              <span className="font-medium text-stone-700">Reference type</span>
              <input
                type="text"
                className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
                placeholder="billboard_booking, influencer_booking…"
                value={draftReferenceType}
                onChange={(e) => setDraftReferenceType(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") applyTextFilters();
                }}
              />
            </label>
            <label className="flex min-w-[120px] flex-col gap-1 text-sm">
              <span className="font-medium text-stone-700">Vendor user ID</span>
              <input
                type="text"
                inputMode="numeric"
                className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
                placeholder="Optional"
                value={draftVendorUserId}
                onChange={(e) => setDraftVendorUserId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") applyTextFilters();
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
              onClick={applyTextFilters}
            >
              Apply
            </button>
          </div>

          <div className="mt-4 overflow-x-auto rounded-10 border border-stone-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
              <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-600">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">When</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">Amount</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">Status</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">Type</th>
                  <th className="min-w-[140px] px-4 py-3 font-medium">Description</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">Vendor</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {txList.isLoading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-stone-500"
                    >
                      Loading…
                    </td>
                  </tr>
                ) : txList.isError ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-red-700"
                    >
                      {txList.error instanceof Error
                        ? txList.error.message
                        : "Failed to load transactions."}
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-10 text-center text-stone-500"
                    >
                      No commission rows match these filters.
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr key={r.id} className="hover:bg-stone-50/80">
                      <td className="whitespace-nowrap px-4 py-3 text-stone-700 tabular-nums">
                        {formatDt(r.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-semibold tabular-nums text-stone-900">
                        {formatMoney(Number(r.amount), r.currency)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {statusPill(r.status)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {typePill(r.type)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 align-middle">
                        <button
                          type="button"
                          className={VIEW_DESC_BTN_CLASS}
                          onClick={() =>
                            setDescDrawer({
                              id: r.id,
                              description: r.description,
                              subtitle: `${formatDt(r.createdAt)} · ${formatMoney(Number(r.amount), r.currency)}`,
                              reason: transactionReasonFromMetadata(r.metadata),
                            })
                          }
                        >
                          view description
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <Link
                          to="/admin/users/$id"
                          params={{ id: String(r.userId) }}
                          className="font-medium text-ads360yellow-100 hover:underline"
                        >
                          #{r.userId}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-stone-600">
                        {r.referenceType && r.referenceId != null ? (
                          <span className="font-mono text-xs">
                            {r.referenceType}:{r.referenceId}
                          </span>
                        ) : (
                          <span className="text-stone-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
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
      </div>

      <TransactionDescriptionDrawer
        open={descDrawer !== null}
        onClose={() => setDescDrawer(null)}
        title={descDrawer ? `Transaction #${descDrawer.id}` : ""}
        subtitle={descDrawer?.subtitle}
        description={descDrawer?.description ?? ""}
        reason={descDrawer?.reason}
      />
    </section>
  );
}

export const Route = createFileRoute("/_admin/admin/wallet/")({
  validateSearch: (raw: Record<string, unknown>) => parseWalletTxSearch(raw),
  component: AdminWalletPage,
});

