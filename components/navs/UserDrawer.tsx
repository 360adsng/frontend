"use client"

import { useEffect, useRef, useState } from 'react'
import Link  from 'next/link'
import Image from 'next/image'
import React360Logo from '@public/logo/360white.svg'
import ReactAdsLogo from '@public/logo/adsWhite.svg'
import CloseAside from '@public/icons/closeAside.svg'
import SmallBtnYello from '../buttons/SmallBtnYellow'
import { usePathname, useRouter } from 'next/navigation'




import settings from '@public/icons/usericon/whitesettings.svg'
import onsettings from '@public/icons/usericon/onsettings.svg'
import dashboard from '@public/icons/usericon/whitedashboard.svg'
import ondashboard from '@public/icons/usericon/ondashboard.svg'
import campaign from '@public/icons/usericon/whitecampaign.svg'
import oncampaign from '@public/icons/usericon/oncampaign.svg'
import wallet from '@public/icons/usericon/whitewallet.svg'
import onwallet from '@public/icons/usericon/onwallet.svg'
import analysis from '@public/icons/usericon/whiteanalysis.svg'
import onanalysis from '@public/icons/usericon/onanalysis.svg'
import logout from '@public/icons/usericon/whitelogout.svg'
import onlogout from '@public/icons/usericon/onlogout.svg'






interface Props {
    isOpen:boolean,
    toggleDrawer: ()=>void
}

const UserDrawer: React.FC<Props> = ({isOpen, toggleDrawer}) => {



    const pathname = usePathname()
    const router = useRouter()
    const drawer = useRef<HTMLElement>(null)
    const [onLogout, setOnLogout] = useState(false)
    const handleLogout = () =>{
        setOnLogout(true)
        router.push('/')
    }
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



    const navItem1 = [
        {
            link:'/users',
            name:'Dashboard',
            off:dashboard,
            on:ondashboard

        },
        {
            link:'/users/campaign',
            name:'Campaign',
            off:campaign,
            on:oncampaign

        },
        {
            link:'/users/wallet',
            name:'Wallet',
            off:wallet,
            on:onwallet

        },
        // {
        //     link:'/users/analysis',
        //     name:'Analysis',
        //     off:analysis,
        //     on:onanalysis

        // },
    ]

    const navItem2 = [
        {
            link:'/users/settings',
            name:'Settings',
            off:settings,
            on:onsettings

        }
    ]

    return(
        <>
        <aside ref={drawer}   className='bg-ads360black-100 text-white z-30 -left-[100%] md:hidden fixed w-full h-full top-0 overflow-y-scroll'>
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




                <ul className='space-y-4 my-14 '>
                {
                    navItem1.map((items, i)=>(
                        <li key={i}>
                            {pathname === items.link?

                            <Link onClick={toggleDrawer} href={items.link} className='border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex'>
                                <Image
                                    width={0}
                                    height={0}
                                    src={items.on}
                                    alt={items.name}
                                    className='w-8 h-8'
                                />
                                <span className='text-ads360yellow-100 px-2 xl:px-4 hover:font-bold'>
                                    {items.name}
                                </span>
                            </Link>
                            :
                            <Link onClick={toggleDrawer} href={items.link} className='py-2 px-4 flex items-center'>
                                <Image
                                    width={0}
                                    height={0}
                                    src={items.off}
                                    alt={items.name}
                                    className='w-8 h-8'
                                />
                                <span className='px-2 xl:px-4 hover:font-bold'>
                                    {items.name}
                                </span>
                            </Link>
                            }
                        </li>
                    ))
                }
            </ul>



            <ul className='space-y-4 my-14'>
                {
                    navItem2.map((items, i)=>(
                        <li key={i}>
                            {pathname === items.link?

                            <Link onClick={toggleDrawer} href={items.link} className='border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex'>
                                <Image
                                    width={0}
                                    height={0}
                                    src={items.on}
                                    alt={items.name}
                                    className='w-8 h-8'
                                />
                                <span className='text-ads360yellow-100 px-2 xl:px-4 hover:font-bold'>
                                    {items.name}
                                </span>
                            </Link>
                            :
                            <Link onClick={toggleDrawer} href={items.link} className='py-2 items-center px-4 flex'>
                                <Image
                                    width={0}
                                    height={0}
                                    src={items.off}
                                    alt={items.name}
                                    className='w-8 h-8'
                                />
                                <span className='px-2 xl:px-4 hover:font-bold'>
                                    {items.name}
                                </span>
                            </Link>
                            }
                        </li>
                    ))
                }

                        <li onClick={handleLogout}>
                            {onLogout ?

                            <Link onClick={toggleDrawer} href='#' className='border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex'>
                                <Image
                                    width={0}
                                    height={0}
                                    src={onlogout}
                                    alt='logout'
                                    className='w-8 h-8'
                                />
                                <span className='text-ads360yellow-100 px-2 xl:px-4 hover:font-bold'>
                                    Logout
                                </span>
                            </Link>
                            :
                            <Link onClick={toggleDrawer} href='#' className='py-2 items-center px-4 flex'>
                                <Image
                                    width={0}
                                    height={0}
                                    src={logout}
                                    alt='logout'
                                    className='w-8 h-8'
                                />
                                <span className='px-2 xl:px-4 hover:font-bold'>
                                    Logout
                                </span>
                            </Link>
                            }
                        </li>
                </ul>

            </div>
        </aside>
        </>
    )
}

export default UserDrawer;