const ads360white = '/logo/360white.svg'
const settings = '/icons/usericon/whitesettings.svg'
const onsettings = '/icons/usericon/onsettings.svg'
const dashboard = '/icons/usericon/whitedashboard.svg'
const ondashboard = '/icons/usericon/ondashboard.svg'
const campaign = '/icons/usericon/whitecampaign.svg'
const oncampaign = '/icons/usericon/oncampaign.svg'
const add = '/icons/usericon/add.svg'
const list = '/icons/usericon/list.svg'
const onlist = '/icons/usericon/yellowlist.svg'
const onAdd = '/icons/usericon/addyellow.svg'
const wallet = '/icons/usericon/whitewallet.svg'
const onwallet = '/icons/usericon/onwallet.svg'
const logout = '/icons/usericon/whitelogout.svg'
const onlogout = '/icons/usericon/onlogout.svg'
import { Link, useNavigate, useRouterState } from "@tanstack/react-router"
import { useState } from 'react'
import { useLogout } from "@endpoint/auth/useAuth"

// import cluster from '@public/icons/usericon/whitecluster.svg'


const BillBoardSideNav = () => {
    const pathname = useRouterState({ select: (s) => s.location.pathname })
    const navigate = useNavigate()
    const { mutate: logoutVendor, isPending: isLoggingOut } = useLogout()

    const navItem1 = [
        {
            link:'/vendors/billboards',
            name:'Dashboard',
            off:dashboard,
            on:ondashboard

        },
        {
            link:'/vendors/billboards/requests',
            name:'Requests',
            off:campaign,
            on:oncampaign

        },
        {
            link:'/vendors/billboards/listing',
            name:'Billboards',
            off:list,
            on:onlist

        },
        {
            link:'/vendors/billboards/add-billboard',
            name:'Add',
            off:add,
            on:onAdd

        },
        {
            link:'/vendors/billboards/wallet',
            name:'Wallet',
            off:wallet,
            on:onwallet

        },
    ]

    const navItem2 = [
        {
            link:'/vendors/billboards/settings',
            name:'Settings',
            off:settings,
            on:onsettings

        }
    ]

    const handleLogout = () =>{
        logoutVendor(undefined, {
            onSettled: () => {
                navigate({ to: '/vendors-acess/login' })
            }
        })
    }

  return (
    <aside className="group bg-[#292728] w-[5.7%] pt-5 hover:w-[18.5%] xl:hover:w-[14.5%] transistion duration-300 fixed overflow-hidden h-full text-white">
        <div className='mx-1 xl:mx-2'>
            <Link to='/'>
                <img src={ads360white}
                    alt='360 ads logo'
                />
            </Link>
        </div>

        <ul className='space-y-4 my-14'>
            {
                navItem1.map((items, i)=>(
                    <li key={i}>
                        {pathname === items.link?

                        <Link to={items.link} className='border-l-2 border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex'>
                            <img src={items.on}
                                alt={items.name}
                            />
                            <span className='hidden group-hover:block text-ads360yellow-100 px-2 xl:px-4 hover:font-bold'>
                                {items.name}
                            </span>
                        </Link>
                        :
                        <Link to={items.link} className='py-2 px-4 flex'>
                            <img src={items.off}
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

                        <Link to={items.link} className='border-l-2 border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex'>
                            <img src={items.on}
                                alt={items.name}
                            />
                            <span className='hidden group-hover:block text-ads360yellow-100 px-2 xl:px-4 hover:font-bold'>
                                {items.name}
                            </span>
                        </Link>
                        :
                        <Link to={items.link} className='py-2 px-4 flex'>
                            <img src={items.off}
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
                        {isLoggingOut ?

                        <Link to='#' className='border-l-2 border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex'>
                            <img src={onlogout}
                                alt='logout'
                            />
                            <span className='hidden group-hover:block text-ads360yellow-100 px-2 xl:px-4 hover:font-bold'>
                                Logging out...
                            </span>
                        </Link>
                        :
                        <Link to='#' className='py-2 px-4 flex'>
                            <img src={logout}
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

export default BillBoardSideNav