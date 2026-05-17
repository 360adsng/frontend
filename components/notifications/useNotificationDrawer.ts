import { useCallback, useState } from "react";

export function useNotificationDrawer() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const openNotifications = useCallback(() => {
    setIsNotificationOpen(true);
  }, []);

  const closeNotifications = useCallback(() => {
    setIsNotificationOpen(false);
  }, []);

  const toggleNotifications = useCallback(() => {
    setIsNotificationOpen((o) => !o);
  }, []);

  return {
    isNotificationOpen,
    openNotifications,
    closeNotifications,
    toggleNotifications,
  };
}
