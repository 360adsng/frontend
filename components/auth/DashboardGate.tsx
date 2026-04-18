import { useLayoutEffect, useState, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { getAccountType } from "@endpoint/baseFetch";
import { hasAccessToken } from "../../lib/auth";
import {
  ACCOUNT_TYPE,
  getDashboardPathForAccountType,
} from "../../lib/accountDashboard";

export type DashboardGateMode = "users" | "billboard" | "admin";

const MODE_ALLOWED: Record<DashboardGateMode, readonly string[]> = {
  users: [ACCOUNT_TYPE.REGULAR_USER, ACCOUNT_TYPE.BUSINESS_USER],
  billboard: [ACCOUNT_TYPE.BILLBOARD_OWNER],
  admin: [ACCOUNT_TYPE.ADMIN],
};

/**
 * Enforces account type on the client before rendering children. Required because
 * `beforeLoad` skips when `window` is undefined (SSR), so the wrong dashboard could
 * otherwise flash until some interaction re-ran guards.
 */
export function DashboardGate({
  mode,
  children,
}: {
  mode: DashboardGateMode;
  children: ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useLayoutEffect(() => {
    const expected = MODE_ALLOWED[mode];

    if (!hasAccessToken()) {
      void router.navigate({ to: "/signin", replace: true });
      return;
    }

    const at = getAccountType();
    if (!at) {
      void router.navigate({ to: "/signin", replace: true });
      return;
    }

    if (!expected.includes(at)) {
      void router.navigate({
        to: getDashboardPathForAccountType(at),
        replace: true,
      });
      return;
    }

    setAllowed(true);
  }, [mode, router]);

  if (!allowed) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-ads360-hash"
        aria-busy="true"
        aria-label="Checking access"
      >
        <p className="text-sm text-gray-600">Loading…</p>
      </div>
    );
  }

  return <>{children}</>;
}
