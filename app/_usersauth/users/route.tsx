import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import UserSideNav from '@components/navs/users/UserSideNav'
import UsersNav from '@components/navs/users/UsersNav'
import { hasAccessToken } from '../../../lib/auth'

function Layout() {
  return (
    <>
      <main className="md:flex">
        <section className="group hidden transistion duration-300 md:block basis-[6%] hover:basis-[18.2%] xl:hover:basis-[15.8%] ">
          <UserSideNav />
        </section>
        <section className="md:basis-[100%]">
          <UsersNav />
          <Outlet />
        </section>
      </main>
    </>
  )
}

export const Route = createFileRoute("/_usersauth/users")({
  beforeLoad: () => {
    if (typeof window === 'undefined') return
    if (!hasAccessToken()) {
      throw redirect({ to: '/signin' })
    }
  },
  component: Layout,
})

export default Layout
