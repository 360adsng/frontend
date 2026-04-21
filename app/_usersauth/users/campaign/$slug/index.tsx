"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useBillboardBooking,
  useCompleteBillboardBooking,
} from "@endpoint/billboard/useBillboard";
import CreativeMedia from "@components/ui/CreativeMedia";
import {
  CampaignPaymentStatusBadge,
  CampaignStatusBadge,
  formatCampaignMoney,
  formatDateRange,
  InfoCard,
  MediaFrame,
  personDisplayName,
  SectionLabel,
} from "@components/campaign/CampaignDetailShared";
import { CalendarDays, NairaIcon } from "@components/campaign/CampaignIcons";

const CampaignDetail = () => {
  const { slug } = Route.useParams();
  const id = Number(slug);
  const booking = useBillboardBooking(
    Number.isFinite(id) && id > 0 ? id : null,
  );
  const complete = useCompleteBillboardBooking();
  const b = booking.data;

  const isPaid = b?.paymentStatus === "paid" || b?.status === "paid";
  const canComplete =
    Boolean(b) &&
    isPaid &&
    b?.paymentStatus !== "refunded" &&
    b?.status === "active";

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
                  Campaign details
                </h1>
                <p className="mt-1.5 text-sm text-stone-500">
                  ID: NG#{b.id} · {formatDateRange(b.campaignStartDate, b.campaignEndDate)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-end sm:self-start sm:justify-end">
                <CampaignStatusBadge status={b.status} />
                <CampaignPaymentStatusBadge paymentStatus={b.paymentStatus} />
                <Link
                  to="/users/campaign"
                  className="text-xl leading-none text-stone-400 transition hover:text-stone-700"
                  aria-label="Back to campaigns"
                >
                  ×
                </Link>
              </div>
            </header>

            <div className="px-5 pt-5 sm:px-7">
              <h2 className="font-serif text-xl text-stone-900 md:text-2xl">
                {b.listing?.name ?? "Billboard campaign"}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700">
                  Billboard
                </span>
                <span className="rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-xs text-stone-600">
                  {b.status}
                </span>
              </div>
            </div>

            {!isPaid && (
              <div className="mx-5 my-4 rounded-xl border border-amber-200/50 bg-amber-50/50 p-4 text-sm text-stone-700 sm:mx-7">
                This booking is not paid yet. Unpaid and negotiating bookings
                are under{" "}
                <Link
                  to="/users/negotiations"
                  className="font-medium text-ads360yellow-100 underline"
                >
                  Negotiations
                </Link>
                .
              </div>
            )}

            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-7">
              <InfoCard
                label="Total budget"
                icon={<NairaIcon />}
                value={formatCampaignMoney(
                  b.negotiatedAmount ?? b.quotedTotal,
                  b.currency,
                )}
                sub="Agreed price for this placement"
              />
              <InfoCard
                label="Campaign duration"
                icon={<CalendarDays />}
                value={formatDateRange(b.campaignStartDate, b.campaignEndDate)}
                sub={b.durationPlan ? `Plan: ${b.durationPlan}` : undefined}
              />
            </div>

            <div className="px-5 pb-6 sm:px-7">
              <div className="rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5">
                <SectionLabel>Billboard owner</SectionLabel>
                {b.billboardOwner ? (
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ads360yellow-100 text-lg font-serif text-white">
                      {personDisplayName(b.billboardOwner)
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-900">
                        {personDisplayName(b.billboardOwner)}
                      </p>
                      <p className="text-sm text-stone-600">
                        {b.billboardOwner.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-stone-500">No owner details</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 px-5 pb-6 sm:grid-cols-3 sm:px-7">
              <MediaFrame title="Campaign creative">
                {b.creativeImageUrl || b.creativeVideoUrl ? (
                  <CreativeMedia
                    creativeKind={b.creativeKind}
                    creativeImageUrl={b.creativeImageUrl}
                    creativeVideoUrl={b.creativeVideoUrl}
                    hideActions
                    className="w-full"
                  />
                ) : (
                  <p className="py-8 text-center text-sm text-stone-500">
                    No creative uploaded yet
                  </p>
                )}
              </MediaFrame>

              <MediaFrame title="Billboard">
                {b.listing?.imageUrl ? (
                  <img
                    src={b.listing.imageUrl}
                    alt={b.listing.name ?? "Billboard"}
                    className="max-h-52 w-full rounded-lg object-contain"
                  />
                ) : (
                  <p className="py-8 text-center text-sm text-stone-500">
                    No image
                  </p>
                )}
              </MediaFrame>

              <MediaFrame title="Active proof">
                {b.activeProofImageUrl ? (
                  <img
                    src={b.activeProofImageUrl}
                    alt="Proof of activation"
                    className="max-h-52 w-full rounded-lg object-contain"
                  />
                ) : (
                  <p className="py-8 text-center text-sm text-stone-500">
                    The owner has not uploaded activation proof yet
                  </p>
                )}
              </MediaFrame>
            </div>

            {canComplete && (
              <div className="flex justify-end border-t border-stone-100 px-5 py-5 sm:px-7">
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

            <div className="px-5 pb-6 sm:px-7">
              <Link
                to="/users/campaign"
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
};

export const Route = createFileRoute("/_usersauth/users/campaign/$slug/")({
  component: CampaignDetail,
});

export default CampaignDetail;
