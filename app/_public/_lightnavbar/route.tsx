import { Outlet, createFileRoute } from '@tanstack/react-router'
import LightNavbar from '@components/navs/public/LightNavBar'
import Footer from '@components/navs/public/Footer'

function Layout() {
  return (
    <>
      <LightNavbar />
      <Outlet />
      <Footer />
    </>
  )
}

export const Route = createFileRoute("/_public/_lightnavbar")({
  component: Layout,
})

export default Layout
