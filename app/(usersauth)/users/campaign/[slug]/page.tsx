"use client"
import { useState } from 'react'
import cancel from "@public/icons/usericon/modalCancelBotton.svg";
import billboardImage2 from '@public/del/billboard2.png'
import Image from 'next/image'
import { Modal } from '@components/modal/modal'



const Checkout = ({params}:{params:{slug:string}}) => {


const [negotia, setNegotia] = useState(false);
  const [negotiatedAmount, setNegotiatedAmount] = useState("");
  const [successfull, setSuccessfull] = useState(false);
  const [billboard, setBillboard] = useState({
    id: 2,
    name: "Adetokunbo Ademola led, victoria island",
    location: "Along Adetokunbo Ademola Street by Bishop",
    image: billboardImage2,
    status:params.slug === '1' ? 'completed': params.slug === '2' ? 'negotiating' : 'ongoing',
    pricepd: "30000",
    negotiationCount: 1,
    feedback:'rejected',
    finalprice:'29500',
    yourPrice:'28000',
    Impressions: "40 per day",
    minimumNegotiableAmount: 26000,
    type: "Double faced Gantry LED",
    duration: "14hrs (6am - 9pm) 6days/week",
  });

  const handleNegotiate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNegotiatedAmount(e.target.value);
  };


  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessfull(true);
    setNegotia(false);
    setBillboard((prev) => ({ ...prev, negotiationCount: 1 }));
    setTimeout(() => {
      setSuccessfull(false);
    }, 4000);
  };

  


  return (
    <section className='px-4 md:px-10 py-14   min-h-screen bg-ads360-hash'>

      <div className='my-5 font-bold'>
      </div>
        
        <div>
          <Image
            height={0}
            width={0}
            alt='billboard'
            src={billboardImage2}
            className='mx-auto'
          />
        </div>
        <div className="w-full overflow-x-auto my-5">
          <table className="min-w-full bg-white">
            <thead className='bg-[#D0B301]/40'>
              <tr>
                <th className="py-2 px-2 md:px-3 border-b">Name</th>
                <th className="py-2 px-2 md:px-3 border-b">Location</th>
                <th className="py-2 px-2 md:px-3 border-b">Size</th>
                <th className="py-2 px-2 md:px-3 border-b">Duration</th>
                <th className="py-2 px-2 md:px-3 border-b">Start Date</th>
                <th className="py-2 px-2 md:px-3 border-b">End Date</th>
                <th className="py-2 px-2 md:px-3 border-b">Cost/day</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-2 md:px-3 border-b">Eko hotel LED, Victoria Island</td>
                <td className="py-2 px-2 md:px-3 border-b">Along Adetokunbo Ademola Street by Eko Hotels</td>
                <td className="py-2 px-2 md:px-3 border-b">4m(H) by 12m(W)</td>
                <td className="py-2 px-2 md:px-3 border-b">1 day(s)</td>
                <td className="py-2 px-2 md:px-3 border-b">2023-05-20</td>
                <td className="py-2 px-2 md:px-3 border-b">2023-05-21</td>
                <td className="py-2 px-2 md:px-3 border-b">₦30,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='md:flex md:space-x-2 justify-end'>
        {billboard.status === 'negotiating' &&

        <div className='bg-[#D0B301]/40  w-full p-5 md:w-1/2 lg:w-1/3 my-5 md:my-0'>

        
              <div className=''>
                <h4 className='basis-1/2'>Remark</h4>
                <div className='font-bold basis-1/2'>
                  {billboard.feedback === 'rejected'?`the billboard owner has rejected your request, and their final price is ${billboard.finalprice}`:'the billboard owner has accepted your request, you can proceed to make payment'}
                </div>
              </div>
          
          
          </div>
            }
          <div className='bg-[#D0B301]/40  w-full p-5 md:w-1/2 lg:w-1/3'>
            
            <div className='flex'>
              <h4 className='basis-1/2'>Status</h4>
              <div className='font-bold basis-1/2'>
                {billboard.status}
              </div>
            </div>

            <div className='flex'>
              <h4 className='basis-1/2'>Total Amount</h4>
              <div className='basis-1/2'>
                <div className='font-bold'>
                   {billboard.finalprice !== '' && billboard.feedback === 'rejected' ? billboard.finalprice : billboard.feedback === 'accepted' ? billboard.yourPrice : '₦30,000'}
                </div>
                <div>cost x 1 day(s)</div>
              </div>
            </div>
          </div>
        </div>


        {
           billboard.status === 'negotiating' &&
          <div className='flex md:justify-end space-x-3 my-3'> 
          {
            billboard.negotiationCount > 1 && billboard.feedback === 'rejected' &&
            <button onClick={()=>setNegotia(true)} className="group rounded-10 my-2 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12">
              Negotiat
            </button> 
          }
          

                    

          <button className="group rounded-10 my-2 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12">
            Pay Now
          </button>
        </div>
        
        }


<Modal isOpen={negotia}>
        <div className="bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10">
          <div className="flex justify-between mb-5">
            <h4 className="">Input Amount</h4>
            <button onClick={() => setNegotia(false)}>
              <Image
                src={cancel}
                width={0}
                height={0}
                alt="modal cancel botton"
                className="w-5"
              />
            </button>
          </div>
          <form onSubmit={submit}>
            <div className="flex">
              <div className="bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-1/5 content-center text-black/50">
                {" "}
                ₦{" "}
              </div>
              <input
                type="number"
                value={negotiatedAmount}
                onChange={handleNegotiate}
                className="p-2 focus:outline-none w-full border rounded-r"
              />
            </div>
            <div className="my-3">
              <p className="text-red-700 text-xs">
                You cannot negotiat lower than ₦
                {billboard.minimumNegotiableAmount}
              </p>
              <p className="text-red-700 text-xs">You can only negotiat once</p>
            </div>
            <div className="flex justify-center">
              <button
                disabled={
                  negotiatedAmount === "" ||
                  parseInt(negotiatedAmount) < billboard.minimumNegotiableAmount
                    ? true
                    : false
                }
                className={`${
                  negotiatedAmount === "" ||
                  parseInt(negotiatedAmount) < billboard.minimumNegotiableAmount
                    ? "bg-ads360gray-100"
                    : "bg-ads360black-100/95 hover:bg-ads360black-100"
                } rounded mt-5  text-white  w-5/6 h-10`}
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </Modal>
        



      
    </section>
  )
}

export default Checkout