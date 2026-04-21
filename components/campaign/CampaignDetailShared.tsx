"use client";

import type { ReactNode } from "react";

export function formatCampaignMoney(
  amount: number,
  currency = "NGN",
): string {
  return `${currency === "NGN" ? "₦" : `${currency} `}${amount.toLocaleString()}`;
}

export function formatDateShort(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return String(iso).slice(0, 10);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateRange(
  start: string | null | undefined,
  end: string | null | undefined,
): string {
  const a = formatDateShort(start ?? null);
  const b = formatDateShort(end ?? null);
  if (a === "—" && b === "—") return "—";
  return `${a} – ${b}`;
}

export function personDisplayName(p: {
  businessName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}): string {
  const biz = p.businessName?.trim();
  if (biz) return biz;
  const n = `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim();
  return n || "—";
}

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-800 border-amber-200",
  active: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  completed: "bg-emerald-50 text-emerald-800 border-emerald-200",
  paid: "bg-green-50 text-green-700 border-green-200",
};

export function CampaignStatusBadge({ status }: { status: string }) {
  const s = String(status ?? "").toLowerCase();
  const cls = statusStyles[s] ?? "bg-stone-100 text-stone-700 border-stone-200";
  const label =
    s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : "Unknown";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}
    >
      {label}
    </span>
  );
}

const paymentStatusStyles: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-800 border-emerald-200",
  unpaid: "bg-amber-50 text-amber-900 border-amber-200",
  refunded: "bg-violet-50 text-violet-800 border-violet-200",
};

export function CampaignPaymentStatusBadge({
  paymentStatus,
}: {
  paymentStatus?: string | null;
}) {
  const s = String(paymentStatus ?? "unpaid").toLowerCase();
  const cls =
    paymentStatusStyles[s] ?? "bg-stone-100 text-stone-700 border-stone-200";
  const label =
    s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : "Unknown";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}
      title="Payment status"
    >
      Payment: {label}
    </span>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-widest text-stone-500 uppercase mb-2">
      {children}
    </p>
  );
}

export function InfoCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  sub?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ads360yellow-100/30 text-ads360yellow-100">
          {icon}
        </div>
        <div className="min-w-0">
          <SectionLabel>{label}</SectionLabel>
          <div className="text-lg font-semibold text-stone-900 leading-tight">
            {value}
          </div>
          {sub ? (
            <div className="mt-1 text-sm text-stone-600">{sub}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function MediaFrame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[200px] flex-col rounded-2xl border border-dashed border-amber-200/80 bg-[#FAFAF8] p-4">
      <SectionLabel>{title}</SectionLabel>
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </div>
  );
}
