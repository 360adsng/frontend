"use client";

import { useState } from "react";
import { Modal } from "@components/modal/modal";
import { useAdminReconcileFlutterwavePayment } from "@endpoint/admin/useAdminBookingRequests";

export type AdminFlutterwaveReconcileFields = {
  paymentStatus: string | null;
  paymentMethod?: string | null;
  flutterwaveReconcileAvailable?: boolean;
  pendingFlutterwaveTxRef?: string | null;
};

export function canAdminVerifyFlutterwavePayment(
  d: AdminFlutterwaveReconcileFields,
): boolean {
  if (String(d.paymentStatus ?? "").toLowerCase() === "paid") return false;
  if (d.flutterwaveReconcileAvailable) return true;
  return String(d.paymentMethod ?? "").toLowerCase() === "flutterwave";
}

type Props = {
  bookingId: number;
  kind: "billboard" | "influencer";
  booking: AdminFlutterwaveReconcileFields;
  onSuccess?: () => void;
  className?: string;
};

type DialogKind = "confirm" | "unavailable" | null;

const primaryBtnClass =
  "inline-flex shrink-0 items-center justify-center rounded-lg border border-stone-900/25 bg-ads360yellowBtn-100 px-4 py-2.5 text-sm font-semibold text-stone-900 shadow-sm transition hover:brightness-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const secondaryBtnClass =
  "rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 disabled:opacity-50";

export function AdminVerifyFlutterwavePaymentButton({
  bookingId,
  kind,
  booking,
  onSuccess,
  className = "",
}: Props) {
  const reconcile = useAdminReconcileFlutterwavePayment(kind, bookingId);
  const [dialog, setDialog] = useState<DialogKind>(null);

  if (!canAdminVerifyFlutterwavePayment(booking)) return null;

  const canRun = Boolean(booking.flutterwaveReconcileAvailable);
  const txHint = booking.pendingFlutterwaveTxRef?.trim();
  const dialogBusy = reconcile.isPending;

  function openDialog() {
    setDialog(canRun ? "confirm" : "unavailable");
  }

  function closeDialog() {
    if (dialogBusy) return;
    setDialog(null);
  }

  async function handleConfirm() {
    await reconcile.mutateAsync();
    setDialog(null);
    onSuccess?.();
  }

  return (
    <>
      <div
        className={`rounded-xl border border-amber-300/80 bg-amber-50/90 px-4 py-3 shadow-sm ${className}`.trim()}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-950">
              Flutterwave payment
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-stone-600">
              {canRun
                ? "If the webhook did not run, verify with Flutterwave and apply payment here."
                : "Available after the advertiser starts Flutterwave checkout."}
            </p>
          </div>
          <button
            type="button"
            onClick={openDialog}
            disabled={dialogBusy}
            title={
              canRun
                ? txHint
                  ? `Flutterwave tx_ref: ${txHint}`
                  : "Verify with Flutterwave"
                : "Start Flutterwave checkout on this booking before verifying"
            }
            className={primaryBtnClass}
          >
            {dialogBusy ? "Verifying…" : "Verify payment in Flutterwave"}
          </button>
        </div>
      </div>

      <Modal isOpen={dialog === "confirm"}>
        <div className="mx-auto max-h-[85vh] w-11/12 max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lg md:w-full">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 className="font-serif text-lg font-medium text-stone-900">
              Verify Flutterwave payment
            </h2>
            <button
              type="button"
              className="text-2xl leading-none text-stone-400 hover:text-stone-700 disabled:opacity-40"
              onClick={closeDialog}
              disabled={dialogBusy}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-sm leading-relaxed text-stone-600">
            This will call Flutterwave to verify the transaction and apply the
            result as if the webhook had run: update the transaction, mark the
            booking as paid, and split funds accordingly.
          </p>
          {txHint ? (
            <p className="mt-3 rounded-lg bg-stone-50 px-3 py-2 font-mono text-xs text-stone-700">
              tx_ref: {txHint}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              className={secondaryBtnClass}
              onClick={closeDialog}
              disabled={dialogBusy}
            >
              Cancel
            </button>
            <button
              type="button"
              className={primaryBtnClass}
              disabled={dialogBusy}
              onClick={() => void handleConfirm()}
            >
              {dialogBusy ? "Verifying…" : "Verify & apply payment"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={dialog === "unavailable"}>
        <div className="mx-auto max-h-[85vh] w-11/12 max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lg md:w-full">
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 className="font-serif text-lg font-medium text-stone-900">
              Cannot verify yet
            </h2>
            <button
              type="button"
              className="text-2xl leading-none text-stone-400 hover:text-stone-700"
              onClick={closeDialog}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-sm leading-relaxed text-stone-600">
            No pending Flutterwave checkout was found for this booking. The
            advertiser must start payment via Flutterwave before you can verify
            it here.
          </p>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className={primaryBtnClass}
              onClick={closeDialog}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
