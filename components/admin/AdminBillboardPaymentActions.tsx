"use client";

import { useState } from "react";
import { Modal } from "@components/modal/modal";
import type { AdminBillboardRequestDetail } from "@endpoint/admin/adminBookingRequests";
import {
  useAdminCancelBillboardBookingPayment,
  useAdminRepairBillboardPaymentLedger,
  useAdminRefundBillboardArconFee,
} from "@endpoint/admin/useAdminBookingRequests";

type DialogKind = "cancel" | "arcon" | null;

const secondaryBtnClass =
  "rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 disabled:opacity-50";

const dangerBtnClass =
  "rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-900 transition hover:bg-red-100 disabled:opacity-50";

const primaryBtnClass =
  "inline-flex shrink-0 items-center justify-center rounded-lg border border-stone-900/25 bg-ads360yellowBtn-100 px-4 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition hover:brightness-[0.96] disabled:cursor-not-allowed disabled:opacity-50";

function formatMoney(amount: number, currency: string): string {
  const ccy = currency === "NGN" ? "NGN" : currency;
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: ccy,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

type Props = {
  booking: AdminBillboardRequestDetail;
  onSuccess?: () => void;
  className?: string;
};

export function AdminBillboardPaymentActions({
  booking,
  onSuccess,
  className = "",
}: Props) {
  const [dialog, setDialog] = useState<DialogKind>(null);
  const cancelMut = useAdminCancelBillboardBookingPayment(booking.id);
  const repairMut = useAdminRepairBillboardPaymentLedger(booking.id);
  const arconMut = useAdminRefundBillboardArconFee(booking.id);

  const isPaid = String(booking.paymentStatus ?? "").toLowerCase() === "paid";
  if (!isPaid) return null;

  const busy =
    cancelMut.isPending || repairMut.isPending || arconMut.isPending;
  const arconAmount = Number(booking.arconAmount ?? booking.quotedArconTotal ?? 0);
  const canRefundArcon =
    arconAmount > 0 && !booking.arconFeeRefunded && !booking.arconHasCertificate;

  async function runCancel() {
    await cancelMut.mutateAsync(undefined);
    setDialog(null);
    onSuccess?.();
  }

  async function runArconRefund() {
    await arconMut.mutateAsync(undefined);
    setDialog(null);
    onSuccess?.();
  }

  return (
    <>
      <div
        className={`rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm ${className}`.trim()}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          Payment actions
        </p>
        <p className="mt-1 text-xs leading-relaxed text-stone-600">
          Vendor rejection refunds placement and print only; ARCON stays with the
          platform unless you refund it below.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            className={secondaryBtnClass}
            disabled={busy}
            onClick={() => void repairMut.mutateAsync()}
          >
            {repairMut.isPending ? "Repairing…" : "Repair payment split"}
          </button>
          <button
            type="button"
            className={dangerBtnClass}
            disabled={busy}
            onClick={() => setDialog("cancel")}
          >
            Cancel transaction
          </button>
          {canRefundArcon ? (
            <button
              type="button"
              className={primaryBtnClass}
              disabled={busy}
              onClick={() => setDialog("arcon")}
            >
              Refund ARCON fee
            </button>
          ) : null}
        </div>
        {arconAmount > 0 && booking.arconFeeRefunded ? (
          <p className="mt-2 text-xs text-stone-500">ARCON fee already refunded.</p>
        ) : null}
      </div>

      <Modal isOpen={dialog === "cancel"}>
        <div className="mx-auto max-h-[85vh] w-11/12 max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lg md:w-full">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 className="font-serif text-lg font-medium text-stone-900">
              Cancel transaction
            </h2>
            <button
              type="button"
              className="text-2xl leading-none text-stone-400 hover:text-stone-700 disabled:opacity-40"
              onClick={() => !busy && setDialog(null)}
              disabled={busy}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-sm leading-relaxed text-stone-600">
            Refund the full amount to the booker — placement, print, and ARCON
            processing fee — and mark this booking as rejected/refunded.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-stone-800">
            <li>
              Placement:{" "}
              {formatMoney(booking.placementAmount ?? 0, booking.currency)}
            </li>
            <li>
              Print: {formatMoney(booking.printAmount ?? 0, booking.currency)}
            </li>
            <li>ARCON: {formatMoney(arconAmount, booking.currency)}</li>
            <li className="font-semibold">
              Total refund:{" "}
              {formatMoney(
                booking.payableTotal ?? booking.quotedTotal,
                booking.currency,
              )}
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              className={secondaryBtnClass}
              disabled={busy}
              onClick={() => setDialog(null)}
            >
              Back
            </button>
            <button
              type="button"
              className={dangerBtnClass}
              disabled={busy}
              onClick={() => void runCancel()}
            >
              {cancelMut.isPending ? "Processing…" : "Confirm full refund"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={dialog === "arcon"}>
        <div className="mx-auto max-h-[85vh] w-11/12 max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lg md:w-full">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 className="font-serif text-lg font-medium text-stone-900">
              Refund ARCON fee
            </h2>
            <button
              type="button"
              className="text-2xl leading-none text-stone-400 hover:text-stone-700 disabled:opacity-40"
              onClick={() => !busy && setDialog(null)}
              disabled={busy}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-sm leading-relaxed text-stone-600">
            Return only the ARCON processing fee to the booker. Placement and
            print funds stay in the vendor hold; the booking remains paid.
          </p>
          <p className="mt-3 text-sm font-semibold text-stone-900">
            Refund amount: {formatMoney(arconAmount, booking.currency)}
          </p>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              className={secondaryBtnClass}
              disabled={busy}
              onClick={() => setDialog(null)}
            >
              Back
            </button>
            <button
              type="button"
              className={primaryBtnClass}
              disabled={busy}
              onClick={() => void runArconRefund()}
            >
              {arconMut.isPending ? "Processing…" : "Confirm ARCON refund"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
