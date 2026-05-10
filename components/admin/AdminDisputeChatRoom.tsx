"use client";

import { BookingDisputeChatRoom } from "@components/campaign/BookingDisputeChatRoom";

export type AdminBookingDisputeKind = "influencer" | "billboard";

/** Admin dispute thread — thin wrapper around {@link BookingDisputeChatRoom}. */
export function AdminDisputeChatRoom({
  bookingKind,
  id,
}: {
  bookingKind: AdminBookingDisputeKind;
  id: number;
}) {
  return (
    <BookingDisputeChatRoom
      portal="admin"
      bookingKind={bookingKind}
      id={id}
    />
  );
}
