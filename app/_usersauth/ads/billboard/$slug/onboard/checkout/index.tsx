import { useMemo, useState } from "react";
import { toast } from "sonner";
const cancel = '/icons/usericon/modalCancelBotton.svg'
import { Modal } from "@components/modal/modal";
import { Link, createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import Steps from "@components/ui/Steps";
import BackBtn from "@components/buttons/BackBtn";
import {
  useBillboardBooking,
  useNegotiateBillboardBooking,
} from "@endpoint/billboard/useBillboard";

const Checkout = () => {
  const [negotia, setNegotia] = useState(false);
  const [negotiatedAmount, setNegotiatedAmount] = useState("");
  const navigate = useNavigate();
  const search = useSearch({
    strict: false,
  }) as { bookingId?: number | string };
  const bookingId = useMemo(() => Number(search.bookingId), [search.bookingId]);
  const booking = useBillboardBooking(
    Number.isFinite(bookingId) && bookingId > 0 ? bookingId : null,
  );
  const negotiate = useNegotiateBillboardBooking();
  const b = booking.data;

  const negotiationPayBlocked =
    Boolean(b?.listingWasNegotiable) &&
    b?.negotiatedAmount != null &&
    b?.negotiationPhase !== "agreed";

  const handleNegotiate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNegotiatedAmount(e.target.value);
  };

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
      <section className="mx-4 md:mx-10 pt-32 pb-24">
      <BackBtn>billboard Marketing</BackBtn>

      <Steps step={4} text="#1 - Checkout"/>

        <div>
          {b?.listing?.imageUrl ? (
            <img alt="billboard" src={b.listing.imageUrl} className="mx-auto" />
          ) : null}
        </div>
        <div className="w-full overflow-x-auto my-5">
          <table className="min-w-full bg-white">
            <thead className="bg-[#D0B301]/40">
              <tr>
                <th className="py-2 px-2 md:px-3 border-b">Name</th>
                <th className="py-2 px-2 md:px-3 border-b">Location</th>
                <th className="py-2 px-2 md:px-3 border-b">Size</th>
                <th className="py-2 px-2 md:px-3 border-b">Duration</th>
                <th className="py-2 px-2 md:px-3 border-b">Start Date</th>
                <th className="py-2 px-2 md:px-3 border-b">End Date</th>
                <th className="py-2 px-2 md:px-3 border-b">Cost/day</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-2 md:px-3 border-b">
                  {b?.listing?.name ?? "-"}
                </td>
                <td className="py-2 px-2 md:px-3 border-b">
                  {b?.listing
                    ? `${b.listing.address}, ${b.listing.city}, ${b.listing.state}`
                    : "-"}
                </td>
                <td className="py-2 px-2 md:px-3 border-b">4m(H) by 12m(W)</td>
                <td className="py-2 px-2 md:px-3 border-b">
                  {b?.durationPlan ?? "-"}
                </td>
                <td className="py-2 px-2 md:px-3 border-b">
                  {b?.campaignStartDate ? String(b.campaignStartDate).slice(0, 10) : "-"}
                </td>
                <td className="py-2 px-2 md:px-3 border-b">
                  {b?.campaignEndDate ? String(b.campaignEndDate).slice(0, 10) : "-"}
                </td>
                <td className="py-2 px-2 md:px-3 border-b">
                  {b ? `₦${b.quotedTotal}` : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#D0B301]/40 flex justify-between w-full p-5 md:w-1/2 lg:w-1/3">
            <h4>Total Amount</h4>
            <div>
              <div className="font-bold">{b ? `₦${b.quotedTotal}` : "—"}</div>
              <div>{b?.durationPlan ?? ""}</div>
            </div>
          </div>
        </div>

        <div className="flex md:justify-end space-x-3 my-3">
          <button
            disabled={
              !b?.listingWasNegotiable ||
              b?.minimumNegotiableAmount == null ||
              b?.negotiatedAmount != null ||
              negotiate.isPending
            }
            onClick={() => setNegotia(true)}
            className={`w-123 h-12 rounded-10 my-2 ${
              !b?.listingWasNegotiable || b?.negotiatedAmount != null
                ? "bg-ads360yellow-100/50 text-black/50"
                : "hover:animate-changeColor hover:text-white bg-ads360yellow-100"
            }`}
          >
            Negotiate
          </button>

          {!bookingId || b?.status === "paid" || negotiationPayBlocked ? (
            <span
              title={
                negotiationPayBlocked
                  ? "Complete negotiation (owner must accept or you accept their counter) before paying."
                  : undefined
              }
              className="inline-flex w-123 cursor-not-allowed items-center justify-center rounded-10 bg-ads360yellow-100/50 px-3 py-3 text-center text-sm text-black/60 my-2"
            >
              Pay Now
            </span>
          ) : (
            <Link
              to="/ads/$transaction_id"
              params={{ transaction_id: String(bookingId || "") }}
              className="hover:animate-changeColor hover:text-white bg-ads360yellow-100 w-123 h-12 rounded-10 my-2 flex items-center justify-center"
            >
              Pay Now
            </Link>
          )}
        </div>
        {negotiationPayBlocked ? (
          <p className="max-w-lg text-right text-xs text-amber-900 md:ml-auto">
            Pay is available after the billboard owner accepts your offer or you
            accept their counter-offer. Check{" "}
            <Link to="/users/negotiations" className="underline font-medium">
              Negotiations
            </Link>
            .
          </p>
        ) : null}
      </section>

      <Modal isOpen={negotia}>
        <div className="bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10">
          <div className="flex justify-between mb-5">
            <h4 className="">Input Amount</h4>
            <button onClick={() => setNegotia(false)}>
              <img
                src={cancel} alt="modal cancel botton"
                className="w-5"
              />
            </button>
          </div>
          <form onSubmit={submit}>
            <div className="flex">
              <div className="bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-1/5 content-center text-black/50">
                {" "}
                ₦{" "}
              </div>
              <input
                type="number"
                value={negotiatedAmount}
                onChange={handleNegotiate}
                className="p-2 focus:outline-none w-full border rounded-r"
              />
            </div>
            <div className="my-3">
              <p className="text-red-700 text-xs">
                You cannot negotiat lower than ₦
                {b?.minimumNegotiableAmount ?? 0}
              </p>
              <p className="text-red-700 text-xs">You can only negotiat once</p>
            </div>
            <div className="flex justify-center">
              <button
                disabled={
                  negotiatedAmount === "" ||
                  (b?.minimumNegotiableAmount != null &&
                    parseInt(negotiatedAmount) < b.minimumNegotiableAmount) ||
                  negotiate.isPending
                }
                className={`${
                  negotiatedAmount === "" ||
                  (b?.minimumNegotiableAmount != null &&
                    parseInt(negotiatedAmount) < b.minimumNegotiableAmount) ||
                  negotiate.isPending
                    ? "bg-ads360gray-100"
                    : "bg-ads360black-100/95 hover:bg-ads360black-100"
                } rounded mt-5  text-white  w-5/6 h-10`}
              >
                {negotiate.isPending ? "Sending..." : "Send Request"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export const Route = createFileRoute("/_usersauth/ads/billboard/$slug/onboard/checkout/")({
  validateSearch: (search: Record<string, unknown>) => ({
    bookingId: search.bookingId,
  }),
  component: Checkout,
})

export default Checkout
