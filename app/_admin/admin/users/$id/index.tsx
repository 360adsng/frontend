"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminUserDetailView } from "@components/admin/AdminUserDetailView";

function AdminUserDetailPage() {
  const { id: idParam } = Route.useParams();
  const id = Number.parseInt(idParam, 10);
  const valid = Number.isFinite(id) && id > 0;

  return (
    <section className="min-h-[70vh] bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/admin/users"
          className="text-sm font-medium text-stone-600 underline-offset-2 hover:text-stone-900 hover:underline"
        >
          ← Back to users
        </Link>
      </div>

      {valid ? <AdminUserDetailView userId={id} /> : null}
      {!valid ? (
        <p className="mx-auto mt-8 max-w-5xl text-sm text-red-700">Invalid user id.</p>
      ) : null}
    </section>
  );
}

export const Route = createFileRoute("/_admin/admin/users/$id/")({
  component: AdminUserDetailPage,
});

