import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  FiClock,
  FiDollarSign,
  FiHelpCircle,
  FiMail,
  FiUserPlus,
} from "react-icons/fi";
import { useLogout } from "@endpoint/auth/useAuth";
import { isAdminNavActive } from "./adminNavUtils";

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
const logout = "/icons/usericon/whitelogout.svg";
const onlogout = "/icons/usericon/onlogout.svg";

const ICON_IMG = "w-8 h-8 shrink-0 object-contain";

type NavEntry =
  | {
      link: string;
      name: string;
      off: string;
      on: string;
    }
  | { link: string; name: string; variant: "payout" }
  | { link: string; name: string; variant: "invite" }
  | { link: string; name: string; variant: "createAdmin" };

const navMain: NavEntry[] = [
  { link: "/admin", name: "Dashboard", off: dashboard, on: ondashboard },
  { link: "/admin/users", name: "Users", off: list, on: onlist },
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

type Props = {
  toggleDrawer: () => void;
};

const AdminDrawerContent = ({ toggleDrawer }: Props) => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logoutUser(undefined, {
      onSettled: () => {
        toggleDrawer();
        navigate({ to: "/signin" });
      },
    });
  };

  return (
    <>
      <ul className="space-y-3 py-2">
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
                <Link
                  onClick={toggleDrawer}
                  to={items.link}
                  className={
                    active
                      ? "flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4"
                      : "flex items-center py-2 pl-3 pr-4"
                  }
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                    <FiClock
                      className={
                        active
                          ? "h-6 w-6 text-ads360yellow-100"
                          : "h-6 w-6 text-white"
                      }
                      aria-hidden
                      strokeWidth={2}
                    />
                  </span>
                  <span
                    className={
                      active
                        ? "px-2 text-ads360yellow-100 xl:px-4"
                        : "px-2 xl:px-4"
                    }
                  >
                    {items.name}
                  </span>
                </Link>
              </li>
            );
          }

          if (isCreateAdmin) {
            return (
              <li key={i}>
                <Link
                  onClick={toggleDrawer}
                  to={items.link}
                  className={
                    active
                      ? "flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4"
                      : "flex items-center py-2 pl-3 pr-4"
                  }
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                    <FiUserPlus
                      className={
                        active
                          ? "h-6 w-6 text-ads360yellow-100"
                          : "h-6 w-6 text-white"
                      }
                      aria-hidden
                      strokeWidth={2}
                    />
                  </span>
                  <span
                    className={
                      active
                        ? "px-2 text-ads360yellow-100 xl:px-4"
                        : "px-2 xl:px-4"
                    }
                  >
                    {items.name}
                  </span>
                </Link>
              </li>
            );
          }

          if (isInvite) {
            return (
              <li key={i}>
                <Link
                  onClick={toggleDrawer}
                  to={items.link}
                  className={
                    active
                      ? "flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4"
                      : "flex items-center py-2 pl-3 pr-4"
                  }
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                    <FiMail
                      className={
                        active
                          ? "h-6 w-6 text-ads360yellow-100"
                          : "h-6 w-6 text-white"
                      }
                      aria-hidden
                      strokeWidth={2}
                    />
                  </span>
                  <span
                    className={
                      active
                        ? "px-2 text-ads360yellow-100 xl:px-4"
                        : "px-2 xl:px-4"
                    }
                  >
                    {items.name}
                  </span>
                </Link>
              </li>
            );
          }

          if (isPayout) {
            return (
              <li key={i}>
                <Link
                  onClick={toggleDrawer}
                  to={items.link}
                  className={
                    active
                      ? "flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4"
                      : "flex items-center py-2 pl-3 pr-4"
                  }
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center">
                    <FiDollarSign
                      className={
                        active
                          ? "h-6 w-6 text-ads360yellow-100"
                          : "h-6 w-6 text-white"
                      }
                      aria-hidden
                      strokeWidth={2}
                    />
                  </span>
                  <span
                    className={
                      active
                        ? "px-2 text-ads360yellow-100 xl:px-4"
                        : "px-2 xl:px-4"
                    }
                  >
                    {items.name}
                  </span>
                </Link>
              </li>
            );
          }

          return (
            <li key={i}>
              <Link
                onClick={toggleDrawer}
                to={items.link}
                className={
                  active
                    ? "flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4"
                    : "flex items-center py-2 pl-3 pr-4"
                }
              >
                <img
                  src={active ? items.on : items.off}
                  alt=""
                  aria-hidden
                  className={ICON_IMG}
                />
                <span
                  className={
                    active
                      ? "px-2 text-ads360yellow-100 xl:px-4"
                      : "px-2 xl:px-4"
                  }
                >
                  {items.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <ul className="space-y-3 border-t border-white/10 py-3">
        <li>
          <Link
            onClick={toggleDrawer}
            to="/admin/settings"
            className={
              isAdminNavActive(pathname, "/admin/settings")
                ? "flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4"
                : "flex items-center py-2 pl-3 pr-4"
            }
          >
            <img
              src={
                isAdminNavActive(pathname, "/admin/settings")
                  ? onsettings
                  : settings
              }
              alt=""
              aria-hidden
              className={ICON_IMG}
            />
            <span
              className={
                isAdminNavActive(pathname, "/admin/settings")
                  ? "px-2 text-ads360yellow-100 xl:px-4"
                  : "px-2 xl:px-4"
              }
            >
              Settings
            </span>
          </Link>
        </li>
        <li>
          <Link
            onClick={toggleDrawer}
            to="/admin/support"
            className={
              isAdminNavActive(pathname, "/admin/support")
                ? "flex items-center rounded-r-[200px] border-l-2 border-ads360yellow-100 bg-[#322f31] py-2 pl-3 pr-4"
                : "flex items-center py-2 pl-3 pr-4"
            }
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center">
              <FiHelpCircle
                className={
                  isAdminNavActive(pathname, "/admin/support")
                    ? "h-6 w-6 text-ads360yellow-100"
                    : "h-6 w-6 text-white"
                }
                aria-hidden
                strokeWidth={2}
              />
            </span>
            <span
              className={
                isAdminNavActive(pathname, "/admin/support")
                  ? "px-2 text-ads360yellow-100 xl:px-4"
                  : "px-2 xl:px-4"
              }
            >
              Support
            </span>
          </Link>
        </li>

        <li>
          {isLoggingOut ? (
            <span className="border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex">
              <img src={onlogout} alt="logout" className="w-8 h-8" />
              <span className="text-ads360yellow-100 px-2 xl:px-4 hover:font-bold">
                Logging out...
              </span>
            </span>
          ) : (
            <button
              type="button"
              className="py-2 items-center px-4 flex w-full text-left"
              onClick={handleLogout}
            >
              <img src={logout} alt="logout" className="w-8 h-8" />
              <span className="px-2 xl:px-4 hover:font-bold">Logout</span>
            </button>
          )}
        </li>
      </ul>
    </>
  );
};

export default AdminDrawerContent;
