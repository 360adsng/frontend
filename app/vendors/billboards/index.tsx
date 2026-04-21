const naira = '/icons/usericon/naira.svg'
const billboard = '/icons/led2.svg'
const bluecampaign = '/icons/usericon/bluecampiagn.svg'
import LineCharts from "@components/ui/LineCharts";
import { Link, createFileRoute } from '@tanstack/react-router';
import PieCharts from "@components/ui/PieCharts";
import { useMe } from "@endpoint/users/useUsers";
import { useBillboardOwnerDashboard } from "@endpoint/billboard/useBillboard";
import { BookingsTable } from "@components/ui/BookingsTable";



const BillBoardDashboard = () => {
  const {data: me} = useMe();
  const dashboard = useBillboardOwnerDashboard();
  
 
  const name = me?.businessName ?? `${me?.firstName} ${me?.lastName}`.trim();
  const stats = dashboard.data;
  const revenueData =
    (stats?.revenuePerWeek ?? []).map((p) => ({
      label: String(p.weekStart).slice(5), // MM-DD
      value: Number(p.revenue ?? 0),
    })) ?? [];
  const last5 = stats?.last5Campaigns ?? [];

  return (
    <section className="bg-ads360-hash min-h-screen px-4 md:px-10 py-14">
        <h3 className="text-2xl">Hello {name}, what would you like to do?</h3>


      <div className="shadow border-ads360yellow-100 bg-white rounded-10 border my-10 overflow-x-auto">
       
        <div className="items-center flex md:justify-between px-2 md:px-14 py-5 w-[700px] md:w-full">
          <div className="flex items-center my-3 md:my-0">
            <img width={60} height={60} src={naira} alt="naira sign" />
            <div className="text-sm px-2">
              ₦{Number(stats?.walletBalanceAmount ?? 0).toLocaleString()}
              <p className="text-stone-400 text-xs">Available Balance</p>
            </div>
          </div>

          <div className="flex items-center my-3 md:my-0">
            <img
              width={60}
              height={60}
              src={bluecampaign}
              alt="campiagn sign"
            />
            <div className="text-sm px-2">
              {stats?.numberOfCompletedBookings ?? 0}
              <p className="text-stone-400 text-xs">completed Campaigns</p>
            </div>
          </div>

          <div className="flex items-center my-3 md:my-0">
            <img
              width={60}
              height={60}
              src={billboard}
              alt="cluster points"
            />
            <div className="text-sm px-2">
              {stats?.numberOfBillboards ?? 0}
              <p className="text-stone-400 text-xs">Billboards</p>
            </div>
          </div>

          <div className="flex items-center my-3 md:my-0">
            <img
              width={60}
              height={60}
              src={bluecampaign}
              alt="campiagn sign"
            />
            <div className="text-sm px-2">
              {stats?.numberOfActiveBookings ?? 0}
              <p className="text-stone-400 text-xs">Active Campaigns</p>
            </div>
          </div>
        </div>
      </div>



      <div>
        <div className="w-full">

          <div className="w-full p-2 bg-white rounded-10 border border-ads360yellow-100 my-3">
            <h3 className="font-bold">Revenue</h3>
            {dashboard.isLoading ? (
              <div className="py-10 px-4 text-stone-500">Loading...</div>
            ) : dashboard.isError ? (
              <div className="py-10 px-4 text-stone-500">Unable to load revenue</div>
            ) : (
              <LineCharts data={revenueData} />
            )}
          </div>
        </div>
        

      <div className="bg-white rounded-10 border border-ads360yellow-100 my-10 p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Last 5 Billboard Campaigns</h3>
          <Link
            to="/vendors/billboards/requests/"
            className="text-sm font-semibold text-ads360yellow-100 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="w-full my-4">
          <BookingsTable
            rows={last5.map((r) => ({
              id: r.id,
              listing: r.listingName ?? "-",
              createdAt: r.createdAt as unknown as string,
              amount: r.amount,
              status: r.status,
              paymentStatus: r.paymentStatus ?? "unpaid",
              actionHref: `/vendors/billboards/requests/${r.id}`,
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
              { value: "rejected", label: "Rejected" },
              { value: "completed", label: "Completed" },
            ]}
          />
        </div>
      </div>
          

      </div>
    </section>
  );
};

export const Route = createFileRoute("/vendors/billboards/")({
  component: BillBoardDashboard,
})

export default BillBoardDashboard
