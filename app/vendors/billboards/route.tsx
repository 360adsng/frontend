import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import BillBoardSideNav from '@components/navs/Vendors/billboard/BillBoardSideNav'
import BillBoardNav from '@components/navs/Vendors/billboard/BillBoardNav'
import { hasAccessToken } from '../../../lib/auth'

function Layout() {
  return (
    <>
      <main className="md:flex">
        <section className="group hidden transistion duration-300 md:block basis-[6%] hover:basis-[18.2%] xl:hover:basis-[15.8%] ">
          <BillBoardSideNav />
        </section>
        <section className="md:basis-[100%]">
          <BillBoardNav />
          <Outlet />
        </section>
      </main>
    </>
  )
}

export const Route = createFileRoute("/vendors/billboards")({
  beforeLoad: () => {
    if (typeof window === 'undefined') return
    if (!hasAccessToken()) {
      throw redirect({ to: '/vendors-acess/login' })
    }
  },
  component: Layout,
})

export default Layout
