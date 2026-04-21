import { createFileRoute, Link } from "@tanstack/react-router";
import { useMyPayouts } from "@endpoint/wallet/useWallet";
import { useMemo, useState } from "react";

function money(n: unknown): string {
  const v = Number(n ?? 0);
  if (!Number.isFinite(v)) return "0.00";
  return v.toFixed(2);
}

function dateOnly(s: string | null | undefined): string {
  if (!s) return "-";
  return String(s).slice(0, 10);
}

function maskAccountNumber(acct: string): string {
  const raw = String(acct ?? "");
  if (raw.length <= 4) return raw;
  return `${raw.slice(0, 2)}******${raw.slice(-2)}`;
}

type PayoutStatusFilter = "all" | "pending" | "accepted" | "rejected";

const VendorPayoutsPage = () => {
  const payouts = useMyPayouts();
  const [status, setStatus] = useState<PayoutStatusFilter>("all");

  const filtered = useMemo(() => {
    const rows = payouts.data ?? [];
    if (status === "all") return rows;
    return rows.filter((p) => String(p.status).toLowerCase() === status);
  }, [payouts.data, status]);

  return (
    <section className="min-h-screen bg-ads360-hash px-4 py-14 md:px-10">
      <div className="container mx-auto">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl">My Payouts</h2>
            <p className="text-stone-400">
              Track your withdrawal requests and status
            </p>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <div className="text-sm text-stone-600">Filter:</div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PayoutStatusFilter)}
              className="rounded-10 border border-ads360yellow-100 bg-white px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="rounded-10 border border-ads360yellow-100 bg-white p-4 shadow-md">
          <div className="w-full overflow-x-auto mt-2 mb-2 rounded-10 border border-[#D0B301]/30 bg-white">
            <table className="min-w-full">
              <thead className="bg-[#D0B301]/15">
                <tr className="text-left text-xs font-semibold text-stone-700">
                  <th className="py-4 px-4 border-b border-[#D0B301]/25">ID</th>
                  <th className="py-4 px-4 border-b border-[#D0B301]/25">AMOUNT</th>
                  <th className="py-4 px-4 border-b border-[#D0B301]/25">BANK</th>
                  <th className="py-4 px-4 border-b border-[#D0B301]/25">
                    ACCOUNT
                  </th>
                  <th className="py-4 px-4 border-b border-[#D0B301]/25">
                    DATE
                  </th>
                  <th className="py-4 px-4 border-b border-[#D0B301]/25">
                    STATUS
                  </th>
                  <th className="py-4 px-4 border-b border-[#D0B301]/25">
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {payouts.isLoading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 px-4 text-center text-stone-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : payouts.isError ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 px-4 text-center text-stone-500"
                    >
                      Unable to load payouts
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 px-4 text-center text-stone-500"
                    >
                      No payout requests found
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="border-b last:border-b-0">
                      <td className="py-5 px-4 text-stone-800">PO#{p.id}</td>
                      <td className="py-5 px-4 text-stone-800">
                        ₦{money(p.amount)}
                      </td>
                      <td className="py-5 px-4 text-stone-700">{p.bankName}</td>
                      <td className="py-5 px-4 text-stone-700">
                        {maskAccountNumber(p.accountNumber)}
                      </td>
                      <td className="py-5 px-4 text-stone-700">
                        {dateOnly(p.createdAt)}
                      </td>
                      <td className="py-5 px-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                            p.status === "accepted"
                              ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                              : p.status === "rejected"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : "bg-amber-100 text-amber-900 border-amber-200"
                          }`}
                        >
                          {String(p.status).toUpperCase()}
                        </span>
                      </td>
                      <td className="py-5 px-4">
                        <Link
                          to="/vendors/billboards/payouts/$id/"
                          params={{ id: String(p.id) }}
                          className="text-ads360yellow-100 font-semibold hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Route = createFileRoute("/vendors/billboards/payouts/")({
  component: VendorPayoutsPage,
});

export default VendorPayoutsPage;

