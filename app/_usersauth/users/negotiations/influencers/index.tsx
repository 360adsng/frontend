import { createFileRoute, redirect } from "@tanstack/react-router";

/** Old list URL; negotiations list now lives on `/users/negotiations` with tab search. */
export const Route = createFileRoute(
  "/_usersauth/users/negotiations/influencers/",
)({
  beforeLoad: () => {
    throw redirect({
      to: "/users/negotiations",
      search: { type: "influencer" },
    });
  },
  component: () => null,
});

export default function InfluencerNegotiationsRedirect() {
  return null;
}
