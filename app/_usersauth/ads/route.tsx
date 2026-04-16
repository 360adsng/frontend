import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import UsersNav from '@components/navs/users/UsersNav'
import { hasAccessToken } from '../../../lib/auth'

function Layout() {
  return (
    <>
      <nav className="fixed w-full z-[10000]">
        <UsersNav />
      </nav>
      <section className="bg-ads360-hash min-h-screen">
        <Outlet />
      </section>
    </>
  )
}

export const Route = createFileRoute("/_usersauth/ads")({
  beforeLoad: () => {
    if (typeof window === 'undefined') return
    if (!hasAccessToken()) {
      throw redirect({ to: '/signin' })
    }
  },
  component: Layout,
})

export default Layout
