import { Link, createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type WalletReturnSearch = {
  status?: string;
  tx_ref?: string;
  transaction_id?: string;
};

function normalizeSearch(raw: Record<string, unknown>): WalletReturnSearch {
  const pick = (k: string): string | undefined => {
    const v = raw[k];
    if (typeof v === "string" && v.trim()) return v.trim();
    if (Array.isArray(v) && typeof v[0] === "string" && v[0].trim())
      return v[0].trim();
    return undefined;
  };
  return {
    status: pick("status"),
    tx_ref: pick("tx_ref"),
    transaction_id: pick("transaction_id"),
  };
}

function isPaidStatus(status: string | undefined): boolean {
  if (!status) return false;
  const s = status.toLowerCase();
  return (
    s === "successful" ||
    s === "success" ||
    s === "completed" ||
    s === "succeeded"
  );
}

function isFailedLikeStatus(status: string | undefined): boolean {
  if (!status) return false;
  const s = status.toLowerCase();
  return (
    s === "failed" ||
    s === "error" ||
    s === "cancelled" ||
    s === "canceled" ||
    s === "aborted"
  );
}

function WalletPaymentReturnPage() {
  const { status, tx_ref, transaction_id } = Route.useSearch();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isPaidStatus(status)) return;
    void queryClient.invalidateQueries({ queryKey: ["wallet"] });
    void queryClient.invalidateQueries({ queryKey: ["wallet", "transactions"] });
    void queryClient.invalidateQueries({ queryKey: ["wallet", "cards"] });
  }, [status, queryClient]);

  const paid = isPaidStatus(status);
  const failed = isFailedLikeStatus(status);
  const unknown =
    status != null && status !== "" && !paid && !failed;

  return (
    <section className="min-h-screen bg-ads360-hash px-4 md:px-10 py-14">
      <div className="container mx-auto max-w-lg">
        <div className="rounded-10 border border-ads360yellow-100 bg-white p-6 shadow-md">
          <h1 className="text-xl font-semibold text-stone-900">
            Wallet payment
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            You were redirected here after paying with Flutterwave. Your bank may
            take a moment; the webhook updates your balance shortly after success.
          </p>

          <div className="mt-6 rounded-lg border border-stone-200 bg-stone-50 p-4">
            {paid ? (
              <p className="text-sm font-medium text-green-700">
                Payment reported as successful.
              </p>
            ) : failed ? (
              <p className="text-sm font-medium text-red-700">
                Payment was not completed.
              </p>
            ) : unknown ? (
              <p className="text-sm font-medium text-amber-800">
                Status: {status}
              </p>
            ) : (
              <p className="text-sm text-stone-600">
                No status was returned in the URL. Check your transaction in the
                wallet history.
              </p>
            )}

            <dl className="mt-4 space-y-2 text-xs text-stone-600">
              {tx_ref ? (
                <div>
                  <dt className="text-stone-400">Reference (tx_ref)</dt>
                  <dd className="font-mono break-all">{tx_ref}</dd>
                </div>
              ) : null}
              {transaction_id ? (
                <div>
                  <dt className="text-stone-400">Transaction ID</dt>
                  <dd className="font-mono break-all">{transaction_id}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/users/wallet"
              className="inline-flex justify-center rounded border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-50"
            >
              View wallet and history
            </Link>
            <Link
              to="/users"
              className="inline-flex justify-center rounded border border-transparent bg-ads360black-100/95 px-4 py-2.5 text-sm font-medium text-ads360light-100 hover:bg-ads360black-100"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_usersauth/wallet/")({
  validateSearch: (raw: Record<string, unknown>): WalletReturnSearch =>
    normalizeSearch(raw),
  component: WalletPaymentReturnPage,
});

export default WalletPaymentReturnPage;
