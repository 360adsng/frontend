import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { hasAccessToken } from '../../lib/auth'

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export const Route = createFileRoute("/_usersauth")({
  beforeLoad: () => {
    if (typeof window === 'undefined') return
    if (!hasAccessToken()) {
      throw redirect({ to: '/signin' })
    }
  },
  component: Layout,
})

export default Layout
