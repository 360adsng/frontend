"use client";

import { createFileRoute } from "@tanstack/react-router";
import { BookingDisputeChatRoom } from "@components/campaign/BookingDisputeChatRoom";

function UserInfluencerDisputeChatPage() {
  const { id: idParam } = Route.useParams();
  const id = Number.parseInt(idParam, 10);
  return (
    <BookingDisputeChatRoom portal="booker" bookingKind="influencer" id={id} />
  );
}

export const Route = createFileRoute(
  "/_usersauth/users/campaign/influencer/$id/dispute-chat/",
)({
  component: UserInfluencerDisputeChatPage,
});

export default UserInfluencerDisputeChatPage;
