import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getUnreadNotificationCount,
  listNotifications,
  markAllNotificationsRead,
} from "./notifications";

const POLL_MS = 45_000;

export const notificationQueryKeys = {
  all: ["notifications"] as const,
  unreadCount: () => [...notificationQueryKeys.all, "unread-count"] as const,
  list: (limit: number) =>
    [...notificationQueryKeys.all, "list", limit] as const,
};

export function useUnreadNotificationCount(enabled = true) {
  return useQuery({
    queryKey: notificationQueryKeys.unreadCount(),
    queryFn: getUnreadNotificationCount,
    enabled,
    refetchInterval: POLL_MS,
    refetchOnWindowFocus: true,
  });
}

export function useNotificationsInfiniteList(
  enabled: boolean,
  limit = 20,
) {
  return useInfiniteQuery({
    queryKey: notificationQueryKeys.list(limit),
    queryFn: ({ pageParam }) =>
      listNotifications({ page: pageParam, limit }),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      const { page, totalPages } = last.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    enabled,
  });
}

export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: notificationQueryKeys.unreadCount(),
      });
      await qc.invalidateQueries({ queryKey: notificationQueryKeys.all });
    },
  });
}
