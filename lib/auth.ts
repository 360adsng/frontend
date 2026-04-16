import { ACCESS_TOKEN_STORAGE_KEY } from "@endpoint/baseFetch";

export function hasAccessToken(): boolean {
  // On the server we cannot read localStorage, so treat as unauthenticated.
  // This prevents direct URL loads of protected pages from rendering before hydration.
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY));
}

