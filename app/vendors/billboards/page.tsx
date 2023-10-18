import Image from "next/image";
import naira from "@public/icons/usericon/naira.svg"
import billboard from "@public/icons/led2.svg";
import bluecampaign from "@public/icons/usericon/bluecampiagn.svg"



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


        <div className="">

        </div>
      </div>



      <div>
          

      </div>
    </section>
  );
};

export default BillBoardDashboard;
