"use client"
import Image from "next/image"
import dash from '@public/icons/dash.svg'
import { useState } from 'react'
import Table from "@components/ui/Table"

const Campaign = () => {
  
  const [view, setView] = useState('Billboard')
 

  return (
    <>
    <section className="bg-[#E9E9E9] px-4 md:px-10 pt-14">

        <h3 className='text-2xl'>Campaigns</h3>

        
      
        <p className="text-stone-400 mb-5 mt-3">
          Check all ads campaign history
        </p>

        <div className="overflow-x-auto py-1">
          <div className="w-[600px]  md:w-full flex justify-between md:justify-start md:space-x-3">
              <button className="relative" onClick={()=>setView('Billboard')}>
                Billboard
                {view === 'Billboard' && 
                  <Image
                    height={0}
                    width={0}
                    alt="Billboard Overview selected"
                    src={dash}
                    className="w-2/3 mx-auto absolute top-[20px] left-[17%]"
                  />
                }
              </button> 

              <button className="relative" onClick={()=>setView('Influencer')}>
                Influencer
                {view === 'Influencer' && 
                  <Image
                    height={0}
                    width={0}
                    alt="Billboard Overview selected"
                    src={dash}
                    className="w-2/3 mx-auto absolute top-[20px] left-[17%]"

                  />
                }
              </button>

              <button className="relative" onClick={()=>setView('sms')}>
                Smart sms
                {view === 'sms' && 
                  <Image
                    height={0}
                    width={0}
                    alt="Billboard Overview selected"
                    src={dash}
                    className="w-2/3 mx-auto absolute top-[20px] left-[17%]"

                  />
                }
              </button>


              <button className="relative" onClick={()=>setView('Whatsapp')}>
                Whatsapp
                {view === 'Whatsapp' && 
                  <Image
                    height={0}
                    width={0}
                    alt="Billboard Overview selected"
                    src={dash}
                    className="w-2/3 mx-auto absolute top-[20px] left-[17%]"

                  />
                }
              </button>

              <button className="relative" onClick={()=>setView('Digital')}>
                Digital Ads
                {view === 'Digital' && 
                  <Image
                    height={0}
                    width={0}
                    alt="Billboard Overview selected"
                    src={dash}
                    className="w-2/3 mx-auto absolute top-[20px] left-[17%]"

                  />
                }
              </button>

          </div>

        </div>


      </section>
      <section className='min-h-screen bg-ads360-hash px-4 md:px-10 py-14'>
        {
          view === 'Billboard' &&
          <Table/>
        }
        {
          view === 'Influencer' &&
          <div>No matching records found</div>
        }
        {
          view === 'sms' &&
          <div>No matching records found</div>
        }
        {
          view === 'Digital' &&
          <div>No matching records found</div>
        }
        {
          view === 'Whatsapp' &&
          <div>No matching records found</div>
        }
      </section>
    </>

  )
}

export default Campaign