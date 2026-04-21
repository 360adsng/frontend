import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useLogout } from "@endpoint/auth/useAuth";

const settings = '/icons/usericon/whitesettings.svg'
const onsettings = '/icons/usericon/onsettings.svg'
const dashboard = '/icons/usericon/whitedashboard.svg'
const ondashboard = '/icons/usericon/ondashboard.svg'
const campaign = '/icons/usericon/whitecampaign.svg'
const oncampaign = '/icons/usericon/oncampaign.svg'
const wallet = '/icons/usericon/whitewallet.svg'
const onwallet = '/icons/usericon/onwallet.svg'
const logout = '/icons/usericon/whitelogout.svg'
const onlogout = '/icons/usericon/onlogout.svg'
const negotiations = '/icons/usericon/offnegotiation.svg'
const onnegotiations = '/icons/usericon/onnegotiation.svg'

interface Props {
  toggleDrawer: () => void;
}

const UserDrawerContent: React.FC<Props> = ({ toggleDrawer }) => {
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

  const navItem1 = [
    {
      link: "/users",
      name: "Dashboard",
      off: dashboard,
      on: ondashboard,
    },
    {
      link: "/users/campaign",
      name: "Campaign",
      off: campaign,
      on: oncampaign,
    },
    {
      link: "/users/wallet",
      name: "Wallet",
      off: wallet,
      on: onwallet,
    },
    {
      link: "/users/negotiations",
      name: "Negotiations",
      off: negotiations,
      on: onnegotiations,
    },
  ];

  const navItem2 = [
    {
      link: "/users/settings",
      name: "Settings",
      off: settings,
      on: onsettings,
    },
  ];

  return (
    <>
      <ul className="space-y-4 my-14 ">
        {navItem1.map((items, i) => (
          <li key={i}>
            {pathname === items.link ? (
              <Link
                onClick={toggleDrawer}
                to={items.link}
                className="border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex"
              >
                <img src={items.on}
                  alt={items.name}
                  className="w-8 h-8"
                />
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
                <img src={items.off}
                  alt={items.name}
                  className="w-8 h-8"
                />
                <span className="px-2 xl:px-4 hover:font-bold">
                  {items.name}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>

      <ul className="space-y-4 my-14">
        {navItem2.map((items, i) => (
          <li key={i}>
            {pathname === items.link ? (
              <Link
                onClick={toggleDrawer}
                to={items.link}
                className="border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex"
              >
                <img src={items.on}
                  alt={items.name}
                  className="w-8 h-8"
                />
                <span className="text-ads360yellow-100 px-2 xl:px-4 hover:font-bold">
                  {items.name}
                </span>
              </Link>
            ) : (
              <Link
                onClick={toggleDrawer}
                to={items.link}
                className="py-2 items-center px-4 flex"
              >
                <img src={items.off}
                  alt={items.name}
                  className="w-8 h-8"
                />
                <span className="px-2 xl:px-4 hover:font-bold">
                  {items.name}
                </span>
              </Link>
            )}
          </li>
        ))}

        <li>
          {isLoggingOut ? (
            <button
              type="button"
              onClick={handleLogout}
              className="border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex"
            >
              <img src={onlogout}
                alt="logout"
                className="w-8 h-8"
              />
              <span className="text-ads360yellow-100 px-2 xl:px-4 hover:font-bold">
                Logging out...
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="py-2 items-center px-4 flex"
            >
              <img src={logout}
                alt="logout"
                className="w-8 h-8"
              />
              <span className="px-2 xl:px-4 hover:font-bold">Logout</span>
            </button>
          )}
        </li>
      </ul>
    </>
  );
};

export default UserDrawerContent;
