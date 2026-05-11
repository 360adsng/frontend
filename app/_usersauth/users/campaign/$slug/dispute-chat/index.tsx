"use client";

import { createFileRoute } from "@tanstack/react-router";
import { BookingDisputeChatRoom } from "@components/campaign/BookingDisputeChatRoom";

function UserBillboardDisputeChatPage() {
  const { slug } = Route.useParams();
  const id = Number.parseInt(slug, 10);
  return (
    <BookingDisputeChatRoom portal="booker" bookingKind="billboard" id={id} />
  );
}

export const Route = createFileRoute(
  "/_usersauth/users/campaign/$slug/dispute-chat/",
)({
  component: UserBillboardDisputeChatPage,
});

