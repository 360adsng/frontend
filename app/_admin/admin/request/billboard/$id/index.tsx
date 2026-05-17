"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CampaignDisputeNotice,
  disputeNoticeChatLinkClassNames,
  disputeNoticeHeaderPillClassNames,
  resolveDisputeNoticePhase,
} from "@components/campaign/CampaignDetailShared";
import {
  useAdminBillboardBookingRequest,
  useAttachAdminBillboardArconCertificate,
} from "@endpoint/admin/useAdminBookingRequests";
import { AdminBillboardPaymentActions } from "@components/admin/AdminBillboardPaymentActions";
import { AdminVerifyFlutterwavePaymentButton } from "@components/admin/AdminVerifyFlutterwavePaymentButton";
import { ArconCertificatePanel } from "@components/billboard/ArconCertificatePanel";
import { CampaignBillboardAssetsSection } from "@components/campaign/CampaignBillboardAssetsSection";
import { uploadFileToR2 } from "@endpoint/storage/r2";
import type { AdminBriefUser } from "@endpoint/admin/adminBookingRequests";

function formatMoney(amount: number, currency: string): string {
  const ccy = currency === "NGN" ? "NGN" : currency;
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: ccy,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    const sym = currency === "NGN" ? "₦" : `${currency} `;
    return `${sym}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }
}

function formatDt(iso: string | null | undefined) {
  if (!iso) return "—";
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

function isMeaningfulText(v: unknown): boolean {
  if (v == null) return false;
  const s = String(v).trim();
  if (!s) return false;
  return s !== "—" && s !== "___" && s.toLowerCase() !== "n/a";
}

function UserBlock({
  title,
  u,
}: {
  title: string;
  u: AdminBriefUser | null;
}) {
  if (!u) return null;
  return (
    <div>
      <dt className="text-stone-500">{title}</dt>
      <dd className="mt-0.5 text-stone-900">
        <Link
          to="/admin/users/$id"
          params={{ id: String(u.id) }}
          className="font-medium text-ads360yellow-100 hover:underline"
        >
          #{u.id}
        </Link>
        <span className="ml-2 text-stone-600">{u.email}</span>
        {u.phone ? (
          <span className="ml-2 text-stone-500">{u.phone}</span>
        ) : null}
      </dd>
    </div>
  );
}

function AdminBillboardRequestDetailPage() {
  const { id: idParam } = Route.useParams();
  const id = Number.parseInt(idParam, 10);
  const valid = Number.isFinite(id) && id > 0;
  const q = useAdminBillboardBookingRequest(valid ? id : null);
  const attachArcon = useAttachAdminBillboardArconCertificate(valid ? id : 0);
  const d = q.data;
  const listing = d?.listing;
  const disputePhase = d
    ? resolveDisputeNoticePhase({
        bookingStatus: d.status ?? null,
        paymentStatus: d.paymentStatus ?? null,
        disputedAt: d.disputedAt ?? null,
        disputeReason: d.disputeReason ?? null,
        disputeChatHasThread: d.disputeChatHasThread ? true : false,
      })
    : null;
  const showDisputeBanner = disputePhase !== null;

  return (
    <section className="min-h-[70vh] bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/admin/request"
          className="text-sm font-medium text-stone-600 underline-offset-2 hover:text-stone-900 hover:underline"
        >
          ← Back to requests
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

        {valid && d ? (
          <div className="mt-8 space-y-6">
            {showDisputeBanner && disputePhase !== null ? (
              <CampaignDisputeNotice
                disputeReason={d.disputeReason ?? null}
                disputedAt={d.disputedAt ?? null}
                bookingStatus={d.status ?? null}
                paymentStatus={d.paymentStatus ?? null}
                disputeChatHasThread={d.disputeChatHasThread}
                chatLink={
                  <Link
                    to="/admin/request/billboard/$id/dispute-chat"
                    params={{ id: String(id) }}
                    className={disputeNoticeChatLinkClassNames(disputePhase)}
                  >
                    {disputePhase === "active"
                      ? "Open dispute chat"
                      : "View dispute chat"}
                  </Link>
                }
              />
            ) : null}

            <div className="rounded-10 border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Billboard booking
                  </p>
                  <p className="mt-1 font-serif text-2xl text-stone-900">
                    #{d.id}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase">
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-800">
                    {d.status}
                  </span>
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-stone-800">
                    {d.paymentStatus}
                  </span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-900">
                    {d.negotiationPhase.replace(/_/g, " ")}
                  </span>
                  {showDisputeBanner ? (
                    <Link
                      to="/admin/request/billboard/$id/dispute-chat"
                      params={{ id: String(d.id) }}
                      className={`${disputeNoticeHeaderPillClassNames(disputePhase)} normal-case tracking-normal`}
                    >
                      {disputePhase === "active"
                        ? "Open dispute chat"
                        : "View dispute chat"}
                    </Link>
                  ) : null}
                </div>
              </div>

              <p className="mt-6 text-lg font-semibold tabular-nums text-stone-900">
                {formatMoney(
                  Number(d.payableTotal ?? d.negotiatedAmount ?? d.quotedTotal),
                  d.currency,
                )}
                {d.negotiatedAmount == null &&
                (d.vendorCounterAmount != null || d.minimumNegotiableAmount != null) ? (
                  <span className="ml-2 text-sm font-normal text-stone-500">
                    (quoted{" "}
                    {formatMoney(d.quotedTotal, d.currency)})
                  </span>
                ) : null}
              </p>

              <dl className="mt-4 grid gap-2 rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-3 text-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Payment breakdown
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-600">Placement</dt>
                  <dd className="font-medium tabular-nums text-stone-900">
                    {formatMoney(d.placementAmount ?? 0, d.currency)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-600">Print</dt>
                  <dd className="font-medium tabular-nums text-stone-900">
                    {formatMoney(d.printAmount ?? 0, d.currency)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-stone-600">ARCON (platform)</dt>
                  <dd className="font-medium tabular-nums text-stone-900">
                    {formatMoney(d.arconAmount ?? 0, d.currency)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-stone-200 pt-2">
                  <dt className="text-stone-600">Vendor hold</dt>
                  <dd className="font-semibold tabular-nums text-stone-900">
                    {formatMoney(d.vendorHoldAmount ?? 0, d.currency)}
                  </dd>
                </div>
                <p className="text-xs text-stone-500">
                  Vendor incoming receives placement + print only; ARCON is credited
                  to the app wallet.
                </p>
              </dl>

              <AdminVerifyFlutterwavePaymentButton
                bookingId={d.id}
                kind="billboard"
                booking={d}
                onSuccess={() => void q.refetch()}
                className="mt-5"
              />

              <AdminBillboardPaymentActions
                booking={d}
                onSuccess={() => void q.refetch()}
                className="mt-5"
              />

              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                <UserBlock title="Booker" u={d.booker} />
                <UserBlock title="Vendor" u={d.vendor} />
              </dl>
            </div>

            <div className="rounded-10 border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                Listing
              </h2>
              {listing ? (
                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  {isMeaningfulText(listing.name) ? (
                    <div className="sm:col-span-2">
                      <dt className="text-stone-500">Name</dt>
                      <dd className="mt-0.5 font-medium text-stone-900">
                        {listing.name}
                      </dd>
                    </div>
                  ) : null}
                  {isMeaningfulText(listing.address) ? (
                    <div className="sm:col-span-2">
                      <dt className="text-stone-500">Address</dt>
                      <dd className="mt-0.5 text-stone-800">{listing.address}</dd>
                    </div>
                  ) : null}
                  {isMeaningfulText(
                    [listing.city, listing.state].filter(Boolean).join(", "),
                  ) ? (
                    <div>
                      <dt className="text-stone-500">City / State</dt>
                      <dd className="mt-0.5 text-stone-800">
                        {[listing.city, listing.state]
                          .filter(Boolean)
                          .join(", ")}
                      </dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="text-stone-500">Listing ID</dt>
                    <dd className="mt-0.5 font-mono text-xs text-stone-800">
                      #{d.billboardListingId}
                    </dd>
                  </div>
                  <UserBlock title="Owner" u={listing.owner} />
                </dl>
              ) : (
                <p className="mt-4 text-sm text-stone-600">
                  Listing #{d.billboardListingId} (summary unavailable)
                </p>
              )}
            </div>

            <div className="overflow-hidden rounded-10 border border-stone-200 bg-white shadow-sm">
              <CampaignBillboardAssetsSection
                creativeKind={d.creativeKind}
                creativeImageUrl={d.creativeImageUrl}
                creativeVideoUrl={d.creativeVideoUrl}
                creativeEmptyMessage="No creative uploaded"
                listingName={listing?.name}
                activeProofImageUrl={d.activeProofImageUrl}
                activeProofEmptyMessage="No activation proof yet"
                arconPanel={
                  <ArconCertificatePanel
                    booking={d}
                    audience="admin"
                    className="!px-0 !pb-0"
                    adminUploadPending={attachArcon.isPending}
                    onAdminUpload={async (file) => {
                      const { publicUrl } = await uploadFileToR2(
                        file,
                        "booking",
                      );
                      const url = publicUrl?.trim();
                      if (!url) {
                        throw new Error(
                          "Upload did not return a certificate URL",
                        );
                      }
                      await attachArcon.mutateAsync(url);
                      await q.refetch();
                    }}
                  />
                }
              />
            </div>

            <div className="rounded-10 border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                Booking details
              </h2>
              <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                {isMeaningfulText(d.durationPlan) ? (
                  <div>
                    <dt className="text-stone-500">Duration plan</dt>
                    <dd className="mt-0.5 text-stone-900">{d.durationPlan}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-stone-500">Negotiable listing</dt>
                  <dd className="mt-0.5 text-stone-900">
                    {d.listingWasNegotiable ? "Yes" : "No"}
                  </dd>
                </div>
                {d.minimumNegotiableAmount != null ? (
                  <div>
                    <dt className="text-stone-500">Minimum negotiable</dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatMoney(d.minimumNegotiableAmount, d.currency)}
                    </dd>
                  </div>
                ) : null}
                {d.vendorCounterAmount != null ? (
                  <div>
                    <dt className="text-stone-500">Vendor counter</dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatMoney(d.vendorCounterAmount, d.currency)}
                    </dd>
                  </div>
                ) : null}
                {isMeaningfulText(d.paymentMethod) ? (
                  <div className="sm:col-span-2">
                    <dt className="text-stone-500">Payment method</dt>
                    <dd className="mt-0.5 text-stone-900">{d.paymentMethod}</dd>
                  </div>
                ) : null}
                {d.selectedDates?.length ? (
                  <div className="sm:col-span-2">
                    <dt className="text-stone-500">Selected dates</dt>
                    <dd className="mt-1 text-stone-800">
                      {d.selectedDates.map((x) => formatDt(x)).join(" · ")}
                    </dd>
                  </div>
                ) : null}
                {d.periodStart ? (
                  <div>
                    <dt className="text-stone-500">Period start</dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatDt(d.periodStart)}
                    </dd>
                  </div>
                ) : null}
                {d.periodDurationCount != null && d.periodDurationUnit ? (
                  <div>
                    <dt className="text-stone-500">Period duration</dt>
                    <dd className="mt-0.5 text-stone-900">
                      {d.periodDurationCount} {d.periodDurationUnit}
                    </dd>
                  </div>
                ) : null}
                {d.campaignStartDate ? (
                  <div>
                    <dt className="text-stone-500">Campaign start</dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatDt(d.campaignStartDate)}
                    </dd>
                  </div>
                ) : null}
                {d.campaignEndDate ? (
                  <div>
                    <dt className="text-stone-500">Campaign end</dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatDt(d.campaignEndDate)}
                    </dd>
                  </div>
                ) : null}
                {isMeaningfulText(d.creativeKind) ? (
                  <div>
                    <dt className="text-stone-500">Creative</dt>
                    <dd className="mt-0.5 text-stone-900">{d.creativeKind}</dd>
                  </div>
                ) : null}
                {d.activeAt ? (
                  <div>
                    <dt className="text-stone-500">Active at</dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatDt(d.activeAt)}
                    </dd>
                  </div>
                ) : null}
                {d.rejectedAt ? (
                  <div>
                    <dt className="text-stone-500">Rejected</dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatDt(d.rejectedAt)}
                    </dd>
                  </div>
                ) : null}
                {d.completedAt ? (
                  <div>
                    <dt className="text-stone-500">Completed</dt>
                    <dd className="mt-0.5 tabular-nums text-stone-900">
                      {formatDt(d.completedAt)}
                    </dd>
                  </div>
                ) : null}
                {!showDisputeBanner &&
                Boolean(d.disputeReason?.trim() || d.disputedAt) ? (
                  <div className="sm:col-span-2">
                    <dt className="text-stone-500">Dispute</dt>
                    <dd className="mt-0.5 text-stone-900">
                      {isMeaningfulText(d.disputeReason) ? d.disputeReason : ""}
                      {d.disputedAt ? (
                        <span className="ml-2 text-stone-500">
                          ({formatDt(d.disputedAt)})
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-stone-500">Created</dt>
                  <dd className="mt-0.5 tabular-nums text-stone-900">
                    {formatDt(d.createdAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone-500">Updated</dt>
                  <dd className="mt-0.5 tabular-nums text-stone-900">
                    {formatDt(d.updatedAt)}
                  </dd>
                </div>
              </dl>


            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_admin/admin/request/billboard/$id/")({
  component: AdminBillboardRequestDetailPage,
});


