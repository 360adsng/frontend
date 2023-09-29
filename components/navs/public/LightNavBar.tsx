"use client"

import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from '@public/icons/menu.svg'
import Drawer from "./Drawer";
import { useState } from 'react';
import BlackLogo from '@components/logo/BlackLogo'



const LightNavbar = () => {
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
            <nav className="flex px-5 md:px-0 justify-between md:justify-evenly body-font font-poppins py-5 bg-ads360light-100 text-base">
                <BlackLogo/>
                <ul className="py-3 hidden md:flex text-center">
                    <li className="group">
                        <Link href="/about" className="mx-4 transition duration-300 hover:text-ads360yellow-100">About Us</Link>
                        <div className="group-hover:animate-move ml-4 w-0 border-b border-b-ads360black-100 mt-1"></div>
                    </li>

                    <li className="group">
                        <Link href="/discovery" className="mx-4 transition duration-300 hover:text-ads360yellow-100">Services</Link>
                        <div className="group-hover:animate-move ml-4 w-0 border-b border-b-ads360black-100 mt-1"></div>
                    </li>

                    <li className="group">
                        <Link href="/faqs" className="mx-4 transition duration-300 hover:text-ads360yellow-100">FAQs</Link>
                        <div className="group-hover:animate-move ml-4 w-0 border-b border-b-ads360black-100 mt-1"></div>
                    </li>

                    <li className="group">
                        <Link href="/contact" className="mx-4 transition duration-300 hover:text-ads360yellow-100">Contact Us</Link>
                        <div className="group-hover:animate-move ml-4 w-0 border-b border-b-ads360black-100 mt-1"></div>
                    </li>

                </ul>
                <div className="hidden md:block text-center">
                    <button className="group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12">
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
           <Drawer isOpen={isOpen} toggleDrawer={handleToggleDrawer}/>
        </>
    )
}

export default LightNavbar;