"use client";

import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ApiError } from "@endpoint";
import {
  useAdminPayout,
  useAdminPayoutAcceptMutation,
  useAdminPayoutRejectMutation,
} from "@endpoint/admin/useAdminPayouts";
import type { AdminPayoutStatus } from "@endpoint/admin/admin";

function formatPayoutMoney(n: number | string): string {
  const num =
    typeof n === "number" ? n : Number.parseFloat(String(n)) || 0;
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `₦${num.toLocaleString()}`;
  }
}

function errMessage(e: unknown): string {
  if (e instanceof ApiError) return e.message;
  if (e instanceof Error) return e.message;
  return "Something went wrong.";
}

function statusBadge(status: AdminPayoutStatus) {
  if (status === "pending") {
    return (
      <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-900">
        Pending
      </span>
    );
  }
  if (status === "accepted") {
    return (
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
        Accepted
      </span>
    );
  }
  return (
    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
      Rejected
    </span>
  );
}

function AdminPayoutDetailPage() {
  const { id: idParam } = Route.useParams();
  const id = Number.parseInt(idParam, 10);
  const valid = Number.isFinite(id) && id > 0;

  const q = useAdminPayout(valid ? id : null);
  const acceptMut = useAdminPayoutAcceptMutation(id);
  const rejectMut = useAdminPayoutRejectMutation(id);
  const [rejectReason, setRejectReason] = useState("");
  const [showReject, setShowReject] = useState(false);

  const d = q.data;
  const pending = d?.status === "pending";

  const handleAccept = () => {
    acceptMut.mutate(undefined, {
      onSuccess: (res) => {
        toast.success(res.message || "Payout accepted.");
      },
      onError: (e) => toast.error(errMessage(e)),
    });
  };

  const handleReject = () => {
    const reason = rejectReason.trim();
    if (!reason) {
      toast.error("Enter a rejection reason.");
      return;
    }
    rejectMut.mutate(
      { reason },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Payout rejected.");
          setShowReject(false);
          setRejectReason("");
        },
        onError: (e) => toast.error(errMessage(e)),
      },
    );
  };

  return (
    <section className="min-h-[70vh] bg-ads360-hash px-4 py-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/admin/payout"
          className="text-sm font-medium text-stone-600 underline-offset-2 hover:text-stone-900 hover:underline"
        >
          ← Back to payouts
        </Link>

        {!valid ? (
          <p className="mt-8 text-sm text-red-700">Invalid payout id.</p>
        ) : null}

        {valid && q.isLoading ? (
          <p className="mt-8 text-stone-600">Loading…</p>
        ) : null}
        {valid && q.isError ? (
          <p className="mt-8 text-red-700">
            {q.error instanceof Error ? q.error.message : "Failed to load."}
          </p>
        ) : null}

        {valid && d ? (
          <div className="mt-8 rounded-10 border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Payout #{d.id}
                </p>
                <p className="mt-1 font-serif text-2xl text-stone-900">
                  {formatPayoutMoney(d.amount)}
                </p>
              </div>
              {statusBadge(d.status)}
            </div>

            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-stone-500">User ID</dt>
                <dd className="mt-0.5 font-medium text-stone-900">
                  <Link
                    to="/admin/users/$id"
                    params={{ id: String(d.userId) }}
                    className="text-ads360yellow-100 hover:underline"
                  >
                    {d.userId}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="text-stone-500">User email</dt>
                <dd className="mt-0.5 text-stone-900">
                  {d.userEmail ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-stone-500">Bank</dt>
                <dd className="mt-0.5 text-stone-900">
                  {d.bankName} ({d.bankCode})
                </dd>
              </div>
              <div>
                <dt className="text-stone-500">Account</dt>
                <dd className="mt-0.5 text-stone-900">
                  {d.accountName}
                  <span className="ml-2 font-mono text-stone-700">
                    {d.accountNumber}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-stone-500">Transaction ref</dt>
                <dd className="mt-0.5 font-mono text-sm text-stone-800">
                  {d.transactionRef ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-stone-500">Transaction ID</dt>
                <dd className="mt-0.5 font-mono text-sm text-stone-800">
                  {d.transactionId ?? "—"}
                </dd>
              </div>
              <div>
                <dt className="text-stone-500">Created</dt>
                <dd className="mt-0.5 text-stone-900">
                  {new Date(d.createdAt).toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-stone-500">Updated</dt>
                <dd className="mt-0.5 text-stone-900">
                  {new Date(d.updatedAt).toLocaleString()}
                </dd>
              </div>
              {d.rejectionReason ? (
                <div className="sm:col-span-2">
                  <dt className="text-stone-500">Rejection reason</dt>
                  <dd className="mt-0.5 text-stone-900">{d.rejectionReason}</dd>
                </div>
              ) : null}
            </dl>

            {pending ? (
              <div className="mt-8 flex flex-col gap-4 border-t border-stone-100 pt-6">
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={acceptMut.isPending || rejectMut.isPending}
                    onClick={handleAccept}
                    className="rounded-lg border-2 border-emerald-700 bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
                  >
                    {acceptMut.isPending ? "Accepting…" : "Accept payout"}
                  </button>
                  <button
                    type="button"
                    disabled={acceptMut.isPending || rejectMut.isPending}
                    onClick={() => setShowReject((s) => !s)}
                    className="rounded-lg border-2 border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-900 hover:bg-stone-50 disabled:opacity-50"
                  >
                    {showReject ? "Cancel reject" : "Reject…"}
                  </button>
                </div>
                {showReject ? (
                  <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <label className="flex flex-col gap-1 text-sm">
                      <span className="font-medium text-stone-700">
                        Rejection reason (required)
                      </span>
                      <textarea
                        className="min-h-[88px] rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none focus:border-stone-500"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Explain why this payout is rejected"
                      />
                    </label>
                    <button
                      type="button"
                      disabled={rejectMut.isPending}
                      onClick={handleReject}
                      className="mt-3 rounded-lg border-2 border-red-700 bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
                    >
                      {rejectMut.isPending ? "Rejecting…" : "Confirm reject"}
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="mt-8 text-sm text-stone-500">
                This payout is no longer pending; accept and reject are
                disabled.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_admin/admin/payout/$id/")({
  component: AdminPayoutDetailPage,
});

