const wallet = '/icons/wallet.svg'
const bell = '/icons/bell.svg'
const avatar = '/icons/user.png'
import { FiMenu } from "react-icons/fi";
const logout = '/icons/usericon/onlogout.svg'
import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import BlackLogo from "@components/logo/BlackLogo";
import { Notification } from "@components/modal/Notification";
import BillboardNotification from "./BillboardNotification";
import BillBoardDrawerContent from "./BillBoardDrawerContent";
import Drawer from "@components/modal/Drawer";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useLogout } from "@endpoint/auth/useAuth";

const BillBoardNav = () => {
  const [dropDown, setDropDown] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: logoutVendor, isPending: isLoggingOut } = useLogout();
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

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
     
        <div>{/* might add search later */}</div>
        <div>
          <ul className="flex justify-between space-x-7 items-center">
            <li>
              <Link to='/vendors/billboards/wallet'>
                <img src={wallet} alt="wallet" />
              </Link>
            </li>
            <li className="relative cursor-pointer" onClick={handleToggleNotification}>
              <span className="absolute -top-[5px] -left-[2px] px-1 bg-ads360yellow-100 rounded-[50%] text-xs text-center text-white">
                0
              </span>
              <img src={bell} alt="bell" />
            </li>
            <li>
              <Link to='/vendors/billboards/settings'>
              <img
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
         
            <div
              className="rounded-full border shadow-md border-ads360yellow-100 p-2"
              onClick={handleToggleDrawer}
            >
              <FiMenu size={24} />
            </div>
       

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
              <img
                className="border-4 rounded-[50%]"
                width={45}
                height={45}
                src={avatar}
                alt="avatar"
              />
              {dropDown && (
                <ul className="absolute right-0 top-10 bg-ads360light-100 z-[100000] w-[200px] rounded-10 p-3">
                  <li className="my-3">
                  <Link to='/vendors/billboards/settings' className="flex items-center">
                    <img
                      className="border-4 rounded-[50%] w-8 h-8" src={avatar}
                      alt="avatar"
                    />
                    <span className="px-3">Profile</span>
                    </Link>
                  </li>
                  <li className="my-3">
                    <Link to='/vendors/billboards/wallet' className="flex items-center">
                      <img src={wallet} alt="wallet" />
                      <span className="px-3">Wallet</span>
                    </Link>
                  </li>
                  <li className="flex items-center my-3 relative cursor-pointer" onClick={handleToggleNotification}>
                    <span className="absolute -top-[5px] -left-[2px] px-1 bg-ads360yellow-100 rounded-[50%] text-xs text-center text-white">
                      0
                    </span>
                    <img src={bell} alt="bell" />
                    <span className="px-3">Notification</span>
                  </li>
                  <hr />
                  <li
                    className={`flex justify-center items-center my-3 ${
                      isLoggingOut ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (isLoggingOut) return;
                      logoutVendor(undefined, {
                        onSettled: () => {
                          setDropDown(false);
                          navigate({ to: "/vendors-acess/login" });
                        },
                      });
                    }}
                  >
                    <img src={logout} alt="logout" />
                    <span className="px-3">
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </span>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <Drawer isOpen={isDrawerOpen} toggleDrawer={handleToggleDrawer}>
        <BillBoardDrawerContent toggleDrawer={handleToggleDrawer} />
      </Drawer>
      <Notification isOpen={isNotificationOpen} handleNotification={handleToggleNotification}>
        <BillboardNotification/>
      </Notification>

    </>
  );
}

export default BillBoardNav;
