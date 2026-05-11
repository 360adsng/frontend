const naira = "/icons/usericon/naira.svg";
const bluecampaign = "/icons/usericon/bluecampiagn.svg";
const platformsIcon = "/icons/led2.svg";
import LineCharts from "@components/ui/LineCharts";
import { Link } from "@tanstack/react-router";
import { useMe } from "@endpoint/users/useUsers";
import { useInfluencerVendorDashboard } from "@endpoint/influencer/useInfluencer";
import { BookingsTable } from "@components/ui/BookingsTable";

/** Mirrors {@link ../billboards/-BillBoardDashboard.tsx} layout and metrics for influencer vendors. */
export default function InfluencerVendorDashboard() {
  const { data: me } = useMe();
  const dashboard = useInfluencerVendorDashboard();

  const name =
    me?.businessName ??
    me?.mediaName?.trim() ??
    `${me?.firstName ?? ""} ${me?.lastName ?? ""}`.trim() ??
    me?.email ??
    "Creator";

  const stats = dashboard.data;
  const revenueData =
    (stats?.revenuePerWeek ?? []).map((p) => ({
      label: String(p.weekStart).slice(5),
      value: Number(p.revenue ?? 0),
    })) ?? [];
  const last5 = stats?.last5Campaigns ?? [];

  return (
    <section className="min-h-screen bg-ads360-hash px-4 py-14 md:px-10">
      <h3 className="text-2xl">
        Hello {name}, what would you like to do?
      </h3>

      <div className="my-10 overflow-x-auto rounded-10 border border-ads360yellow-100 bg-white shadow">
        <div className="flex w-[700px] items-center px-2 py-5 md:w-full md:justify-between md:px-14">
          <div className="my-3 flex items-center md:my-0">
            <img width={60} height={60} src={naira} alt="" />
            <div className="px-2 text-sm">
              ₦{Number(stats?.walletBalanceAmount ?? 0).toLocaleString()}
              <p className="text-xs text-stone-400">Available Balance</p>
            </div>
          </div>

          <div className="my-3 flex items-center md:my-0">
            <img width={60} height={60} src={bluecampaign} alt="" />
            <div className="px-2 text-sm">
              {stats?.numberOfCompletedBookings ?? 0}
              <p className="text-xs text-stone-400">completed Campaigns</p>
            </div>
          </div>

          <div className="my-3 flex items-center md:my-0">
            <img width={60} height={60} src={platformsIcon} alt="" />
            <div className="px-2 text-sm">
              {stats?.numberOfPlatforms ?? 0}
              <p className="text-xs text-stone-400">Platforms (rate card)</p>
            </div>
          </div>

          <div className="my-3 flex items-center md:my-0">
            <img width={60} height={60} src={bluecampaign} alt="" />
            <div className="px-2 text-sm">
              {stats?.numberOfActiveBookings ?? 0}
              <p className="text-xs text-stone-400">Active Campaigns</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="w-full">
          <div className="my-3 w-full rounded-10 border border-ads360yellow-100 bg-white p-2">
            <h3 className="font-bold">Revenue</h3>
            {dashboard.isLoading ? (
              <div className="px-4 py-10 text-stone-500">Loading...</div>
            ) : dashboard.isError ? (
              <div className="px-4 py-10 text-stone-500">Unable to load revenue</div>
            ) : (
              <LineCharts data={revenueData} />
            )}
          </div>
        </div>

        <div className="my-10 rounded-10 border border-ads360yellow-100 bg-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Last 5 Influencer Campaigns</h3>
            <Link
              to="/vendors/influencers/requests/"
              className="text-sm font-semibold text-ads360yellow-100 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="my-4 w-full">
            <BookingsTable
              rows={last5.map((r) => ({
                id: r.id,
                listing: r.listingName ?? "-",
                createdAt: r.createdAt as unknown as string,
                amount: r.amount,
                status: r.status,
                paymentStatus: r.paymentStatus ?? "unpaid",
                actionHref: `/vendors/influencers/requests/${r.id}`,
                actionLabel: "View",
              }))}
              isLoading={dashboard.isLoading}
              isError={dashboard.isError}
              emptyText="No campaigns found"
              showPaymentStatus={true}
              pageSize={5}
              statusOptions={[
                { value: "all", label: "All" },
                { value: "pending", label: "Pending" },
                { value: "active", label: "Active" },
                { value: "dispute", label: "Dispute" },
                { value: "rejected", label: "Rejected" },
                { value: "completed", label: "Completed" },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
