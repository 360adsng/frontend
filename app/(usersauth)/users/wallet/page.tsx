import Image from "next/image"
import naira from "@public/icons/naira.svg"
import makepayment from "@public/icons/makepayment.svg"
import Link from "next/link"


const WalletSection = () => {
  return (
    <section className='min-h-screen bg-ads360-hash px-4 md:px-10 py-14'>
      <div className="container mx-auto">
        <h2 className="text-2xl">My Wallet</h2>
        <p className="text-stone-400">View billing history and current balance here</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <div className="bg-white p-4 shadow-md rounded-10 border flex items-center border-ads360yellow-100">
            <Image
              height={0}
              width={0}
              alt="naira"
              src={naira}
              className="w-14 h-14"
            />
            <div className="px-3">
              <p className="text-2xl">₦500098.00</p>
              <h3 className="text-stone-400 text-sm">Available Balance</h3>
            </div>
          </div>
          <div className="bg-white p-4 shadow-md rounded-10 border border-ads360yellow-100">
            <h3>Fund Wallet</h3>
            <input type="number" className="p-2 border rounded-10 focus:outline-none my-3 w-full " placeholder="enter amount" />
            <button className="group flex items-center rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 p-2">
                <Image
                  height={0}
                  width={0}
                  alt="make payment icon"
                  src={makepayment}
                  className="w-5 h-5"
                />
                Make Payment                 
            </button>
          </div>
        </div>



        <div className="bg-white p-4 shadow-md my-3 rounded-10 border border-ads360yellow-100">
            <h3 className="text-lg mb-2">Transaction History</h3>
            <ul>
              <li className="mb-2 flex justify-between bg-[#f1f1f1] p-2 rounded">
                <div>
                  <p className="font-bold">funded wallet</p>
                  <p>June 1, 2023</p>
                </div> 
                <div className="text-green-500"> 
                  +₦5000.00
                </div>
              </li>


              <li className="mb-2 flex justify-between bg-[#f1f1f1] p-2 rounded">
                <div>
                  <p className="font-bold">debited wallet</p>
                  <p>June 6, 2023</p>
                </div> 
                <div className="text-red-500"> 
                  +₦3000.00
                </div>
              </li>


              <li className="mb-2 flex justify-between bg-[#f1f1f1] p-2 rounded">
                <div>
                  <p className="font-bold">funded wallet</p>
                  <p>June 8, 2023</p>
                </div> 
                <div className="text-green-500"> 
                  +₦8000.00
                </div>
              </li>
            </ul>

            {/* <div className="my-3 text-right text-ads360yellow-100"><Link href=''>view all</Link></div> */}
          </div>
      </div>
    </section>
  )
}

export default WalletSection
