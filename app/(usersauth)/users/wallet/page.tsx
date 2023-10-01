import Image from "next/image"
import naira from "@public/icons/naira.svg"
import filter from "@public/icons/filter.svg"
import makepayment from "@public/icons/makepayment.svg"
import whatsAppPoint from "@public/icons/usericon/whatsappPoint.svg"

import Link from "next/link"


const WalletSection = () => {
  return (
    <section className='min-h-screen bg-ads360-hash px-4 md:px-10 py-14'>
      <div className="container mx-auto">
        <h2 className="text-2xl">My Wallet</h2>
        <p className="text-stone-400">View billing history and current balance here</p>


        <div className="md:flex my-10 justify-around bg-white p-5 shadow-md rounded-10 border border-ads360yellow-100">
          <div>
          <h3>Account Name</h3>
          <p className="text-stone-400 text-xl my-4">Ayomike Charles</p>

          <div>
          <p className="my-3">Balance</p>
          <div className="flex">
            <Image
              height={0}
              width={0}
              alt="naira"
              src={naira}
              className="w-14 h-14"
            />
            <div className="px-3">
              <p className="text-2xl">₦1000000.00</p>
              <h3 className="text-stone-400 text-sm">Available Balance</h3>
            </div>
            </div>
          </div>
          </div>


          <div>
          <h3 className="mt-5 md:my-0">360ads Wallet ID</h3>
          <p className="text-xl text-ads360yellow-100 my-4">3211711562</p>

          <div>
            <p className="my-3">WhatsApp Point</p>
          <div className="flex">
            <Image
              height={0}
              width={0}
              alt="naira"
              src={whatsAppPoint}
              className="w-14 h-14"
            />
            
            <div className="px-3">
              <p className="text-2xl">0</p>
              <h3 className="text-stone-400 text-sm">Available Balance</h3>
            </div>
            </div>
          </div>
          </div>


          <div className="">
            <Link href='wallet/fundwallet' className="flex px-10 space-x-5 py-5 my-5 md:my-0 rounded border text-ads360light-100 bg-ads360black-100/95 hover:bg-ads360black-100">
                <Image
                  height={0}
                  width={0}
                  alt="make payment icon"
                  src={makepayment}
                  className="w-5 h-5"
                />
                <span>
                  Fund Wallet  
                </span>             
            </Link>
          </div>
        </div>


        <div className="group">
          <div className="flex justify-end">
            <button className="flex space-x-2 bg-[#E4E4E4] p-1 rounded-full px-5">
            <Image src={filter} alt="filter" className="py-2" width={20} height={20}/>
            <span>filter</span> 
            </button>
          </div>


          {/* <div className="flex justify-end">
          <div className="">
            <select defaultValue='select' className="rounded mx-2 p-2 focus:outline-none bg-ads360light-100">
              <option disabled>select</option>
              <option>funded wallet</option>
              <option>debited wallet</option>
            </select>
          </div>
          <div className="flex">
            <input type="date" className="rounded p-2 focus:outline-none bg-ads360light-100"/>
          </div>
        </div> */}
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
