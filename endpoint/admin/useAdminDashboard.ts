import { useQuery } from "@tanstack/react-query";
import { getAdminDashboard } from "./admin";

export const adminDashboardKeys = {
  all: ["admin", "dashboard"] as const,
};

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminDashboardKeys.all,
    queryFn: getAdminDashboard,
  });
}

