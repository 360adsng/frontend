"use client";

import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useCompleteInfluencerBooking,
  useDisputeInfluencerBooking,
  useInfluencerBooking,
} from "@endpoint/influencer/useInfluencer";
import CreativeMedia from "@components/ui/CreativeMedia";
import {
  CampaignDisputeNotice,
  CampaignPaymentStatusBadge,
  CampaignStatusBadge,
  disputeNoticeChatLinkClassNames,
  disputeNoticeHeaderPillClassNames,
  formatCampaignMoney,
  formatDateRange,
  InfoCard,
  MediaFrame,
  resolveDisputeNoticePhase,
  SectionLabel,
} from "@components/campaign/CampaignDetailShared";
import { CampaignDisputeModal } from "@components/campaign/CampaignDisputeModal";
import { CalendarDays, NairaIcon } from "@components/campaign/CampaignIcons";

function formatInfluencerType(raw: string | null | undefined): string {
  const s = String(raw ?? "").trim();
  if (!s) return "";
  return s
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function InfluencerCampaignDetail() {
  const { id: idParam } = Route.useParams();
  const id = Number(idParam);
  const booking = useInfluencerBooking(
    Number.isFinite(id) && id > 0 ? id : null,
  );
  const complete = useCompleteInfluencerBooking();
  const disputeBooking = useDisputeInfluencerBooking();
  const [disputeOpen, setDisputeOpen] = useState(false);
  const b = booking.data;
  const inf = b?.influencer;

  const isPaid = b?.paymentStatus === "paid" || b?.status === "paid";
  const canComplete =
    Boolean(b) &&
    isPaid &&
    b?.paymentStatus !== "refunded" &&
    String(b?.status ?? "").toLowerCase() === "active";

  const disputePhase = b
    ? resolveDisputeNoticePhase({
        bookingStatus: b.status ?? null,
        paymentStatus: b.paymentStatus ?? null,
        disputedAt: b.disputedAt ?? null,
        disputeReason: b.disputeReason ?? null,
        disputeChatHasThread: b.disputeChatHasThread ? true : false,
      })
    : null;
  const showDisputeBanner = disputePhase !== null;

  const legalName =
    inf?.firstName || inf?.lastName
      ? `${inf.firstName ?? ""} ${inf.lastName ?? ""}`.trim()
      : "";

  return (
    <section className="min-h-screen bg-[#E9E9E9] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        {booking.isLoading && (
          <p className="text-center text-stone-600">Loading…</p>
        )}
        {booking.isError && (
          <p className="text-center text-red-600">Unable to load campaign</p>
        )}

        {!booking.isLoading && !booking.isError && b && (
          <div className="overflow-hidden rounded-2xl border border-amber-200/40 bg-white shadow-sm">
            <header className="flex flex-col gap-3 border-b border-stone-100 px-5 pt-6 pb-4 sm:flex-row sm:items-start sm:justify-between sm:px-7">
              <div>
                <h1 className="font-serif text-2xl font-medium tracking-tight text-stone-900 md:text-3xl">
                  Influencer campaign
                </h1>
                <p className="mt-1.5 text-sm text-stone-500">
                  ID: NG#{b.id} ·{" "}
                  {formatDateRange(b.campaignStartDate, b.campaignEndDate)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-end sm:self-start sm:justify-end">
                <CampaignStatusBadge status={b.status} />
                <CampaignPaymentStatusBadge paymentStatus={b.paymentStatus} />
                {showDisputeBanner ? (
                  <Link
                    to="/users/campaign/influencer/$id/dispute-chat"
                    params={{ id: String(b.id) }}
                    className={`${disputeNoticeHeaderPillClassNames(disputePhase)}`}
                  >
                    {disputePhase === "active"
                      ? "Open dispute chat"
                      : "View dispute chat"}
                  </Link>
                ) : null}
                <Link
                  to="/users/campaign"
                  search={{ tab: "influencer" }}
                  className="text-xl leading-none text-stone-400 transition hover:text-stone-700"
                  aria-label="Back to campaigns"
                >
                  ×
                </Link>
              </div>
            </header>

            <div className="px-5 pt-5 sm:px-7">
              <h2 className="font-serif text-xl text-stone-900 md:text-2xl">
                {inf?.mediaName ?? "Influencer"}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700">
                  Influencer
                </span>
                {inf?.influencerType ? (
                  <span className="rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-xs text-stone-600">
                    {formatInfluencerType(inf.influencerType)}
                  </span>
                ) : null}
                <span className="rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-xs text-stone-600">
                  {b.durationPlan}
                </span>
              </div>
            </div>

            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-7">
              <InfoCard
                icon={<NairaIcon />}
                label="Total budget"
                value={formatCampaignMoney(
                  b.negotiatedAmount ?? b.quotedTotal,
                  "NGN",
                )}
                sub="Agreed or quoted price for this booking"
              />
              <InfoCard
                icon={<CalendarDays />}
                label="Campaign duration"
                value={formatDateRange(b.campaignStartDate, b.campaignEndDate)}
                sub={`Billable days: ${b.billableDays} · Plan: ${b.durationPlan}`}
              />
            </div>

            <div className="px-5 pb-6 sm:px-7">
              <div className="rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5">
                <SectionLabel>Influencer</SectionLabel>
                {inf ? (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="shrink-0">
                      {inf.photo ? (
                        <img
                          src={inf.photo}
                          alt={inf.mediaName}
                          className="h-28 w-28 rounded-xl border border-stone-200 object-cover sm:h-32 sm:w-32"
                        />
                      ) : (
                        <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-ads360yellow-100 text-2xl font-serif text-white sm:h-32 sm:w-32">
                          {inf.mediaName.slice(0, 1).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <p className="font-semibold text-stone-900">
                        {inf.mediaName}
                      </p>
                      {legalName ? (
                        <p className="text-sm text-stone-600">{legalName}</p>
                      ) : null}
                      {inf.bio?.trim() ? (
                        <p className="text-sm leading-relaxed text-stone-700 whitespace-pre-wrap">
                          {inf.bio.trim()}
                        </p>
                      ) : (
                        <p className="text-sm text-stone-500">No bio provided.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-stone-500">No profile details</p>
                )}
              </div>
            </div>

            {b.platforms.length > 0 ? (
              <div className="px-5 pb-6 sm:px-7">
                <div className="rounded-2xl border border-stone-200/80 bg-white p-5">
                  <SectionLabel>Platforms for this campaign</SectionLabel>
                  <ul className="mt-2 space-y-3">
                    {b.platforms.map((p) => (
                      <li
                        key={p.id}
                        className="flex flex-col gap-1 rounded-lg border border-stone-100 bg-stone-50/80 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-medium text-stone-900">{p.name}</p>
                          <p className="text-stone-600">@{p.username}</p>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600">
                          <span>
                            {p.numberOfFollowers.toLocaleString()} followers
                          </span>
                          <span>
                            {formatCampaignMoney(p.amountRate, "NGN")} / unit
                          </span>
                          {p.estimatedImpressions ? (
                            <span>
                              ~{p.estimatedImpressions.toLocaleString()} est.
                              impressions
                            </span>
                          ) : null}
                        </div>
                        {p.platformUrl?.trim() ? (
                          <a
                            href={p.platformUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-ads360yellow-100 hover:underline"
                          >
                            Open profile
                          </a>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {b.message?.trim() ? (
              <div className="px-5 pb-6 sm:px-7">
                <div className="rounded-lg border border-stone-100 bg-stone-50/80 p-4">
                  <p className="text-xs font-medium text-stone-500">Your brief</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-stone-800">
                    {b.message}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="grid gap-4 px-5 pb-6 sm:grid-cols-2 sm:px-7">
              <MediaFrame title="Campaign creative">
                <CreativeMedia
                  creativeKind={b.creativeKind}
                  creativeImageUrl={b.creativeImageUrl}
                  creativeVideoUrl={b.creativeVideoUrl}
                  hideActions
                  className="w-full"
                  emptyMessage={
                    b.creativeKind === "none"
                      ? "No creative file for this booking (none selected)."
                      : undefined
                  }
                />
              </MediaFrame>

              <MediaFrame title="Active proof">
                {b.activeProofImageUrl ? (
                  <img
                    src={b.activeProofImageUrl}
                    alt="Proof of activation"
                    className="max-h-64 w-full rounded-lg object-contain"
                  />
                ) : (
                  <p className="py-8 text-center text-sm text-stone-500">
                    The influencer has not uploaded activation proof yet
                  </p>
                )}
              </MediaFrame>
            </div>

            {showDisputeBanner && disputePhase !== null ? (
              <div className="px-5 pb-4 sm:px-7">
                <CampaignDisputeNotice
                  disputeReason={b.disputeReason ?? null}
                  disputedAt={b.disputedAt ?? null}
                  bookingStatus={b.status ?? null}
                  paymentStatus={b.paymentStatus ?? null}
                  disputeChatHasThread={b.disputeChatHasThread}
                  chatLink={
                    <Link
                      to="/users/campaign/influencer/$id/dispute-chat"
                      params={{ id: String(id) }}
                      className={disputeNoticeChatLinkClassNames(disputePhase)}
                    >
                      {disputePhase === "active"
                        ? "Open dispute chat"
                        : "View dispute chat"}
                    </Link>
                  }
                />
              </div>
            ) : null}

            {canComplete && (
              <div className="flex flex-wrap justify-end gap-3 border-t border-stone-100 px-5 py-5 sm:px-7">
                <button
                  type="button"
                  disabled={disputeBooking.isPending}
                  onClick={() => setDisputeOpen(true)}
                  className="rounded-xl border-2 border-orange-800 bg-white px-5 py-2.5 text-sm font-semibold text-orange-950 transition hover:bg-orange-50 disabled:opacity-50"
                >
                  Dispute
                </button>
                <button
                  type="button"
                  disabled={complete.isPending}
                  onClick={() => {
                    if (!Number.isFinite(id) || id <= 0) return;
                    void complete.mutateAsync(id);
                  }}
                  className="rounded-xl border-2 border-stone-900 bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-50"
                >
                  {complete.isPending ? "Completing…" : "Complete campaign"}
                </button>
              </div>
            )}

            <CampaignDisputeModal
              isOpen={disputeOpen}
              onClose={() => setDisputeOpen(false)}
              isSubmitting={disputeBooking.isPending}
              title="Dispute influencer campaign"
              onSubmit={async (reason) => {
                if (!Number.isFinite(id) || id <= 0) return;
                await disputeBooking.mutateAsync({ bookingId: id, reason });
                setDisputeOpen(false);
              }}
            />

            <div className="px-5 pb-6 sm:px-7">
              <Link
                to="/users/campaign"
                search={{ tab: "influencer" }}
                className="text-sm font-medium text-ads360yellow-100"
              >
                ← Back to campaigns
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export const Route = createFileRoute(
  "/_usersauth/users/campaign/influencer/$id/",
)({
  component: InfluencerCampaignDetail,
});

export default InfluencerCampaignDetail;
