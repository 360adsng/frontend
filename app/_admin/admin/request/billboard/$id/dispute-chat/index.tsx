"use client";

import { createFileRoute } from "@tanstack/react-router";
import { AdminDisputeChatRoom } from "@components/admin/AdminDisputeChatRoom";

function AdminBillboardDisputeChatPage() {
  const { id: idParam } = Route.useParams();
  const id = Number.parseInt(idParam, 10);
  return <AdminDisputeChatRoom bookingKind="billboard" id={id} />;
}

export const Route = createFileRoute(
  "/_admin/admin/request/billboard/$id/dispute-chat/",
)({
  component: AdminBillboardDisputeChatPage,
});

