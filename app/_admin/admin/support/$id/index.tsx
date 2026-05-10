"use client";

import { createFileRoute } from "@tanstack/react-router";
import { AdminTicketThreadPage } from "@components/help-support/AdminTicketThreadPage";

function AdminSupportTicketPage() {
  const { id } = Route.useParams();
  return (
    <AdminTicketThreadPage ticketIdParam={id} listPath="/admin/support" />
  );
}

export const Route = createFileRoute("/_admin/admin/support/$id/")({
  component: AdminSupportTicketPage,
});

export default AdminSupportTicketPage;
