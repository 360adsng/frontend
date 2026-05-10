"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Modal } from "@components/modal/modal";
import { parseSupportTicketId } from "@endpoint/support/support";
import type { SupportTicketStatus } from "@endpoint/support/support";
import {
  useAdminAddSupportMessage,
  useAdminPatchTicketStatus,
  useAdminSupportTicket,
} from "@endpoint/support/useAdminSupport";

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

const STATUS_OPTIONS: { value: SupportTicketStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "pending", label: "Pending" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

type Props = {
  ticketIdParam: string;
  listPath: string;
};

export function AdminTicketThreadPage({ ticketIdParam, listPath }: Props) {
  const idNum = parseSupportTicketId(ticketIdParam);
  if (idNum === null) {
    return (
      <section className="min-h-screen bg-ads360-hash px-4 py-10 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-stone-600">Invalid ticket link.</p>
          <Link
            to={listPath}
            className="mt-4 inline-block text-sm font-medium text-ads360yellow-100"
          >
            ← Back to support
          </Link>
        </div>
      </section>
    );
  }
  return <AdminTicketThreadLoaded idNum={idNum} listPath={listPath} />;
}

function AdminTicketThreadLoaded({
  idNum,
  listPath,
}: {
  idNum: number;
  listPath: string;
}) {
  const { data: ticket, isLoading, isError, refetch } =
    useAdminSupportTicket(idNum);
  const addReply = useAdminAddSupportMessage(idNum);
  const patchStatus = useAdminPatchTicketStatus(idNum);

  const [reply, setReply] = useState("");
  const [replyImage, setReplyImage] = useState<File | null>(null);
  const [replyPreview, setReplyPreview] = useState<string | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxUrl) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxUrl(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxUrl]);

  if (isLoading) {
    return (
      <section className="min-h-screen bg-ads360-hash px-4 py-10 md:px-10">
        <div className="mx-auto max-w-3xl text-center text-sm text-stone-600">
          Loading conversation…
        </div>
      </section>
    );
  }

  if (isError || !ticket) {
    return (
      <section className="min-h-screen bg-ads360-hash px-4 py-10 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-stone-600">Ticket not found.</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-3 block w-full text-sm font-medium text-ads360yellow-100 hover:underline"
          >
            Try again
          </button>
          <Link
            to={listPath}
            className="mt-4 inline-block text-sm font-medium text-ads360yellow-100"
          >
            ← Back to support
          </Link>
        </div>
      </section>
    );
  }

  const sorted = [...ticket.messages].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  const userId = ticket.userId;
  const userEmail = ticket.userEmail;

  return (
    <section className="min-h-screen bg-ads360-hash px-4 py-10 md:px-10">
      <Modal isOpen={!!lightboxUrl}>
        <button
          type="button"
          className="fixed inset-0 z-[10000001] flex cursor-zoom-out items-center justify-center p-4"
          aria-label="Close enlarged image"
          onClick={() => setLightboxUrl(null)}
        >
          <span className="absolute inset-0 bg-black/60" aria-hidden />
          {lightboxUrl ? (
            <img
              src={lightboxUrl}
              alt=""
              className="relative z-10 max-h-[min(90vh,900px)] max-w-[min(95vw,1200px)] cursor-default rounded-lg object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          ) : null}
        </button>
      </Modal>

      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-mono text-stone-500">#{ticket.id}</p>
            <h1 className="font-serif text-xl text-stone-900 md:text-2xl">
              {ticket.title}
            </h1>
            <p className="mt-1 text-sm text-stone-600">
              Priority:{" "}
              <span className="font-medium capitalize">{ticket.priority}</span>
            </p>
            {userId != null ? (
              <p className="mt-2 text-sm text-stone-600">
                User:{" "}
                <Link
                  to="/admin/users/$id"
                  params={{ id: String(userId) }}
                  className="font-medium text-ads360yellow-100 hover:underline"
                >
                  #{userId}
                </Link>
                {userEmail ? (
                  <span className="text-stone-500"> · {userEmail}</span>
                ) : null}
              </p>
            ) : null}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <label className="text-xs font-medium text-stone-600">
                Status
              </label>
              <select
                className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-900"
                value={ticket.status}
                disabled={patchStatus.isPending}
                onChange={(e) => {
                  const next = e.target.value as SupportTicketStatus;
                  if (next === ticket.status) return;
                  patchStatus.mutate(next);
                }}
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Link
            to={listPath}
            className="text-sm font-medium text-ads360yellow-100 hover:underline"
          >
            ← Back to tickets
          </Link>
        </div>

        <div className="space-y-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm md:p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Conversation
          </h2>
          <ul className="space-y-4">
            {sorted.map((m) => {
              const isCustomer = m.author === "user";
              return (
                <li
                  key={m.id}
                  className={`flex ${isCustomer ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      isCustomer
                        ? "border border-stone-200 bg-stone-100 text-stone-800"
                        : "border border-amber-200/60 bg-ads360yellow-100/20 text-stone-900"
                    }`}
                  >
                    <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                      <span className="font-semibold text-stone-700">
                        {m.authorLabel}
                      </span>
                      <span>{formatDt(m.createdAt)}</span>
                    </div>
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {m.body}
                    </p>
                    {m.attachmentUrl ? (
                      <div className="mt-3">
                        <button
                          type="button"
                          className="block w-full rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-ads360yellow-100 focus-visible:ring-offset-2"
                          onClick={() => setLightboxUrl(m.attachmentUrl!)}
                          title="Click to enlarge"
                        >
                          <img
                            src={m.attachmentUrl}
                            alt="Attachment"
                            className="max-h-48 w-full cursor-zoom-in rounded-lg border border-stone-200 object-contain transition hover:opacity-95"
                          />
                        </button>
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-stone-100 pt-4">
            <label className="block text-xs font-medium text-stone-600">
              Reply as support
            </label>
            <textarea
              className="mt-2 w-full rounded-xl border border-stone-200 p-3 text-sm"
              rows={3}
              placeholder="Write a message…"
              value={reply}
              disabled={addReply.isPending}
              onChange={(e) => setReply(e.target.value)}
            />
            <label className="mt-3 block text-xs font-medium text-stone-600">
              Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              disabled={addReply.isPending}
              className="mt-1 w-full text-sm text-stone-600"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setReplyImage(f);
                if (replyPreview) URL.revokeObjectURL(replyPreview);
                setReplyPreview(f ? URL.createObjectURL(f) : null);
              }}
            />
            {replyPreview ? (
              <button
                type="button"
                className="mt-2 block w-full max-w-xs rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-ads360yellow-100 focus-visible:ring-offset-2"
                onClick={() => setLightboxUrl(replyPreview)}
                title="Click to enlarge"
              >
                <img
                  src={replyPreview}
                  alt=""
                  className="max-h-32 w-full cursor-zoom-in rounded-lg border border-stone-200 object-contain transition hover:opacity-95"
                />
              </button>
            ) : null}
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                disabled={!reply.trim() || addReply.isPending}
                onClick={async () => {
                  const text = reply.trim();
                  if (!text) return;
                  try {
                    await addReply.mutateAsync({
                      body: text,
                      imageFile: replyImage,
                    });
                    setReply("");
                    setReplyImage(null);
                    if (replyPreview) URL.revokeObjectURL(replyPreview);
                    setReplyPreview(null);
                  } catch {
                    /* toast in hook */
                  }
                }}
                className="rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                {addReply.isPending ? "Sending…" : "Send reply"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
