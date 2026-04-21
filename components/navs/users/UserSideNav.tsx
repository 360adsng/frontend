const ads360white = '/logo/360white.svg'
const settings = '/icons/usericon/whitesettings.svg'
const onsettings = '/icons/usericon/onsettings.svg'
const dashboard = '/icons/usericon/whitedashboard.svg'
const ondashboard = '/icons/usericon/ondashboard.svg'
const campaign = '/icons/usericon/whitecampaign.svg'
const oncampaign = '/icons/usericon/oncampaign.svg'
const wallet = '/icons/usericon/whitewallet.svg'
const onwallet = '/icons/usericon/onwallet.svg'
const analysis = '/icons/usericon/whiteanalysis.svg'
const onanalysis = '/icons/usericon/onanalysis.svg'
const negotiations = '/icons/usericon/offnegotiation.svg'
const onnegotiations = '/icons/usericon/onnegotiation.svg'
import { Link, useRouterState } from "@tanstack/react-router"
// import cluster from '@public/icons/usericon/whitecluster.svg'


function UserSideNav() {
    const pathname = useRouterState({ select: (s) => s.location.pathname })


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
        {
            link:'/users/negotiations',
            name:'Negotiations',
            off:negotiations,
            on:onnegotiations

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
        </ul>
    </aside>
  )
}

export default UserSideNav