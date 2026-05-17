"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AdminVerifyFlutterwavePaymentButton } from "@components/admin/AdminVerifyFlutterwavePaymentButton";
import { useAdminInfluencerBookingRequest } from "@endpoint/admin/useAdminBookingRequests";
import type { AdminBriefUser } from "@endpoint/admin/adminBookingRequests";
import CreativeMedia from "@components/ui/CreativeMedia";
import {
  CampaignDisputeNotice,
  CampaignPaymentStatusBadge,
  CampaignStatusBadge,
  disputeNoticeChatLinkClassNames,
  disputeNoticeHeaderPillClassNames,
  formatCampaignMoney,
  formatDateRange,
  formatDateShort,
  InfoCard,
  MediaFrame,
  resolveDisputeNoticePhase,
  SectionLabel,
} from "@components/campaign/CampaignDetailShared";
import { CalendarDays, NairaIcon } from "@components/campaign/CampaignIcons";

function adminPersonLabel(u: AdminBriefUser | null): string {
  if (!u) return "";
  return u.email?.trim() || `User #${u.id}`;
}

function adminPersonInitial(u: AdminBriefUser | null): string {
  const s = adminPersonLabel(u);
  return !s ? "?" : s.slice(0, 1).toUpperCase();
}

function hasMeaningfulText(v: unknown): boolean {
  if (v == null) return false;
  const s = String(v).trim();
  if (!s) return false;
  return s !== "—" && s !== "___" && s.toLowerCase() !== "n/a";
}

function AdminInfluencerRequestDetailPage() {
  const { id: idParam } = Route.useParams();
  const id = Number.parseInt(idParam, 10);
  const valid = Number.isFinite(id) && id > 0;
  const booking = useAdminInfluencerBookingRequest(valid ? id : null);
  const b = booking.data;

  const isRejected = String(b?.status ?? "").toLowerCase() === "rejected";
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
  const creativeUrl =
    String(b?.creativeKind ?? "").toLowerCase() === "video"
      ? b?.creativeVideoUrl?.trim() ?? ""
      : b?.creativeImageUrl?.trim() ?? "";
  const canDownload = String(b?.creativeKind ?? "").toLowerCase() !== "video";

  const inf = b?.influencerProfile;
  const displayTitle = inf
    ? [inf.firstName, inf.lastName].filter(Boolean).join(" ").trim() ||
      inf.mediaName
    : null;

  async function copyCreative() {
    if (!creativeUrl) {
      toast.error("No creative URL");
      return;
    }
    try {
      await navigator.clipboard.writeText(creativeUrl);
      toast.success("Copied");
    } catch {
      toast.error("Unable to copy");
    }
  }

  return (
    <section className="min-h-screen bg-[#E9E9E9] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        {!valid ? (
          <p className="rounded-2xl border border-red-200 bg-white p-4 text-center text-red-700">
            Invalid request id.
          </p>
        ) : null}

        {valid && booking.isLoading ? (
          <p className="text-center text-stone-600">Loading…</p>
        ) : null}
        {valid && booking.isError ? (
          <p className="text-center text-red-600">Unable to load request</p>
        ) : null}

        {valid && b && (
          <div className="overflow-hidden rounded-2xl border border-amber-200/40 bg-white shadow-sm">
            <header className="flex flex-col gap-3 border-b border-stone-100 px-5 pt-6 pb-4 sm:flex-row sm:items-start sm:justify-between sm:px-7">
              <div>
                <h1 className="font-serif text-2xl font-medium tracking-tight text-stone-900 md:text-3xl">
                  Campaign details
                </h1>
                <p className="mt-1.5 text-sm text-stone-500">
                  Admin · ID NG#{b.id} ·{" "}
                  {formatDateRange(b.campaignStartDate, b.campaignEndDate)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-end sm:self-start sm:justify-end">
                <CampaignStatusBadge status={b.status} />
                <CampaignPaymentStatusBadge paymentStatus={b.paymentStatus} />
                {showDisputeBanner ? (
                  <Link
                    to="/admin/request/influencer/$id/dispute-chat"
                    params={{ id: String(b.id) }}
                    className={`${disputeNoticeHeaderPillClassNames(disputePhase)}`}
                  >
                    {disputePhase === "active"
                      ? "Open dispute chat"
                      : "View dispute chat"}
                  </Link>
                ) : null}
                <Link
                  to="/admin/request"
                  search={{ tab: "influencer" }}
                  className="text-xl leading-none text-stone-400 transition hover:text-stone-700"
                  aria-label="Back to requests"
                >
                  ×
                </Link>
              </div>
            </header>

            <AdminVerifyFlutterwavePaymentButton
              bookingId={b.id}
              kind="influencer"
              booking={b}
              onSuccess={() => void booking.refetch()}
              className="mx-5 border-x-0 border-t-0 sm:mx-7"
            />

            <div className="px-5 pt-5 sm:px-7">
              <h2 className="font-serif text-xl text-stone-900 md:text-2xl">
                {displayTitle ?? inf?.mediaName ?? "Influencer request"}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700">
                  Influencer
                </span>
                {hasMeaningfulText(b.negotiationPhase) ? (
                  <span className="rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-xs font-medium capitalize text-stone-600">
                    {b.negotiationPhase.replace(/_/g, " ")}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-7">
              <InfoCard
                label="Total budget"
                icon={<NairaIcon />}
                value={formatCampaignMoney(
                  Number(b.negotiatedAmount ?? b.quotedTotal),
                  b.currency,
                )}
                sub="Booker’s agreed price"
              />
              {formatDateRange(
                b.campaignStartDate,
                b.campaignEndDate,
              ) !== "—" ? (
                <InfoCard
                  label="Campaign duration"
                  icon={<CalendarDays />}
                  value={formatDateRange(
                    b.campaignStartDate,
                    b.campaignEndDate,
                  )}
                  sub={
                    hasMeaningfulText(b.durationPlan)
                      ? `Plan: ${b.durationPlan}`
                      : undefined
                  }
                />
              ) : null}
            </div>

            {showDisputeBanner && disputePhase !== null ? (
              <div className="px-5 pb-5 sm:px-7">
                <CampaignDisputeNotice
                  disputeReason={b.disputeReason ?? null}
                  disputedAt={b.disputedAt ?? null}
                  bookingStatus={b.status ?? null}
                  paymentStatus={b.paymentStatus ?? null}
                  disputeChatHasThread={b.disputeChatHasThread}
                  chatLink={
                    <Link
                      to="/admin/request/influencer/$id/dispute-chat"
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

            <div className="space-y-4 px-5 pb-6 sm:px-7">
              {b.booker ? (
                <div className="rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5">
                  <SectionLabel>Campaign owner (booker)</SectionLabel>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ads360yellow-100 text-lg font-serif text-white">
                      {adminPersonInitial(b.booker)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-stone-900">
                        {adminPersonLabel(b.booker)}
                      </p>
                      <p className="text-sm text-stone-600">{b.booker.email}</p>
                      <Link
                        to="/admin/users/$id"
                        params={{ id: String(b.booker.id) }}
                        className="mt-1 inline-block text-xs font-semibold text-ads360yellow-100 hover:underline"
                      >
                        Open admin user #{b.booker.id}
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}

              {b.vendor ? (
                <div className="rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5">
                  <SectionLabel>Vendor</SectionLabel>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-stone-700 text-lg font-serif text-white">
                      {adminPersonInitial(b.vendor)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-stone-900">
                        {adminPersonLabel(b.vendor)}
                      </p>
                      <p className="text-sm text-stone-600">{b.vendor.email}</p>
                      <Link
                        to="/admin/users/$id"
                        params={{ id: String(b.vendor.id) }}
                        className="mt-1 inline-block text-xs font-semibold text-ads360yellow-100 hover:underline"
                      >
                        Open admin user #{b.vendor.id}
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}

              {b.message?.trim() ? (
                <div className="rounded-2xl border border-amber-200/60 bg-amber-50/40 p-5">
                  <SectionLabel>Note from booker</SectionLabel>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-800">
                    {b.message}
                  </p>
                </div>
              ) : null}
            </div>

            {(() => {
              const hasCreativeAssets = Boolean(
                b.creativeImageUrl?.trim() || b.creativeVideoUrl?.trim(),
              );
              const showCreativeFrame = isRejected || hasCreativeAssets;
              const showInfluencerFrame = Boolean(inf?.profilePicture?.trim());
              const showProofFrame = Boolean(b.activeProofImageUrl?.trim());
              const n =
                Number(showCreativeFrame) +
                Number(showInfluencerFrame) +
                Number(showProofFrame);
              if (n === 0) return null;
              const gridCls =
                n === 1
                  ? "grid grid-cols-1 gap-4"
                  : n === 2
                    ? "grid grid-cols-1 gap-4 sm:grid-cols-2"
                    : "grid grid-cols-1 gap-4 sm:grid-cols-3";
              return (
                <div className={`px-5 pb-6 sm:px-7 ${gridCls}`}>
                  {showCreativeFrame ? (
                    <MediaFrame title="Campaign creative">
                      {isRejected ? (
                        <p className="py-8 text-center text-sm text-stone-600">
                          Creative assets are not available for rejected
                          bookings.
                        </p>
                      ) : (
                        <CreativeMedia
                          creativeKind={b.creativeKind}
                          creativeImageUrl={b.creativeImageUrl}
                          creativeVideoUrl={b.creativeVideoUrl}
                          hideActions
                          className="w-full"
                        />
                      )}
                    </MediaFrame>
                  ) : null}
                  {showInfluencerFrame && inf?.profilePicture ? (
                    <MediaFrame title="Influencer">
                      <img
                        src={inf.profilePicture}
                        alt={inf.mediaName ?? "Influencer"}
                        className="max-h-52 w-full rounded-lg object-contain"
                      />
                    </MediaFrame>
                  ) : null}
                  {showProofFrame && b.activeProofImageUrl ? (
                    <MediaFrame title="Active proof">
                      <img
                        src={b.activeProofImageUrl}
                        alt="Activation proof"
                        className="max-h-52 w-full rounded-lg object-contain"
                      />
                    </MediaFrame>
                  ) : null}
                </div>
              );
            })()}

            {inf ? (
              <div className="px-5 pb-6 sm:px-7">
                <div className="rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5">
                  <SectionLabel>Influencer profile (admin)</SectionLabel>
                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    {hasMeaningfulText(inf.mediaName) ? (
                      <div className="sm:col-span-2">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                          Media name
                        </dt>
                        <dd className="mt-0.5 font-medium text-stone-900">
                          {inf.mediaName}
                        </dd>
                      </div>
                    ) : null}
                    {hasMeaningfulText(inf.verificationStatus) ? (
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                          Verification
                        </dt>
                        <dd className="mt-0.5 capitalize text-stone-800">
                          {inf.verificationStatus}
                        </dd>
                      </div>
                    ) : null}
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                        Profile ID
                      </dt>
                      <dd className="mt-0.5 font-mono text-stone-800">
                        #{b.influencerProfileId}
                      </dd>
                    </div>
                    {hasMeaningfulText(inf.address) ? (
                      <div className="sm:col-span-2">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                          Address
                        </dt>
                        <dd className="mt-0.5 text-stone-800">{inf.address}</dd>
                      </div>
                    ) : null}
                  </dl>
                </div>
              </div>
            ) : null}

            <div className="border-t border-stone-100 px-5 py-5 sm:px-7">
              <SectionLabel>Fulfillment & negotiation</SectionLabel>
              <dl className="mt-2 grid gap-3 text-sm sm:grid-cols-2">
                {b.platformIds?.length ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Platform IDs
                    </dt>
                    <dd className="mt-0.5 font-mono text-stone-900">
                      {b.platformIds.join(", ")}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Negotiable profile
                  </dt>
                  <dd className="mt-0.5 text-stone-900">
                    {b.influencerWasNegotiable ? "Yes" : "No"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Quoted total
                  </dt>
                  <dd className="mt-0.5 tabular-nums text-stone-900">
                    {formatCampaignMoney(b.quotedTotal, b.currency)}
                  </dd>
                </div>
                {b.minimumNegotiableAmount != null ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Minimum negotiable
                    </dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatCampaignMoney(
                        b.minimumNegotiableAmount,
                        b.currency,
                      )}
                    </dd>
                  </div>
                ) : null}
                {b.vendorCounterAmount != null ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Vendor counter
                    </dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatCampaignMoney(b.vendorCounterAmount, b.currency)}
                    </dd>
                  </div>
                ) : null}
                {hasMeaningfulText(b.paymentMethod) ? (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Payment method
                    </dt>
                    <dd className="mt-0.5 text-stone-900">{b.paymentMethod}</dd>
                  </div>
                ) : null}
                {b.selectedDates?.length ? (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Selected dates
                    </dt>
                    <dd className="mt-0.5 text-stone-900">
                      {b.selectedDates
                        .map((x) => formatDateShort(x))
                        .join(" · ")}
                    </dd>
                  </div>
                ) : null}
                {b.periodStart ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Period start
                    </dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatDateShort(b.periodStart)}
                    </dd>
                  </div>
                ) : null}
                {b.periodDurationCount != null && b.periodDurationUnit ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Period duration
                    </dt>
                    <dd className="mt-0.5 text-stone-900">
                      {b.periodDurationCount} {b.periodDurationUnit}
                    </dd>
                  </div>
                ) : null}
                {hasMeaningfulText(b.creativeKind) ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Creative type
                    </dt>
                    <dd className="mt-0.5 capitalize text-stone-900">
                      {b.creativeKind}
                    </dd>
                  </div>
                ) : null}
                {b.activeAt ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Active at
                    </dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatDateShort(b.activeAt)}
                    </dd>
                  </div>
                ) : null}
                {b.rejectedAt ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Rejected
                    </dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatDateShort(b.rejectedAt)}
                    </dd>
                  </div>
                ) : null}
                {b.completedAt ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Completed
                    </dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatDateShort(b.completedAt)}
                    </dd>
                  </div>
                ) : null}
                {!showDisputeBanner &&
                Boolean(b.disputeReason?.trim() || b.disputedAt) ? (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Dispute
                    </dt>
                    <dd className="mt-0.5 text-stone-900">
                      {hasMeaningfulText(b.disputeReason)
                        ? b.disputeReason
                        : null}
                      {b.disputedAt ? (
                        <span className="ml-2 text-stone-500">
                          ({formatDateShort(b.disputedAt)})
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Created
                  </dt>
                  <dd className="mt-0.5 tabular-nums text-stone-900">
                    {formatDateShort(b.createdAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Updated
                  </dt>
                  <dd className="mt-0.5 tabular-nums text-stone-900">
                    {formatDateShort(b.updatedAt)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col gap-3 border-t border-stone-100 px-5 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:px-7">
              {!isRejected && creativeUrl ? (
                <>
                  <button
                    type="button"
                    onClick={() => void copyCreative()}
                    className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
                  >
                    Copy creative URL
                  </button>
                  <a
                    className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
                    href={creativeUrl}
                    target="_blank"
                    rel="noreferrer"
                    download={canDownload ? "" : undefined}
                  >
                    {canDownload ? "Download" : "Open creative"}
                  </a>
                </>
              ) : null}
            </div>

            <div className="px-5 pb-6 sm:px-7">
              <Link
                to="/admin/request"
                search={{ tab: "influencer" }}
                className="text-sm font-medium text-ads360yellow-100"
              >
                ← Back to requests
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export const Route = createFileRoute(
  "/_admin/admin/request/influencer/$id/",
)({
  component: AdminInfluencerRequestDetailPage,
});

