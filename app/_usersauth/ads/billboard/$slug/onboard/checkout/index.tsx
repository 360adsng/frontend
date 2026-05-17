import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Modal } from "@components/modal/modal";
import { Link, createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import Steps from "@components/ui/Steps";
import BackBtn from "@components/buttons/BackBtn";
import {
  useBillboardBooking,
  useNegotiateBillboardBooking,
} from "@endpoint/billboard/useBillboard";
import { formatNaira } from "@lib/billboardDisplay";
import {
  CampaignPaymentStatusBadge,
  CampaignStatusBadge,
  formatCampaignMoney,
  formatDateRange,
  InfoCard,
  MediaFrame,
  SectionLabel,
} from "@components/campaign/CampaignDetailShared";
import { CalendarDays, NairaIcon } from "@components/campaign/CampaignIcons";
import CreativeMedia from "@components/ui/CreativeMedia";

const cancel = "/icons/usericon/modalCancelBotton.svg";

const Checkout = () => {
  const [negotia, setNegotia] = useState(false);
  const [negotiatedAmount, setNegotiatedAmount] = useState("");
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as {
    bookingId?: number | string;
  };
  const bookingId = useMemo(() => Number(search.bookingId), [search.bookingId]);
  const booking = useBillboardBooking(
    Number.isFinite(bookingId) && bookingId > 0 ? bookingId : null,
  );
  const negotiate = useNegotiateBillboardBooking();
  const b = booking.data;

  const placementTotal =
    b?.quotedPlacementTotal != null
      ? b.quotedPlacementTotal
      : (b?.quotedTotal ?? 0) -
        (b?.quotedPrintTotal ?? 0) -
        (b?.quotedArconTotal ?? 0);

  const negotiationPayBlocked =
    Boolean(b?.listingWasNegotiable) &&
    b?.negotiatedAmount != null &&
    b?.negotiationPhase !== "agreed";

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Number.isFinite(bookingId) || bookingId <= 0) {
      toast.error("Missing booking id");
      return;
    }
    const amt = Number(negotiatedAmount);
    if (!Number.isFinite(amt) || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      await negotiate.mutateAsync({ id: bookingId, negotiatedAmount: amt });
      await booking.refetch();
      setNegotia(false);
      setNegotiatedAmount("");
      toast.success("Negotiation request sent");
      void navigate({ to: "/users/negotiations" });
    } catch {
      // toast handled by hook
    }
  };

  return (
    <>
      <section className="min-h-screen bg-[#E9E9E9] px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <BackBtn>Billboard marketing</BackBtn>
          <Steps step={4} text="#4 - Checkout" />

          {booking.isLoading ? (
            <p className="mt-8 text-center text-stone-600">Loading booking…</p>
          ) : null}
          {booking.isError || (!booking.isLoading && !b) ? (
            <p className="mt-8 text-center text-red-600">
              Unable to load booking details.
            </p>
          ) : null}

          {!booking.isLoading && b ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-amber-200/40 bg-white shadow-sm">
              <header className="flex flex-col gap-3 border-b border-stone-100 px-5 pt-6 pb-4 sm:flex-row sm:items-start sm:justify-between sm:px-7">
                <div>
                  <h1 className="font-serif text-2xl font-medium tracking-tight text-stone-900 md:text-3xl">
                    Review & pay
                  </h1>
                  <p className="mt-1.5 text-sm text-stone-500">
                    Booking #{b.id} ·{" "}
                    {formatDateRange(b.campaignStartDate, b.campaignEndDate)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <CampaignStatusBadge status={b.status} />
                  <CampaignPaymentStatusBadge paymentStatus={b.paymentStatus} />
                </div>
              </header>

              <div className="px-5 pt-5 sm:px-7">
                <h2 className="font-serif text-xl text-stone-900 md:text-2xl">
                  {b.listing?.name ?? "Billboard placement"}
                </h2>
                {b.listing ? (
                  <p className="mt-1 text-sm text-stone-600">
                    {b.listing.address}, {b.listing.city}, {b.listing.state}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-7">
                <InfoCard
                  label="Total due"
                  icon={<NairaIcon />}
                  value={formatCampaignMoney(b.quotedTotal, b.currency)}
                  sub={
                    b.listingWasNegotiable
                      ? "Placement may be negotiable"
                      : "Fixed price for this booking"
                  }
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

              <div className="px-5 pb-5 sm:px-7">
                <div className="rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5">
                  <SectionLabel>Price breakdown</SectionLabel>
                  <ul className="mt-2 space-y-2 text-sm text-stone-700">
                    <li className="flex justify-between gap-4">
                      <span>Placement (media)</span>
                      <span className="font-semibold text-stone-900">
                        ₦{formatNaira(placementTotal)}
                        {b.listingWasNegotiable ? " · negotiable" : ""}
                      </span>
                    </li>
                    {(b.quotedPrintTotal ?? 0) > 0 ? (
                      <li className="flex justify-between gap-4">
                        <span>Print material (vendor)</span>
                        <span className="font-semibold text-stone-900">
                          ₦{formatNaira(b.quotedPrintTotal!)}
                        </span>
                      </li>
                    ) : null}
                    {(b.quotedArconTotal ?? 0) > 0 ? (
                      <li className="flex justify-between gap-4">
                        <span>ARCON application (platform)</span>
                        <span className="font-semibold text-stone-900">
                          ₦{formatNaira(b.quotedArconTotal!)}
                        </span>
                      </li>
                    ) : null}
                  </ul>
                  {b.listingWasNegotiable ? (
                    <p className="mt-3 text-xs text-stone-500">
                      Only placement can be negotiated. Print and ARCON fees are
                      fixed.
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 px-5 pb-6 sm:grid-cols-2 sm:px-7">
                <MediaFrame title="Your creative">
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
                      No creative attached
                    </p>
                  )}
                </MediaFrame>
                <MediaFrame title="Billboard face">
                  {b.listing?.imageUrl ? (
                    <img
                      src={b.listing.imageUrl}
                      alt={b.listing.name ?? "Billboard"}
                      className="max-h-52 w-full rounded-lg object-contain"
                    />
                  ) : (
                    <p className="py-8 text-center text-sm text-stone-500">
                      No listing image
                    </p>
                  )}
                </MediaFrame>
              </div>

              <div className="flex flex-wrap justify-end gap-3 border-t border-stone-100 px-5 py-5 sm:px-7">
                <button
                  type="button"
                  disabled={
                    !b.listingWasNegotiable ||
                    b.minimumNegotiableAmount == null ||
                    b.negotiatedAmount != null ||
                    negotiate.isPending
                  }
                  onClick={() => setNegotia(true)}
                  className="rounded-xl border-2 border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Negotiate placement
                </button>

                {!bookingId || b.status === "paid" || negotiationPayBlocked ? (
                  <span
                    title={
                      negotiationPayBlocked
                        ? "Complete negotiation before paying"
                        : undefined
                    }
                    className="inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-stone-300 px-6 py-2.5 text-sm font-semibold text-stone-600"
                  >
                    Pay now
                  </span>
                ) : (
                  <Link
                    to="/ads/$transaction_id"
                    params={{ transaction_id: String(bookingId) }}
                    className="inline-flex items-center justify-center rounded-xl bg-ads360yellow-100 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                  >
                    Pay now
                  </Link>
                )}
              </div>

              {negotiationPayBlocked ? (
                <p className="border-t border-stone-100 px-5 pb-5 text-center text-xs text-amber-900 sm:px-7">
                  Pay is available after the owner accepts your offer or you
                  accept their counter. Check{" "}
                  <Link
                    to="/users/negotiations"
                    className="font-medium underline"
                  >
                    Negotiations
                  </Link>
                  .
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <Modal isOpen={negotia}>
        <div className="mx-auto w-11/12 max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <h4 className="font-semibold text-stone-900">
              Negotiate placement fee
            </h4>
            <button type="button" onClick={() => setNegotia(false)}>
              <img src={cancel} alt="Close" className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={submit}>
            <div className="flex overflow-hidden rounded-xl border border-stone-200">
              <span className="grid w-14 place-items-center bg-stone-100 text-stone-500">
                ₦
              </span>
              <input
                type="number"
                value={negotiatedAmount}
                onChange={(e) => setNegotiatedAmount(e.target.value)}
                className="w-full p-3 text-stone-900 focus:outline-none"
                placeholder="Your offer"
              />
            </div>
            <p className="mt-3 text-xs text-red-700">
              Placement only. Minimum ₦
              {b?.minimumNegotiableAmount != null
                ? formatNaira(b.minimumNegotiableAmount)
                : "0"}
              . Print and ARCON stay fixed. One negotiation per booking.
            </p>
            <button
              type="submit"
              disabled={
                negotiatedAmount === "" ||
                (b?.minimumNegotiableAmount != null &&
                  parseInt(negotiatedAmount, 10) <
                    b.minimumNegotiableAmount) ||
                negotiate.isPending
              }
              className="mt-5 w-full rounded-xl bg-stone-900 py-3 text-sm font-semibold text-white disabled:bg-stone-300"
            >
              {negotiate.isPending ? "Sending…" : "Send request"}
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export const Route = createFileRoute(
  "/_usersauth/ads/billboard/$slug/onboard/checkout/",
)({
  validateSearch: (search: Record<string, unknown>) => ({
    bookingId: search.bookingId,
  }),
  component: Checkout,
});
