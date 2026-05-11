import { Outlet, createFileRoute } from "@tanstack/react-router";

function HelpSupportLayout() {
  return <Outlet />;
}

export const Route = createFileRoute("/vendors/influencers/help-support")({
  component: HelpSupportLayout,
});

