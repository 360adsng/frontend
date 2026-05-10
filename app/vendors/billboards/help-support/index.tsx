"use client";

import { createFileRoute } from "@tanstack/react-router";
import { HelpSupportListPage } from "@components/help-support/HelpSupportListPage";

function Page() {
  return <HelpSupportListPage basePath="/vendors/billboards/help-support" />;
}

export const Route = createFileRoute("/vendors/billboards/help-support/")({
  component: Page,
});

export default Page;
