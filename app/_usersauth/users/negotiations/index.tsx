"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { useMyNegotiatingBillboardBookings } from "@endpoint/billboard/useBillboard";
import { useMyNegotiatingInfluencerBookings } from "@endpoint/influencer/useInfluencer";
import { BookingsTable } from "@components/ui/BookingsTable";

type NegotiationsTab = "billboard" | "influencer";

function NegotiationsPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const tab: NegotiationsTab =
    search.type === "influencer" ? "influencer" : "billboard";

  const billboard = useMyNegotiatingBillboardBookings();
  const influencer = useMyNegotiatingInfluencerBookings();

  const { rows, isLoading, isError, emptyText } = useMemo(() => {
    if (tab === "influencer") {
      return {
        rows: (influencer.data ?? []).map((r) => ({
          id: r.id,
          listing: r.listingName ?? "-",
          createdAt: r.createdAt as unknown as string,
          amount: r.negotiatedAmount ?? r.quotedTotal,
          status: "negotiating",
          actionHref: `/users/negotiations/influencers/${r.id}`,
          actionLabel: "View",
        })),
        isLoading: influencer.isLoading,
        isError: influencer.isError,
        emptyText: "No influencer negotiations found",
      };
    }
    return {
      rows: (billboard.data ?? []).map((r) => ({
        id: r.id,
        listing: r.listingName ?? "-",
        createdAt: r.createdAt as unknown as string,
        amount: r.negotiatedAmount ?? r.quotedTotal,
        status: "negotiating",
        actionHref: `/users/negotiations/${r.id}`,
        actionLabel: "View",
      })),
      isLoading: billboard.isLoading,
      isError: billboard.isError,
      emptyText: "No billboard negotiations found",
    };
  }, [
    tab,
    billboard.data,
    billboard.isLoading,
    billboard.isError,
    influencer.data,
    influencer.isLoading,
    influencer.isError,
  ]);

  const setTab = (next: NegotiationsTab) => {
    void navigate({
      to: "/users/negotiations",
      search: { type: next },
      replace: true,
    });
  };

  return (
    <section className="min-h-screen bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="font-serif text-2xl text-stone-900 md:text-3xl">
            Negotiations
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Bookings currently in negotiation
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 border-b border-stone-200 pb-2">
          <button
            type="button"
            onClick={() => setTab("billboard")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === "billboard"
                ? "bg-stone-900 text-white"
                : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
            }`}
          >
            Billboard
          </button>
          <button
            type="button"
            onClick={() => setTab("influencer")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === "influencer"
                ? "bg-stone-900 text-white"
                : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
            }`}
          >
            Influencer
          </button>
        </div>

        <BookingsTable
          showPaymentStatus={false}
          rows={rows}
          isLoading={isLoading}
          isError={isError}
          emptyText={emptyText}
          statusOptions={[
            { value: "all", label: "All" },
            { value: "negotiating", label: "Negotiating" },
          ]}
          defaultStatus="negotiating"
          pageSize={10}
        />
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_usersauth/users/negotiations/")({
  validateSearch: (raw: Record<string, unknown>) => ({
    type: raw.type === "influencer" ? "influencer" : "billboard",
  }),
  component: NegotiationsPage,
});

export default NegotiationsPage;
