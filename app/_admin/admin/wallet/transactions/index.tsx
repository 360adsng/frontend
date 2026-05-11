"use client";

import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAdminTransactionsLedger } from "@endpoint/admin/useAdminAppWallet";
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

const ALL_TX_TYPES: TransactionType[] = [
  "wallet_fund",
  "wallet_withdrawal",
  "wallet_debit",
  "billboard_booking",
  "influencer_booking",
  "billboard_payout",
  "influencer_payout",
  "refund",
  "admin_adjustment",
  "other",
];

const TYPE_FILTER_SET = new Set<string>(ALL_TX_TYPES);

type AllTxSearch = {
  page: number;
  limit: number;
  status: "" | TransactionStatus;
  type: "" | TransactionType;
  currency: string;
  referenceType: string;
  userId: string;
  search: string;
};

function parseAllTxSearch(raw: Record<string, unknown>): AllTxSearch {
  const page = Math.max(1, Number(raw.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(raw.limit) || 20));
  const st = String(raw.status ?? "").toLowerCase();
  const status: AllTxSearch["status"] =
    st === "pending" || st === "completed" || st === "failed" ? st : "";
  const ty = String(raw.type ?? "").trim();
  const type: AllTxSearch["type"] =
    ty !== "" && TYPE_FILTER_SET.has(ty) ? (ty as TransactionType) : "";
  const currency = String(raw.currency ?? "").trim().slice(0, 8);
  const referenceType = String(raw.referenceType ?? "").trim().slice(0, 64);
  const userId = String(raw.userId ?? "").trim();
  const search = String(raw.search ?? "").trim().slice(0, 200);
  return {
    page,
    limit,
    status,
    type,
    currency,
    referenceType,
    userId,
    search,
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

function UserLink({ id }: { id: number }) {
  return (
    <Link
      to="/admin/users/$id"
      params={{ id: String(id) }}
      className="font-medium text-ads360yellow-100 hover:underline"
    >
      #{id}
    </Link>
  );
}

function AdminAllTransactionsPage() {
  const navigate = useNavigate();
  const s = Route.useSearch();

  const [draftCurrency, setDraftCurrency] = useState(s.currency);
  const [draftReferenceType, setDraftReferenceType] = useState(s.referenceType);
  const [draftUserId, setDraftUserId] = useState(s.userId);
  const [draftSearch, setDraftSearch] = useState(s.search);
  const [descDrawer, setDescDrawer] = useState<{
    id: number;
    description: string;
    subtitle: string;
    reason?: string;
  } | null>(null);

  useEffect(() => {
    setDraftCurrency(s.currency);
    setDraftReferenceType(s.referenceType);
    setDraftUserId(s.userId);
    setDraftSearch(s.search);
  }, [s.currency, s.referenceType, s.userId, s.search]);

  const uidFromUrl = Number.parseInt(s.userId, 10);
  const userIdFilter =
    s.userId.trim() !== "" && Number.isFinite(uidFromUrl) && uidFromUrl > 0
      ? uidFromUrl
      : undefined;

  const list = useAdminTransactionsLedger({
    page: s.page,
    limit: s.limit,
    status: s.status || undefined,
    type: s.type || undefined,
    currency: s.currency.trim() ? s.currency.trim() : undefined,
    referenceType: s.referenceType.trim() ? s.referenceType.trim() : undefined,
    userId: userIdFilter,
    search: s.search.trim() ? s.search.trim() : undefined,
  });

  const meta = list.data?.meta;
  const rows = list.data?.data ?? [];

  const setSearch = (next: Partial<AllTxSearch>) => {
    void navigate({
      to: "/admin/wallet/transactions",
      search: (prev) =>
        parseAllTxSearch({ ...(prev as Record<string, unknown>), ...next }),
      replace: true,
    });
  };

  const goPage = (p: number) => setSearch({ page: p });

  const applyTextFilters = () => {
    setSearch({
      currency: draftCurrency.trim(),
      referenceType: draftReferenceType.trim(),
      userId: draftUserId.trim(),
      search: draftSearch.trim(),
      page: 1,
    });
  };

  return (
    <section className="min-h-[70vh] bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/admin/wallet"
          className="text-sm font-medium text-stone-600 underline-offset-2 hover:text-stone-900 hover:underline"
        >
          ← App wallet
        </Link>

        <h1 className="mt-4 font-serif text-2xl text-stone-900">
          All transactions
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Full ledger across the product. Filter by type, status, currency,
          reference, participant user (matches either side of the row), or
          description text.
        </p>

        <div className="mt-6 flex flex-col gap-3 rounded-10 border border-stone-200 bg-white p-4 shadow-sm lg:flex-row lg:flex-wrap lg:items-end">
          <label className="flex min-w-[140px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Status</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={s.status}
              onChange={(e) =>
                setSearch({
                  status: e.target.value as AllTxSearch["status"],
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
          <label className="flex min-w-[180px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Type</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={s.type}
              onChange={(e) =>
                setSearch({
                  type: e.target.value as AllTxSearch["type"],
                  page: 1,
                })
              }
            >
              <option value="">All</option>
              {ALL_TX_TYPES.map((t) => (
                <option key={t} value={t}>
                  {TYPE_LABELS[t] ?? t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-[100px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Currency</span>
            <input
              type="text"
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
              placeholder="e.g. NGN"
              value={draftCurrency}
              onChange={(e) => setDraftCurrency(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyTextFilters();
              }}
            />
          </label>
          <label className="flex min-w-[140px] flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Reference type</span>
            <input
              type="text"
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
              placeholder="Optional"
              value={draftReferenceType}
              onChange={(e) => setDraftReferenceType(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyTextFilters();
              }}
            />
          </label>
          <label className="flex min-w-[120px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Participant user</span>
            <input
              type="text"
              inputMode="numeric"
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
              placeholder="userId or vendorId"
              value={draftUserId}
              onChange={(e) => setDraftUserId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyTextFilters();
              }}
            />
          </label>
          <label className="flex min-w-[200px] flex-[2] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Description contains</span>
            <input
              type="search"
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
              placeholder="Search description…"
              value={draftSearch}
              onChange={(e) => setDraftSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyTextFilters();
              }}
            />
          </label>
          <label className="flex w-full min-w-[100px] max-w-[120px] flex-col gap-1 text-sm lg:w-auto">
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
            className="rounded-lg border-2 border-stone-900 bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 lg:ml-auto"
            onClick={applyTextFilters}
          >
            Apply
          </button>
        </div>

        <div className="mt-4 overflow-x-auto rounded-10 border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
            <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-600">
              <tr>
                <th className="whitespace-nowrap px-3 py-3 font-medium">When</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Amount</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Status</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Type</th>
                <th className="min-w-[140px] px-3 py-3 font-medium">Description</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">User</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Vendor</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Ref</th>
                <th className="whitespace-nowrap px-3 py-3 font-medium">Provider</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {list.isLoading ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-10 text-center text-stone-500"
                  >
                    Loading…
                  </td>
                </tr>
              ) : list.isError ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-red-700">
                    {list.error instanceof Error
                      ? list.error.message
                      : "Failed to load transactions."}
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-10 text-center text-stone-500"
                  >
                    No transactions match these filters.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="hover:bg-stone-50/80">
                    <td className="whitespace-nowrap px-3 py-3 text-stone-700 tabular-nums">
                      {formatDt(r.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-semibold tabular-nums text-stone-900">
                      {formatMoney(Number(r.amount), r.currency)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {statusPill(r.status)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {typePill(r.type)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 align-middle">
                      <button
                        type="button"
                        className={VIEW_DESC_BTN_CLASS}
                        onClick={() =>
                          setDescDrawer({
                            id: r.id,
                            description: r.description,
                            subtitle: `${formatDt(r.createdAt)} · ${formatMoney(Number(r.amount), r.currency)} · ${TYPE_LABELS[r.type] ?? r.type}`,
                            reason: transactionReasonFromMetadata(r.metadata),
                          })
                        }
                      >
                        view description
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <UserLink id={r.userId} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-stone-600">
                      {r.vendorId != null && r.vendorId > 0 ? (
                        <UserLink id={r.vendorId} />
                      ) : (
                        <span className="text-stone-400">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-xs text-stone-600">
                      {r.referenceType && r.referenceId != null ? (
                        <span>
                          {r.referenceType}:{r.referenceId}
                        </span>
                      ) : (
                        <span className="text-stone-400">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-stone-500">
                      {r.provider ?? "—"}
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

export const Route = createFileRoute("/_admin/admin/wallet/transactions/")({
  validateSearch: (raw: Record<string, unknown>) => parseAllTxSearch(raw),
  component: AdminAllTransactionsPage,
});

