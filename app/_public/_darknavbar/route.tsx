import { Outlet, createFileRoute } from '@tanstack/react-router'
import Footer from '@components/navs/public/Footer'
import DarkNavbar from '@components/navs/public/DarkNavbar'

function Layout() {
  return (
    <>
      <DarkNavbar />
      <Outlet />
      <Footer />
    </>
  )
}

export const Route = createFileRoute("/_public/_darknavbar")({
  component: Layout,
})

export default Layout
