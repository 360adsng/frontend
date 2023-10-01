"use client";
import Image from "next/image";
import wallet from "@public/icons/wallet.svg";
import bell from "@public/icons/bell.svg";
import avatar from "@public/icons/user.png";
import { FiMenu } from "react-icons/fi";
import logout from "@public/icons/usericon/onlogout.svg";
import { useState } from "react";
import { usePathname } from "next/navigation";
import BlackLogo from "@components/logo/BlackLogo";
import UserDrawerContent from "./UserDrawerContent";
import Drawer from "@components/modal/Drawer";
import { Notification } from "@components/modal/Notification";
import Link from "next/link";
import UserNotificationContent from "./UserNotificationContent";

function UsersNav() {
  const [dropDown, setDropDown] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const pathname = usePathname();

  const handleToggleDrawer = () => {
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    } else {
      setIsDrawerOpen(true);
    }
  };

  const handleToggleNotification = () => {
    if (isNotificationOpen) {
      setIsNotificationOpen(false);
    } else {
      setIsNotificationOpen(true);
    }
  };

  return (
    <>
      <nav className="bg-white md:flex md:px-14 py-3 justify-between items-center hidden">
        {pathname.split("/")[1] !== "users" && (
          <BlackLogo/>
        )}
        <div>{/* might add search later */}</div>
        <div>
          <ul className="flex justify-between space-x-7 items-center">
            <li>
              <Link href='/users/wallet'>
              <Image width={0} height={0} src={wallet} alt="wallet" />
              </Link>
            </li>
            <li className="relative cursor-pointer" onClick={handleToggleNotification}>
              <span className="absolute -top-[5px] -left-[2px] px-1 bg-ads360yellow-100 rounded-[50%] text-xs text-center text-white">
                0
              </span>
              <Image width={0} height={0} src={bell} alt="bell" />
            </li>
            <li>
            <Link href='/users/settings'>
              <Image
                className="border-4 rounded-[50%]"
                width={45}
                height={45}
                src={avatar}
                alt="avatar"
              />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* mobile navbar */}

      <nav className="bg-white md:hidden md:px-14 py-3 justify-between items-center flex">
        <div className="py-1 px-2 flex items-center space-x-3">
          {pathname.split("/")[1] === "users" && (
            <div
              className="rounded-full border shadow-md border-ads360yellow-100 p-2"
              onClick={handleToggleDrawer}
            >
              <FiMenu size={24} />
            </div>
          )}

          <div>
            <BlackLogo/>
              
          </div>
        </div>

        <div>
          <ul
            className="flex py-1 px-2 items-center"
            onClick={() => setDropDown((prev) => !prev)}
          >
            <li className="relative">
              <Image
                className="border-4 rounded-[50%]"
                width={45}
                height={45}
                src={avatar}
                alt="avatar"
              />
              {dropDown && (
                <ul className="absolute right-0 top-10 bg-ads360light-100 z-[100000] w-[200px] rounded-10 p-3">
                  <li className="my-3">
                  <Link href='/users/settings' className="flex items-center">
                    <Image
                      className="border-4 rounded-[50%] w-8 h-8"
                      width={0}
                      height={0}
                      src={avatar}
                      alt="avatar"
                    />
                    <span className="px-3">Profile</span>
                    </Link>
                  </li>
                  <li className="my-3">
                    <Link href='/users/wallet' className="flex items-center">
                    <Image width={0} height={0} src={wallet} alt="wallet" />
                    <span className="px-3">Wallet</span>
                    </Link>
                  </li>
                  <li className="flex items-center my-3 cursor-pointer relative" onClick={handleToggleNotification}>
                    <span className="absolute -top-[5px] -left-[2px] px-1 bg-ads360yellow-100 rounded-[50%] text-xs text-center text-white">
                      0
                    </span>
                    <Image width={0} height={0} src={bell} alt="bell" />
                    <span className="px-3">Notification</span>
                  </li>
                  <hr />
                  <li className="flex justify-center items-center my-3">
                    <Image width={0} height={0} src={logout} alt="logout" />
                    <span className="px-3">Logout</span>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <Drawer isOpen={isDrawerOpen} toggleDrawer={handleToggleDrawer}>
        <UserDrawerContent toggleDrawer={handleToggleDrawer}/>
      </Drawer>
      <Notification handleNotification={handleToggleNotification} isOpen={isNotificationOpen} >
        <UserNotificationContent/>
      </Notification>
    </>
  );
}

export default UsersNav;
