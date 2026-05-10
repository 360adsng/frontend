"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { DisputeMessageDto } from "@endpoint/dispute/disputeChat";
import {
  useAdminDisputeCancelRefund,
  useAdminDisputeComplete,
  useDisputeMessages,
  usePostDisputeMessage,
} from "@endpoint/dispute/useDisputeChat";
import {
  useAdminBillboardBookingRequest,
  useAdminInfluencerBookingRequest,
} from "@endpoint/admin/useAdminBookingRequests";
import type {
  AdminBillboardRequestDetail,
  AdminInfluencerRequestDetail,
} from "@endpoint/admin/adminBookingRequests";
import type { InfluencerBooking } from "@endpoint/influencer/influencer";
import type { BillboardBooking } from "@endpoint/billboard/billboard";
import {
  useBillboardBooking,
  useVendorBillboardBooking,
} from "@endpoint/billboard/useBillboard";
import {
  useInfluencerBooking,
  useVendorInfluencerBooking,
} from "@endpoint/influencer/useInfluencer";
import {
  formatDateShort,
  resolveDisputeNoticePhase,
  type DisputeNoticePhase,
} from "@components/campaign/CampaignDetailShared";
import { Modal } from "@components/modal/modal";

function formatChatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function bubbleLabel(m: DisputeMessageDto): string {
  if (m.isMine) {
    if (m.senderRole === "admin") return "You · Platform";
    if (m.senderRole === "vendor") return "You · Vendor";
    return "You · Campaign owner";
  }
  if (m.senderRole === "admin") return "Platform";
  if (m.senderRole === "vendor") return "Vendor";
  return "Campaign owner";
}

export type BookingDisputePortal = "admin" | "vendor" | "booker";
export type BookingDisputeKind = "influencer" | "billboard";

function disputePhaseFromBooking(b: unknown): DisputeNoticePhase | null {
  if (!b || typeof b !== "object") return null;
  const o = b as {
    status?: string;
    paymentStatus?: string;
    disputedAt?: string | null;
    disputeReason?: string | null;
    disputeChatHasThread?: boolean | null;
  };
  return resolveDisputeNoticePhase({
    bookingStatus: o.status ?? null,
    paymentStatus: o.paymentStatus ?? null,
    disputedAt: o.disputedAt ?? null,
    disputeReason: o.disputeReason ?? null,
    disputeChatHasThread: o.disputeChatHasThread ?? null,
  });
}

function headlineFor(
  portal: BookingDisputePortal,
  bookingKind: BookingDisputeKind,
  b: unknown,
): string {
  const kindLabel =
    bookingKind === "billboard" ? "Billboard booking" : "Influencer booking";
  if (!b || typeof b !== "object") return kindLabel;
  const row = b as Record<string, unknown>;
  const bid =
    typeof row.id === "number" ? row.id : Number(row.id) || 0;

  if (bookingKind === "influencer") {
    if (portal === "admin") {
      const d = b as AdminInfluencerRequestDetail;
      const p = d.influencerProfile;
      const fromName = [p?.firstName, p?.lastName]
        .filter(Boolean)
        .join(" ")
        .trim();
      return fromName || p?.mediaName || `${kindLabel} #${bid}`;
    }
    const d = b as InfluencerBooking;
    const inf = d.influencer;
    const fromName = [inf?.firstName, inf?.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    return fromName || inf?.mediaName || `${kindLabel} #${bid}`;
  }

  const bb = b as BillboardBooking;
  return bb.listing?.name?.trim() || `${kindLabel} #${bid}`;
}

export function BookingDisputeChatRoom({
  portal,
  bookingKind,
  id,
}: {
  portal: BookingDisputePortal;
  bookingKind: BookingDisputeKind;
  id: number;
}) {
  const valid = Number.isFinite(id) && id > 0;

  const adminInf = useAdminInfluencerBookingRequest(
    valid && portal === "admin" && bookingKind === "influencer" ? id : null,
  );
  const adminBb = useAdminBillboardBookingRequest(
    valid && portal === "admin" && bookingKind === "billboard" ? id : null,
  );
  const vendorInf = useVendorInfluencerBooking(
    valid && portal === "vendor" && bookingKind === "influencer" ? id : null,
  );
  const vendorBb = useVendorBillboardBooking(
    valid && portal === "vendor" && bookingKind === "billboard" ? id : null,
  );
  const bookerInf = useInfluencerBooking(
    valid && portal === "booker" && bookingKind === "influencer" ? id : null,
  );
  const bookerBb = useBillboardBooking(
    valid && portal === "booker" && bookingKind === "billboard" ? id : null,
  );

  const q =
    portal === "admin"
      ? bookingKind === "influencer"
        ? adminInf
        : adminBb
      : portal === "vendor"
        ? bookingKind === "influencer"
          ? vendorInf
          : vendorBb
        : bookingKind === "influencer"
          ? bookerInf
          : bookerBb;

  const b = q.data;

  const shellBg =
    bookingKind === "billboard" ? "bg-ads360-hash" : "bg-[#E9E9E9]";

  const back =
    portal === "admin"
      ? bookingKind === "billboard"
        ? ({
            to: "/admin/request/billboard/$id",
            params: { id: String(id) },
          } as const)
        : ({
            to: "/admin/request/influencer/$id",
            params: { id: String(id) },
          } as const)
      : portal === "vendor"
        ? bookingKind === "billboard"
          ? ({
              to: "/vendors/billboards/requests/$slug",
              params: { slug: String(id) },
            } as const)
          : ({
              to: "/vendors/influencers/requests/$slug",
              params: { slug: String(id) },
            } as const)
        : bookingKind === "billboard"
          ? ({
              to: "/users/campaign/$slug",
              params: { slug: String(id) },
            } as const)
          : ({
              to: "/users/campaign/influencer/$id",
              params: { id: String(id) },
            } as const);

  const backLabel =
    portal === "booker"
      ? "← Back to campaign details"
      : "← Back to request details";

  const disputePhase = b ? disputePhaseFromBooking(b) : null;
  const disputeOpen = disputePhase === "active";
  const chatAccessible = disputePhase !== null;

  const kindLabel =
    bookingKind === "billboard" ? "Billboard booking" : "Influencer booking";

  const headline = headlineFor(portal, bookingKind, b);

  const chatEnabled = Boolean(valid && b && chatAccessible);
  const messagesQ = useDisputeMessages(bookingKind, id, chatEnabled);
  const postMessage = usePostDisputeMessage(bookingKind, id);
  const adminComplete = useAdminDisputeComplete(bookingKind, id);
  const adminCancelRefund = useAdminDisputeCancelRefund(bookingKind, id);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [refundNoteDraft, setRefundNoteDraft] = useState("");

  useEffect(() => {
    if (!disputeOpen) {
      setCompleteModalOpen(false);
      setRefundModalOpen(false);
    }
  }, [disputeOpen]);

  useEffect(() => {
    if (!refundModalOpen) setRefundNoteDraft("");
  }, [refundModalOpen]);
  const [draft, setDraft] = useState("");
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const pendingPreviewUrl = useMemo(
    () => (pendingImage ? URL.createObjectURL(pendingImage) : null),
    [pendingImage],
  );

  useEffect(() => {
    const u = pendingPreviewUrl;
    return () => {
      if (u) URL.revokeObjectURL(u);
    };
  }, [pendingPreviewUrl]);

  const canSend =
    disputeOpen &&
    (draft.trim().length > 0 || Boolean(pendingImage?.size));

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesQ.data?.messages?.length]);

  async function handleSend() {
    if (!disputeOpen || !canSend || postMessage.isPending) return;
    try {
      await postMessage.mutateAsync({ body: draft, image: pendingImage });
      setDraft("");
      setPendingImage(null);
    } catch {
      /* Error toast from usePostDisputeMessage; keep draft for retry */
    }
  }

  return (
    <section className={`min-h-[70vh] px-4 py-10 md:px-10 ${shellBg}`}>
      <div className="mx-auto max-w-3xl">
        <Link
          {...back}
          className="text-sm font-medium text-stone-600 underline-offset-2 hover:text-stone-900 hover:underline"
        >
          {backLabel}
        </Link>

        {!valid ? (
          <p className="mt-8 text-sm text-red-700">Invalid request id.</p>
        ) : null}

        {valid && q.isLoading ? (
          <p className="mt-8 text-stone-600">Loading…</p>
        ) : null}
        {valid && q.isError ? (
          <p className="mt-8 text-red-700">
            {q.error instanceof Error ? q.error.message : "Failed to load."}
          </p>
        ) : null}

        {valid && b && !chatAccessible ? (
          <div className="mt-8 rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
            <p className="text-stone-800">
              This request is not in an active dispute. Open the campaign or
              request details for full context.
            </p>
            <Link
              {...back}
              className="mt-4 inline-flex text-sm font-semibold text-ads360yellow-100 hover:underline"
            >
              Go to NG#{b.id}
            </Link>
          </div>
        ) : null}

        {valid && b && chatAccessible ? (
          <div className="mt-8 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                Dispute chat
              </p>
              <h1 className="mt-1 font-serif text-2xl text-stone-900 md:text-3xl">
                {headline}
              </h1>
              <p className="mt-1 text-sm text-stone-600">
                NG#{b.id} · {kindLabel}.{" "}
                {disputeOpen ? (
                  <>
                    Campaign owner, vendor, and platform admins may post in this
                    thread while the dispute is open.
                  </>
                ) : (
                  <>
                    This dispute thread is closed for new messages. Past messages
                    are shown below — open the booking for current status,
                    settlement, and refund details.
                  </>
                )}
              </p>
            </div>

            {portal === "admin" && disputeOpen ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-900">
                  Resolve dispute
                </p>
                <p className="mt-1 text-sm text-stone-700">
                  Complete releases funds to the vendor (same outcome as when the
                  campaign owner confirms). Cancel refunds the campaign owner via
                  the original payment route (wallet or card).
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={
                      adminComplete.isPending ||
                      adminCancelRefund.isPending
                    }
                    onClick={() => setCompleteModalOpen(true)}
                    className="rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {adminComplete.isPending ? "Completing…" : "Complete request"}
                  </button>
                  <button
                    type="button"
                    disabled={
                      adminComplete.isPending ||
                      adminCancelRefund.isPending
                    }
                    onClick={() => setRefundModalOpen(true)}
                    className="rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-800 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {adminCancelRefund.isPending
                      ? "Processing refund…"
                      : "Cancel & refund"}
                  </button>
                </div>
              </div>
            ) : null}

            {portal === "admin" && disputeOpen ? (
              <>
                <Modal isOpen={completeModalOpen}>
                  <div className="mx-auto max-h-[85vh] w-11/12 max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lg md:w-full">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <h2 className="font-serif text-lg font-medium text-stone-900">
                        Complete request
                      </h2>
                      <button
                        type="button"
                        className="text-2xl leading-none text-stone-400 hover:text-stone-700 disabled:opacity-40"
                        onClick={() => {
                          if (adminComplete.isPending) return;
                          setCompleteModalOpen(false);
                        }}
                        disabled={adminComplete.isPending}
                        aria-label="Close"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm text-stone-600">
                      This marks the campaign as completed and releases payment to
                      the vendor (same outcome as when the campaign owner
                      confirms delivery). This cannot be undone from this screen.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-end gap-3">
                      <button
                        type="button"
                        className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50 disabled:opacity-50"
                        onClick={() => setCompleteModalOpen(false)}
                        disabled={adminComplete.isPending}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        className="rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={adminComplete.isPending}
                        onClick={async () => {
                          try {
                            await adminComplete.mutateAsync();
                            setCompleteModalOpen(false);
                          } catch {
                            /* toast from hook */
                          }
                        }}
                      >
                        {adminComplete.isPending
                          ? "Completing…"
                          : "Yes, complete & pay vendor"}
                      </button>
                    </div>
                  </div>
                </Modal>

                <Modal isOpen={refundModalOpen}>
                  <div className="mx-auto max-h-[85vh] w-11/12 max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-lg md:w-full">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <h2 className="font-serif text-lg font-medium text-stone-900">
                        Cancel & refund
                      </h2>
                      <button
                        type="button"
                        className="text-2xl leading-none text-stone-400 hover:text-stone-700 disabled:opacity-40"
                        onClick={() => {
                          if (adminCancelRefund.isPending) return;
                          setRefundModalOpen(false);
                        }}
                        disabled={adminCancelRefund.isPending}
                        aria-label="Close"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm text-stone-600">
                      This cancels the booking and refunds the campaign owner
                      through the original payment method (wallet balance or
                      Flutterwave / card), consistent with a vendor rejection.
                    </p>
                    <label className="mt-4 block">
                      <span className="text-xs font-medium text-stone-600">
                        Optional note (stored on the refund record)
                      </span>
                      <textarea
                        className="mt-1.5 min-h-[88px] w-full resize-y rounded-xl border border-stone-200 p-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        value={refundNoteDraft}
                        onChange={(e) => setRefundNoteDraft(e.target.value)}
                        disabled={adminCancelRefund.isPending}
                        placeholder="e.g. Platform decision after review…"
                        maxLength={500}
                      />
                    </label>
                    <div className="mt-6 flex flex-wrap justify-end gap-3">
                      <button
                        type="button"
                        className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50 disabled:opacity-50"
                        onClick={() => setRefundModalOpen(false)}
                        disabled={adminCancelRefund.isPending}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        className="rounded-xl border-2 border-red-600 bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={adminCancelRefund.isPending}
                        onClick={async () => {
                          try {
                            await adminCancelRefund.mutateAsync({
                              reason: refundNoteDraft.trim() || undefined,
                            });
                            setRefundModalOpen(false);
                          } catch {
                            /* toast from hook */
                          }
                        }}
                      >
                        {adminCancelRefund.isPending
                          ? "Processing…"
                          : "Confirm cancel & refund"}
                      </button>
                    </div>
                  </div>
                </Modal>
              </>
            ) : null}

            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <div className="border-b border-stone-100 bg-stone-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Conversation
                </p>
              </div>

              <div className="max-h-[min(420px,55vh)] space-y-4 overflow-y-auto p-4">
                <div className="rounded-xl border border-orange-200 bg-orange-50/80 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-orange-800">
                    Initial dispute{" "}
                    {!disputeOpen ? (
                      <span className="font-sans font-normal normal-case text-stone-600">
                        (archived thread)
                      </span>
                    ) : null}
                    {"disputedAt" in b && b.disputedAt ? (
                      <span className="ml-2 font-sans font-normal normal-case text-stone-600">
                        · {formatDateShort(b.disputedAt as string)}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-stone-900">
                    {String(b.disputeReason ?? "").trim() ||
                      "No written reason was provided for this dispute."}
                  </p>
                </div>

                {messagesQ.isLoading ? (
                  <p className="text-center text-sm text-stone-500">
                    Loading messages…
                  </p>
                ) : null}
                {messagesQ.isError ? (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-800">
                    {messagesQ.error instanceof Error
                      ? messagesQ.error.message
                      : "Could not load messages."}
                  </p>
                ) : null}

                {(messagesQ.data?.messages ?? []).map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                        m.isMine
                          ? "bg-amber-100 text-stone-900"
                          : "border border-stone-200 bg-stone-50 text-stone-900"
                      }`}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-500">
                        {bubbleLabel(m)}
                        <span className="ml-2 font-normal normal-case text-stone-400">
                          {formatChatTime(m.createdAt)}
                        </span>
                      </p>
                      {m.imageUrl ? (
                        <a
                          href={m.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 block overflow-hidden rounded-lg"
                        >
                          <img
                            src={m.imageUrl}
                            alt=""
                            className="max-h-64 w-full object-contain"
                          />
                        </a>
                      ) : null}
                      {m.body?.trim() ? (
                        <p className="mt-2 whitespace-pre-wrap leading-relaxed">
                          {m.body}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
                <div ref={scrollAnchorRef} className="h-px w-full shrink-0" />
              </div>

              <div className="border-t border-stone-200 bg-stone-50/90 p-4">
                {disputeOpen ? (
                  <>
                    <label htmlFor="dispute-chat-input" className="sr-only">
                      Message
                    </label>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null;
                        setPendingImage(f);
                        e.target.value = "";
                      }}
                    />
                    {pendingPreviewUrl ? (
                      <div className="relative mb-3 inline-block">
                        <img
                          src={pendingPreviewUrl}
                          alt=""
                          className="max-h-36 rounded-lg border border-stone-200 object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => setPendingImage(null)}
                          disabled={postMessage.isPending}
                          className="absolute right-1 top-1 rounded-full bg-stone-900/75 px-2 py-0.5 text-xs text-white hover:bg-stone-900"
                        >
                          Remove
                        </button>
                      </div>
                    ) : null}
                    <textarea
                      id="dispute-chat-input"
                      rows={3}
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="Write a message… (optional if you attach an image)"
                      className="w-full resize-y rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      disabled={postMessage.isPending}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          !e.shiftKey &&
                          canSend &&
                          !postMessage.isPending
                        ) {
                          e.preventDefault();
                          void handleSend();
                        }
                      }}
                    />
                    <p className="mt-2 text-[11px] text-stone-500">
                      Images up to 5MB (JPEG, PNG, WebP, GIF).
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        disabled={postMessage.isPending}
                        onClick={() => imageInputRef.current?.click()}
                        className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-50 disabled:opacity-50"
                      >
                        Attach image
                      </button>
                      <button
                        type="button"
                        disabled={postMessage.isPending || !canSend}
                        onClick={() => void handleSend()}
                        className="rounded-xl bg-ads360yellow-100 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {postMessage.isPending ? "Sending…" : "Send"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl border border-stone-200 bg-stone-100/90 px-4 py-5 text-center">
                    <p className="text-sm font-semibold text-stone-800">
                      This dispute thread is closed
                    </p>
                    <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                      New replies and uploads are disabled for everyone —
                      completion or refund already resolved this dispute. Messages
                      above remain visible for audit.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
