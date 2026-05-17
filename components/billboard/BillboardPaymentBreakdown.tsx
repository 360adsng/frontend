import { formatCampaignMoney } from "@components/campaign/CampaignDetailShared";

export type BillboardPaymentBreakdownProps = {
  currency: string;
  placementAmount: number;
  printAmount: number;
  arconAmount?: number;
  payableTotal?: number;
  /** When false, ARCON line and total are hidden (vendor view). */
  showArcon?: boolean;
  className?: string;
};

export function BillboardPaymentBreakdown({
  currency,
  placementAmount,
  printAmount,
  arconAmount = 0,
  payableTotal,
  showArcon = true,
  className = "",
}: BillboardPaymentBreakdownProps) {
  const arcon = Number(arconAmount) || 0;
  const print = Number(printAmount) || 0;
  const placement = Number(placementAmount) || 0;
  const total =
    payableTotal != null
      ? Number(payableTotal)
      : placement + print + (showArcon ? arcon : 0);

  const rowClass =
    "flex items-center justify-between gap-4 text-sm text-stone-700";
  const labelClass = "text-stone-600";

  return (
    <div
      className={`rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5 ${className}`.trim()}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
        Payment breakdown
      </p>
      <ul className="mt-3 space-y-2">
        <li className={rowClass}>
          <span className={labelClass}>Placement</span>
          <span className="font-medium text-stone-900">
            {formatCampaignMoney(placement, currency)}
          </span>
        </li>
        {print > 0 ? (
          <li className={rowClass}>
            <span className={labelClass}>Printing</span>
            <span className="font-medium text-stone-900">
              {formatCampaignMoney(print, currency)}
            </span>
          </li>
        ) : null}
        {showArcon && arcon > 0 ? (
          <li className={rowClass}>
            <span className={labelClass}>ARCON application</span>
            <span className="font-medium text-stone-900">
              {formatCampaignMoney(arcon, currency)}
            </span>
          </li>
        ) : null}
        <li
          className={`${rowClass} border-t border-stone-200/80 pt-2 font-semibold text-stone-900`}
        >
          <span>{showArcon ? "Total paid" : "Your earnings"}</span>
          <span>{formatCampaignMoney(total, currency)}</span>
        </li>
      </ul>
    </div>
  );
}
