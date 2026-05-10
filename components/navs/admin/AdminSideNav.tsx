const ads360white = "/logo/360white.svg";
const settings = "/icons/usericon/whitesettings.svg";
const onsettings = "/icons/usericon/onsettings.svg";
const dashboard = "/icons/usericon/whitedashboard.svg";
const ondashboard = "/icons/usericon/ondashboard.svg";
const campaign = "/icons/usericon/whitecampaign.svg";
const oncampaign = "/icons/usericon/oncampaign.svg";
const list = "/icons/usericon/list.svg";
const onlist = "/icons/usericon/yellowlist.svg";
const wallet = "/icons/usericon/whitewallet.svg";
const onwallet = "/icons/usericon/onwallet.svg";

import { Link, useRouterState } from "@tanstack/react-router";
import {
  FiClock,
  FiDollarSign,
  FiHelpCircle,
  FiMail,
  FiUserPlus,
} from "react-icons/fi";
import { isAdminNavActive } from "./adminNavUtils";

const ICON_IMG =
  "h-7 w-7 shrink-0 object-contain [image-rendering:-webkit-optimize-contrast]";

type NavEntry =
  | {
      link: string;
      name: string;
      off: string;
      on: string;
    }
  | { link: string; name: string; variant: "payout" }
  | { link: string; name: string; variant: "invite" }
  | { link: string; name: string; variant: "createAdmin" }
  | { link: string; name: string; variant: "activityLog" };

const navMain: NavEntry[] = [
  { link: "/admin", name: "Dashboard", off: dashboard, on: ondashboard },
  { link: "/admin/users", name: "Users", off: list, on: onlist },
  {
    link: "/admin/activity-logs",
    name: "Activity",
    variant: "activityLog",
  },
  { link: "/admin/invite-links", name: "Invite links", variant: "invite" },
  {
    link: "/admin/create-admin",
    name: "New admin",
    variant: "createAdmin",
  },
  { link: "/admin/request", name: "Request", off: campaign, on: oncampaign },
  { link: "/admin/wallet", name: "Wallet", off: wallet, on: onwallet },
  { link: "/admin/payout", name: "Payout", variant: "payout" },
];

const AdminSideNav = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="group bg-[#292728] w-[5.7%] pt-5 hover:w-[18.5%] xl:hover:w-[14.5%] transistion duration-300 fixed overflow-hidden h-screen min-h-screen flex flex-col text-white">
      <div className="mx-1 shrink-0 xl:mx-2">
        <Link to="/">
          <img src={ads360white} alt="360 ads logo" />
        </Link>
      </div>

      <nav className="mt-4 flex min-h-0 flex-1 flex-col">
        <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain py-2">
          {navMain.map((items, i) => {
            const active = isAdminNavActive(pathname, items.link);
            const isPayout = "variant" in items && items.variant === "payout";
            const isInvite = "variant" in items && items.variant === "invite";
            const isCreateAdmin =
              "variant" in items && items.variant === "createAdmin";
            const isActivityLog =
              "variant" in items && items.variant === "activityLog";

            if (isActivityLog) {
              return (
                <li key={i}>
                  {active ? (
                    <Link
                      to={items.link}
                      className="flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                        <FiClock
                          className="h-6 w-6 text-ads360yellow-100"
                          aria-hidden
                          strokeWidth={2}
                        />
                      </span>
                      <span className="hidden px-2 text-ads360yellow-100 group-hover:block xl:px-4">
                        {items.name}
                      </span>
                    </Link>
                  ) : (
                    <Link
                      to={items.link}
                      className="flex items-center py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                        <FiClock
                          className="h-6 w-6 text-white"
                          aria-hidden
                          strokeWidth={2}
                        />
                      </span>
                      <span className="hidden px-2 group-hover:block xl:px-4">
                        {items.name}
                      </span>
                    </Link>
                  )}
                </li>
              );
            }

            if (isCreateAdmin) {
              return (
                <li key={i}>
                  {active ? (
                    <Link
                      to={items.link}
                      className="flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                        <FiUserPlus
                          className="h-6 w-6 text-ads360yellow-100"
                          aria-hidden
                          strokeWidth={2}
                        />
                      </span>
                      <span className="hidden px-2 text-ads360yellow-100 group-hover:block xl:px-4">
                        {items.name}
                      </span>
                    </Link>
                  ) : (
                    <Link
                      to={items.link}
                      className="flex items-center py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                        <FiUserPlus
                          className="h-6 w-6 text-white"
                          aria-hidden
                          strokeWidth={2}
                        />
                      </span>
                      <span className="hidden px-2 group-hover:block xl:px-4">
                        {items.name}
                      </span>
                    </Link>
                  )}
                </li>
              );
            }

            if (isInvite) {
              return (
                <li key={i}>
                  {active ? (
                    <Link
                      to={items.link}
                      className="flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                        <FiMail
                          className="h-6 w-6 text-ads360yellow-100"
                          aria-hidden
                          strokeWidth={2}
                        />
                      </span>
                      <span className="hidden px-2 text-ads360yellow-100 group-hover:block xl:px-4">
                        {items.name}
                      </span>
                    </Link>
                  ) : (
                    <Link
                      to={items.link}
                      className="flex items-center py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                        <FiMail className="h-6 w-6 text-white" aria-hidden strokeWidth={2} />
                      </span>
                      <span className="hidden px-2 group-hover:block xl:px-4">
                        {items.name}
                      </span>
                    </Link>
                  )}
                </li>
              );
            }

            if (isPayout) {
              return (
                <li key={i}>
                  {active ? (
                    <Link
                      to={items.link}
                      className="flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                        <FiDollarSign
                          className="h-6 w-6 text-ads360yellow-100"
                          aria-hidden
                          strokeWidth={2}
                        />
                      </span>
                      <span className="hidden px-2 text-ads360yellow-100 group-hover:block xl:px-4">
                        {items.name}
                      </span>
                    </Link>
                  ) : (
                    <Link
                      to={items.link}
                      className="flex items-center py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                        <FiDollarSign
                          className="h-6 w-6 text-white"
                          aria-hidden
                          strokeWidth={2}
                        />
                      </span>
                      <span className="hidden px-2 group-hover:block xl:px-4">
                        {items.name}
                      </span>
                    </Link>
                  )}
                </li>
              );
            }

            return (
              <li key={i}>
                {active ? (
                  <Link
                    to={items.link}
                    className="flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
                  >
                    <img
                      className={ICON_IMG}
                      src={items.on}
                      alt=""
                      aria-hidden
                    />
                    <span className="hidden px-2 text-ads360yellow-100 group-hover:block xl:px-4">
                      {items.name}
                    </span>
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    className="flex items-center py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
                  >
                    <img
                      className={ICON_IMG}
                      src={items.off}
                      alt=""
                      aria-hidden
                    />
                    <span className="hidden px-2 group-hover:block xl:px-4">
                      {items.name}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <ul className="shrink-0 space-y-2 border-t border-white/10 py-3">
          <li>
            {isAdminNavActive(pathname, "/admin/settings") ? (
              <Link
                to="/admin/settings"
                className="flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
              >
                <img
                  className={ICON_IMG}
                  src={onsettings}
                  alt=""
                  aria-hidden
                />
                <span className="hidden px-2 text-ads360yellow-100 group-hover:block xl:px-4">
                  Settings
                </span>
              </Link>
            ) : (
              <Link
                to="/admin/settings"
                className="flex items-center py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
              >
                <img
                  className={ICON_IMG}
                  src={settings}
                  alt=""
                  aria-hidden
                />
                <span className="hidden px-2 group-hover:block xl:px-4">
                  Settings
                </span>
              </Link>
            )}
          </li>
          <li>
            {isAdminNavActive(pathname, "/admin/support") ? (
              <Link
                to="/admin/support"
                className="flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                  <FiHelpCircle
                    className="h-6 w-6 text-ads360yellow-100"
                    aria-hidden
                    strokeWidth={2}
                  />
                </span>
                <span className="hidden px-2 text-ads360yellow-100 group-hover:block xl:px-4">
                  Support
                </span>
              </Link>
            ) : (
              <Link
                to="/admin/support"
                className="flex items-center py-2 pl-3 pr-4 outline-none focus-visible:ring-0"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                  <FiHelpCircle
                    className="h-6 w-6 text-white"
                    aria-hidden
                    strokeWidth={2}
                  />
                </span>
                <span className="hidden px-2 group-hover:block xl:px-4">
                  Support
                </span>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSideNav;
