import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardGate } from '@components/auth/DashboardGate'
import { hasAccessToken } from '../../lib/auth'
import {
  ACCOUNT_TYPE,
  getDashboardPathForAccountType,
} from '../../lib/accountDashboard'
import { getAccountType } from '@endpoint/baseFetch'

const Layout = () => {
  return (
    <DashboardGate mode="users">
      <Outlet />
    </DashboardGate>
  )
}

export const Route = createFileRoute("/_usersauth")({
  beforeLoad: () => {
    if (typeof window === 'undefined') return
    if (!hasAccessToken()) {
      throw redirect({ to: '/signin' })
    }
    const at = getAccountType()
    if (!at) {
      throw redirect({ to: '/signin' })
    }
    if (at !== ACCOUNT_TYPE.REGULAR_USER && at !== ACCOUNT_TYPE.BUSINESS_USER) {
      throw redirect({ to: getDashboardPathForAccountType(at) })
    }
  },
  component: Layout,
})

export default Layout
