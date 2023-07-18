"use client"
import Image from 'next/image'
import Link from 'next/link'
//import images
import billboardImage1 from '@public/del/billboard1.png'
import billboardImage2 from '@public/del/billboard2.png'
import naira from "@public/icons/naira.svg"
import Arrowleft from '@public/icons/Arrowleft.svg'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import { FiXCircle } from 'react-icons/fi'

import { Space_Grotesk } from 'next/font/google'
const space_grotesk = Space_Grotesk({
    subsets:['latin'],
    display: 'swap',
})


function Billboards() {


    const [filter, setFilter] = useState(false)

    const billboards = [
        {
            id:1,
            name:'Eko hotel led, victoria island',
            location:'Along Adetokunbo Ademola Street by Eko',
            image:billboardImage1,
            pricepd:'60000',
            Impressions:"70 per day",
            type:'Double faced Gantry LED',
            duration:'14hrs (6am - 9pm) 6days/week'
        },
        {
            id:2,
            name:'Adetokunbo Ademola led, victoria island',
            location:'Along Adetokunbo Ademola Street by Bishop',
            image:billboardImage2,
            pricepd:'30000',
            Impressions:"40 per day",
            type:'Double faced Gantry LED',
            duration:'14hrs (6am - 9pm) 6days/week'
        },
        {
            id:3,
            name:'Eko hotel led, victoria island',
            location:'Along Adetokunbo Ademola Street by Eko',
            image:billboardImage1,
            pricepd:'40000',
            Impressions:"50 per day",
            type:'Double faced Gantry LED',
            duration:'14hrs (6am - 9pm) 6days/week'
        },
        {
            id:4,
            name:'Adetokunbo Ademola led, victoria island',
            location:'Along Adetokunbo Ademola Street by Bishop',
            image:billboardImage2,
            pricepd:'35000',
            Impressions:"40 per day",
            type:'Double faced Gantry LED',
            duration:'14hrs (6am - 9pm) 6days/week'
        },
        {
            id:5,
            name:'Adetokunbo Ademola led, victoria island',
            location:'Along Adetokunbo Ademola Street by Bishop',
            image:billboardImage2,
            pricepd:'35000',
            Impressions:"40 per day",
            type:'Double faced Gantry LED',
            duration:'14hrs (6am - 9pm) 6days/week'
        },
        {
            id:6,
            name:'Adetokunbo Ademola led, victoria island',
            location:'Along Adetokunbo Ademola Street by Bishop',
            image:billboardImage2,
            pricepd:'35000',
            Impressions:"40 per day",
            type:'Double faced Gantry LED',
            duration:'14hrs (6am - 9pm) 6days/week'
        },
        {
            id:7,
            name:'Adetokunbo Ademola led, victoria island',
            location:'Along Adetokunbo Ademola Street by Bishop',
            image:billboardImage2,
            pricepd:'35000',
            Impressions:"40 per day",
            type:'Double faced Gantry LED',
            duration:'14hrs (6am - 9pm) 6days/week'
        },
        {
            id:8,
            name:'Adetokunbo Ademola led, victoria island',
            location:'Along Adetokunbo Ademola Street by Bishop',
            image:billboardImage2,
            pricepd:'35000',
            Impressions:"40 per day",
            type:'Double faced Gantry LED',
            duration:'14hrs (6am - 9pm) 6days/week'
        },
        {
            id:9,
            name:'Adetokunbo Ademola led, victoria island',
            location:'Along Adetokunbo Ademola Street by Bishop',
            image:billboardImage2,
            pricepd:'35000',
            Impressions:"40 per day",
            type:'Double faced Gantry LED',
            duration:'14hrs (6am - 9pm) 6days/week'
        },
        {
            id:10,
            name:'Adetokunbo Ademola led, victoria island',
            location:'Along Adetokunbo Ademola Street by Bishop',
            image:billboardImage2,
            pricepd:'35000',
            Impressions:"40 per day",
            type:'Double faced Gantry LED',
            duration:'14hrs (6am - 9pm) 6days/week'
        },



    ]
  return (
    <section className='px-4 md:px-10 py-24'>
        
        <h3 className='text-2xl'></h3>

        <div className='flex justify-between'>

            <div className="flex items-center font-bold">
            <button className='group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-11  h-11 flex justify-center items-center rounded-[50%] color-white'>
            <Image
                src={Arrowleft}
                width={0}
                height={0}
                alt="arrow"
            />
            </button>
            BillBoard Marketing
        </div>

        
      </div>


        <section className='lg:flex my-5'>
            <div className='gap-5 md:p-10 grid grid-cols-1 md:grid-cols-2 basis-4/5'>
                {
                    billboards.map((billboard)=>(
                        <div className='rounded bg-white border border-ads360yellow-100' key={billboard.id}>
                            <div className='relative'>

                                <Image
                                    width={0}
                                    height={0}
                                    alt={billboard.name}
                                    src={billboard.image}
                                    className='w-full rounded-t h-auto'
                                />
                                <div className='text-ads360yellow-100 font-bold bg-black/40 text-center w-full absolute bottom-0 text-sm md:text-base py-1 md:py-3 rounded'>
                                    {billboard.name.toLocaleUpperCase()}
                                </div>
                            </div>
                           

                            <div className='grid grid-cols-1 md:grid-cols-2 my-5 w-11/12 mx-auto'>
                                <div className='my-1'>
                            
                                        <span className='font-bold'>location: </span>
                                        {billboard.location}
                
                                </div>

                                <div className='my-1'>
                                    <p>
                                        <span className='font-bold'>Impression: </span>
                                        {billboard.Impressions}
                                    </p>
                                </div>

                                <div className='my-1'>
                                    <p>
                                        <span className='font-bold'>Board-type: </span>
                                        {billboard.type}
                                    </p>
                                </div>

                                <div className='my-1'>
                                    <p>
                                        <span className='font-bold'>Run-time: </span>
                                        {billboard.duration}
                                    </p>
                                </div>
                            </div>

                            <div className='mb-5 flex justify-between mx-auto w-11/12'>
                                <div className='flex items-center'>
                                    <Image
                                        width={0}
                                        height={0}
                                        src={naira}
                                        alt='naira sign'
                                    />
                                    From ₦{billboard.pricepd}
                                </div>
                                <button className="group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12">
                                    <Link href={`/ads/billboard/${billboard.id}`}>View BillBoard</Link>
                                </button>
                            </div>
                            
                            
                        </div>
                    ))
                }
            </div>

            <div className='basis-1/5'>
                <div className='top-[12.5rem] sticky rounded-10 p-3 border border-ads360yellow-100 bg-white hidden lg:block'>
                    <p>Filter billboard</p>

                    <div className='my-2'>
                        <p>Billboard Type</p>
                        <select className='px-2 py-1 border focus:outline-none rounded-10'>
                            <option>
                                select
                            </option>
                            <option>
                                Double faced Gantry LED
                            </option>
                            <option>
                                Single faced Gantry LED
                            </option>
                            <option>
                                Double faced Gantry LED
                            </option>
                        </select>
                    </div>
                    
                    <div className='my-2'>
                        <p>Price Range</p>
                        <div className='flex justify-between space-x-1'>
                            <div className='basis-1/2'>
                                <label>from:</label>
                                <input type='number' className='rounded-10 w-full border focus:outline-none px-2 py-1'/>
                            </div>

                            <div className='basis-1/2'>
                                <label>to:</label>
                                <input type='number' className='rounded-10 w-full border focus:outline-none px-2 py-1'/>
                            </div>
                        </div>
                        
                    </div>

                    <div className='my-2'>
                        <p>Location</p>
                        <input list="location" name="browser" id="browser" className='border focus:outline-none rounded-10 px-2 py-1'/>

                        <datalist id="location" className=''>
                            <option value="Ikeja"/>
                            <option value="ikotun"/>
                            <option value="port harcourt"/>
                            <option value="abuja"/>
                            <option value="victoria island"/>
                        </datalist>
                    </div>

                    <div className='my-2'>
                        <p>Status</p>
                        <select  className='px-2 py-1 border focus:outline-none rounded-10'>
                            <option>
                                Negotiable
                            </option>
                            <option>
                                Non Negotiable
                            </option>
                        </select>

                    </div>

                    <button className="group rounded-10 my-2 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12">
                        Filter
                    </button>
                </div>
            </div>


        { filter !== true &&
        <div className='fixed w-full left-3 bottom-5 lg:hidden'>
            <button className='rounded-full font-bold border bg-ads360yellow-100 shadow-md border-white w-16 h-16' onClick={()=>{setFilter(true)}}>
                Filter
            </button>
        </div>
        } 


        </section>

                {
                    filter && createPortal(
                        <div className={`fixed w-full px-5 transition duration-500 py-10 bg-black/30 top-0 left-0 h-full z-[10000] ${space_grotesk.className}`}>

                            <div className=''>
                                <div className='top-[12.5rem] sticky rounded-10 p-3 border border-ads360yellow-100 bg-white'>
                                    <div className='flex justify-between'>
                                        <p>Filter billboard</p>

                                        <div onClick={()=>setFilter(false)}>
                                            <FiXCircle/>
                                        </div>
                                    </div>

                                    <div className='my-2'>
                                        <p>Billboard Type</p>
                                        <select className='px-2 py-1 border focus:outline-none rounded-10'>
                                            <option>
                                                select
                                            </option>
                                            <option>
                                                Double faced Gantry LED
                                            </option>
                                            <option>
                                                Single faced Gantry LED
                                            </option>
                                            <option>
                                                Double faced Gantry LED
                                            </option>
                                        </select>
                                    </div>
                                    
                                    <div className='my-2'>
                                        <p>Price Range</p>
                                        <div className='flex justify-between space-x-1'>
                                            <div className='basis-1/2'>
                                                <label>from:</label>
                                                <input type='number' className='rounded-10 w-full border focus:outline-none px-2 py-1'/>
                                            </div>

                                            <div className='basis-1/2'>
                                                <label>to:</label>
                                                <input type='number' className='rounded-10 w-full border focus:outline-none px-2 py-1'/>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <div className='my-2'>
                                        <p>Location</p>
                                        <input list="location" name="browser" id="browser" className='border focus:outline-none rounded-10 px-2 py-1'/>

                                        <datalist id="location" className=''>
                                            <option value="Ikeja"/>
                                            <option value="ikotun"/>
                                            <option value="port harcourt"/>
                                            <option value="abuja"/>
                                            <option value="victoria island"/>
                                        </datalist>
                                    </div>

                                    <div className='my-2'>
                                        <p>Status</p>
                                        <select  className='px-2 py-1 border focus:outline-none rounded-10'>
                                            <option>
                                                Negotiable
                                            </option>
                                            <option>
                                                Non Negotiable
                                            </option>
                                        </select>

                                    </div>

                                    <button className="group rounded-10 my-2 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 w-123 h-12">
                                        Filter
                                    </button>
                                </div>
                            </div>

                        </div>, document.body
                    )
                }
    </section>
  )
}

export default Billboards