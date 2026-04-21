const naira = '/icons/usericon/naira.svg'
const bluecampaign = '/icons/usericon/bluecampiagn.svg'
const cluterpoint = '/icons/usericon/cluterpoint.svg'
import { Link, createFileRoute } from '@tanstack/react-router'

//import images
import { FiArrowRight } from "react-icons/fi"

const createcampiagn = '/images/Createacampaign.png'
const allcampiagn = '/images/allcampaign.png'
const wishlist = '/images/wishlist.png'
import { useMe, useUserDashboard } from '@endpoint/users/useUsers'

function formatNgn(amount: number): string {
  const n = Number(amount)
  if (!Number.isFinite(n)) return '₦0.00'
  return `₦${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function Dashboard() {
  const me = useMe()
  const dashboard = useUserDashboard()
  const stats = dashboard.data?.data

  const name =
    me.data?.accountType === 'business_user'
      ? me.data.businessName
      : me.data?.accountType === 'regular_user'
        ? `${me.data.firstName} ${me.data.lastName}`.trim()
        : ''

  return (
    <section className="bg-ads360-hash min-h-screen px-4 md:px-10 py-14">
        <h3 className="text-2xl">Hello {name || 'there'}, what would you like to do?</h3>

        {dashboard.isError ? (
          <p className="mt-4 text-sm text-red-600" role="alert">
            Could not load dashboard stats. Refresh the page or try again later.
          </p>
        ) : null}

        <div className="shadow border-ads360yellow-100 bg-white rounded-10 border my-10 overflow-x-auto">

        <div className="items-center flex md:justify-between px-3 md:px-20 py-5 w-[600px] md:w-full">
          <div className="flex items-center my-3 md:my-0">
            <img
              width={60}
              height={60}
              src={naira}
              alt="naira sign"
            />
            <div className="text-sm px-5">
              {dashboard.isLoading ? '…' : formatNgn(stats?.walletBalance ?? 0)}
              <p className="text-stone-400 text-xs">Available Balance</p>
            </div>
          </div>


          <div className="flex items-center my-3 md:my-0">
            <img
              width={60}
              height={60}
              src={bluecampaign}
              alt="campiagn sign"
            />
            <div className="text-sm px-5">
              {dashboard.isLoading ? '…' : String(stats?.activeBookingsCount ?? 0)}
              <p className="text-stone-400 text-xs">Active Campaigns</p>
            </div>
          </div>


          <div className="flex items-center my-3 md:my-0">
            <img
              width={60}
              height={60}
              src={cluterpoint}
              alt="cluster points"
            />
            <div className="text-sm px-5">
              {dashboard.isLoading ? '…' : String(stats?.whatsAppCluster ?? 0)}
              <p className="text-stone-400 text-xs">Cluster Points</p>
            </div>
          </div>
        </div>

</div>
        


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="border text-center border-ads360yellow-100 bg-white rounded-10 px-3 py-5">
            
            <img
              height={150}
              width={150}
              alt="create campaign"
              src={createcampiagn}
              className="mx-auto"
            />
            <h4 className="my-3 font-bold">Create an Ad Campaign</h4>

            <div className="flex justify-center">
            <span className='group flex w-[200px]'>
              <button className='group-hover:translate-x-40 group-hover:bg-ads360black-100 group-hover:text-ads360light-100 w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white'><FiArrowRight size={28}/></button>
              <button className='group-hover:-translate-x-10 w-40 group-hover:bg-ads360black-100  group-hover:text-ads360light-100 transition rounded-10 bg-ads360yellowBtn-100 h-12'> <Link to="../ads">Let’s Get Started</Link></button>
            </span>
            </div>
          </div>


          <div className="border text-center border-ads360yellow-100 bg-white rounded-10 px-3 py-5">
            
            <img
              height={150}
              width={150}
              alt="create campaign"
              src={allcampiagn}
              className="mx-auto"
            />
            <h4 className="my-3 font-bold">See all my Campaigns</h4>

            <div className="flex justify-center">
            <span className='group flex w-[200px]'>
              <button className='group-hover:translate-x-40 group-hover:bg-ads360black-100 group-hover:text-ads360light-100 w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white'><FiArrowRight size={28}/></button>
              <button className='group-hover:-translate-x-10 w-40 group-hover:bg-ads360black-100  group-hover:text-ads360light-100 transition rounded-10 bg-ads360yellowBtn-100 h-12'> <Link to="/users/campaign">My Campaign</Link></button>
            </span>
            </div>
          </div>


          <div className="border text-center border-ads360yellow-100 bg-white rounded-10 px-3 py-5">
            
            <img
              height={150}
              width={150}
              alt="create campaign"
              src={wishlist}
              className="mx-auto"
            />
            <h4 className="my-3 font-bold">See all my Wishlist</h4>

            <div className="flex justify-center">
            <span className='group flex w-[200px]'>
              <button className='group-hover:translate-x-40 group-hover:bg-ads360black-100 group-hover:text-ads360light-100 w-12 transition bg-ads360yellowBtn-100 mx-1  h-12 flex justify-center items-center rounded-[50%] color-white'><FiArrowRight size={28}/></button>
              <button className='group-hover:-translate-x-10 w-40 group-hover:bg-ads360black-100  group-hover:text-ads360light-100 transition rounded-10 bg-ads360yellowBtn-100 h-12'> <Link to="/">Wishlist</Link></button>
            </span>
            </div>
          </div>
        </div>
        

       



    </section>
  )
}

export const Route = createFileRoute("/_usersauth/users/")({
  component: Dashboard,
})

export default Dashboard
