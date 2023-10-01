"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import settings from "@public/icons/usericon/whitesettings.svg";
import onsettings from "@public/icons/usericon/onsettings.svg";
import dashboard from "@public/icons/usericon/whitedashboard.svg";
import ondashboard from "@public/icons/usericon/ondashboard.svg";
import campaign from "@public/icons/usericon/whitecampaign.svg";
import oncampaign from "@public/icons/usericon/oncampaign.svg";
import wallet from "@public/icons/usericon/whitewallet.svg";
import onwallet from "@public/icons/usericon/onwallet.svg";
import logout from "@public/icons/usericon/whitelogout.svg";
import onlogout from "@public/icons/usericon/onlogout.svg";

interface Props {
  toggleDrawer: () => void;
}

const UserDrawerContent: React.FC<Props> = ({ toggleDrawer }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [onLogout, setOnLogout] = useState(false);
  const handleLogout = () => {
    setOnLogout(true);
    router.push("/");
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
                href={items.link}
                className="border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex"
              >
                <Image
                  width={0}
                  height={0}
                  src={items.on}
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
                href={items.link}
                className="py-2 px-4 flex items-center"
              >
                <Image
                  width={0}
                  height={0}
                  src={items.off}
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
                href={items.link}
                className="border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex"
              >
                <Image
                  width={0}
                  height={0}
                  src={items.on}
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
                href={items.link}
                className="py-2 items-center px-4 flex"
              >
                <Image
                  width={0}
                  height={0}
                  src={items.off}
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

        <li onClick={handleLogout}>
          {onLogout ? (
            <Link
              onClick={toggleDrawer}
              href="#"
              className="border-l-2 items-center border-ads360yellow-100 bg-[#322f31] rounded-r-[200px] py-2 px-4 flex"
            >
              <Image
                width={0}
                height={0}
                src={onlogout}
                alt="logout"
                className="w-8 h-8"
              />
              <span className="text-ads360yellow-100 px-2 xl:px-4 hover:font-bold">
                Logout
              </span>
            </Link>
          ) : (
            <Link
              onClick={toggleDrawer}
              href="#"
              className="py-2 items-center px-4 flex"
            >
              <Image
                width={0}
                height={0}
                src={logout}
                alt="logout"
                className="w-8 h-8"
              />
              <span className="px-2 xl:px-4 hover:font-bold">Logout</span>
            </Link>
          )}
        </li>
      </ul>
    </>
  );
};

export default UserDrawerContent;
