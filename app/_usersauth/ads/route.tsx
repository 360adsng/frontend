import { Outlet, createFileRoute } from '@tanstack/react-router'
import UsersNav from '@components/navs/users/UsersNav'

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
  component: Layout,
})

export default Layout
