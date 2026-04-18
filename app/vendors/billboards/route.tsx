import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardGate } from '@components/auth/DashboardGate'
import BillBoardSideNav from '@components/navs/Vendors/billboard/BillBoardSideNav'
import BillBoardNav from '@components/navs/Vendors/billboard/BillBoardNav'
import { hasAccessToken } from '../../../lib/auth'
import {
  ACCOUNT_TYPE,
  getDashboardPathForAccountType,
} from '../../../lib/accountDashboard'
import { getAccountType } from '@endpoint/baseFetch'

function Layout() {
  return (
    <DashboardGate mode="billboard">
      <main className="md:flex">
        <section className="group hidden transistion duration-300 md:block basis-[6%] hover:basis-[18.2%] xl:hover:basis-[15.8%] ">
          <BillBoardSideNav />
        </section>
        <section className="md:basis-[100%]">
          <BillBoardNav />
          <Outlet />
        </section>
      </main>
    </DashboardGate>
  )
}

export const Route = createFileRoute("/vendors/billboards")({
  beforeLoad: () => {
    if (typeof window === 'undefined') return
    if (!hasAccessToken()) {
      throw redirect({ to: '/signin' })
    }
    const at = getAccountType()
    if (!at) {
      throw redirect({ to: '/signin' })
    }
    if (at !== ACCOUNT_TYPE.BILLBOARD_OWNER) {
      throw redirect({ to: getDashboardPathForAccountType(at) })
    }
  },
  component: Layout,
})

export default Layout
