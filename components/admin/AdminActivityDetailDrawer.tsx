"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import type { AdminActivityLogItem } from "@endpoint/admin/admin";

function humanizeKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function MetadataValue({ value }: { value: unknown }) {
  if (value === null || value === undefined) {
    return <span className="text-stone-400">—</span>;
  }
  if (typeof value === "boolean") {
    return <span>{value ? "Yes" : "No"}</span>;
  }
  if (typeof value === "number") {
    return <span className="tabular-nums">{value}</span>;
  }
  if (typeof value === "string") {
    return <span className="break-words">{value}</span>;
  }
  if (Array.isArray(value)) {
    return (
      <pre className="max-h-48 overflow-auto rounded-lg bg-stone-50 p-3 font-mono text-xs leading-relaxed text-stone-700">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }
  if (typeof value === "object") {
    return (
      <pre className="max-h-64 overflow-auto rounded-lg bg-stone-50 p-3 font-mono text-xs leading-relaxed text-stone-700">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  }
  return <span>{String(value)}</span>;
}

function MetadataFields({
  meta,
}: {
  meta: Record<string, unknown> | null;
}) {
  if (meta == null || Object.keys(meta).length === 0) {
    return (
      <p className="text-sm text-stone-500">
        No structured metadata was recorded for this event.
      </p>
    );
  }

  return (
    <dl className="space-y-5">
      {Object.entries(meta).map(([key, value]) => (
        <div key={key}>
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            {humanizeKey(key)}
          </dt>
          <dd className="mt-1.5">
            <MetadataValue value={value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function AdminActivityDetailDrawer({
  open,
  onClose,
  row,
  actionLabel,
}: {
  open: boolean;
  onClose: () => void;
  row: AdminActivityLogItem | null;
  actionLabel: string;
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

  if (!mounted || !open || !row) return null;

  const subtitle = [
    new Date(row.createdAt).toLocaleString(),
    row.adminEmail ?? `Admin user #${row.adminUserId}`,
    `Log #${row.id}`,
  ].join(" · ");

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
        aria-labelledby="activity-detail-drawer-title"
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-stone-200 px-5 py-4">
          <div className="min-w-0">
            <h2
              id="activity-detail-drawer-title"
              className="font-serif text-lg text-stone-900"
            >
              {actionLabel}
            </h2>
            <p className="mt-1 text-xs text-stone-500">{subtitle}</p>
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
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <section>
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
              Details
            </h3>
            <div className="mt-3">
              <MetadataFields meta={row.metadata} />
            </div>
          </section>
          <section className="mt-8 border-t border-stone-100 pt-6">
            <h3 className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
              Raw JSON
            </h3>
            <pre className="mt-2 max-h-40 overflow-auto rounded-lg border border-stone-200 bg-stone-50 p-3 font-mono text-[11px] leading-relaxed text-stone-700">
              {row.metadata == null || Object.keys(row.metadata).length === 0
                ? "null"
                : JSON.stringify(row.metadata, null, 2)}
            </pre>
          </section>
        </div>
      </aside>
    </>,
    document.body,
  );
}
