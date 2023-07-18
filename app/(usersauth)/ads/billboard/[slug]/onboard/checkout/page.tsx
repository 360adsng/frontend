"use client"
import { createPortal } from 'react-dom'
import { useState } from 'react'
import billboardImage2 from '@public/del/billboard2.png'
import Image from 'next/image'
import { FiXCircle } from 'react-icons/fi'
import { Space_Grotesk } from 'next/font/google'
const space_grotesk = Space_Grotesk({
    subsets:['latin'],
    display: 'swap',
})




const Checkout = () => {

  const [negotia, setNegotia] = useState(false)

  const billboard = {
    id:2,
    name:'Adetokunbo Ademola led, victoria island',
    location:'Along Adetokunbo Ademola Street by Bishop',
    image:billboardImage2,
    pricepd:'30000',
    Impressions:"40 per day",
    type:'Double faced Gantry LED',
    duration:'14hrs (6am - 9pm) 6days/week'
}  


  return (
    <section className='px-4 md:px-10 py-24'>
        
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

        <div className='flex justify-end'>
          <div className='bg-[#D0B301]/40 flex justify-between w-full p-5 md:w-1/2 lg:w-1/3'>
            <h4>Total Amount</h4>
            <div>
              <div className='font-bold'>₦30,000</div>
              <div>cost x 1 day(s)</div>
            </div>
          </div>
        </div>

        <div className='flex md:justify-end space-x-3 my-3'>
          <button onClick={()=>setNegotia(true)} className="group rounded-10 my-2 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12">
            Negotiat
          </button>

          <button className="group rounded-10 my-2 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12">
            Pay Now
          </button>
        </div>
        


        



        { negotia && createPortal(
          <div className={`fixed top-0 left-0 bg-black/40 w-full h-full z-[10000] ${space_grotesk.className}`}>
            <div className='flex justify-center items-center pt-28'>
              <div className='bg-white p-3 rounded-10'>
                <div className='flex justify-between my-3'>
                  <h4 className=''>Enter Amount</h4>
                  <button onClick={()=>setNegotia(false)}><FiXCircle/></button>
                </div>
                <input type='number' className='p-2 focus:outline-none w-full border rounded-10'/>
                <div className='mt-2'>
                  <p className='text-red-500 text-sm'>You can only Negotiat once</p>
                  <p className='text-red-500 text-sm'>You cannot Negotiat lower than ₦26000</p>
                </div>
                <button className="group rounded-10 my-2 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12">
                  Proceed
                </button>
              </div>
            </div>
            
          </div>, document.body
        )

        }
    </section>
  )
}

export default Checkout