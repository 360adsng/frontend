"use client";

import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Modal } from "@components/modal/modal";
import { ApiError } from "@endpoint";
import {
  postAdminCreateInvite,
  type AdminCreateInvitePayload,
  type AdminInviteLinkItem,
  type AdminInviteLinkVendorAccountType,
} from "@endpoint/admin/admin";
import { useAdminInviteLinksList } from "@endpoint/admin/useAdminUsers";

const cancel = "/icons/usericon/modalCancelBotton.svg";

const ACCOUNT_OPTIONS: {
  value: AdminCreateInvitePayload["accountType"];
  label: string;
}[] = [
  { value: "billboard_owner", label: "Billboard owner" },
  { value: "influencer", label: "Influencer" },
];

type InviteListSearch = {
  page: number;
  limit: number;
  search: string;
  accountType: "" | AdminInviteLinkVendorAccountType;
  used: "all" | "true" | "false";
  expired: "all" | "true" | "false";
};

function parseInviteSearch(raw: Record<string, unknown>): InviteListSearch {
  const page = Math.max(1, Number(raw.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(raw.limit) || 20));
  const search = String(raw.search ?? "").trim();
  const at = String(raw.accountType ?? "").trim();
  const accountType: InviteListSearch["accountType"] =
    at === "billboard_owner" || at === "influencer" ? at : "";
  const u = String(raw.used ?? "all").toLowerCase();
  const used: InviteListSearch["used"] =
    u === "true" || u === "false" ? u : "all";
  const ex = String(raw.expired ?? "all").toLowerCase();
  const expired: InviteListSearch["expired"] =
    ex === "true" || ex === "false" ? ex : "all";
  return { page, limit, search, accountType, used, expired };
}

function errMessage(e: unknown): string {
  if (e instanceof ApiError) return e.message;
  if (e instanceof Error) return e.message;
  return "Something went wrong.";
}

function vendorOnboardingHref(token: string): string {
  if (typeof window === "undefined") return "";
  const origin = window.location.origin;
  return `${origin}/vendor-access/onboarding?token=${encodeURIComponent(token)}`;
}

function progressLabel(n: number): string {
  switch (n) {
    case 0:
      return "Invited";
    case 1:
      return "Account saved";
    case 2:
      return "Business saved";
    case 3:
      return "Complete";
    default:
      return String(n);
  }
}

function CreateInviteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] =
    useState<AdminCreateInvitePayload["accountType"]>("billboard_owner");
  const [duration, setDuration] = useState(7);
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);

  const mut = useMutation({
    mutationFn: (payload: AdminCreateInvitePayload) =>
      postAdminCreateInvite(payload),
    onSuccess: async (data) => {
      toast.success(data.message || "Invite created.");
      setInviteUrl(data.url);
      await qc.invalidateQueries({ queryKey: ["admin", "invite-links", "list"] });
    },
    onError: (e) => toast.error(errMessage(e)),
  });

  function reset() {
    setEmail("");
    setAccountType("billboard_owner");
    setDuration(7);
    setInviteUrl(null);
  }

  function handleClose() {
    if (mut.isPending) return;
    reset();
    onClose();
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteUrl(null);
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error("Enter an email address.");
      return;
    }
    mut.mutate({
      email: trimmed,
      accountType,
      duration: Math.min(30, Math.max(1, duration)),
    });
  };

  async function copyUrl() {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      toast.success("Link copied.");
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  }

  return (
    <Modal isOpen={isOpen}>
      <div className="relative z-[10000001] mx-auto w-11/12 max-w-lg rounded-10 bg-white p-5 md:w-full">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h4 className="font-serif text-lg text-stone-900">New invite link</h4>
            <p className="mt-1 text-xs text-stone-500">
              Valid for 1–30 days. The invitee completes onboarding via the link.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={mut.isPending}
            aria-label="Close"
          >
            <img src={cancel} alt="" className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="font-medium text-stone-700">Account type</span>
            <select
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={accountType}
              onChange={(e) =>
                setAccountType(
                  e.target.value as AdminCreateInvitePayload["accountType"],
                )
              }
              disabled={mut.isPending}
            >
              {ACCOUNT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="font-medium text-stone-700">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              disabled={mut.isPending}
            />
          </label>

          <label className="block text-sm">
            <span className="font-medium text-stone-700">Valid for (days)</span>
            <input
              type="number"
              min={1}
              max={30}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 tabular-nums"
              value={duration}
              onChange={(e) =>
                setDuration(Number.parseInt(e.target.value, 10) || 1)
              }
              disabled={mut.isPending}
            />
          </label>

          <button
            type="submit"
            disabled={mut.isPending}
            className="w-full rounded-lg border-2 border-stone-900 bg-stone-900 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {mut.isPending ? "Creating…" : "Create invite"}
          </button>
        </form>

        {inviteUrl ? (
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-stone-800">
            <p className="font-semibold text-emerald-900">Onboarding link</p>
            <p className="mt-2 break-all font-mono text-xs text-stone-700">
              {inviteUrl}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void copyUrl()}
                className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50"
              >
                Copy link
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50"
              >
                Done
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}

function rowStatus(row: AdminInviteLinkItem): { label: string; tone: string } {
  const now = Date.now();
  const expired = new Date(row.expiresAt).getTime() < now;
  if (row.isUsed) {
    return { label: "Used", tone: "bg-stone-200 text-stone-800" };
  }
  if (expired) {
    return { label: "Expired", tone: "bg-amber-100 text-amber-900" };
  }
  return { label: "Active", tone: "bg-emerald-100 text-emerald-900" };
}

function AdminInviteLinksPage() {
  const navigate = useNavigate();
  const s = Route.useSearch();
  const [draftSearch, setDraftSearch] = useState(s.search);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setDraftSearch(s.search);
  }, [s.search]);

  const list = useAdminInviteLinksList({
    page: s.page,
    limit: s.limit,
    search: s.search || undefined,
    accountType: s.accountType || undefined,
    used:
      s.used === "true" ? true : s.used === "false" ? false : undefined,
    expired:
      s.expired === "true"
        ? true
        : s.expired === "false"
          ? false
          : undefined,
  });

  const meta = list.data?.meta;
  const rows = list.data?.data ?? [];

  const setSearch = (next: Partial<InviteListSearch>) => {
    void navigate({
      to: "/admin/invite-links",
      search: (prev) =>
        parseInviteSearch({ ...(prev as Record<string, unknown>), ...next }),
      replace: true,
    });
  };

  const goPage = (p: number) => setSearch({ page: p });

  async function copyRowLink(row: AdminInviteLinkItem) {
    const href = vendorOnboardingHref(row.token);
    if (!href) return;
    try {
      await navigator.clipboard.writeText(href);
      toast.success("Link copied.");
    } catch {
      toast.error("Could not copy to clipboard.");
    }
  }

  return (
    <section className="min-h-[70vh] bg-ads360-hash px-4 py-10 md:px-10">
      <CreateInviteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl text-stone-900">Invite links</h1>
            <p className="mt-1 text-sm text-stone-600">
              Vendor onboarding invites — search, filter, and create new links.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="shrink-0 rounded-lg border-2 border-stone-900 bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95"
          >
            New invite
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-10 border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:flex-wrap md:items-end">
          <label className="flex min-w-[200px] flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Search</span>
            <input
              type="search"
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
              placeholder="Email or token…"
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
                setSearch({
                  accountType: e.target.value as InviteListSearch["accountType"],
                  page: 1,
                })
              }
            >
              <option value="">All</option>
              <option value="billboard_owner">Billboard owner</option>
              <option value="influencer">Influencer</option>
            </select>
          </label>
          <label className="flex min-w-[130px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Used</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={s.used}
              onChange={(e) =>
                setSearch({
                  used: e.target.value as InviteListSearch["used"],
                  page: 1,
                })
              }
            >
              <option value="all">All</option>
              <option value="false">Not used</option>
              <option value="true">Used</option>
            </select>
          </label>
          <label className="flex min-w-[130px] flex-col gap-1 text-sm">
            <span className="font-medium text-stone-700">Expiry</span>
            <select
              className="rounded-lg border border-stone-300 px-3 py-2 text-stone-900"
              value={s.expired}
              onChange={(e) =>
                setSearch({
                  expired: e.target.value as InviteListSearch["expired"],
                  page: 1,
                })
              }
            >
              <option value="all">All</option>
              <option value="false">Not expired</option>
              <option value="true">Expired</option>
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
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Progress</th>
                <th className="px-4 py-3 font-medium">Expires</th>
                <th className="px-4 py-3 font-medium">Invited by</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {list.isLoading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-stone-500">
                    Loading…
                  </td>
                </tr>
              ) : null}
              {list.isError ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-red-700">
                    {list.error instanceof Error
                      ? list.error.message
                      : "Failed to load invites."}
                  </td>
                </tr>
              ) : null}
              {!list.isLoading && !list.isError && rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-stone-500">
                    No invite links match your filters.
                  </td>
                </tr>
              ) : null}
              {rows.map((row) => {
                const st = rowStatus(row);
                return (
                  <tr key={row.id} className="hover:bg-stone-50/80">
                    <td className="max-w-[200px] truncate px-4 py-3 font-medium text-stone-900">
                      {row.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-stone-700">
                      {row.accountType.replace(/_/g, " ")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${st.tone}`}
                      >
                        {st.label}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-stone-600">
                      {progressLabel(row.onboardingProgress)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-stone-600">
                      {new Date(row.expiresAt).toLocaleString()}
                    </td>
                    <td className="max-w-[160px] truncate px-4 py-3 text-stone-600">
                      {row.invitedBy?.email ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-stone-600">
                      {new Date(row.createdAt).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <button
                        type="button"
                        className="font-medium text-stone-900 underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
                        disabled={row.isUsed}
                        onClick={() => void copyRowLink(row)}
                        title={
                          row.isUsed
                            ? "Invite already used"
                            : "Copy onboarding link"
                        }
                      >
                        Copy link
                      </button>
                    </td>
                  </tr>
                );
              })}
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

export const Route = createFileRoute("/_admin/admin/invite-links/")({
  validateSearch: (raw: Record<string, unknown>) => parseInviteSearch(raw),
  component: AdminInviteLinksPage,
});

export default AdminInviteLinksPage;
