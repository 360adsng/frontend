"use client";

import { createFileRoute } from "@tanstack/react-router";
import { AdminDisputeChatRoom } from "@components/admin/AdminDisputeChatRoom";

function AdminInfluencerDisputeChatPage() {
  const { id: idParam } = Route.useParams();
  const id = Number.parseInt(idParam, 10);
  return <AdminDisputeChatRoom bookingKind="influencer" id={id} />;
}

export const Route = createFileRoute(
  "/_admin/admin/request/influencer/$id/dispute-chat/",
)({
  component: AdminInfluencerDisputeChatPage,
});

