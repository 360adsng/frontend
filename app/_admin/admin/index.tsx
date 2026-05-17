import { Link, createFileRoute } from "@tanstack/react-router";
import { useAdminDashboard } from "@endpoint/admin/useAdminDashboard";
import { CampaignPaymentStatusBadge, CampaignStatusBadge, formatCampaignMoney, formatDateShort } from "@components/campaign/CampaignDetailShared";
import { arconTurnaroundLabel } from "@lib/billboardArcon";

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: React.ReactNode;
  href?: string;
}) {
  const inner = (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
        {label}
      </p>
      <div className="mt-2 text-2xl font-serif text-stone-900">{value}</div>
    </div>
  );
  return href ? (
    <Link to={href} className="block hover:opacity-95">
      {inner}
    </Link>
  ) : (
    inner
  );
}

function AdminHome() {
  const dash = useAdminDashboard();
  const d = dash.data;

  return (
    <section className="bg-ads360-hash min-h-[70vh] px-4 md:px-10 py-10">
      <h1 className="text-2xl font-serif text-stone-900">Dashboard</h1>

      {dash.isLoading ? (
        <p className="mt-4 text-sm text-stone-600">Loading…</p>
      ) : dash.isError ? (
        <p className="mt-4 text-sm text-red-700">Unable to load dashboard.</p>
      ) : d ? (
        <div className="mt-6 space-y-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Open disputes"
              value={d.counts.disputesOpen}
              href="/admin/request"
            />
            <StatCard
              label="ARCON applications"
              value={d.counts.arconApplicationsPending ?? 0}
              href="/admin/request"
            />
            <StatCard
              label="Pending payouts"
              value={d.counts.payoutsPending}
              href="/admin/payout"
            />
            <StatCard
              label="Billboard bookings (total)"
              value={d.counts.billboard.total}
              href="/admin/request"
            />
            <StatCard
              label="Influencer bookings (total)"
              value={d.counts.influencer.total}
              href="/admin/request"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-stone-900">
                  Action required
                </h2>
                <Link
                  to="/admin/request"
                  className="text-sm font-semibold text-ads360yellow-100 hover:underline"
                >
                  View requests
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {(d.queues.arconApplications ?? []).map((x) => (
                  <div
                    key={`arcon-${x.id}`}
                    className="rounded-xl border border-amber-300 bg-amber-50/80 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-amber-900">
                          ARCON · billboard · NG#{x.id}
                        </p>
                        <p className="mt-1 truncate text-sm font-semibold text-stone-900">
                          {x.listingName ?? "—"}
                        </p>
                        <p className="mt-1 text-xs text-stone-600">
                          {arconTurnaroundLabel(x.turnaround)}
                        </p>
                      </div>
                      <CampaignPaymentStatusBadge
                        paymentStatus={x.paymentStatus}
                      />
                    </div>
                    <Link
                      to={`/admin/request/billboard/${x.id}`}
                      className="mt-3 inline-block text-sm font-semibold text-stone-900 underline-offset-2 hover:underline"
                    >
                      Upload certificate
                    </Link>
                  </div>
                ))}

                {d.queues.disputes.length === 0 &&
                (d.queues.arconApplications ?? []).length === 0 ? (
                  <p className="text-sm text-stone-600">
                    No disputes or ARCON applications need attention.
                  </p>
                ) : null}

                {d.queues.disputes.map((x) => {
                    const href =
                      x.kind === "billboard"
                        ? `/admin/request/billboard/${x.id}`
                        : `/admin/request/influencer/${x.id}`;
                    const chatHref =
                      x.kind === "billboard"
                        ? `/admin/request/billboard/${x.id}/dispute-chat`
                        : `/admin/request/influencer/${x.id}/dispute-chat`;
                    return (
                      <div
                        key={`${x.kind}-${x.id}`}
                        className="rounded-xl border border-orange-200 bg-orange-50/60 p-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide text-orange-800">
                              {x.kind} · NG#{x.id}
                            </p>
                            <p className="mt-1 truncate text-sm font-semibold text-stone-900">
                              {x.listingName ?? "—"}
                            </p>
                            <p className="mt-1 text-xs text-stone-600">
                              Opened{" "}
                              {x.disputedAt ? formatDateShort(x.disputedAt) : "—"}
                            </p>
                          </div>
                          <div className="flex shrink-0 flex-wrap items-center gap-2">
                            <CampaignStatusBadge status={x.status} />
                            <CampaignPaymentStatusBadge
                              paymentStatus={x.paymentStatus}
                            />
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-3">
                          <Link
                            to={href}
                            className="text-sm font-semibold text-stone-900 underline-offset-2 hover:underline"
                          >
                            View booking
                          </Link>
                          <Link
                            to={chatHref}
                            className="text-sm font-semibold text-ads360yellow-100 underline-offset-2 hover:underline"
                          >
                            View dispute chat
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-stone-900">
                  Pending payouts
                </h2>
                <Link
                  to="/admin/payout"
                  className="text-sm font-semibold text-ads360yellow-100 hover:underline"
                >
                  View payouts
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                {d.queues.payouts.length === 0 ? (
                  <p className="text-sm text-stone-600">No pending payouts.</p>
                ) : (
                  d.queues.payouts.map((p) => (
                    <Link
                      key={p.id}
                      to={`/admin/payout/${p.id}`}
                      className="block rounded-xl border border-stone-200 bg-white p-4 hover:bg-stone-50"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                            Payout · #{p.id}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-stone-900">
                            {p.bankName} · {p.accountNumber}
                          </p>
                          <p className="mt-1 text-xs text-stone-600">
                            {formatDateShort(p.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-stone-900">
                            {formatCampaignMoney(p.amount, "NGN")}
                          </div>
                          <div className="mt-1 text-xs text-stone-600">
                            {p.status}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-stone-900">
                  Recent billboard bookings
                </h2>
                <Link
                  to="/admin/request"
                  className="text-sm font-semibold text-ads360yellow-100 hover:underline"
                >
                  View
                </Link>
              </div>
              <div className="mt-5 space-y-3">
                {d.recent.billboardBookings.slice(0, 6).map((b) => (
                  <Link
                    key={b.id}
                    to={`/admin/request/billboard/${b.id}`}
                    className="block rounded-xl border border-stone-200 bg-white p-4 hover:bg-stone-50"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                          NG#{b.id}
                        </p>
                        <p className="mt-1 truncate text-sm font-semibold text-stone-900">
                          {b.listingName ?? "—"}
                        </p>
                        <p className="mt-1 text-xs text-stone-600">
                          {formatDateShort(b.createdAt)}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <CampaignStatusBadge status={b.status} />
                        <CampaignPaymentStatusBadge paymentStatus={b.paymentStatus} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl text-stone-900">
                  Recent influencer bookings
                </h2>
                <Link
                  to="/admin/request"
                  search={{ tab: "influencer" }}
                  className="text-sm font-semibold text-ads360yellow-100 hover:underline"
                >
                  View
                </Link>
              </div>
              <div className="mt-5 space-y-3">
                {d.recent.influencerBookings.slice(0, 6).map((b) => (
                  <Link
                    key={b.id}
                    to={`/admin/request/influencer/${b.id}`}
                    className="block rounded-xl border border-stone-200 bg-white p-4 hover:bg-stone-50"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                          NG#{b.id}
                        </p>
                        <p className="mt-1 truncate text-sm font-semibold text-stone-900">
                          {b.listingName ?? "—"}
                        </p>
                        <p className="mt-1 text-xs text-stone-600">
                          {formatDateShort(b.createdAt)}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <CampaignStatusBadge status={b.status} />
                        <CampaignPaymentStatusBadge paymentStatus={b.paymentStatus} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-stone-900">
                Recent admin activity
              </h2>
              <Link
                to="/admin/activity-logs"
                className="text-sm font-semibold text-ads360yellow-100 hover:underline"
              >
                View logs
              </Link>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {d.recent.adminActivity.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border border-stone-200 bg-white p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                    {a.action}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-stone-900">
                    Admin #{a.adminUserId}
                  </p>
                  <p className="mt-1 text-xs text-stone-600">
                    {formatDateShort(a.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export const Route = createFileRoute("/_admin/admin/")({
  component: AdminHome,
});

