"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  useBillboardBooking,
  useBookerNegotiationResponse,
} from "@endpoint/billboard/useBillboard";
import type { NegotiationPhase } from "@endpoint/billboard/billboard";

function NegotiationDetail() {
  const { id: idParam } = Route.useParams();
  const id = Number(idParam);
  const booking = useBillboardBooking(Number.isFinite(id) && id > 0 ? id : null);
  const respond = useBookerNegotiationResponse();
  const navigate = useNavigate();

  const b = booking.data;
  const phase = (b?.negotiationPhase ?? "none") as NegotiationPhase;

  const awaitingVendor = phase === "awaiting_vendor";
  const awaitingBooker = phase === "awaiting_booker";
  const agreed = phase === "agreed";
  const rejected = String(b?.status ?? "").toLowerCase() === "rejected";

  const goPay = () => {
    void navigate({
      to: "/ads/$transaction_id",
      params: { transaction_id: String(id) },
    });
  };

  return (
    <section className="px-4 md:px-10 py-14 min-h-screen bg-ads360-hash">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Negotiation</h3>
        <Link to="/users/negotiations" className="text-ads360yellow-100">
          Back
        </Link>
      </div>

      {booking.isLoading && <div>Loading...</div>}
      {booking.isError && <div>Unable to load negotiation</div>}

      {!booking.isLoading && !booking.isError && b && (
        <div className="bg-white rounded-10 p-5 border">
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
              <div className="text-stone-500 text-sm">Quoted Total</div>
              <div className="font-bold">₦{b.quotedTotal}</div>
            </div>

            <div>
              <div className="text-stone-500 text-sm">Minimum Negotiable</div>
              <div className="font-bold">
                ₦{b.minimumNegotiableAmount ?? 0}
              </div>
            </div>

            <div>
              <div className="text-stone-500 text-sm">Your offer</div>
              <div className="font-bold">₦{b.negotiatedAmount ?? 0}</div>
            </div>

            {b.vendorCounterAmount != null ? (
              <div>
                <div className="text-stone-500 text-sm">Owner&apos;s counter</div>
                <div className="font-bold text-amber-900">
                  ₦{b.vendorCounterAmount}
                </div>
              </div>
            ) : null}

            <div>
              <div className="text-stone-500 text-sm">Step</div>
              <div className="font-bold capitalize">
                {phase.replace(/_/g, " ")}
              </div>
            </div>
          </div>

          {awaitingVendor ? (
            <p className="mt-6 text-sm text-stone-600">
              Waiting for the billboard owner to accept your offer or send a
              counter-offer.
            </p>
          ) : null}

          {awaitingBooker ? (
            <div className="mt-8 space-y-4 border-t border-stone-100 pt-6">
              <p className="text-sm text-stone-700">
                The owner proposed{" "}
                <span className="font-semibold">
                  ₦{b.vendorCounterAmount ?? "—"}
                </span>
                . Accept to continue to payment, or reject to close this booking.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={respond.isPending}
                  onClick={async () => {
                    await respond.mutateAsync({
                      bookingId: id,
                      payload: { action: "accept" },
                    });
                    goPay();
                  }}
                  className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
                >
                  Accept counter &amp; pay
                </button>
                <button
                  type="button"
                  disabled={respond.isPending}
                  onClick={async () => {
                    await respond.mutateAsync({
                      bookingId: id,
                      payload: { action: "reject" },
                    });
                    void navigate({ to: "/users/negotiations" });
                  }}
                  className="rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-900 hover:bg-red-100 disabled:opacity-50"
                >
                  Reject &amp; end booking
                </button>
              </div>
            </div>
          ) : null}

          {agreed && !rejected ? (
            <div className="mt-8 border-t border-stone-100 pt-6">
              <p className="mb-3 text-sm text-emerald-800">
                Price agreed. Select a payment method to complete your campaign.
              </p>
              <button
                type="button"
                onClick={() => goPay()}
                className="rounded-xl bg-ads360yellow-100 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
              >
                Go to payment
              </button>
            </div>
          ) : null}

          {rejected ? (
            <p className="mt-6 text-sm text-red-700">
              This negotiation was closed.{" "}
              <Link to="/users/negotiations" className="underline">
                Back to list
              </Link>
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}

export const Route = createFileRoute("/_usersauth/users/negotiations/$id/")({
  component: NegotiationDetail,
});

export default NegotiationDetail;
