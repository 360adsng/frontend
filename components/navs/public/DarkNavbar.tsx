"use client"

import  Link  from "next/link";
import Image from "next/image";
import MobileMenu from '@public/icons/menu.svg';
import Drawer from '@components/modal/Drawer'
import { useState } from 'react'
import WhiteLogo from "@components/logo/WhiteLogo";
import DrawerContent from "./DrawerContent";



const DarkNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggleDrawer = () => {
        if(isOpen){
            setIsOpen(false)
        }else{
            setIsOpen(true)
        }
    }
 

    return(
        <>
            <nav className="flex px-5 md:px-0 justify-between md:justify-evenly -left-[100%] text-ads360light-100 py-5 bg-ads360black-100 text-base">
                <div className='py-2'>
                    <WhiteLogo/>
                </div>
                <ul className="py-3 hidden md:flex text-center">
                    <li className="group">
                        <Link href="/about" className="mx-4 transition duration-300 hover:text-ads360yellow-100">About Us</Link>
                        <div className="group-hover:animate-move ml-4 w-0 border-b border-b-ads360light-100 mt-1"></div>
                    </li>

                    <li className="group">
                        <Link href="/discovery" className="mx-4 transition duration-300 hover:text-ads360yellow-100">Services</Link>
                        <div className="group-hover:animate-move ml-4 w-0 border-b border-b-ads360light-100 mt-1"></div>
                    </li>

                    <li className="group">
                        <Link href="/faqs" className="mx-4 transition duration-300 hover:text-ads360yellow-100">FAQs</Link>
                        <div className="group-hover:animate-move ml-4 w-0 border-b border-b-ads360light-100 mt-1"></div>
                    </li>

                    <li className="group">
                        <Link href="/contact" className="mx-4 transition duration-300 hover:text-ads360yellow-100">Contact Us</Link>
                        <div className="group-hover:animate-move ml-4 w-0 border-b border-b-ads360light-100 mt-1"></div>
                    </li>

                </ul>
                <div className="hidden md:block text-center">
                    <button className="group rounded-10 hover:animate-changeColor2 hover:text-ads360light-100 text-ads360black-100 bg-ads360light-100 w-123 h-12">
                        <Link href="/signup">Get Stated</Link>
                    </button>
                </div>
                <div className="md:hidden" onClick={handleToggleDrawer}>
                    <Image 
                        src={MobileMenu} 
                        width={0}
                        height={0}
                        alt=""
                    />
                </div>
           </nav>
            <Drawer isOpen={isOpen} toggleDrawer={handleToggleDrawer}>
                <DrawerContent toggleDrawer={handleToggleDrawer}/>
            </Drawer>
        </>
    )
}

export default DarkNavbar;