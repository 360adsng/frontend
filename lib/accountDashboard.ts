import { redirect } from "@tanstack/react-router";
import { getAccountType } from "@endpoint/baseFetch";

/** Mirrors backend `AccountType` enum. */
export const ACCOUNT_TYPE = {
  REGULAR_USER: "regular_user",
  BUSINESS_USER: "business_user",
  BILLBOARD_OWNER: "billboard_owner",
  ADMIN: "admin",
} as const;

const USER_DASHBOARD = "/users";
const BILLBOARD_DASHBOARD = "/vendors/billboards";
const ADMIN_DASHBOARD = "/admin";
const SIGN_IN = "/signin";

/** Where to send a user after login (or when they are already authenticated). */
export function getDashboardPathForAccountType(
  accountType: string | null | undefined,
): string {
  switch (accountType) {
    case ACCOUNT_TYPE.REGULAR_USER:
    case ACCOUNT_TYPE.BUSINESS_USER:
      return USER_DASHBOARD;
    case ACCOUNT_TYPE.BILLBOARD_OWNER:
      return BILLBOARD_DASHBOARD;
    case ACCOUNT_TYPE.ADMIN:
      return ADMIN_DASHBOARD;
    default:
      return SIGN_IN;
  }
}

/** Throws `redirect` when the current account type is not in `allowed`. */
export function ensureAccountTypes(allowed: readonly string[]): void {
  if (typeof window === "undefined") return;
  const at = getAccountType();
  if (!at) {
    throw redirect({ to: SIGN_IN });
  }
  if (!allowed.includes(at)) {
    throw redirect({ to: getDashboardPathForAccountType(at) });
  }
}
