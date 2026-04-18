import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardGate } from "@components/auth/DashboardGate";
import { hasAccessToken } from "../../lib/auth";
import {
  ACCOUNT_TYPE,
  getDashboardPathForAccountType,
} from "../../lib/accountDashboard";
import { getAccountType } from "@endpoint/baseFetch";

const Layout = () => (
  <DashboardGate mode="admin">
    <Outlet />
  </DashboardGate>
);

export const Route = createFileRoute("/_admin")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (!hasAccessToken()) {
      throw redirect({ to: "/signin" });
    }
    const at = getAccountType();
    if (!at) {
      throw redirect({ to: "/signin" });
    }
    if (at !== ACCOUNT_TYPE.ADMIN) {
      throw redirect({ to: getDashboardPathForAccountType(at) });
    }
  },
  component: Layout,
});

export default Layout;
