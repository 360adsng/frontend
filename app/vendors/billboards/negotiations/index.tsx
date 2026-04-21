"use client";

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMyVendorNegotiatingBillboardBookings } from "@endpoint/billboard/useBillboard";
import { BookingsTable } from "@components/ui/BookingsTable";

const search = "/icons/search.svg";

function VendorNegotiationsPage() {
  const [q, setQ] = useState("");
  const negotiating = useMyVendorNegotiatingBillboardBookings();

  const rows = useMemo(() => {
    const raw = negotiating.data ?? [];
    const s = q.trim().toLowerCase();
    if (!s) return raw;
    return raw.filter((r) => {
      const a = `${r.id} ${r.listingName ?? ""} ${r.bookerName ?? ""} ${r.status ?? ""}`.toLowerCase();
      return a.includes(s);
    });
  }, [negotiating.data, q]);

  return (
    <section className="bg-ads360-hash min-h-screen px-4 md:px-10 py-14">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl">Negotiations</h3>
          <p className="text-stone-400">
            Bookings currently under negotiation
          </p>
        </div>
      </div>

      <div className="flex lg:w-1/4 md:w-2/5 bg-[#f7f8f8] space-x-2 rounded-[40px] px-5 h-10 mt-6">
        <button type="button">
          <img src={search} alt="searchicon" />
        </button>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="rounded-10 w-full bg-transparent focus:outline-none h-full"
          placeholder="search..."
        />
      </div>

      <div className="w-full overflow-x-auto my-5">
        <BookingsTable
          showPaymentStatus={false}
          rows={rows.map((r) => ({
            id: r.id,
            listing: r.listingName ?? "-",
            createdAt: r.createdAt as unknown as string,
            amount: r.negotiatedAmount ?? r.quotedTotal,
            status: "negotiating",
            actionHref: `/vendors/billboards/negotiations/${r.id}`,
            actionLabel: "View",
          }))}
          isLoading={negotiating.isLoading}
          isError={negotiating.isError}
          emptyText="No negotiations found"
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

export const Route = createFileRoute("/vendors/billboards/negotiations/")({
  component: VendorNegotiationsPage,
});

export default VendorNegotiationsPage;

