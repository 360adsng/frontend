"use client";

import { useMemo, useState } from "react";
import type { TransactionDto, TransactionStatus, TransactionType } from "@endpoint/wallet/wallet";

const TYPE_LABELS: Record<TransactionType, string> = {
  wallet_fund: "Wallet fund",
  wallet_withdrawal: "Wallet withdrawal",
  wallet_debit: "Wallet debit",
  billboard_booking: "Billboard booking",
  billboard_payout: "Billboard payout",
  refund: "Refund",
  admin_adjustment: "Adjustment",
  other: "Other",
};

const STATUS_LABELS: Record<TransactionStatus, string> = {
  pending: "Pending",
  completed: "Completed",
  failed: "Failed",
};

function formatDate(v: string | null | undefined): string {
  if (!v) return "-";
  const d = new Date(v);
  if (!Number.isFinite(d.getTime())) return String(v).slice(0, 10);
  return d.toISOString().slice(0, 10);
}

function formatNaira(v: number, currency: string): string {
  const sym = currency === "NGN" ? "₦" : `${currency} `;
  return `${sym}${Math.abs(v).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function AmountCell({ tx }: { tx: TransactionDto }) {
  const text = formatNaira(tx.amount, tx.currency);
  const sign = tx.amount >= 0 ? "+" : "-";
  const cls = tx.amount >= 0 ? "text-green-600" : "text-red-600";
  return <span className={`font-semibold ${cls}`}>{sign}{text}</span>;
}

function Pill({ kind, value }: { kind: "status" | "type"; value: string }) {
  const v = value.trim().toLowerCase();
  const styles =
    v === "completed" || v === "accepted"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : v === "failed" || v === "rejected"
        ? "bg-red-100 text-red-700 border-red-200"
        : v === "pending"
          ? "bg-amber-100 text-amber-900 border-amber-200"
          : "bg-stone-100 text-stone-700 border-stone-200";
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles}`}>
      {kind === "status"
        ? (STATUS_LABELS[v as TransactionStatus] ?? value)
        : (TYPE_LABELS[v as TransactionType] ?? value)}
    </span>
  );
}

export function TransactionsTable({
  rows,
  isLoading,
  isError,
  emptyText = "No transactions found",
  showOwnerDetails = false,
}: {
  rows: TransactionDto[] | undefined;
  isLoading?: boolean;
  isError?: boolean;
  emptyText?: string;
  showOwnerDetails?: boolean;
}) {
  const [status, setStatus] = useState<TransactionStatus | "all">("all");
  const [type, setType] = useState<TransactionType | "all">("all");

  const filtered = useMemo(() => {
    const raw = rows ?? [];
    return raw.filter((t) => {
      if (status !== "all" && t.status !== status) return false;
      if (type !== "all" && t.type !== type) return false;
      return true;
    });
  }, [rows, status, type]);

  const colSpan = showOwnerDetails ? 8 : 6;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2">
        <div className="text-sm text-stone-600">Filter:</div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TransactionStatus | "all")}
          className="rounded-10 border border-ads360yellow-100 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType | "all")}
          className="rounded-10 border border-ads360yellow-100 bg-white px-3 py-2 text-sm"
        >
          <option value="all">All types</option>
          {Object.keys(TYPE_LABELS).map((k) => (
            <option key={k} value={k}>
              {TYPE_LABELS[k as TransactionType]}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full overflow-x-auto mt-4 rounded-10 border border-[#D0B301]/30 bg-white">
        <table className="min-w-full">
          <thead className="bg-[#D0B301]/15">
            <tr className="text-left text-xs font-semibold text-stone-700">
              <th className="py-4 px-4 border-b border-[#D0B301]/25">DATE</th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">DESCRIPTION</th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">AMOUNT</th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">TYPE</th>
              <th className="py-4 px-4 border-b border-[#D0B301]/25">STATUS</th>
              {showOwnerDetails ? (
                <>
                  <th className="py-4 px-4 border-b border-[#D0B301]/25">LINKED</th>
                  <th className="py-4 px-4 border-b border-[#D0B301]/25">PROVIDER</th>
                  <th className="py-4 px-4 border-b border-[#D0B301]/25">REF</th>
                </>
              ) : (
                <th className="py-4 px-4 border-b border-[#D0B301]/25">REF</th>
              )}
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
                  Unable to load transactions
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="py-10 px-4 text-center text-stone-500">
                  {emptyText}
                </td>
              </tr>
            ) : (
              filtered.map((tx) => (
                <tr key={tx.id} className="border-b last:border-b-0">
                  <td className="py-5 px-4 text-stone-700">{formatDate(tx.createdAt)}</td>
                  <td className="py-5 px-4 text-stone-900 font-medium">{tx.description || tx.type}</td>
                  <td className="py-5 px-4"><AmountCell tx={tx} /></td>
                  <td className="py-5 px-4"><Pill kind="type" value={tx.type} /></td>
                  <td className="py-5 px-4"><Pill kind="status" value={tx.status} /></td>
                  {showOwnerDetails ? (
                    <>
                      <td className="py-5 px-4 text-stone-700">
                        {tx.referenceType ?? "—"}
                        {tx.referenceId != null ? ` #${tx.referenceId}` : ""}
                      </td>
                      <td className="py-5 px-4 text-stone-700 capitalize">{tx.provider ?? "—"}</td>
                      <td className="py-5 px-4 text-stone-700 font-mono break-all">
                        {tx.providerRef ?? tx.providerTxRef ?? "—"}
                      </td>
                    </>
                  ) : (
                    <td className="py-5 px-4 text-stone-700 font-mono break-all">
                      {tx.providerRef ?? tx.providerTxRef ?? "—"}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

