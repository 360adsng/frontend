import { createFileRoute } from "@tanstack/react-router";

function Whatsapp() {
  return <div>Coming Soon</div>;
}

export const Route = createFileRoute("/_usersauth/ads/whatsapp/")({
  component: Whatsapp,
});

export default Whatsapp;
