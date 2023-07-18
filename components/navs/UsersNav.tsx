"use client"
import Image from "next/image"
import wallet from "@public/icons/wallet.svg"
import bell from "@public/icons/bell.svg"
import avatar from "@public/icons/user.png"
import { FiMenu } from "react-icons/fi"
import React360Logo from '@public/logo/360black.svg'
import ReactAdsLogo from '@public/logo/ads.svg'
import Link from "next/link"
import logout from '@public/icons/usericon/onlogout.svg'
import { useState } from "react"
import UserDrawer from "./UserDrawer"
import { usePathname } from "next/navigation"

function UsersNav() {

    const [dropDown, setDropDown] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const handleToggleDrawer = () => {
        if(isOpen){
            setIsOpen(false)
        }else{
            setIsOpen(true)
        }
    }
   

  return (
    <>
        <nav className='bg-white md:flex md:px-14 py-3 justify-between items-center hidden'>
            <div>
               {/* might add search later */}
            </div>
            <div>
                <ul className="flex justify-between space-x-7 items-center">
                    <li>
                        <Image
                            width={0}
                            height={0}
                            src={wallet}
                            alt="wallet"
                        />
                    </li>
                    <li className="relative">
                        <span className="absolute -top-[5px] -left-[2px] px-1 bg-ads360yellow-100 rounded-[50%] text-xs text-center text-white">0</span>
                        <Image
                            width={0}
                            height={0}
                            src={bell}
                            alt="bell"
                        />
                    </li>
                    <li>
                        <Image
                            className="border-4 rounded-[50%]"
                            width={45}
                            height={45}
                            src={avatar}
                            alt="avatar"
                        />
                    </li>
                </ul>
            </div>
        </nav>








{/* mobile navbar */}

        <nav className='bg-white md:hidden md:px-14 py-3 justify-between items-center flex'>
            <div className="py-1 px-2 flex items-center space-x-3">
                {pathname.split('/')[1] === 'users' &&
                    <div className="rounded-full border shadow-md border-ads360yellow-100 p-2" onClick={handleToggleDrawer}>
                        <FiMenu size={24}/>
                    </div>
                }

                <div>
                <div>
                    <Link href='/' className="flex items-center">
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
                            className=""
                        />
                    </Link>
                </div>
                </div>
            </div>
        
            <div>
                <ul className="flex py-1 px-2 items-center" onClick={()=>setDropDown(prev=>(!prev))}>
                    <li className="relative">
                        <Image
                            className="border-4 rounded-[50%]"
                            width={45}
                            height={45}
                            src={avatar}
                            alt="avatar"
                        />
                        {
                            dropDown &&
                            <ul className="absolute right-0 top-10 bg-ads360light-100 z-[100000] w-[200px] rounded-10 p-3">
                                <li className="flex items-center my-3">
                                    <Image
                                        className="border-4 rounded-[50%] w-8 h-8"
                                        width={0}
                                        height={0}
                                        src={avatar}
                                        alt="avatar"
                                    />
                                    <span className="px-3">Profile</span>
                                </li>
                                <li className="flex items-center my-3">
                                    <Image
                                        width={0}
                                        height={0}
                                        src={wallet}
                                        alt="wallet"
                                    />
                                    <span className="px-3">Wallet</span>
                                </li>
                                <li className="flex items-center my-3 relative">
                                    <span className="absolute -top-[5px] -left-[2px] px-1 bg-ads360yellow-100 rounded-[50%] text-xs text-center text-white">0</span>
                                    <Image
                                        width={0}
                                        height={0}
                                        src={bell}
                                        alt="bell"
                                    />
                                    <span className="px-3">Notification</span>
                                </li>
                                <hr/>
                                <li className="flex justify-center items-center my-3">
                                    <Image
                                        width={0}
                                        height={0}
                                        src={logout}
                                        alt="logout"
                                    />
                                    <span className="px-3">Logout</span>
                                </li>

                            </ul>
                        }
                        
                    </li>
                </ul>
            </div>
        </nav>




        <UserDrawer isOpen={isOpen} toggleDrawer={handleToggleDrawer}/>
    </>

  )
}

export default UsersNav