import { createFileRoute } from "@tanstack/react-router";

function Digital() {
  return <div>Coming Soon</div>;
}

export const Route = createFileRoute("/_usersauth/ads/digital/")({
  component: Digital,
});

export default Digital;
