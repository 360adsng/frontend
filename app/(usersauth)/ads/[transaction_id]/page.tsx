"use client"
import Image from "next/image";
import Link from "next/link";
//import images
import bank from "@public/icons/usericon/banking.svg"
import card from "@public/icons/usericon/card.svg"
import dbd from "@public/icons/usericon/dbd.svg"
import dollar from "@public/icons/usericon/dollar-sign.svg"
import purse from "@public/icons/usericon/purse.svg"
import Arrowleft from "@public/icons/Arrowleft.svg"
import mark from "@public/icons/mark.svg"


import { useState } from 'react'
import { useRouter } from "next/navigation";

const Payment = () => {
  const router = useRouter()
    const payment = [
        {
            image:purse,
            link:'ads/',
            name:'Wallet'
        },
        {
            image:card,
            link:'ads/',
            name:'Naira Funding Card'
        },
        {
            image:bank,
            link:'ads/',
            name:'Bank Transfer'
        },
        {
            image:dbd,
            link:'ads/',
            name:'Direct Bank Debit '
        },
        {
            image:dollar,
            link:'ads/',
            name:'USD Card'
        },
    ]
    return (
  
      <section className='px-4 md:px-10 py-24'>
         
         
         <div className="flex items-center font-bold">
          <button onClick={()=>router.back()}  className='group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-11  h-11 flex justify-center items-center rounded-[50%] color-white'>
            <Image
              src={Arrowleft}
              width={0}
              height={0}
              alt="arrow"
            />
          </button>
          Payment Method
        </div>
  
  
              <div className="hidden items-center justify-center mx-auto mt-5 mb-10 md:flex">
                <div className="font-bold text-sm">
                  <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
                        <Image src={mark} width={0} height={0} alt="" />
                      </div>
                      <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
                  </div>
                  <div className="relative -left-10">
                    Select Campaign
                  </div>
                </div>
  
                <div className="font-bold text-sm">
                  <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
                        <Image src={mark} width={0} height={0} alt="" />
                      </div>
                      <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
                  </div>
                  <div className="relative -left-10">
                    Onboarding
                  </div>
                </div>
  
  
                <div className="font-bold text-sm text-left">
                  <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
                        <Image src={mark} width={0} height={0} alt="" />
                      </div>
                      <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
                  </div>
                  <div className="relative -left-7">
                    Completing
                  </div>
                </div>
                
                <div className="font-bold text-sm">
                  <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full border border-ads360yellow-100"></div>
                  </div>
                  <div className="relative -left-5">
                    Checkout
                  </div>
                </div>
                
              </div>  
  
              <div className="font-bold md:hidden text-right mt-5 mb-10">
                 #4 - Checkout
              </div>
  
            <p className="text-stone-400 text-center">
              Choose a payment to complete your campaign.
            </p>
  
  
            <div className="grid grid-cols-1 gap-5 my-10">
              {
                payment.map((ad, i)=>(
  
                  <Link key={i} href='/'>
                    <div className="group shadow flex justify-between rounded px-3 md:px-10 py-7 bg-white border border-ads360yellow-100 items-center">
                     
                     <div className='flex items-center space-x-5'>
                        <Image
                          width={45}
                          height={45}
                          alt={ad.name}
                          src={ad.image}
                        />
                        <div className="px-4">
                          <h4 className="group-hover:text-ads360yellow-100 font-semibold">
                            {ad.name}
                          </h4>
                        </div>
                     </div>
                    </div>
                  </Link>
  
  
                ))
              }
  
            </div>
  
      </section>
)
}

export default Payment