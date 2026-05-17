"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useAdminBillboardListingsForOwner } from "@endpoint/admin/useAdminUsers";
import type { AdminBillboardListingSummary } from "@endpoint/admin/admin";
import {
  billboardTypeLabel,
  creativeFulfillmentLabel,
} from "@lib/billboardDisplay";

function formatNaira(n: number): string {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `₦${n.toLocaleString()}`;
  }
}

function pricingSummary(p: AdminBillboardListingSummary["pricing"]): string {
  const parts: string[] = [];
  if (p.daily != null) parts.push(`Day ${formatNaira(p.daily)}`);
  if (p.weekly != null) parts.push(`Week ${formatNaira(p.weekly)}`);
  if (p.monthly != null) parts.push(`Month ${formatNaira(p.monthly)}`);
  return parts.length > 0 ? parts.join(" · ") : "—";
}

function formatShortDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function AdminUserBillboardsPage() {
  const { id: idParam } = Route.useParams();
  const ownerId = Number.parseInt(idParam, 10);
  const valid = Number.isFinite(ownerId) && ownerId > 0;
  const q = useAdminBillboardListingsForOwner(valid ? ownerId : null);

  return (
    <section className="min-h-[70vh] bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              to="/admin/users/$id"
              params={{ id: idParam }}
              className="text-sm font-medium text-stone-600 underline-offset-2 hover:text-stone-900 hover:underline"
            >
              ← Back to user
            </Link>
            <h1 className="mt-4 font-serif text-2xl text-stone-900 md:text-3xl">
              Billboard listings
            </h1>
            <p className="mt-1 text-sm text-stone-600">
              Vendor user ID #{idParam} — all listings owned by this account.
            </p>
          </div>
        </div>

        {!valid ? (
          <p className="mt-8 text-sm text-red-700">Invalid user id.</p>
        ) : null}

        {valid && q.isLoading ? (
          <p className="mt-8 text-sm text-stone-500">Loading listings…</p>
        ) : null}
        {valid && q.isError ? (
          <p className="mt-8 text-sm text-red-700">
            {q.error instanceof Error ? q.error.message : "Failed to load listings."}
          </p>
        ) : null}

        {valid && q.data ? (
          <div className="mt-8 overflow-x-auto rounded-2xl border-2 border-ads360yellow-100 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-stone-200 bg-stone-50 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-4 py-3">Listing</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Placement / fulfillment</th>
                  <th className="px-4 py-3">Pricing</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {q.data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-stone-500">
                      No billboard listings for this vendor.
                    </td>
                  </tr>
                ) : (
                  q.data.map((row) => (
                    <tr key={row.id} className="hover:bg-stone-50/80">
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          {row.imageUrl ? (
                            <img
                              src={row.imageUrl}
                              alt=""
                              className="h-12 w-16 shrink-0 rounded object-cover"
                            />
                          ) : null}
                          <div>
                            <p className="font-semibold text-stone-900">{row.name}</p>
                            <p className="text-xs text-stone-500">ID #{row.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="max-w-[220px] px-4 py-3 text-stone-700">
                        <span className="line-clamp-2">{row.address}</span>
                        <span className="mt-0.5 block text-xs text-stone-500">
                          {row.city}, {row.state}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-stone-700">
                        <span className="font-medium text-stone-900">
                          {billboardTypeLabel(row.billboardType)}
                        </span>
                        <span className="mx-1 text-stone-400">·</span>
                        <span>{creativeFulfillmentLabel(row.creativeFulfillmentType)}</span>
                      </td>
                      <td className="px-4 py-3 text-stone-800">
                        {pricingSummary(row.pricing)}
                      </td>
                      <td className="px-4 py-3">
                        {row.isAvailable ? (
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">
                            Available
                          </span>
                        ) : (
                          <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700">
                            Unavailable
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-stone-600">
                        {formatShortDate(row.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_admin/admin/users/$id/billboards/")({
  component: AdminUserBillboardsPage,
});

