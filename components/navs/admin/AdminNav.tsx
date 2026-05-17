const wallet = "/icons/wallet.svg";
const avatar = "/icons/user.png";
import { FiMenu } from "react-icons/fi";
const logout = "/icons/usericon/onlogout.svg";
import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import BlackLogo from "@components/logo/BlackLogo";
import { Notification } from "@components/modal/Notification";
import AdminDrawerContent from "./AdminDrawerContent";
import Drawer from "@components/modal/Drawer";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useLogout } from "@endpoint/auth/useAuth";
import { useMe } from "@endpoint/users/useUsers";
import { NotificationListPanel } from "@components/notifications/NotificationListPanel";
import { NotificationNavBell } from "@components/notifications/NotificationNavBell";
import { useNotificationDrawer } from "@components/notifications/useNotificationDrawer";
import { useUnreadNotificationCount } from "@endpoint/notifications/useNotifications";

const AdminNav = () => {
  const [dropDown, setDropDown] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    isNotificationOpen,
    toggleNotifications,
    closeNotifications,
  } = useNotificationDrawer();
  const unread = useUnreadNotificationCount();
  const unreadCount = unread.data?.count ?? 0;
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();
  const me = useMe();

  const handleToggleDrawer = () => {
    setIsDrawerOpen((o) => !o);
  };

  return (
    <>
      <nav className="bg-white md:flex md:px-14 py-3 justify-between items-center hidden">
        <div />
        <div>
          <ul className="flex justify-between space-x-7 items-center">
            <li>
              <Link to="/admin/wallet">
                <img src={wallet} alt="wallet" />
              </Link>
            </li>
            <li
              className="relative cursor-pointer"
              onClick={toggleNotifications}
              aria-label="Notifications"
            >
              <NotificationNavBell count={unreadCount} />
            </li>
            <li className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((p) => !p)}
              >
                <img
                  className="border-4 rounded-[50%]"
                  width={45}
                  height={45}
                  src={avatar}
                  alt="avatar"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 bg-ads360light-100 z-[100000] w-[220px] rounded-10 p-3 shadow">
                  <div className="px-2 py-2 border-b text-sm">
                    <div className="font-bold">
                      {me.data?.accountType === "admin"
                        ? (me.data.businessName ??
                          `${me.data.firstName ?? ""} ${me.data.lastName ?? ""}`.trim()) ||
                          "Administrator"
                        : "Account"}
                    </div>
                    <div className="text-stone-500 text-xs">
                      {me.data?.email ?? ""}
                    </div>
                  </div>

                  <Link
                    to="/admin/settings"
                    className="flex items-center justify-center my-3 w-full hover:opacity-90"
                    onClick={() => setProfileOpen(false)}
                  >
                    <span className="px-3">Profile</span>
                  </Link>

                  <button
                    type="button"
                    disabled={isLoggingOut}
                    className={`flex items-center justify-center my-3 w-full ${
                      isLoggingOut
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (isLoggingOut) return;
                      logoutUser(undefined, {
                        onSettled: () => {
                          setProfileOpen(false);
                          navigate({ to: "/signin" });
                        },
                      });
                    }}
                  >
                    <img src={logout} alt="logout" />
                    <span className="px-3">
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </span>
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      <nav className="bg-white md:hidden md:px-14 py-3 justify-between items-center flex">
        <div className="py-1 px-2 flex items-center space-x-3">
          <div
            className="rounded-full border shadow-md border-ads360yellow-100 p-2"
            onClick={handleToggleDrawer}
          >
            <FiMenu size={24} />
          </div>
          <div>
            <BlackLogo />
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
                    <Link
                      to="/admin/settings"
                      className="flex items-center"
                      onClick={() => setDropDown(false)}
                    >
                      <img
                        className="border-4 rounded-[50%] w-8 h-8"
                        src={avatar}
                        alt="avatar"
                      />
                      <span className="px-3">Profile</span>
                    </Link>
                  </li>
                  <li className="my-3">
                    <Link
                      to="/admin/wallet"
                      className="flex items-center"
                      onClick={() => setDropDown(false)}
                    >
                      <img src={wallet} alt="wallet" />
                      <span className="px-3">Wallet</span>
                    </Link>
                  </li>
                  <li
                    className="flex items-center my-3 relative cursor-pointer"
                    onClick={handleToggleNotification}
                  >
                    <span className="absolute -top-[5px] -left-[2px] px-1 bg-ads360yellow-100 rounded-[50%] text-xs text-center text-white">
                      0
                    </span>
                    <img src={bell} alt="bell" />
                    <span className="px-3">Notification</span>
                  </li>
                  <hr />
                  <li
                    className={`flex justify-center items-center my-3 ${
                      isLoggingOut
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (isLoggingOut) return;
                      logoutUser(undefined, {
                        onSettled: () => {
                          setDropDown(false);
                          navigate({ to: "/signin" });
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
        <AdminDrawerContent toggleDrawer={handleToggleDrawer} />
      </Drawer>
      <Notification
        isOpen={isNotificationOpen}
        handleNotification={toggleNotifications}
      >
        <NotificationListPanel
          isOpen={isNotificationOpen}
          audience="admin"
          onAfterNavigate={closeNotifications}
        />
      </Notification>
    </>
  );
};

export default AdminNav;
