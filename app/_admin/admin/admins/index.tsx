import { createFileRoute } from "@tanstack/react-router";

function AdminAdminsPage() {
  return (
    <section className="bg-ads360-hash min-h-[70vh] px-4 md:px-10 py-10">
      <h1 className="text-2xl font-serif text-stone-900">Admin</h1>
      <p className="mt-2 text-sm text-stone-600">Content coming soon.</p>
    </section>
  );
}

export const Route = createFileRoute("/_admin/admin/admins/")({
  component: AdminAdminsPage,
});

