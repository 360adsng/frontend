"use client";

import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  useVendorBillboardBooking,
  useVendorBillboardNegotiation,
} from "@endpoint/billboard/useBillboard";
import CreativeMedia from "@components/ui/CreativeMedia";
import type { NegotiationPhase } from "@endpoint/billboard/billboard";

function VendorNegotiationDetail() {
  const { id: idParam } = Route.useParams();
  const id = Number(idParam);
  const booking = useVendorBillboardBooking(
    Number.isFinite(id) && id > 0 ? id : null,
  );
  const negotiate = useVendorBillboardNegotiation();
  const b = booking.data;
  const isRejected = String(b?.status ?? "").toLowerCase() === "rejected";
  const phase = (b?.negotiationPhase ?? "none") as NegotiationPhase;
  const [counter, setCounter] = useState("");

  const bookerLabel =
    b?.booker?.businessName ||
    `${b?.booker?.firstName ?? ""} ${b?.booker?.lastName ?? ""}`.trim() ||
    b?.booker?.email ||
    "-";

  const awaitingVendor = phase === "awaiting_vendor";
  const awaitingBooker = phase === "awaiting_booker";
  const agreed = phase === "agreed";

  return (
    <section className="px-4 md:px-10 py-14 min-h-screen bg-ads360-hash">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Negotiation</h3>
        <Link
          to="/vendors/billboards/negotiations"
          className="text-ads360yellow-100"
        >
          Back
        </Link>
      </div>

      {booking.isLoading && <div>Loading...</div>}
      {booking.isError && <div>Unable to load negotiation</div>}

      {!booking.isLoading && !booking.isError && b && (
        <div className="bg-white rounded-10 p-5 border">
          <div className="mb-5">
            <CreativeMedia
              creativeKind={b.creativeKind}
              creativeImageUrl={b.creativeImageUrl}
              creativeVideoUrl={b.creativeVideoUrl}
              emptyMessage={
                isRejected
                  ? "Creative assets are not available for rejected bookings."
                  : undefined
              }
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-stone-500 text-sm">Booking ID</div>
              <div className="font-bold">#{b.id}</div>
            </div>
            <div>
              <div className="text-stone-500 text-sm">Status</div>
              <div className="font-bold">{b.status}</div>
            </div>

            <div>
              <div className="text-stone-500 text-sm">Listing</div>
              <div className="font-bold">{b.listing?.name ?? "-"}</div>
            </div>

            <div>
              <div className="text-stone-500 text-sm">Booker</div>
              <div className="font-bold">{bookerLabel}</div>
            </div>

            <div>
              <div className="text-stone-500 text-sm">Quoted Total</div>
              <div className="font-bold">₦{b.quotedTotal}</div>
            </div>

            <div>
              <div className="text-stone-500 text-sm">Minimum Negotiable</div>
              <div className="font-bold">₦{b.minimumNegotiableAmount ?? 0}</div>
            </div>

            <div>
              <div className="text-stone-500 text-sm">Their offer</div>
              <div className="font-bold">₦{b.negotiatedAmount ?? 0}</div>
            </div>

            {b.vendorCounterAmount != null ? (
              <div>
                <div className="text-stone-500 text-sm">Your counter</div>
                <div className="font-bold">₦{b.vendorCounterAmount}</div>
              </div>
            ) : null}

            <div>
              <div className="text-stone-500 text-sm">Negotiation step</div>
              <div className="font-bold capitalize">
                {phase.replace(/_/g, " ")}
              </div>
            </div>
          </div>

          {awaitingVendor ? (
            <div className="mt-8 space-y-4 border-t border-stone-100 pt-6">
              <p className="text-sm text-stone-600">
                Accept their price or send a counter-offer between the minimum
                negotiable amount and the quoted total (₦{b.quotedTotal}).
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={negotiate.isPending}
                  onClick={async () => {
                    await negotiate.mutateAsync({
                      bookingId: id,
                      payload: { action: "accept" },
                    });
                    await booking.refetch();
                  }}
                  className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
                >
                  Accept booker&apos;s offer
                </button>
              </div>
              <div className="flex max-w-md flex-col gap-2 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label className="text-xs font-medium text-stone-600">
                    Counter-offer (₦)
                  </label>
                  <input
                    type="number"
                    value={counter}
                    onChange={(e) => setCounter(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm"
                    placeholder="Amount"
                    min={b.minimumNegotiableAmount ?? 0}
                    max={b.quotedTotal}
                  />
                </div>
                <button
                  type="button"
                  disabled={
                    negotiate.isPending ||
                    !counter.trim() ||
                    Number(counter) <= 0 ||
                    Number(counter) > Number(b.quotedTotal) ||
                    (b.minimumNegotiableAmount != null &&
                      Number(counter) < b.minimumNegotiableAmount)
                  }
                  onClick={async () => {
                    const amt = Number(counter);
                    if (!Number.isFinite(amt) || amt <= 0) return;
                    if (amt > Number(b.quotedTotal)) return;
                    await negotiate.mutateAsync({
                      bookingId: id,
                      payload: { action: "counter", counterAmount: amt },
                    });
                    setCounter("");
                    await booking.refetch();
                  }}
                  className="rounded-xl bg-ads360yellow-100 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
                >
                  Send counter
                </button>
              </div>
            </div>
          ) : null}

          {awaitingBooker ? (
            <p className="mt-6 text-sm text-stone-600">
              Waiting for the booker to accept or decline your counter-offer.
            </p>
          ) : null}

          {agreed ? (
            <p className="mt-6 text-sm text-emerald-800">
              The price is agreed. The booker can complete payment from their
              account.
            </p>
          ) : null}

          {!awaitingVendor && !awaitingBooker && !agreed && !isRejected ? (
            <p className="mt-6 text-sm text-stone-500">
              No action is available for this negotiation state.
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}

export const Route = createFileRoute("/vendors/billboards/negotiations/$id/")({
  component: VendorNegotiationDetail,
});

export default VendorNegotiationDetail;
