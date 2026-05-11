"use client";

import { createFileRoute } from "@tanstack/react-router";
import { TicketThreadPage } from "@components/help-support/TicketThreadPage";

function Page() {
  const { id } = Route.useParams();
  return (
    <TicketThreadPage
      ticketId={id}
      basePath="/vendors/influencers/help-support"
    />
  );
}

export const Route = createFileRoute("/vendors/influencers/help-support/$id/")({
  component: Page,
});

