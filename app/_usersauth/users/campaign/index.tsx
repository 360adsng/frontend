"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMyBillboardBookings } from "@endpoint/billboard/useBillboard";
import { useMyInfluencerBookings } from "@endpoint/influencer/useInfluencer";
import { BookingsTable } from "@components/ui/BookingsTable";

type CampaignTab = "billboard" | "influencer" | "whatsapp" | "sms" | "digital";

const TAB_ITEMS: { key: CampaignTab; label: string }[] = [
  { key: "billboard", label: "Billboard" },
  { key: "influencer", label: "Influencer" },
  { key: "whatsapp", label: "Whatsapp" },
  { key: "sms", label: "SMS" },
  { key: "digital", label: "Digital" },
];

function Campaign() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const tab: CampaignTab = search.tab;

  const billboard = useMyBillboardBookings();
  const influencer = useMyInfluencerBookings();

  const setTab = (next: CampaignTab) => {
    void navigate({
      to: "/users/campaign",
      search: { tab: next },
      replace: true,
    });
  };

  return (
    <section className="min-h-screen bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-serif text-2xl text-stone-900 md:text-3xl">
              Campaigns
            </h1>
            <p className="mt-1 text-sm text-stone-600">
              Check all ads campaign history
            </p>
          </div>
          <Link
            to="/users/campaign/create"
            className="inline-flex w-fit rounded-10 border-2 border-ads360yellow-100 bg-ads360yellow-100 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Create Campaign
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 border-b border-stone-200 pb-2">
          {TAB_ITEMS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === key
                  ? "bg-stone-900 text-white"
                  : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div>
          {tab === "billboard" ? (
            <BookingsTable
              rows={(billboard.data ?? []).map((r) => ({
                id: r.id,
                listing: r.listingName ?? "-",
                createdAt: r.createdAt as unknown as string,
                amount: r.negotiatedAmount ?? r.quotedTotal,
                status: r.status,
                paymentStatus: r.paymentStatus ?? "unpaid",
                actionHref: `/users/campaign/${r.id}`,
                actionLabel: "View",
              }))}
              isLoading={billboard.isLoading}
              isError={billboard.isError}
              emptyText="No campaigns found"
              statusFilterLabel="Filter by status"
              statusOptions={[
                { value: "all", label: "All" },
                { value: "pending", label: "Pending" },
                { value: "active", label: "Active" },
                { value: "rejected", label: "Rejected" },
                { value: "completed", label: "Completed" },
                { value: "abandoned", label: "Abandoned" },
              ]}
              pageSize={10}
            />
          ) : null}

          {tab === "influencer" ? (
            <BookingsTable
              rows={(influencer.data ?? []).map((r) => ({
                id: r.id,
                listing: r.listingName ?? "-",
                createdAt: r.createdAt as unknown as string,
                amount: r.negotiatedAmount ?? r.quotedTotal,
                status: r.status,
                paymentStatus: r.paymentStatus ?? "unpaid",
                actionHref: `/users/campaign/influencer/${r.id}`,
                actionLabel: "View",
              }))}
              isLoading={influencer.isLoading}
              isError={influencer.isError}
              emptyText="No influencer campaigns found"
              statusFilterLabel="Filter by status"
              statusOptions={[
                { value: "all", label: "All" },
                { value: "pending", label: "Pending" },
                { value: "active", label: "Active" },
                { value: "rejected", label: "Rejected" },
                { value: "completed", label: "Completed" },
                { value: "abandoned", label: "Abandoned" },
              ]}
              pageSize={10}
            />
          ) : null}

          {tab === "whatsapp" || tab === "sms" || tab === "digital" ? (
            <div className="mt-4 text-center text-sm text-stone-500">
              No matching records found
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_usersauth/users/campaign/")({
  validateSearch: (raw: Record<string, unknown>) => {
    const t = String(raw.tab ?? "")
      .trim()
      .toLowerCase();
    if (["influencer", "whatsapp", "sms", "digital"].includes(t)) {
      return { tab: t as CampaignTab };
    }
    return { tab: "billboard" as CampaignTab };
  },
  component: Campaign,
});

export default Campaign;
