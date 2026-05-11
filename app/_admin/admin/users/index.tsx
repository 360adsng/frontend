"use client";

import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAdminUsersList } from "@endpoint/admin/useAdminUsers";
import type { AdminAccountType } from "@endpoint/admin/admin";

type UsersListSearch = {
  page: number;
  limit: number;
  search: string;
  accountType: string;
  blocked: "all" | "true" | "false";
};

const ACCOUNT_TYPES: { value: string; label: string }[] = [
  { value: "", label: "All types" },
  { value: "admin", label: "Admin" },
  { value: "regular_user", label: "Regular user" },
  { value: "business_user", label: "Business user" },
  { value: "billboard_owner", label: "Billboard owner" },
  { value: "influencer", label: "Influencer" },
];

function parseUsersSearch(raw: Record<string, unknown>): UsersListSearch {
  const page = Math.max(1, Number(raw.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(raw.limit) || 20));
  const search = String(raw.search ?? "").trim();
  const accountType = String(raw.accountType ?? "").trim();
  const b = String(raw.blocked ?? "all").toLowerCase();
  const blocked: "all" | "true" | "false" =
    b === "true" || b === "false" ? b : "all";
  return { page, limit, search, accountType, blocked };
}

function AdminUsersPage() {
  const navigate = useNavigate();
  const s = Route.useSearch();
  const [draftSearch, setDraftSearch] = useState(s.search);

  useEffect(() => {
    setDraftSearch(s.search);
  }, [s.search]);

  const list = useAdminUsersList({
    page: s.page,
    limit: s.limit,
    search: s.search || undefined,
    accountType: (s.accountType || undefined) as AdminAccountType | undefined,
    blocked:
      s.blocked === "true"
        ? true
        : s.blocked === "false"
          ? false
          : undefined,
  });

  const meta = list.data?.meta;
  const rows = list.data?.data ?? [];

  const setSearch = (next: Partial<UsersListSearch>) => {
    void navigate({
      to: "/admin/users",
      search: (prev) =>
        parseUsersSearch({ ...(prev as Record<string, unknown>), ...next }),
      replace: true,
    });
  };

  const goPage = (p: number) => setSearch({ page: p });

  return (
    <section className="min-h-[70vh] bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-2xl text-stone-900">Users</h1>
        <p className="mt-1 text-sm text-stone-600">
          Search and filter all accounts (individual and business).
        </p>

        <div className="mt-6 flex flex-col gap-3 rounded-10 border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:flex-wrap md:items-end">
          <label className="flex min-w-[200px] flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Search</span>
            <input
              type="search"
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
              placeholder="Email, phone, name…"
              value={draftSearch}
              onChange={(e) => setDraftSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch({ search: draftSearch.trim(), page: 1 });
                }
              }}
            />
          </label>
          <label className="flex min-w-[160px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Account type</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={s.accountType}
              onChange={(e) =>
                setSearch({ accountType: e.target.value, page: 1 })
              }
            >
              {ACCOUNT_TYPES.map((o) => (
                <option key={o.value || "all"} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-[140px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Blocked</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={s.blocked}
              onChange={(e) =>
                setSearch({
                  blocked: e.target.value as UsersListSearch["blocked"],
                  page: 1,
                })
              }
            >
              <option value="all">All</option>
              <option value="false">Not blocked</option>
              <option value="true">Blocked</option>
            </select>
          </label>
          <label className="flex w-full min-w-[100px] max-w-[120px] flex-col gap-1 text-sm md:w-auto">
            <span className="font-medium text-stone-700">Per page</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={String(s.limit)}
              onChange={(e) =>
                setSearch({ limit: Number(e.target.value), page: 1 })
              }
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="rounded-lg border-2 border-stone-900 bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 md:ml-auto"
            onClick={() => setSearch({ search: draftSearch.trim(), page: 1 })}
          >
            Apply search
          </button>
        </div>

        <div className="mt-4 overflow-x-auto rounded-10 border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
            <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-600">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {list.isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-stone-500">
                    Loading…
                  </td>
                </tr>
              ) : null}
              {list.isError ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-red-700">
                    {list.error instanceof Error
                      ? list.error.message
                      : "Failed to load users."}
                  </td>
                </tr>
              ) : null}
              {!list.isLoading && !list.isError && rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-stone-500">
                    No users match your filters.
                  </td>
                </tr>
              ) : null}
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-stone-50/80">
                  <td className="px-4 py-3 font-medium text-stone-900">
                    {row.displayName}
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-stone-700">
                    {row.email}
                  </td>
                  <td className="px-4 py-3 text-stone-700">{row.phone}</td>
                  <td className="px-4 py-3 text-stone-700">
                    {row.accountType.replace(/_/g, " ")}
                  </td>
                  <td className="px-4 py-3">
                    {row.blockedAt ? (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                        Blocked
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-stone-600">
                    {new Date(row.createdAt).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <Link
                      to="/admin/users/$id"
                      params={{ id: String(row.id) }}
                      className="font-medium text-stone-900 underline-offset-2 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {meta && meta.totalPages > 0 ? (
          <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm text-stone-600 sm:flex-row">
            <p>
              Page {meta.page} of {meta.totalPages} ({meta.total} total)
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={meta.page <= 1}
                className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 font-medium text-stone-800 disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => goPage(meta.page - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                disabled={meta.page >= meta.totalPages}
                className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 font-medium text-stone-800 disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => goPage(meta.page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_admin/admin/users/")({
  validateSearch: (raw: Record<string, unknown>) => parseUsersSearch(raw),
  component: AdminUsersPage,
});

