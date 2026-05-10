import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMyVendorInfluencerBookings } from "@endpoint/influencer/useInfluencer";
import { BookingsTable } from "@components/ui/BookingsTable";

const search = "/icons/search.svg";

type VendorRequestsFilter =
  | "all"
  | "abandoned"
  | "pending"
  | "active"
  | "dispute"
  | "rejected"
  | "completed";

function isAbandoned(createdAt: string | undefined | null): boolean {
  if (!createdAt) return false;
  const t = new Date(createdAt).getTime();
  if (!Number.isFinite(t)) return false;
  const fourDaysMs = 4 * 24 * 60 * 60 * 1000;
  return Date.now() - t >= fourDaysMs;
}

const Requests = () => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<VendorRequestsFilter>("all");
  const list = useMyVendorInfluencerBookings();
  const rows = useMemo(() => {
    const raw = list.data ?? [];
    const notNegotiating = raw.filter((r) => r.status !== "negotiating");
    const filtered =
      filter === "all"
        ? notNegotiating
        : filter === "abandoned"
          ? notNegotiating.filter(
              (r) => r.status === "pending" && isAbandoned(r.createdAt),
            )
          : notNegotiating.filter((r) => r.status === filter);
    const s = q.trim().toLowerCase();
    if (!s) return filtered;
    return filtered.filter((r) => {
      const a =
        `${r.id} ${r.listingName ?? ""} ${r.status ?? ""} ${r.paymentStatus ?? ""} ${r.bookerName ?? ""}`.toLowerCase();
      return a.includes(s);
    });
  }, [list.data, q, filter]);

  return (
    <>
      <section className="bg-ads360-hash min-h-screen px-4 py-14 md:px-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex h-10 space-x-2 rounded-[40px] bg-[#f7f8f8] px-5 md:w-2/5 lg:w-1/4">
            <button type="button">
              <img src={search} alt="searchicon" />
            </button>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-full w-full rounded-10 bg-transparent focus:outline-none"
              placeholder="search..."
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="text-sm text-stone-600">Filter:</div>
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as VendorRequestsFilter)
              }
              className="rounded-10 border border-ads360yellow-100 bg-white px-3 py-2 text-black"
            >
              <option value="all">All (excluding negotiating)</option>
              <option value="abandoned">Abandoned (unpaid 4+ days)</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="dispute">Dispute</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="my-5 w-full">
          <BookingsTable
            rows={rows.map((r) => ({
              id: r.id,
              listing: r.listingName ?? "-",
              createdAt: r.createdAt as unknown as string,
              amount: r.negotiatedAmount ?? r.quotedTotal,
              status: r.status as string,
              paymentStatus: r.paymentStatus ?? "unpaid",
              actionHref: `/vendors/influencers/requests/${r.id}`,
              actionLabel: "View",
            }))}
            isLoading={list.isLoading}
            isError={list.isError}
            emptyText="No requests found"
            statusOptions={[
              { value: "all", label: "All (excluding negotiating)" },
              { value: "abandoned", label: "Abandoned (unpaid 4+ days)" },
              { value: "pending", label: "Pending" },
              { value: "active", label: "Active" },
              { value: "dispute", label: "Dispute" },
              { value: "rejected", label: "Rejected" },
              { value: "completed", label: "Completed" },
            ]}
            pageSize={10}
          />
        </div>
      </section>
    </>
  );
};

export const Route = createFileRoute("/vendors/influencers/requests/")({
  component: Requests,
});

export default Requests;
