"use client";

import { createFileRoute } from "@tanstack/react-router";
import { TicketThreadPage } from "@components/help-support/TicketThreadPage";

function Page() {
  const { id } = Route.useParams();
  return <TicketThreadPage ticketId={id} basePath="/users/help-support" />;
}

export const Route = createFileRoute("/_usersauth/users/help-support/$id/")({
  component: Page,
});

