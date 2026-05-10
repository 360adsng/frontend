"use client";

import { createFileRoute } from "@tanstack/react-router";
import { BookingDisputeChatRoom } from "@components/campaign/BookingDisputeChatRoom";

function VendorInfluencerDisputeChatPage() {
  const { slug } = Route.useParams();
  const id = Number.parseInt(slug, 10);
  return (
    <BookingDisputeChatRoom
      portal="vendor"
      bookingKind="influencer"
      id={id}
    />
  );
}

export const Route = createFileRoute(
  "/vendors/influencers/requests/$slug/dispute-chat/",
)({
  component: VendorInfluencerDisputeChatPage,
});

export default VendorInfluencerDisputeChatPage;
