"use client"

import { Link } from "@tanstack/react-router"
const MobileMenu = '/icons/menu.svg'
import Drawer from '@components/modal/Drawer'
import { useState } from 'react';
import BlackLogo from '@components/logo/BlackLogo'
import DrawerContent from './DrawerContent';
import { hasAccessToken } from "@endpoint/baseFetch";




const LightNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
   //check if user is logged in
   const isLoggedIn = hasAccessToken()

    const handleToggleDrawer = () => {
        if(isOpen){
            setIsOpen(false)
        }else{
            setIsOpen(true)
        }
    }

    return(
        <>
            <nav className="flex px-5 md:px-0 justify-between md:justify-evenly font-sans py-5 bg-ads360light-100 text-base">
                <div className='py-3'>
                    <BlackLogo/>
                </div>
                <ul className="py-3 hidden md:flex text-center">
                    <li className="group">
                        <Link to="/about" className="mx-4 transition duration-300 hover:text-ads360yellow-100">About Us</Link>
                        <div className="group-hover:animate-move ml-4 w-0 border-b border-b-ads360black-100 mt-1"></div>
                    </li>

                    <li className="group">
                        <Link to="/discovery" className="mx-4 transition duration-300 hover:text-ads360yellow-100">Services</Link>
                        <div className="group-hover:animate-move ml-4 w-0 border-b border-b-ads360black-100 mt-1"></div>
                    </li>

                    <li className="group">
                        <Link to="/faqs" className="mx-4 transition duration-300 hover:text-ads360yellow-100">FAQs</Link>
                        <div className="group-hover:animate-move ml-4 w-0 border-b border-b-ads360black-100 mt-1"></div>
                    </li>

                    <li className="group">
                        <Link to="/contact" className="mx-4 transition duration-300 hover:text-ads360yellow-100">Contact Us</Link>
                        <div className="group-hover:animate-move ml-4 w-0 border-b border-b-ads360black-100 mt-1"></div>
                    </li>

                </ul>
                <div className="hidden md:block text-center">
                    {isLoggedIn ? (
                        <button className="group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12">
                            <Link to="/users">Dashboard</Link>
                        </button>
                    ) : (
                        <button className="group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12">
                            <Link to="/signup">Get Stated</Link>
                        </button>
                    )}
                    
                </div>
                <div className="md:hidden" onClick={handleToggleDrawer}>
                    <img 
                        src={MobileMenu} alt=""
                    />

                </div>
           </nav>
           <Drawer isOpen={isOpen} toggleDrawer={handleToggleDrawer}>
                <DrawerContent toggleDrawer={handleToggleDrawer}/>
           </Drawer>
        </>
    )
}

export default LightNavbar;