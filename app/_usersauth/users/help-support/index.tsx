"use client";

import { createFileRoute } from "@tanstack/react-router";
import { HelpSupportListPage } from "@components/help-support/HelpSupportListPage";

function Page() {
  return <HelpSupportListPage basePath="/users/help-support" />;
}

export const Route = createFileRoute("/_usersauth/users/help-support/")({
  component: Page,
});

