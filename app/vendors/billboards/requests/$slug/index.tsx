import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  useMarkVendorBookingActive,
  useRejectVendorBillboardBooking,
  useVendorBillboardBooking,
} from "@endpoint/billboard/useBillboard";
import CreativeMedia from "@components/ui/CreativeMedia";
import { toast } from "sonner";
import FilesInput from "@components/inputs/FilesInput";
import { Modal } from "@components/modal/modal";
const cancel = "/icons/usericon/modalCancelBotton.svg";
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

const Request = () => {
  const { slug } = Route.useParams();
  const id = Number(slug);
  const booking = useVendorBillboardBooking(
    Number.isFinite(id) && id > 0 ? id : null,
  );
  const b = booking.data;
  const markActive = useMarkVendorBookingActive();
  const rejectMutation = useRejectVendorBillboardBooking();
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreviewUrl, setProofPreviewUrl] = useState("");
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const isPaid = b?.paymentStatus === "paid" || b?.status === "paid";
  const isRejected = String(b?.status ?? "").toLowerCase() === "rejected";
  const canAct =
    isPaid &&
    b?.status === "pending" &&
    b?.paymentStatus !== "refunded" &&
    b?.status !== "rejected" &&
    b?.status !== "completed";

  const creativeUrl =
    String(b?.creativeKind ?? "").toLowerCase() === "video"
      ? b?.creativeVideoUrl?.trim() ?? ""
      : b?.creativeImageUrl?.trim() ?? "";
  const canDownload = String(b?.creativeKind ?? "").toLowerCase() !== "video";

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
        {booking.isLoading && (
          <p className="text-center text-stone-600">Loading…</p>
        )}
        {booking.isError && (
          <p className="text-center text-red-600">Unable to load request</p>
        )}

        {!booking.isLoading && !booking.isError && b && (
          <div className="overflow-hidden rounded-2xl border border-amber-200/40 bg-white shadow-sm">
            <header className="flex flex-col gap-3 border-b border-stone-100 px-5 pt-6 pb-4 sm:flex-row sm:items-start sm:justify-between sm:px-7">
              <div>
                <h1 className="font-serif text-2xl font-medium tracking-tight text-stone-900 md:text-3xl">
                  Campaign details
                </h1>
                <p className="mt-1.5 text-sm text-stone-500">
                  ID: NG#{b.id} ·{" "}
                  {formatDateRange(b.campaignStartDate, b.campaignEndDate)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-end sm:self-start sm:justify-end">
                <CampaignStatusBadge status={b.status} />
                <CampaignPaymentStatusBadge paymentStatus={b.paymentStatus} />
                <Link
                  to="/vendors/billboards/requests"
                  className="text-xl leading-none text-stone-400 transition hover:text-stone-700"
                  aria-label="Back to requests"
                >
                  ×
                </Link>
              </div>
            </header>

            <div className="px-5 pt-5 sm:px-7">
              <h2 className="font-serif text-xl text-stone-900 md:text-2xl">
                {b.listing?.name ?? "Billboard request"}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700">
                  Billboard
                </span>
                <span className="rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-xs text-stone-600">
                  {b.status}
                </span>
                {b.paymentStatus ? (
                  <span className="rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-xs text-stone-600">
                    {b.paymentStatus}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-7">
              <InfoCard
                label="Total budget"
                icon={<NairaIcon />}
                value={formatCampaignMoney(
                  b.negotiatedAmount ?? b.quotedTotal,
                  b.currency,
                )}
                sub="Booker’s agreed price"
              />
              <InfoCard
                label="Campaign duration"
                icon={<CalendarDays />}
                value={formatDateRange(
                  b.campaignStartDate,
                  b.campaignEndDate,
                )}
                sub={b.durationPlan ? `Plan: ${b.durationPlan}` : undefined}
              />
            </div>

            <div className="px-5 pb-6 sm:px-7">
              <div className="rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5">
                <SectionLabel>Campaign owner (booker)</SectionLabel>
                {b.booker ? (
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ads360yellow-100 text-lg font-serif text-white">
                      {personDisplayName(b.booker).slice(0, 1).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-stone-900">
                        {personDisplayName(b.booker)}
                      </p>
                      <p className="text-sm text-stone-600">{b.booker.email}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-stone-500">No booker details</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 px-5 pb-6 sm:grid-cols-3 sm:px-7">
              <MediaFrame title="Campaign creative">
                {isRejected ? (
                  <p className="py-8 text-center text-sm text-stone-600">
                    Creative assets are not available for rejected bookings.
                  </p>
                ) : b.creativeImageUrl || b.creativeVideoUrl ? (
                  <CreativeMedia
                    creativeKind={b.creativeKind}
                    creativeImageUrl={b.creativeImageUrl}
                    creativeVideoUrl={b.creativeVideoUrl}
                    hideActions
                    className="w-full"
                  />
                ) : (
                  <p className="py-8 text-center text-sm text-stone-500">
                    No creative uploaded
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
                    alt="Activation proof"
                    className="max-h-52 w-full rounded-lg object-contain"
                  />
                ) : (
                  <p className="py-8 text-center text-sm text-stone-500">
                    Upload proof when you accept the campaign
                  </p>
                )}
              </MediaFrame>
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

              {canAct ? (
                <button
                  type="button"
                  onClick={() => setRejectOpen(true)}
                  disabled={rejectMutation.isPending}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-800 transition hover:bg-red-100 disabled:opacity-50"
                >
                  Reject
                </button>
              ) : null}

              {canAct ? (
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[220px]">
                  <p className="text-xs text-stone-500">
                    Proof image required to accept
                  </p>
                  <FilesInput
                    previewName={proofFile?.name ?? ""}
                    accept="image"
                    handleChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      setProofFile(f);
                      setProofPreviewUrl(URL.createObjectURL(f));
                    }}
                    warning=""
                  />
                  {proofPreviewUrl ? (
                    <img
                      src={proofPreviewUrl}
                      alt="Preview"
                      className="max-h-32 w-full rounded-lg border object-contain"
                    />
                  ) : null}
                  <button
                    type="button"
                    disabled={
                      !proofFile || markActive.isPending || !Number.isFinite(id)
                    }
                    onClick={async () => {
                      if (!proofFile) {
                        toast.error("Select a proof image");
                        return;
                      }
                      try {
                        await markActive.mutateAsync({
                          bookingId: id,
                          proofImage: proofFile,
                        });
                        await booking.refetch();
                        setProofFile(null);
                        setProofPreviewUrl("");
                      } catch {
                        // toast in hook
                      }
                    }}
                    className="rounded-xl border-2 border-stone-900 bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 disabled:opacity-50"
                  >
                    {markActive.isPending ? "Accepting…" : "Accept campaign"}
                  </button>
                </div>
              ) : null}
            </div>

            <div className="px-5 pb-6 sm:px-7">
              <Link
                to="/vendors/billboards/requests"
                className="text-sm font-medium text-ads360yellow-100"
              >
                ← Back to requests
              </Link>
            </div>
          </div>
        )}

        <Modal isOpen={rejectOpen}>
          <div className="mx-auto w-11/12 max-w-md rounded-10 bg-white p-5 md:w-full">
            <div className="mb-4 flex justify-between">
              <h4 className="font-serif text-lg">Reject campaign</h4>
              <button
                type="button"
                onClick={() => setRejectOpen(false)}
                aria-label="Close"
              >
                <img src={cancel} alt="" className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-stone-600">
              This will refund the booker (wallet or card) per your platform
              rules. Optional reason:
            </p>
            <textarea
              className="mt-3 w-full rounded-lg border border-stone-200 p-3 text-sm"
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Reason (optional)"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg border px-4 py-2 text-sm"
                onClick={() => setRejectOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={rejectMutation.isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                onClick={async () => {
                  try {
                    await rejectMutation.mutateAsync({
                      bookingId: id,
                      reason: rejectReason.trim() || undefined,
                    });
                    setRejectOpen(false);
                    setRejectReason("");
                    await booking.refetch();
                  } catch {
                    // toast in hook
                  }
                }}
              >
                {rejectMutation.isPending ? "Rejecting…" : "Confirm reject"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export const Route = createFileRoute("/vendors/billboards/requests/$slug/")({
  component: Request,
});

export default Request;
