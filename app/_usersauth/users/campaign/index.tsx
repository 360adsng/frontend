"use client"
import { createFileRoute, Link } from '@tanstack/react-router'
const dash = '/icons/dash.svg'
import { useState } from 'react'
import { useMyBillboardBookings } from '@endpoint/billboard/useBillboard'
import { BookingsTable } from '@components/ui/BookingsTable'

const Campaign = () => {
  
  const [view, setView] = useState('Billboard')
  const { data, isLoading, isError } = useMyBillboardBookings()
 

  return (
    <>
    <section className="bg-[#E9E9E9] px-4 md:px-10 py-2">
        <h3 className='text-2xl'>Campaigns</h3>
        <p className="text-stone-400 mt-3">
          Check all ads campaign history
        </p>
    </section>
      <section className='min-h-screen bg-ads360-hash px-4 md:px-10 py-14'>

        
    <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <button className="bg-ads360yellow-100 text-white px-4 py-2 rounded-md">
                <Link to="/users/campaign/create">Create Campaign</Link>
              </button>
            </div>

            <div className="">
              <select 
              onChange={(e) => setView(e.target.value)} 
              className="bg-white text-black border-2 border-ads360yellow-100 px-4 py-2 rounded-md">
                <option value="Billboard">Billboard</option>
                <option value="Influencer">Influencer</option>
                <option value="Whatsapp">Whatsapp</option>
                <option value="sms">SMS</option>
                <option value="Digital">Digital</option>
              </select>
            </div>
    </div>


        {
          view === 'Billboard' &&
          <>
            <BookingsTable
              rows={(data ?? []).map((r) => ({
                id: r.id,
                listing: r.listingName ?? "-",
                createdAt: r.createdAt as unknown as string,
                amount: r.negotiatedAmount ?? r.quotedTotal,
                status: r.status,
                paymentStatus: r.paymentStatus ?? "unpaid",
                actionHref: `/users/campaign/${r.id}`,
                actionLabel: "View",
              }))}
              isLoading={isLoading}
              isError={isError}
              emptyText="No campaigns found"
              statusFilterLabel="Filter by status"
              statusOptions={[
                { value: "all", label: "All" },
                { value: "pending", label: "Pending" },
                { value: "active", label: "Active" },
                { value: "rejected", label: "Rejected" },
                { value: "completed", label: "Completed" },
              ]}
              pageSize={10}
            />
          </>
        }
        {
          view === 'Influencer' &&
          <div>No matching records found</div>
        }
        {
          view === 'sms' &&
          <div>No matching records found</div>
        }
        {
          view === 'Digital' &&
          <div>No matching records found</div>
        }
        {
          view === 'Whatsapp' &&
          <div>No matching records found</div>
        }
      </section>
    </>

  )
}

export const Route = createFileRoute("/_usersauth/users/campaign/")({
  component: Campaign,
})

export default Campaign
