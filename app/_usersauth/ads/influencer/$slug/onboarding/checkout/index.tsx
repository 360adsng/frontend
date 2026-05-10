import { useMemo, useState } from "react";
import { toast } from "sonner";
const cancel = "/icons/usericon/modalCancelBotton.svg";
import { Modal } from "@components/modal/modal";
import { Link, createFileRoute, useSearch } from "@tanstack/react-router";
import Steps from "@components/ui/Steps";
import BackBtn from "@components/buttons/BackBtn";
import CreativeMedia from "@components/ui/CreativeMedia";
import {
  useInfluencerBooking,
  useNegotiateInfluencerBooking,
} from "@endpoint/influencer/useInfluencer";
import type { InfluencerNegotiationPhase } from "@endpoint/influencer/influencer";

const FALLBACK_PHOTO = "/icons/user.png";

function formatDurationPlan(plan: string | undefined): string {
  const p = String(plan ?? "").toLowerCase();
  if (p === "immediate") return "Immediate (1 day)";
  if (p === "days") return "Selected calendar days";
  if (p === "weeks") return "Weeks";
  if (p === "months") return "Months";
  return plan ? String(plan) : "—";
}

const Checkout = () => {
  const [negotia, setNegotia] = useState(false);
  const [negotiatedAmount, setNegotiatedAmount] = useState("");
  const search = useSearch({ strict: false }) as {
    bookingId?: number | string;
  };
  const bookingId = useMemo(() => Number(search.bookingId), [search.bookingId]);
  const booking = useInfluencerBooking(
    Number.isFinite(bookingId) && bookingId > 0 ? bookingId : null,
  );
  const negotiate = useNegotiateInfluencerBooking();
  const b = booking.data;

  const phase = (b?.negotiationPhase ?? "none") as InfluencerNegotiationPhase;

  const negotiationPayBlocked =
    Boolean(b?.influencerWasNegotiable) &&
    b?.negotiatedAmount != null &&
    phase !== "agreed";

  const perDaySum = useMemo(
    () =>
      (b?.platforms ?? []).reduce((s, p) => s + Number(p.amountRate ?? 0), 0),
    [b?.platforms],
  );

  const billableDays = b?.billableDays ?? 0;
  const isDaysPlan = String(b?.durationPlan ?? "").toLowerCase() === "days";
  const selectedDates = b?.selectedDates ?? [];

  const handleNegotiateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNegotiatedAmount(e.target.value);
  };

  const submitNegotiation = async (e: React.FormEvent<HTMLFormElement>) => {
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
      toast.success(
        "Offer sent. Wait for the influencer to accept or counter before paying.",
      );
    } catch {
      // toast handled by hook
    }
  };

  return (
    <>
      <section className="mx-4 md:mx-10 pt-32 pb-24">
        <BackBtn>influencer Marketing</BackBtn>

        <Steps step={4} text="#4 - Checkout" />

        {booking.isLoading ? (
          <div className="text-sm text-gray-600 mt-6">Loading...</div>
        ) : booking.isError ? (
          <div className="text-sm text-red-600 mt-6">
            Could not load booking.
          </div>
        ) : null}

        <div className="mt-10 mb-8 max-w-3xl space-y-6">
          <div className="rounded-10 border border-stone-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-[#D0B301]/20 px-5 py-3.5 border-b border-stone-100 flex flex-wrap items-center gap-2">
              <h4 className="text-base font-semibold text-stone-900">
                Campaign message
              </h4>
              <span className="text-xs text-stone-500 md:ml-auto">
                Brief for the influencer
              </span>
            </div>
            <div className="px-5 py-6 bg-stone-50/50">
              {b?.message?.trim() ? (
                <p className="text-stone-800 leading-relaxed whitespace-pre-wrap text-[15px] md:text-base">
                  {b.message}
                </p>
              ) : (
                <p className="text-stone-400 italic text-sm">
                  No message was provided.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-10 border border-stone-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-[#D0B301]/20 px-5 py-3.5 border-b border-stone-100">
              <h4 className="text-base font-semibold text-stone-900">
                Creative
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Image or video you attached (if any)
              </p>
            </div>
            <div className="px-5 py-5">
              <CreativeMedia
                creativeKind={b?.creativeKind}
                creativeImageUrl={b?.creativeImageUrl}
                creativeVideoUrl={b?.creativeVideoUrl}
                hideActions
                emptyMessage="No image or video attached for this booking."
              />
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto my-5">
          <table className="min-w-full bg-white">
            <thead className="bg-[#D0B301]/40">
              <tr>
                <th className="py-2 px-2 md:px-3 border-b">Vendor</th>
                <th className="py-2 px-2 md:px-3 border-b">Type</th>
                <th className="py-2 px-2 md:px-3 border-b">
                  Platform / rate (per day)
                </th>
                <th className="py-2 px-2 md:px-3 border-b">Duration</th>
                <th className="py-2 px-2 md:px-3 border-b">Start</th>
                <th className="py-2 px-2 md:px-3 border-b">End</th>
                <th className="py-2 px-2 md:px-3 border-b">Quoted total</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="py-2 px-2 md:px-3">
                  <img
                    alt=""
                    src={b?.influencer?.photo || FALLBACK_PHOTO}
                    className="inline"
                    width={40}
                    height={40}
                  />
                  {b?.influencer?.mediaName ?? "-"}
                </td>
                <td className="py-2 px-2 md:px-3 border-b">Influencer</td>
                <td className="py-2 px-2 md:px-3 border-b text-left">
                  <div>
                    {(b?.platforms ?? []).map((p) => (
                      <div key={p.id}>
                        {p.name}
                        <span className="text-sm text-gray-400">
                          {" "}
                          ₦{Number(p.amountRate || 0).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-stone-500 mt-1 border-t border-stone-100 pt-1">
                    Combined per day:{" "}
                    <span className="font-medium text-stone-700">
                      ₦{Number(perDaySum).toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-2 md:px-3 border-b">
                  <div>{formatDurationPlan(b?.durationPlan)}</div>
                  <div className="text-xs text-stone-500 normal-case mt-0.5">
                    {billableDays > 0
                      ? `${billableDays} billable day${billableDays === 1 ? "" : "s"}`
                      : "—"}
                  </div>
                  {isDaysPlan && selectedDates.length > 0 ? (
                    <div className="text-xs text-left text-stone-600 mt-2 max-w-[10rem] mx-auto space-y-0.5">
                      {selectedDates.map((d) => (
                        <div key={d}>{String(d).slice(0, 10)}</div>
                      ))}
                    </div>
                  ) : null}
                </td>
                <td className="py-2 px-2 md:px-3 border-b">
                  {b?.campaignStartDate
                    ? String(b.campaignStartDate).slice(0, 10)
                    : "-"}
                </td>
                <td className="py-2 px-2 md:px-3 border-b">
                  {b?.campaignEndDate
                    ? String(b.campaignEndDate).slice(0, 10)
                    : "-"}
                </td>
                <td className="py-2 px-2 md:px-3 border-b font-medium">
                  {b ? `₦${Number(b.quotedTotal || 0).toLocaleString()}` : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#D0B301]/40 flex justify-between w-full py-10 px-5 md:w-1/2 lg:w-1/3">
            <h4>Total amount</h4>
            <div>
              <div className="font-bold">
                {b ? `₦${Number(b.quotedTotal || 0).toLocaleString()}` : "—"}
              </div>
              <div className="text-sm text-stone-600">
                {formatDurationPlan(b?.durationPlan)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap md:justify-end gap-3 my-3">
          <button
            type="button"
            disabled={
              !b?.influencerWasNegotiable ||
              b?.minimumNegotiableAmount == null ||
              b?.negotiatedAmount != null ||
              negotiate.isPending
            }
            onClick={() => setNegotia(true)}
            className={`w-123 h-12 rounded-10 my-2 ${
              !b?.influencerWasNegotiable || b?.negotiatedAmount != null
                ? "bg-ads360yellow-100/50 text-black/50 cursor-not-allowed"
                : "hover:animate-changeColor hover:text-white bg-ads360yellow-100"
            }`}
          >
            Negotiate
          </button>

          {!bookingId ||
          String(b?.paymentStatus).toLowerCase() === "paid" ||
          negotiationPayBlocked ? (
            <span
              title={
                negotiationPayBlocked
                  ? "Complete negotiation (influencer must accept or you accept their counter) before paying."
                  : undefined
              }
              className="inline-flex w-123 cursor-not-allowed items-center justify-center rounded-10 bg-ads360yellow-100/50 px-3 py-3 text-center text-sm text-black/60 my-2"
            >
              Pay now
            </span>
          ) : (
            <Link
              to="/ads/$transaction_id"
              params={{ transaction_id: String(bookingId || "") }}
              search={{ bookingKind: "influencer" }}
              className="hover:animate-changeColor hover:text-white bg-ads360yellow-100 w-123 h-12 rounded-10 my-2 flex items-center justify-center"
            >
              Pay now
            </Link>
          )}
        </div>
        {negotiationPayBlocked ? (
          <p className="max-w-lg text-right text-xs text-amber-900 md:ml-auto">
            Pay unlocks after the influencer accepts your offer or you accept
            their counter-offer. Refresh this page for status updates.
          </p>
        ) : null}
      </section>

      <Modal isOpen={negotia}>
        <div className="bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10">
          <div className="flex justify-between mb-5">
            <h4 className="">Your offer</h4>
            <button type="button" onClick={() => setNegotia(false)}>
              <img src={cancel} alt="" className="w-5" />
            </button>
          </div>
          <form onSubmit={submitNegotiation}>
            <div className="flex">
              <div className="bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-1/5 content-center text-black/50">
                {" "}
                ₦{" "}
              </div>
              <input
                type="number"
                value={negotiatedAmount}
                onChange={handleNegotiateInput}
                className="p-2 focus:outline-none w-full border rounded-r"
              />
            </div>
            <div className="my-3">
              <p className="text-red-700 text-xs">
                Minimum offer: ₦{b?.minimumNegotiableAmount ?? 0}
              </p>
              <p className="text-red-700 text-xs">
                You can only negotiate once per booking.
              </p>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={
                  negotiatedAmount === "" ||
                  (b?.minimumNegotiableAmount != null &&
                    parseFloat(negotiatedAmount) < b.minimumNegotiableAmount) ||
                  negotiate.isPending
                }
                className={`${
                  negotiatedAmount === "" ||
                  (b?.minimumNegotiableAmount != null &&
                    parseFloat(negotiatedAmount) < b.minimumNegotiableAmount) ||
                  negotiate.isPending
                    ? "bg-ads360gray-100"
                    : "bg-ads360black-100/95 hover:bg-ads360black-100"
                } rounded mt-5  text-white  w-5/6 h-10`}
              >
                {negotiate.isPending ? "Sending..." : "Send request"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export const Route = createFileRoute(
  "/_usersauth/ads/influencer/$slug/onboarding/checkout/",
)({
  validateSearch: (search: Record<string, unknown>) => ({
    bookingId: search.bookingId,
  }),
  component: Checkout,
});

export default Checkout;
