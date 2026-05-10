"use client";

import { useEffect, useState } from "react";
import { Modal } from "@components/modal/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void | Promise<void>;
  isSubmitting?: boolean;
  title?: string;
};

export function CampaignDisputeModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
  title = "Dispute campaign",
}: Props) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!isOpen) setReason("");
  }, [isOpen]);

  const trimmed = reason.trim();
  const canSubmit = trimmed.length >= 10 && !isSubmitting;

  function handleClose() {
    if (isSubmitting) return;
    onClose();
  }

  return (
    <Modal isOpen={isOpen}>
      <div className="mx-auto max-h-[85vh] w-11/12 max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lg md:w-full">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 className="font-serif text-lg font-medium text-stone-900">{title}</h2>
          <button
            type="button"
            className="text-2xl leading-none text-stone-400 hover:text-stone-700 disabled:opacity-40"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <p className="text-sm text-stone-600">
          Describe what went wrong. This is shared with the platform and helps
          resolve the booking with the provider. Minimum 10 characters.
        </p>
        <label className="mt-4 block">
          <span className="text-xs font-medium text-stone-600">Reason</span>
          <textarea
            className="mt-1.5 min-h-[120px] w-full resize-y rounded-xl border border-stone-200 p-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-ads360yellow-100 focus:outline-none focus:ring-1 focus:ring-ads360yellow-100"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={isSubmitting}
            placeholder="e.g. Creative was not displayed as agreed during the contracted dates..."
            maxLength={5000}
          />
        </label>
        <p className="mt-1 text-xs text-stone-500">{trimmed.length} / 5000</p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50 disabled:opacity-50"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-xl border-2 border-orange-800 bg-orange-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-900 disabled:opacity-50"
            disabled={!canSubmit}
            onClick={() => {
              if (!canSubmit) return;
              void onSubmit(trimmed);
            }}
          >
            {isSubmitting ? "Submitting…" : "Submit dispute"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
