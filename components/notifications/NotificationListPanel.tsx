"use client";

import { useEffect, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  useMarkAllNotificationsRead,
  useNotificationsInfiniteList,
} from "@endpoint/notifications/useNotifications";
import type { NotificationDto } from "@endpoint/notifications/notifications";
import {
  getNotificationHref,
  type NotificationAudience,
} from "@endpoint/notifications/notificationRoutes";

const noticeBell = "/images/noticebell.png";

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

type Props = {
  isOpen: boolean;
  audience: NotificationAudience;
  onAfterNavigate?: () => void;
};

function NotificationRow({
  item,
  audience,
  onNavigate,
}: {
  item: NotificationDto;
  audience: NotificationAudience;
  onNavigate: (href: string) => void;
}) {
  const href = getNotificationHref(
    audience,
    item.referenceType,
    item.requestId,
  );
  const clickable = href != null;

  return (
    <button
      type="button"
      disabled={!clickable}
      onClick={() => {
        if (href) onNavigate(href);
      }}
      className={`w-full border-b border-stone-200 px-4 py-3 text-left transition-colors ${
        clickable ? "hover:bg-stone-100 cursor-pointer" : "cursor-default"
      } ${item.isRead ? "bg-white" : "bg-amber-50/60"}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-stone-900">{item.title}</p>
        {!item.isRead ? (
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ads360yellow-100" />
        ) : null}
      </div>
      <p className="mt-1 text-sm text-stone-600 line-clamp-3">{item.message}</p>
      <p className="mt-2 text-xs text-stone-400">{formatWhen(item.createdAt)}</p>
    </button>
  );
}

export function NotificationListPanel({
  isOpen,
  audience,
  onAfterNavigate,
}: Props) {
  const navigate = useNavigate();
  const markAllRead = useMarkAllNotificationsRead();
  const listQuery = useNotificationsInfiniteList(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    markAllRead.mutate();
    return () => {
      markAllRead.mutate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mark read on open and when panel closes
  }, [isOpen]);

  const items = useMemo(() => {
    const pages = listQuery.data?.pages ?? [];
    return pages.flatMap((p) => p.data);
  }, [listQuery.data]);

  const meta = listQuery.data?.pages[listQuery.data.pages.length - 1]?.meta;

  const handleNavigate = (href: string) => {
    navigate({ to: href });
    onAfterNavigate?.();
  };

  if (listQuery.isLoading) {
    return (
      <p className="p-6 text-center text-sm text-stone-500">Loading notifications…</p>
    );
  }

  if (listQuery.isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-red-600">Could not load notifications.</p>
        <button
          type="button"
          className="mt-3 text-sm font-medium text-ads360black-100 underline"
          onClick={() => void listQuery.refetch()}
        >
          Try again
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center w-11/12 md:w-8/12 mx-auto my-16">
        <img alt="" src={noticeBell} className="mx-auto" />
        <h2 className="font-bold mt-4">You don&apos;t have any notifications!</h2>
        <p className="text-gray-500">
          When something happens on your account, you&apos;ll see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col">
      <div className="flex-1 overflow-y-auto">
        {items.map((item) => (
          <NotificationRow
            key={item.id}
            item={item}
            audience={audience}
            onNavigate={handleNavigate}
          />
        ))}
      </div>
      {listQuery.hasNextPage ? (
        <div className="border-t border-stone-200 p-3">
          <button
            type="button"
            disabled={listQuery.isFetchingNextPage}
            onClick={() => void listQuery.fetchNextPage()}
            className="w-full rounded-lg border border-stone-300 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50 disabled:opacity-60"
          >
            {listQuery.isFetchingNextPage ? "Loading…" : "Load more"}
          </button>
        </div>
      ) : null}
      {meta && meta.total > 0 ? (
        <p className="border-t border-stone-100 px-4 py-2 text-center text-xs text-stone-400">
          {meta.total} notification{meta.total === 1 ? "" : "s"}
        </p>
      ) : null}
    </div>
  );
}
