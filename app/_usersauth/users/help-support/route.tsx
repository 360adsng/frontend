import { Outlet, createFileRoute } from "@tanstack/react-router";

function HelpSupportLayout() {
  return <Outlet />;
}

export const Route = createFileRoute("/_usersauth/users/help-support")({
  component: HelpSupportLayout,
});

export default HelpSupportLayout;
