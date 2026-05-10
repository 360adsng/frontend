import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { FiHelpCircle } from "react-icons/fi";
import { useLogout } from "@endpoint/auth/useAuth";
import { isInfluencerNavActive } from "./influencerNavUtils";

const settings = "/icons/usericon/whitesettings.svg";
const onsettings = "/icons/usericon/onsettings.svg";
const dashboard = "/icons/usericon/whitedashboard.svg";
const ondashboard = "/icons/usericon/ondashboard.svg";
const campaign = "/icons/usericon/whitecampaign.svg";
const oncampaign = "/icons/usericon/oncampaign.svg";
const wallet = "/icons/usericon/whitewallet.svg";
const onwallet = "/icons/usericon/onwallet.svg";
const logout = "/icons/usericon/whitelogout.svg";
const onlogout = "/icons/usericon/onlogout.svg";
const list = "/icons/usericon/list.svg";
const onlist = "/icons/usericon/yellowlist.svg";
const negotiations = "/icons/usericon/offnegotiation.svg";
const onnegotiations = "/icons/usericon/onnegotiation.svg";

type Props = { toggleDrawer: () => void };

const InfluencerDrawerContent: React.FC<Props> = ({ toggleDrawer }) => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { mutate: logoutVendor, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logoutVendor(undefined, {
      onSettled: () => {
        toggleDrawer();
        navigate({ to: "/signin" });
      },
    });
  };

  const navItem1 = [
    { link: "/vendors/influencers", name: "Dashboard", off: dashboard, on: ondashboard },
    { link: "/vendors/influencers/requests", name: "Requests", off: campaign, on: oncampaign },
    { link: "/vendors/influencers/negotiations", name: "Negotiations", off: negotiations, on: onnegotiations },
    { link: "/vendors/influencers/rate-card", name: "Rate card", off: list, on: onlist },
    { link: "/vendors/influencers/wallet", name: "Wallet", off: wallet, on: onwallet },
  ];

  const navItem2 = [
    { link: "/vendors/influencers/settings", name: "Settings", off: settings, on: onsettings },
    {
      link: "/vendors/influencers/help-support",
      name: "Help & support",
      kind: "help" as const,
    },
  ];

  return (
    <>
      <ul className="space-y-4 my-14">
        {navItem1.map((items, i) => {
          const active = isInfluencerNavActive(pathname, items.link);
          return (
            <li key={i}>
              {active ? (
                <Link
                  onClick={toggleDrawer}
                  to={items.link}
                  className="border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex"
                >
                  <img src={items.on} alt={items.name} className="w-8 h-8" />
                  <span className="text-ads360yellow-100 px-2 xl:px-4 hover:font-bold">
                    {items.name}
                  </span>
                </Link>
              ) : (
                <Link
                  onClick={toggleDrawer}
                  to={items.link}
                  className="py-2 px-4 flex items-center"
                >
                  <img src={items.off} alt={items.name} className="w-8 h-8" />
                  <span className="px-2 xl:px-4 hover:font-bold">{items.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <ul className="space-y-4 my-14">
        {navItem2.map((items, i) => {
          const active =
            "kind" in items && items.kind === "help"
              ? pathname.startsWith(items.link)
              : isInfluencerNavActive(pathname, items.link);
          return (
            <li key={i}>
              {"kind" in items && items.kind === "help" ? (
                active ? (
                  <Link
                    onClick={toggleDrawer}
                    to={items.link}
                    className="border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex"
                  >
                    <FiHelpCircle className="h-8 w-8 shrink-0 text-ads360yellow-100" aria-hidden />
                    <span className="text-ads360yellow-100 px-2 xl:px-4 hover:font-bold">
                      {items.name}
                    </span>
                  </Link>
                ) : (
                  <Link onClick={toggleDrawer} to={items.link} className="py-2 items-center px-4 flex">
                    <FiHelpCircle className="h-8 w-8 shrink-0 text-white" aria-hidden />
                    <span className="px-2 xl:px-4 hover:font-bold">{items.name}</span>
                  </Link>
                )
              ) : active ? (
                <Link
                  onClick={toggleDrawer}
                  to={items.link}
                  className="border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex"
                >
                  <img src={items.on} alt={items.name} className="w-8 h-8" />
                  <span className="text-ads360yellow-100 px-2 xl:px-4 hover:font-bold">
                    {items.name}
                  </span>
                </Link>
              ) : (
                <Link onClick={toggleDrawer} to={items.link} className="py-2 items-center px-4 flex">
                  <img src={items.off} alt={items.name} className="w-8 h-8" />
                  <span className="px-2 xl:px-4 hover:font-bold">{items.name}</span>
                </Link>
              )}
            </li>
          );
        })}

        <li
          onClick={() => {
            if (isLoggingOut) return;
            handleLogout();
          }}
          className={isLoggingOut ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
        >
          {isLoggingOut ? (
            <div className="border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex">
              <img src={onlogout} alt="logout" className="w-8 h-8" />
              <span className="text-ads360yellow-100 px-2 xl:px-4">Logging out...</span>
            </div>
          ) : (
            <div className="py-2 items-center px-4 flex">
              <img src={logout} alt="logout" className="w-8 h-8" />
              <span className="px-2 xl:px-4 hover:font-bold">Logout</span>
            </div>
          )}
        </li>
      </ul>
    </>
  );
};

export default InfluencerDrawerContent;
