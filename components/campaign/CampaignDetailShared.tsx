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
  dispute: "bg-orange-50 text-orange-900 border-orange-200",
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
  processing: "bg-sky-50 text-sky-900 border-sky-200",
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

export type DisputeNoticePhase =
  | "active"
  | "resolved_completed"
  | "resolved_refunded";

/**
 * Determines which dispute banner applies: open dispute vs resolved completion vs refund/cancel.
 * Uses dispute markers, or any persisted dispute-chat messages (`disputeChatHasThread`), so resolved
 * bookings still surface the banner when the API keeps thread context.
 */
export function resolveDisputeNoticePhase(b: {
  /** Booking lifecycle status */
  status?: string | null;
  /** Alias used by callers (same as status) — must be supported because many sites pass this key only */
  bookingStatus?: string | null;
  paymentStatus?: string | null;
  disputedAt?: string | null;
  disputeReason?: string | null;
  disputeChatHasThread?: boolean | null;
}): DisputeNoticePhase | null {
  const status = String(b.status ?? b.bookingStatus ?? "").toLowerCase();
  const hasWrittenMarker =
    Boolean(String(b.disputedAt ?? "").trim()) ||
    Boolean(String(b.disputeReason ?? "").trim());
  const hasThread = Boolean(b.disputeChatHasThread);
  const linkedToDispute = hasWrittenMarker || hasThread;

  if (status === "dispute") return "active";
  if (!linkedToDispute) return null;
  if (status === "completed") return "resolved_completed";
  if (status === "rejected") return "resolved_refunded";
  return null;
}

/** Compact header / row chip linked to dispute chat. */
export function disputeNoticeHeaderPillClassNames(
  phase: DisputeNoticePhase | null,
): string {
  const base =
    "rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide shadow-sm";
  if (phase === null) return base;
  return `${base} bg-orange-600 text-white hover:bg-orange-700`;
}

/** Shared primary action styles for dispute chat CTAs (same prominence for open + resolved). */
export function disputeNoticeChatLinkClassNames(_phase: DisputeNoticePhase): string {
  return [
    "inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow sm:w-auto",
    "bg-orange-700 text-white hover:bg-orange-800",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-900",
  ].join(" ");
}

export function CampaignDisputeNotice({
  disputeReason,
  disputedAt,
  bookingStatus,
  paymentStatus,
  disputeChatHasThread,
  chatLink,
}: {
  disputeReason?: string | null;
  disputedAt?: string | null;
  bookingStatus?: string | null;
  paymentStatus?: string | null;
  disputeChatHasThread?: boolean | null;
  chatLink?: ReactNode;
}) {
  const phase = resolveDisputeNoticePhase({
    bookingStatus,
    paymentStatus,
    disputedAt,
    disputeReason,
    disputeChatHasThread,
  });
  if (phase === null) return null;

  const reason = disputeReason?.trim();
  const reasonText =
    reason || "No written reason was provided for this dispute.";

  /** Open dispute — orange alert shell */
  const activeOuter =
    "rounded-2xl border-2 border-orange-600 bg-gradient-to-br from-orange-50 via-orange-50/95 to-amber-50 p-6 shadow-[0_10px_40px_-12px_rgba(234,88,12,0.45)] ring-4 ring-orange-400/30";
  /** Resolved dispute — green border / ring (outcome closed) */
  const resolvedOuter =
    "rounded-2xl border-2 border-emerald-600 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/80 p-6 shadow-[0_10px_40px_-12px_rgba(5,95,70,0.28)] ring-4 ring-emerald-400/35";
  const resolvedBadgeBase =
    "inline-flex items-center rounded-full border-2 border-emerald-900 bg-emerald-700 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm";

  const shells: Record<
    DisputeNoticePhase,
    {
      outer: string;
      badge: string;
      badgeLabel: string;
      lead: string;
      reasonBox: string;
      reasonHeading: string;
      footerTint: string;
      dateStampClass: string;
    }
  > = {
    active: {
      outer: activeOuter,
      badge:
        "inline-flex items-center rounded-full border-2 border-orange-800 bg-orange-600 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm",
      badgeLabel: "Dispute — action required",
      lead: "text-orange-950",
      reasonBox:
        "mt-5 rounded-xl border-2 border-orange-300 bg-white p-4 shadow-inner",
      reasonHeading: "text-orange-700",
      footerTint: "border-orange-300/60",
      dateStampClass: "text-orange-800/90",
    },
    resolved_completed: {
      outer: resolvedOuter,
      badge: resolvedBadgeBase,
      badgeLabel: "Dispute resolved · completed",
      lead: "text-emerald-950",
      reasonBox:
        "mt-5 rounded-xl border-2 border-emerald-400/80 bg-white p-4 shadow-inner",
      reasonHeading: "text-emerald-800",
      footerTint: "border-emerald-300/70",
      dateStampClass: "text-emerald-800/90",
    },
    resolved_refunded: {
      outer: resolvedOuter,
      badge: resolvedBadgeBase,
      badgeLabel: "Dispute resolved · refund",
      lead: "text-emerald-950",
      reasonBox:
        "mt-5 rounded-xl border-2 border-emerald-400/80 bg-white p-4 shadow-inner",
      reasonHeading: "text-emerald-800",
      footerTint: "border-emerald-300/70",
      dateStampClass: "text-emerald-800/90",
    },
  };

  const s = shells[phase];
  const openedLabel =
    phase === "active" ? "Opened" : disputeReason?.trim() ? "Raised" : "Opened";

  const leadParagraph =
    phase === "active" ? (
      <>
        This campaign is disputed. Funds are typically held until the issue is
        resolved.
      </>
    ) : phase === "resolved_completed" ? (
      <>
        The platform closed this dispute in favour of completion. Settlement to
        the vendor followed the usual completion rules — new messages are
        disabled but you can review the dispute thread anytime.
      </>
    ) : (
      <>
        This booking was cancelled and the campaign owner&apos;s payment was
        refunded through the original method (wallet or card). New messages are
        disabled; you can still read past messages below.
      </>
    );

  return (
    <div role="alert" className={s.outer}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <span className={s.badge}>{s.badgeLabel}</span>
      </div>
      <p
        className={`mt-4 text-sm font-semibold leading-snug ${s.lead}`}
      >
        {leadParagraph}
      </p>
      {disputedAt ? (
        <p
          className={`mt-2 text-xs font-semibold uppercase tracking-wide ${s.dateStampClass}`}
        >
          {openedLabel}{" "}
          <time
            className="font-sans normal-case text-stone-900"
            dateTime={disputedAt}
          >
            {formatDateShort(disputedAt)}
          </time>
        </p>
      ) : null}
      <div className={s.reasonBox}>
        <p
          className={`text-[11px] font-bold uppercase tracking-[0.12em] ${s.reasonHeading}`}
        >
          Original dispute reason
        </p>
        <p className="mt-3 whitespace-pre-wrap text-base font-semibold leading-relaxed text-stone-900">
          {reasonText}
        </p>
      </div>
      {chatLink ? (
        <div className={`mt-5 border-t pt-5 ${s.footerTint}`}>
          <div className="flex flex-wrap gap-2">{chatLink}</div>
        </div>
      ) : null}
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
