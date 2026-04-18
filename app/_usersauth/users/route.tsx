import { Outlet, createFileRoute } from '@tanstack/react-router'
import UserSideNav from '@components/navs/users/UserSideNav'
import UsersNav from '@components/navs/users/UsersNav'

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
  component: Layout,
})

export default Layout
