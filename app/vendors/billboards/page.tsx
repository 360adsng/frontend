import Image from "next/image";
import naira from "@public/icons/usericon/naira.svg"
import billboard from "@public/icons/led2.svg";
import bluecampaign from "@public/icons/usericon/bluecampiagn.svg"
import LineCharts from "@components/ui/LineCharts";
import Link from "next/link";
import PieCharts from "@components/ui/PieCharts";


const BillBoardDashboard = () => {
  

  return (
    <section className="bg-ads360-hash min-h-screen px-4 md:px-10 py-14">
        <h3 className="text-2xl">Hello Aliyu, what would you like to do?</h3>


      <div className="shadow border-ads360yellow-100 bg-white rounded-10 border my-10 overflow-x-auto">
       
        <div className="items-center flex md:justify-between px-2 md:px-14 py-5 w-[700px] md:w-full">
          <div className="flex items-center my-3 md:my-0">
            <Image width={60} height={60} src={naira} alt="naira sign" />
            <div className="text-sm px-2">
              ₦2900.00
              <p className="text-stone-400 text-xs">Available Balance</p>
            </div>
          </div>

          <div className="flex items-center my-3 md:my-0">
            <Image
              width={60}
              height={60}
              src={bluecampaign}
              alt="campiagn sign"
            />
            <div className="text-sm px-2">
              0<p className="text-stone-400 text-xs">Total Campaigns</p>
            </div>
          </div>

          <div className="flex items-center my-3 md:my-0">
            <Image
              width={60}
              height={60}
              src={billboard}
              alt="cluster points"
            />
            <div className="text-sm px-2">
              0<p className="text-stone-400 text-xs">Billboards</p>
            </div>
          </div>

          <div className="flex items-center my-3 md:my-0">
            <Image
              width={60}
              height={60}
              src={bluecampaign}
              alt="campiagn sign"
            />
            <div className="text-sm px-2">
              0<p className="text-stone-400 text-xs">Active Campaigns</p>
            </div>
          </div>
        </div>
      </div>



      <div>
        <div className="md:flex md:space-x-2">

          <div className="basis-8/12 p-2 bg-white rounded-10 border border-ads360yellow-100 my-3">
            <h3 className="font-bold">Revenue</h3>
            <LineCharts/>
          </div>

          <div className="basis-4/12 p-2 bg-white rounded-10 border border-ads360yellow-100 my-3">
            <h3 className="font-bold">Ads</h3>
            <PieCharts/>
          </div>
        </div>
        

      <div className="bg-white rounded-10 border border-ads360yellow-100 my-10">
        <h3 className="font-bold m-2">Recent request</h3>
        <div className="w-full overflow-x-auto mt-2 mb-5">
          <table className="min-w-full">
            <thead className='bg-[#D0B301]/40'>
              <tr>
                <th className="py-2 px-2 md:px-3 border-b">ID</th>
                <th className="py-2 px-2 md:px-3 border-b">COST</th>
                <th className="py-2 px-2 md:px-3 border-b">DATE CREATED</th>
                <th className="py-2 px-2 md:px-3 border-b">STATUS</th>
                <th className="py-2 px-2 md:px-3 border-b">ACTIONS</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              <tr>
                <td className="py-2 px-2 md:px-3 border-br">#1</td>
                <td className="py-2 px-2 md:px-3 border-b">₦200000</td>
                <td className="py-2 px-2 md:px-3 border-b">2023-05-20</td>
                <td className="py-2 px-2 md:px-3 border-b">new</td>
                <td className="py-2 px-2 md:px-3 border-b">
                    <Link href={`/vendors/billboards/requests/${1}`}>view</Link>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 md:px-3 border-br relative">#2 <div className='absolute px-1 bg-ads360yellowBtn-100 text-[10px] top-0 rounded-full'> new</div></td>
                <td className="py-2 px-2 md:px-3 border-b">₦60000</td>
                <td className="py-2 px-2 md:px-3 border-b">2023-05-4</td>
                <td className="py-2 px-2 md:px-3 border-b">negotiating</td>
                <td className="py-2 px-2 md:px-3 border-b">
                    <Link href={`/vendors/billboards/requests/${2}`}>view</Link>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 md:px-3 border-br">#3</td>
                <td className="py-2 px-2 md:px-3 border-b">₦500000</td>
                <td className="py-2 px-2 md:px-3 border-b">2023-05-2</td>
                <td className="py-2 px-2 md:px-3 border-b">paid</td>
                <td className="py-2 px-2 md:px-3 border-b">
                    <Link href={`/vendors/billboards/requests/${3}`}>view</Link>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2 md:px-3 border-br">#4</td>
                <td className="py-2 px-2 md:px-3 border-b">₦500000</td>
                <td className="py-2 px-2 md:px-3 border-b">2023-05-2</td>
                <td className="py-2 px-2 md:px-3 border-b">completed</td>
                <td className="py-2 px-2 md:px-3 border-b">
                    <Link href={`/vendors/billboards/requests/${4}`}>view</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
          

      </div>
    </section>
  );
};

export default BillBoardDashboard;
