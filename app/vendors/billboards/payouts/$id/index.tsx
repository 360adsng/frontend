import { createFileRoute, Link } from "@tanstack/react-router";
import { useMyPayoutById } from "@endpoint/wallet/useWallet";

function money(n: unknown): string {
  const v = Number(n ?? 0);
  if (!Number.isFinite(v)) return "0.00";
  return v.toFixed(2);
}

function dateTime(v: string | null | undefined): string {
  if (!v) return "-";
  const d = new Date(v);
  if (!Number.isFinite(d.getTime())) return String(v);
  return d.toISOString().replace("T", " ").slice(0, 19);
}

function maskAccountNumber(acct: string): string {
  const raw = String(acct ?? "");
  if (raw.length <= 4) return raw;
  return `${raw.slice(0, 2)}******${raw.slice(-2)}`;
}

const PayoutDetailsPage = () => {
  const { id } = Route.useParams();
  const payoutId = Number(id);
  const payout = useMyPayoutById(payoutId, Number.isFinite(payoutId) && payoutId > 0);

  return (
    <section className="min-h-screen bg-ads360-hash px-4 py-14 md:px-10">
      <div className="container mx-auto">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl">Payout details</h2>
            <p className="text-stone-400">PO#{id}</p>
          </div>
          <Link
            to="/vendors/billboards/payouts/"
            className="rounded-10 border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
          >
            Back
          </Link>
        </div>

        <div className="rounded-10 border border-ads360yellow-100 bg-white p-5 shadow-md">
          {payout.isLoading ? (
            <div className="text-stone-500">Loading...</div>
          ) : payout.isError ? (
            <div className="text-stone-500">Unable to load payout</div>
          ) : !payout.data ? (
            <div className="text-stone-500">Payout not found</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-10 border border-stone-200 p-4">
                <div className="text-xs font-semibold text-stone-500">Amount</div>
                <div className="mt-1 text-xl font-semibold text-stone-900">
                  ₦{money(payout.data.amount)}
                </div>
                <div className="mt-3 text-xs font-semibold text-stone-500">Status</div>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                      payout.data.status === "accepted"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                        : payout.data.status === "rejected"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "bg-amber-100 text-amber-900 border-amber-200"
                    }`}
                  >
                    {String(payout.data.status).toUpperCase()}
                  </span>
                </div>
                {payout.data.status === "rejected" && payout.data.rejectionReason ? (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-900">
                    <div className="text-xs font-semibold text-red-700">
                      Rejection reason
                    </div>
                    <div className="mt-1">{payout.data.rejectionReason}</div>
                  </div>
                ) : null}
              </div>

              <div className="rounded-10 border border-stone-200 p-4">
                <div className="text-xs font-semibold text-stone-500">Bank</div>
                <div className="mt-1 text-sm font-medium text-stone-900">
                  {payout.data.bankName} ({payout.data.bankCode})
                </div>

                <div className="mt-3 text-xs font-semibold text-stone-500">
                  Account
                </div>
                <div className="mt-1 text-sm text-stone-900">
                  {payout.data.accountName} · {maskAccountNumber(payout.data.accountNumber)}
                </div>

                <div className="mt-3 text-xs font-semibold text-stone-500">
                  Requested
                </div>
                <div className="mt-1 text-sm text-stone-900">
                  {dateTime(payout.data.createdAt)}
                </div>

                <div className="mt-3 text-xs font-semibold text-stone-500">
                  Last updated
                </div>
                <div className="mt-1 text-sm text-stone-900">
                  {dateTime(payout.data.updatedAt)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const Route = createFileRoute("/vendors/billboards/payouts/$id/")({
  component: PayoutDetailsPage,
});

export default PayoutDetailsPage;

