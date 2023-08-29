"use client"
import { useState } from 'react'
import billboardImage2 from '@public/del/billboard2.png'
import cancel from '@public/icons/usericon/modalCancelBotton.svg'
import success from '@public/icons/usericon/checkSuccess.svg'
import Image from 'next/image'
import { Modal } from '@components/modal/modal'
import Link from 'next/link'





const Checkout = () => {

  const [negotia, setNegotia] = useState(false)
  const [negotiatedAmount, setNegotiatedAmount] = useState('')
  const [successfull, setSuccessfull] = useState(false)
  const [billboard, setBillboard] = useState({
    id:2,
    name:'Adetokunbo Ademola led, victoria island',
    location:'Along Adetokunbo Ademola Street by Bishop',
    image:billboardImage2,
    pricepd:'30000',
    negotiationCount:0,
    Impressions:"40 per day",
    minimumNegotiableAmount:26000,
    type:'Double faced Gantry LED',
    duration:'14hrs (6am - 9pm) 6days/week'
} )


  const handleNegotiate = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setNegotiatedAmount(e.target.value)
  }

  const submit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccessfull(true)
    setNegotia(false)
    setBillboard(prev=>({...prev, negotiationCount:1}))
    setTimeout(()=>{setSuccessfull(false)},4000)
  }
 


  return (
    <>
    <section className='mx-4 md:mx-10 py-24'>
        
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
          <button disabled={billboard.negotiationCount > 0 ? true : false } onClick={()=>setNegotia(true)} className={`w-123 h-12 rounded-10 my-2 ${billboard.negotiationCount > 0 ? 'bg-ads360yellow-100/50 text-black/50' : 'hover:animate-changeColor hover:text-white bg-ads360yellow-100' }`}>
            Negotiat
          </button>

          <button className="group rounded-10 my-2 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12">
            <Link href={`/ads/${2}`}>Pay Now</Link>
          </button>
        </div>
        
    </section>

    <Modal isOpen={negotia}>
    <div className='bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10'>
        <div className='flex justify-between mb-5'>
          <h4 className=''>Input Amount</h4>
          <button onClick={()=>setNegotia(false)}>
            <Image src={cancel} width={0} height={0} alt='modal cancel botton' className='w-5'/>
          </button>
        </div>
        <form onSubmit={submit}>
        <div className='flex'>
          <div className='bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-1/5 content-center text-black/50'> ₦ </div>
          <input type='number' value={negotiatedAmount} onChange={handleNegotiate} className='p-2 focus:outline-none w-full border rounded-r'/>
        </div>
        <div className='my-3'>
          <p className='text-red-700 text-xs'>You cannot negotiat lower than ₦{billboard.minimumNegotiableAmount}</p>
          <p className='text-red-700 text-xs'>You can only negotiat once</p>
        </div>
        <div className='flex justify-center'>
          <button 
            disabled = {negotiatedAmount === '' || parseInt(negotiatedAmount) < billboard.minimumNegotiableAmount ? true : false}
            className={`${negotiatedAmount === '' || parseInt(negotiatedAmount) < billboard.minimumNegotiableAmount ? 'bg-ads360gray-100':'bg-ads360black-100/95 hover:bg-ads360black-100'} rounded mt-5  text-white  w-5/6 h-10`}>
            Send Request
          </button>
        </div>
        </form>
    </div>
  </Modal>



  <Modal isOpen={successfull}>
    <div className='bg-white px-5 py-10 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10 grid grid-cols-1 content-center'>
     <Image
      width={0}
      height={0}
      alt=''
      src={success}
      className='mx-auto w-2/6'
     />
     <div>
      <p className='text-green-500 text-center mt-5 font-semibold'>Request Sent <br/> Successfully</p>
     </div>
    </div>
  </Modal>
  </>
  )
}

export default Checkout