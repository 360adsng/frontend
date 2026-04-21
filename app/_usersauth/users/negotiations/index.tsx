"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useMyNegotiatingBillboardBookings } from "@endpoint/billboard/useBillboard";
import { BookingsTable } from "@components/ui/BookingsTable";

const dash = "/icons/dash.svg";

function NegotiationsPage() {
  const { data, isLoading, isError } = useMyNegotiatingBillboardBookings();

  return (
    <>
      <section className="bg-[#E9E9E9] px-4 md:px-10 pt-14">
        <h3 className="text-2xl">Negotiations</h3>
        <p className="text-stone-400 mb-5 mt-3">
          Bookings currently in negotiation
        </p>

        <div className="overflow-x-auto py-1">
          <div className="w-[600px] md:w-full flex justify-start md:space-x-3">
            <button className="relative">
              Billboard
              <img
                alt="Billboard Overview selected"
                src={dash}
                className="w-2/3 mx-auto absolute top-[20px] left-[17%]"
              />
            </button>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-ads360-hash px-4 md:px-10 py-14">
        <BookingsTable
          showPaymentStatus={false}
          rows={(data ?? []).map((r) => ({
            id: r.id,
            listing: r.listingName ?? "-",
            createdAt: r.createdAt as unknown as string,
            amount: r.negotiatedAmount ?? r.quotedTotal,
            status: "negotiating",
            actionHref: `/users/negotiations/${r.id}`,
            actionLabel: "View",
          }))}
          isLoading={isLoading}
          isError={isError}
          emptyText="No negotiations found"
          statusOptions={[
            { value: "all", label: "All" },
            { value: "negotiating", label: "Negotiating" },
          ]}
          defaultStatus="negotiating"
          pageSize={10}
        />
      </section>
    </>
  );
}

export const Route = createFileRoute("/_usersauth/users/negotiations/")({
  component: NegotiationsPage,
});

export default NegotiationsPage;

