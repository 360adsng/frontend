import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardGate } from "@components/auth/DashboardGate";
import InfluencerSideNav from "@components/navs/Vendors/influencer/InfluencerSideNav";
import InfluencerNav from "@components/navs/Vendors/influencer/InfluencerNav";
import { hasAccessToken } from "../../../lib/auth";
import {
  ACCOUNT_TYPE,
  getDashboardPathForAccountType,
} from "../../../lib/accountDashboard";
import { getAccountType } from "@endpoint/baseFetch";

function Layout() {
  return (
    <DashboardGate mode="influencer">
      <main className="md:flex">
        <section className="group hidden transistion duration-300 md:block basis-[6%] hover:basis-[18.2%] xl:hover:basis-[15.8%] ">
          <InfluencerSideNav />
        </section>
        <section className="md:basis-[100%]">
          <InfluencerNav />
          <Outlet />
        </section>
      </main>
    </DashboardGate>
  );
}

export const Route = createFileRoute("/vendors/influencers")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (!hasAccessToken()) {
      throw redirect({ to: "/signin" });
    }
    const at = getAccountType();
    if (!at) {
      throw redirect({ to: "/signin" });
    }
    if (at !== ACCOUNT_TYPE.INFLUENCER) {
      throw redirect({ to: getDashboardPathForAccountType(at) });
    }
  },
  component: Layout,
});

