import { Link, Outlet, createFileRoute, useRouter } from "@tanstack/react-router";
import BlackLogo from "@components/logo/BlackLogo";
import { useLogout } from "@endpoint/auth/useAuth";

function AdminShell() {
  const router = useRouter();
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="min-h-screen bg-ads360-hash">
      <header className="border-b border-ads360yellow-100/30 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/admin" className="flex items-center gap-2">
            <BlackLogo />
            <span className="text-sm font-semibold text-gray-800">Admin</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Marketing site
            </Link>
            <button
              type="button"
              disabled={isPending}
              className="rounded border border-gray-300 px-3 py-1.5 text-gray-800 hover:bg-gray-50 disabled:opacity-50"
              onClick={() =>
                logout(undefined, {
                  onSuccess: () => router.navigate({ to: "/signin" }),
                })
              }
            >
              {isPending ? "Signing out…" : "Sign out"}
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export const Route = createFileRoute("/_admin/admin")({
  component: AdminShell,
});

export default AdminShell;
