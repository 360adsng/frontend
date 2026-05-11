"use client";

import { createFileRoute } from "@tanstack/react-router";
import { BookingDisputeChatRoom } from "@components/campaign/BookingDisputeChatRoom";

function VendorBillboardDisputeChatPage() {
  const { slug } = Route.useParams();
  const id = Number.parseInt(slug, 10);
  return (
    <BookingDisputeChatRoom
      portal="vendor"
      bookingKind="billboard"
      id={id}
    />
  );
}

export const Route = createFileRoute(
  "/vendors/billboards/requests/$slug/dispute-chat/",
)({
  component: VendorBillboardDisputeChatPage,
});

