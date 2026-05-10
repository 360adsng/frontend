/** Active state for admin sidebar: dashboard is exact `/admin` only; other links match prefix. */
export function isAdminNavActive(pathname: string, link: string): boolean {
  const p = (pathname.replace(/\/$/, "") || "/").toLowerCase();
  const l = (link.replace(/\/$/, "") || "/").toLowerCase();
  if (l === "/admin") {
    return p === "/admin";
  }
  return p === l || p.startsWith(`${l}/`);
}
