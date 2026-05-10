/**
 * Active state for vendor influencer sidebar (supports nested detail routes).
 */
export function isInfluencerNavActive(
  pathname: string,
  link: string,
): boolean {
  const normalized = link.replace(/\/$/, "");
  if (normalized === "/vendors/influencers") {
    return (
      pathname === "/vendors/influencers" ||
      pathname === "/vendors/influencers/"
    );
  }
  return pathname === link || pathname.startsWith(`${normalized}/`);
}
