"use client";

import { createFileRoute } from "@tanstack/react-router";
import { HelpSupportListPage } from "@components/help-support/HelpSupportListPage";

function Page() {
  return (
    <HelpSupportListPage basePath="/vendors/influencers/help-support" />
  );
}

export const Route = createFileRoute("/vendors/influencers/help-support/")({
  component: Page,
});

