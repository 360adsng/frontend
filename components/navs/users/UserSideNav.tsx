'use client'
import ads360white from '@public/logo/360white.svg'
import Image from 'next/image'
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
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

// import cluster from '@public/icons/usericon/whitecluster.svg'


function UserSideNav() {
    const pathname = usePathname()
    const router = useRouter()

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

    const [onLogout, setOnLogout] = useState(false)
    const handleLogout = () =>{
        setOnLogout(true)
        router.push('/')
    }

  return (
    <aside className="group bg-[#292728] w-[5.7%] pt-5 hover:w-[18.5%] xl:hover:w-[14.5%] transistion duration-300 fixed overflow-hidden h-full text-white">
        <div className='mx-1 xl:mx-2'>
            <Link href='/'>
                <Image
                    width={0}
                    height={0}
                    src={ads360white}
                    alt='360 ads logo'
                />
            </Link>
        </div>

        <ul className='space-y-4 my-14'>
            {
                navItem1.map((items, i)=>(
                    <li key={i}>
                        {pathname === items.link?

                        <Link href={items.link} className='border-l-2 border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex'>
                            <Image
                                width={0}
                                height={0}
                                src={items.on}
                                alt={items.name}
                            />
                            <span className='hidden group-hover:block text-ads360yellow-100 px-2 xl:px-4 hover:font-bold'>
                                {items.name}
                            </span>
                        </Link>
                        :
                        <Link href={items.link} className='py-2 px-4 flex'>
                            <Image
                                width={0}
                                height={0}
                                src={items.off}
                                alt={items.name}
                            />
                            <span className='hidden group-hover:block px-2 xl:px-4 hover:font-bold'>
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

                        <Link href={items.link} className='border-l-2 border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex'>
                            <Image
                                width={0}
                                height={0}
                                src={items.on}
                                alt={items.name}
                            />
                            <span className='hidden group-hover:block text-ads360yellow-100 px-2 xl:px-4 hover:font-bold'>
                                {items.name}
                            </span>
                        </Link>
                        :
                        <Link href={items.link} className='py-2 px-4 flex'>
                            <Image
                                width={0}
                                height={0}
                                src={items.off}
                                alt={items.name}
                            />
                            <span className='hidden group-hover:block px-2 xl:px-4 hover:font-bold'>
                                {items.name}
                            </span>
                        </Link>
                        }
                    </li>
                ))
            }

                    <li onClick={handleLogout}>
                        {onLogout ?

                        <Link href='#' className='border-l-2 border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex'>
                            <Image
                                width={0}
                                height={0}
                                src={onlogout}
                                alt='logout'
                            />
                            <span className='hidden group-hover:block text-ads360yellow-100 px-2 xl:px-4 hover:font-bold'>
                                Logout
                            </span>
                        </Link>
                        :
                        <Link href='#' className='py-2 px-4 flex'>
                            <Image
                                width={0}
                                height={0}
                                src={logout}
                                alt='logout'
                            />
                            <span className='hidden group-hover:block px-2 xl:px-4 hover:font-bold'>
                                Logout
                            </span>
                        </Link>
                        }
                    </li>
        </ul>
    </aside>
  )
}

export default UserSideNav