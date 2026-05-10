"use client";

import { createFileRoute } from "@tanstack/react-router";
import { TicketThreadPage } from "@components/help-support/TicketThreadPage";

function Page() {
  const { id } = Route.useParams();
  return (
    <TicketThreadPage ticketId={id} basePath="/vendors/billboards/help-support" />
  );
}

export const Route = createFileRoute("/vendors/billboards/help-support/$id/")({
  component: Page,
});

export default Page;
