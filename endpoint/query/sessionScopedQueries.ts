import type { QueryClient } from "@tanstack/react-query";

/**
 * Keys that cache data tied to the current JWT / user session.
 * Public lists (e.g. nigerian-banks) are intentionally omitted.
 */
const SESSION_ROOT_KEYS: readonly string[][] = [
  ["wallet"],
  ["me"],
  ["users"],
  ["billboard"],
  ["influencer"],
] as const;

/** After a new login, refetch with the new access token (not the previous user's cache). */
export async function invalidateSessionAfterLogin(
  queryClient: QueryClient,
): Promise<void> {
  await Promise.all(
    SESSION_ROOT_KEYS.map((queryKey) =>
      queryClient.invalidateQueries({ queryKey }),
    ),
  );
}

/** On logout, drop cached user-scoped data so the next login never sees stale UI. */
export async function removeSessionQueriesOnLogout(
  queryClient: QueryClient,
): Promise<void> {
  await Promise.all(
    SESSION_ROOT_KEYS.map((queryKey) =>
      queryClient.removeQueries({ queryKey }),
    ),
  );
}
