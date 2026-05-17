import type { NotificationReferenceType } from "./notifications";

/** Which app shell the user is in — drives deep-link targets. */
export type NotificationAudience =
  | "user"
  | "billboard_vendor"
  | "influencer_vendor"
  | "admin";

/**
 * Returns an in-app path for a notification, or null if not navigable in this context.
 */
export function getNotificationHref(
  audience: NotificationAudience,
  referenceType: NotificationReferenceType | null,
  requestId: number | null,
): string | null {
  if (referenceType == null || requestId == null || requestId < 1) {
    return null;
  }
  const id = String(requestId);

  switch (audience) {
    case "user":
      if (referenceType === "billboard_booking") {
        return `/users/campaign/${id}`;
      }
      if (referenceType === "influencer_booking") {
        return `/users/campaign/influencer/${id}`;
      }
      if (referenceType === "support_ticket") {
        return `/users/help-support/${id}`;
      }
      if (referenceType === "payout") {
        return "/users/wallet";
      }
      return null;

    case "billboard_vendor":
      if (referenceType === "billboard_booking") {
        return `/vendors/billboards/requests/${id}`;
      }
      if (referenceType === "support_ticket") {
        return `/vendors/billboards/help-support/${id}`;
      }
      if (referenceType === "payout") {
        return "/vendors/billboards/wallet";
      }
      return null;

    case "influencer_vendor":
      if (referenceType === "influencer_booking") {
        return `/vendors/influencers/requests/${id}`;
      }
      if (referenceType === "support_ticket") {
        return `/vendors/influencers/help-support/${id}`;
      }
      if (referenceType === "payout") {
        return "/vendors/influencers/wallet";
      }
      return null;

    case "admin":
      if (referenceType === "billboard_booking") {
        return `/admin/request/billboard/${id}`;
      }
      if (referenceType === "influencer_booking") {
        return `/admin/request/influencer/${id}`;
      }
      if (referenceType === "support_ticket") {
        return `/admin/support/${id}`;
      }
      if (referenceType === "payout") {
        return `/admin/payout/${id}`;
      }
      return null;

    default:
      return null;
  }
}
