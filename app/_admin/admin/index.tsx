import { Link, createFileRoute } from "@tanstack/react-router";

function AdminHome() {
  return (
    <div className="rounded-10 border border-ads360yellow-100 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-900">Admin dashboard</h1>
      <p className="mt-2 text-gray-600">
        This is a placeholder home for administrators. Connect admin tools (invites, billboard
        verification, etc.) here as you build them.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-gray-700">
        <li>Use the API to create invites and verify billboard owners.</li>
        <li>Regular and business users use the main app at /users.</li>
        <li>Billboard owners use /vendors/billboards.</li>
      </ul>
      <p className="mt-8 text-sm text-gray-500">
        Tip: sign in with an account that has <code className="rounded bg-gray-100 px-1">admin</code>{" "}
        as account type to access this area.
      </p>
    </div>
  );
}

export const Route = createFileRoute("/_admin/admin/")({
  component: AdminHome,
});

export default AdminHome;
