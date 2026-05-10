"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

export function TransactionDescriptionDrawer({
  open,
  onClose,
  title,
  subtitle,
  description,
  reason,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  description: string;
  /** From metadata.reason and similar keys when present. */
  reason?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <>
      <button
        type="button"
        className="fixed inset-0 z-[200] cursor-default bg-stone-900/40 transition-opacity duration-200"
        aria-label="Dismiss"
        onClick={onClose}
      />
      <aside
        className="fixed inset-y-0 right-0 z-[201] flex w-full max-w-lg flex-col border-l border-stone-200 bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tx-desc-drawer-title"
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-stone-200 px-5 py-4">
          <div className="min-w-0">
            <h2
              id="tx-desc-drawer-title"
              className="font-serif text-lg text-stone-900"
            >
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-1 text-xs text-stone-500">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
            aria-label="Close"
          >
            <FiX className="h-5 w-5" aria-hidden />
          </button>
        </header>
        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-4">
          <section>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
              Description
            </h3>
            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-stone-800">
              {description.trim() ? description : "—"}
            </p>
          </section>
          {reason?.trim() ? (
            <section>
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                Reason
              </h3>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-stone-800">
                {reason.trim()}
              </p>
            </section>
          ) : null}
        </div>
      </aside>
    </>,
    document.body,
  );
}
