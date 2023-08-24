"use client"

import { useEffect, useRef } from 'react';
import Link  from 'next/link';
import Image from 'next/image';
import React360Logo from '@public/logo/360white.svg';
import ReactAdsLogo from '@public/logo/adsWhite.svg';
import CloseAside from '@public/icons/closeAside.svg';
import SmallBtnYello from '../buttons/SmallBtnYellow';
import instagram from '@public/icons/Instagram.svg'
import facebook from '@public/icons/Facbook.svg'
import twitter from '@public/icons/Twitter.svg'
import { FiArrowRight } from "react-icons/fi"



interface Props {
    isOpen:boolean,
    toggleDrawer: ()=>void
}

const Drawer: React.FC<Props> = ({isOpen, toggleDrawer}) => {

    const drawer = useRef<HTMLElement>(null)
    useEffect(()=>{

        if(isOpen){
            drawer.current?.classList.add('forward')
            drawer.current?.classList.remove('reverse')
            drawer.current?.classList.remove('-left-[100%]')

        }else{
            drawer.current?.classList.add('reverse')
            drawer.current?.classList.remove('forward')
        }
    
    }, [isOpen])

    return(
        <>
        <aside ref={drawer}   className='bg-ads360black-100 z-30 -left-[100%] md:hidden fixed w-full h-full top-0 overflow-y-scroll'>
            <div className='px-5'>
                <div className='flex justify-between  py-5'>
                    <div className="flex items-center">
                        <Image 
                            src={React360Logo} 
                            width={0}
                            height={0}
                            alt=""
                            className="hover:-rotate-90 transistion duration-300"
                        />
                        <Image 
                            src={ReactAdsLogo} 
                            width={0}
                            height={0}
                            alt=""
                        />
                    </div>
                    <div className="md:hidden" onClick={toggleDrawer}>
                    <Image 
                        src={CloseAside} 
                        width={0}
                        height={0}
                        alt=""
                    />
                    </div>
                </div>
                <div className='text-ads360light-100'>
                    <h3 className='text-2xl my-2'><Link href="/about" onClick={toggleDrawer}>About Us</Link></h3>
                    <h3 className='text-2xl my-2'><Link href="/discovery" onClick={toggleDrawer}>Our Services</Link></h3>
                    <h3 className='text-2xl my-2'><Link href="/faq" onClick={toggleDrawer}>FAQs</Link></h3>
                    <h3 className='text-2xl my-2'><Link href="/contact" onClick={toggleDrawer}>Contact Us</Link></h3>
                </div>
                <hr className='my-5'/>
                <div className='flex flex-col text-ads360light-100 mb-5'>
                    <h5 className='text-ads360yellow-100 my-3'>OUR SERVICES</h5>
                    <Link href='' className='my-2' onClick={toggleDrawer}>Billboard Advertisement</Link>
                    <Link href='' className='my-2' onClick={toggleDrawer}>Blog Advertisements</Link>
                    <Link href='' className='my-2' onClick={toggleDrawer}>SMS Campaigns</Link>
                    <Link href='' className='my-2' onClick={toggleDrawer}>WhatsApp Status Ads</Link>
                    <Link href='' className='my-2' onClick={toggleDrawer}>Influencer Marketing</Link>
                    <Link href='' className='my-2' onClick={toggleDrawer}>Twitter Spaces</Link>
                </div>

                <Link href="/signup">
                    <span className='group flex w-[168px]'>
                        <button className='group-hover:translate-x-32 group-hover:bg-ads360light-100 w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white'><FiArrowRight size={28}/></button>
                        <button className='group-hover:-translate-x-10 w-32 group-hover:bg-ads360light-100  transition rounded-10 bg-ads360yellowBtn-100 h-12'>Get Started</button>
                    </span>
                </Link>

                <hr className='my-5'/>
                <div className='text-ads360light-100'>
                <h5 className='text-ads360yellow-100 my-3'>CONTACT INFO</h5>
                   <h6>3 Adedoyin Ogungbe Crecent,</h6>
                    <h6>Lekki Phase 1,</h6>
                    <h6>Lagos, Nigeria</h6>
                    <h6>+2348122089773</h6>
                    <h6>info@360ads.com.ng</h6>
                </div>

                {/* <form> */}
                <div className='flex px-1 rounded h-[50px] w-full md:w-[40%] items-center justify-center bg-ads360light-100 mt-10 mb-5'>
                        <input type="text" className='w-full focus:outline-none bg-transparent h-[50px]' placeholder='Enter Email...' />
                        <div>
                            <SmallBtnYello text='Submit'/>
                        </div>
                    </div>
                {/* </form> */}
                <hr/>
                <div className='flex justify-between my-5'>
                    <p className='text-ads360light-100'>360 ads © 2023</p>
                    <div className='flex'>
                        <Link href='' className='mx-2 hidden'>Terms & Conditions</Link>
                        <div className='flex'>
                            <Link href='' className='mx-2'><img src={instagram} alt='instagram logo'/></Link>
                            <Link href='' className='mx-2'><img src={facebook} alt='facebook logo'/></Link>
                            <Link href='' className='mx-2'><img src={twitter} alt='twitter logo'/></Link>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        </>
    )
}

export default Drawer;