import type { ReactNode } from "react";
import type { PublicBillboardListing } from "@endpoint/billboard/billboard";
import {
  formatActiveDaysSummary,
  formatListingDate,
  formatNaira,
  formatRuntime,
  googleMapsSearchUrl,
  primaryPriceHero,
  billboardTypeLabel,
  creativeFulfillmentLabel,
} from "@lib/billboardDisplay";
import { CreativeFulfillmentType } from "@endpoint/billboard/billboardListingEnums";

const locationIcon = "/icons/location.svg";

type MainProps = {
  bb: PublicBillboardListing;
  showOwnerCompanyName?: boolean;
};

export function BillboardDetailMainColumn({
  bb,
  showOwnerCompanyName = false,
}: MainProps) {
  const hasCoords =
    bb.latitude != null &&
    bb.longitude != null &&
    Number.isFinite(bb.latitude) &&
    Number.isFinite(bb.longitude);

  const sizeLine =
    bb.width != null && bb.height != null
      ? `${bb.width}m (W) × ${bb.height}m (H)`
      : bb.width != null
        ? `Width: ${bb.width}m`
        : bb.height != null
          ? `Height: ${bb.height}m`
          : null;

  const pixelLine =
    bb.pixelWidth != null && bb.pixelHeight != null
      ? `${bb.pixelWidth}px (W) × ${bb.pixelHeight}px (H)`
      : null;

  const audience =
    bb.audienceTypes?.filter(Boolean).length > 0
      ? bb.audienceTypes.join(", ")
      : null;

  const locationChips: { label: string; value: string }[] = [];
  if (bb.city || bb.state) {
    locationChips.push({
      label: "Area",
      value: [bb.city, bb.state].filter(Boolean).join(", "),
    });
  }
  if (bb.nearbyLandmarks) {
    locationChips.push({ label: "Nearby", value: bb.nearbyLandmarks });
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="flex items-start gap-2 text-xl font-semibold text-neutral-900 md:text-2xl">
          <img
            alt=""
            src={locationIcon}
            className="mt-1 h-5 w-5 shrink-0 opacity-80"
          />
          <span>{bb.name}</span>
        </h3>

        {showOwnerCompanyName && bb.ownerCompanyName ? (
          <p className="mt-1 text-sm text-neutral-600">
            Owned by{" "}
            <span className="font-medium text-neutral-800">
              {bb.ownerCompanyName}
            </span>
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
            bb.isAvailable
              ? "bg-emerald-100 text-emerald-900"
              : "bg-amber-100 text-amber-900"
          }`}
        >
          {bb.isAvailable ? "Available for booking" : "Not available"}
        </span>
        {bb.isNegotiable ? (
          <span className="rounded-full bg-neutral-200 px-2.5 py-0.5 text-xs font-medium text-neutral-800">
            Negotiable
          </span>
        ) : (
          <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600">
            Fixed pricing
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 border-t border-neutral-200 pt-6 md:grid-cols-2 md:items-start">
        <div className="min-w-0 space-y-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            Placement and specs
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Billboard type
              </h4>
              <p className="mt-1 text-sm font-medium text-neutral-900">
                {billboardTypeLabel(bb.billboardType)}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Creative fulfillment
              </h4>
              <p className="mt-1 text-sm font-medium text-neutral-900">
                {creativeFulfillmentLabel(bb.creativeFulfillmentType)}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Location
            </h4>
            <p className="mt-1 text-sm font-medium text-neutral-900">
              {bb.address}
            </p>
            {locationChips.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {locationChips.map((c) => (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800"
                    title={c.value}
                  >
                    <span className="text-neutral-600">{c.label}</span>
                    <span className="h-1 w-1 rounded-full bg-neutral-300" />
                    <span className="max-w-[220px] truncate">{c.value}</span>
                  </span>
                ))}
              </div>
            ) : null}
            {hasCoords ? (
              <a
                href={googleMapsSearchUrl(bb.latitude!, bb.longitude!)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm font-medium text-ads360yellowBtn-100 underline"
              >
                Open in Google Maps
              </a>
            ) : null}
          </div>

          {sizeLine ? (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Physical size
              </h4>
              <p className="mt-1 text-sm text-neutral-800">{sizeLine}</p>
            </div>
          ) : null}

          {pixelLine ? (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Pixel size
              </h4>
              <p className="mt-1 text-sm text-neutral-800">{pixelLine}</p>
            </div>
          ) : null}

          {bb.orientation ? (
            <div>
              <h4 className="text-sm font-semibold text-neutral-600">
                Orientation
              </h4>
              <p className="mt-0.5">{bb.orientation}</p>
            </div>
          ) : null}
        </div>

        <div className="min-w-0 space-y-5 md:border-l md:border-neutral-200 md:pl-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            Audience and operations
          </p>

          {bb.illumination ? (
            <div>
              <h4 className="text-sm font-semibold text-neutral-600">
                Illumination
              </h4>
              <p className="mt-0.5">{bb.illumination}</p>
            </div>
          ) : null}

          {bb.facingDirection ? (
            <div>
              <h4 className="text-sm font-semibold text-neutral-600">
                Facing direction
              </h4>
              <p className="mt-0.5">{bb.facingDirection}</p>
            </div>
          ) : null}

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Schedule
            </h4>
            <p className="mt-1 text-sm text-neutral-800">{formatRuntime(bb)}</p>
            <p className="mt-1 text-sm text-neutral-600">
              Active days: {formatActiveDaysSummary(bb.activeDays)}
            </p>
          </div>

          {audience ? (
            <div>
              <h4 className="text-sm font-semibold text-neutral-600">Audience</h4>
              <p className="mt-0.5">{audience}</p>
            </div>
          ) : null}

          {bb.trafficDescription ? (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                USP (unique selling point)
              </h4>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-neutral-800">
                {bb.trafficDescription}
              </p>
            </div>
          ) : null}

          {bb.durationPerDisplay != null &&
          bb.creativeFulfillmentType ===
            CreativeFulfillmentType.DIGITAL_UPLOAD ? (
            <div>
              <h4 className="text-sm font-semibold text-neutral-600">
                Spot duration
              </h4>
              <p className="mt-0.5">
                About {bb.durationPerDisplay} seconds per display rotation
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-4 text-sm text-neutral-500">
        <p>Listing ID: {bb.id}</p>
        <p className="mt-1">
          Listed {formatListingDate(bb.createdAt)} · Updated{" "}
          {formatListingDate(bb.updatedAt)}
        </p>
      </div>
    </div>
  );
}

type PricingProps = {
  bb: PublicBillboardListing;
  actions: ReactNode;
  /** Hide the notes block (vendor view). */
  hideNotes?: boolean;
};

export function BillboardDetailPricingColumn({
  bb,
  actions,
  hideNotes = false,
}: PricingProps) {
  const p = bb.pricing;
  const rows: { label: string; value: string }[] = [];
  if (p.daily != null && p.daily > 0) {
    rows.push({ label: "Daily", value: `₦${formatNaira(p.daily)}` });
  }
  if (p.weekly != null && p.weekly > 0) {
    rows.push({ label: "Weekly", value: `₦${formatNaira(p.weekly)}` });
  }
  if (p.monthly != null && p.monthly > 0) {
    rows.push({ label: "Monthly", value: `₦${formatNaira(p.monthly)}` });
  }
  if (p.quarterly != null && p.quarterly > 0) {
    rows.push({
      label: "Quarterly (~3 mo)",
      value: `₦${formatNaira(p.quarterly)}`,
    });
  }
  if (p.semiAnnual != null && p.semiAnnual > 0) {
    rows.push({
      label: "Half-year (~6 mo)",
      value: `₦${formatNaira(p.semiAnnual)}`,
    });
  }
  if (p.annual != null && p.annual > 0) {
    rows.push({
      label: "Annual (12 mo)",
      value: `₦${formatNaira(p.annual)}`,
    });
  }

  const hero = primaryPriceHero(bb.pricing);

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h4 className="text-sm font-semibold text-neutral-900">Pricing</h4>
        {hero ? (
          <p className="mt-2 text-2xl font-semibold text-ads360black-100">
            <span>₦{hero.amount}</span>
            <span className="text-sm font-normal text-neutral-600">
              {" "}
              {hero.periodLabel}
            </span>
          </p>
        ) : (
          <p className="mt-2 text-2xl font-semibold text-ads360black-100">—</p>
        )}

        {rows.length > 0 ? (
          <ul className="mt-4 space-y-2 border-t border-neutral-200 pt-4 text-sm">
            {rows.map((r) => (
              <li key={r.label} className="flex justify-between gap-3">
                <span className="text-neutral-600">{r.label}</span>
                <span className="font-medium text-neutral-900">{r.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-neutral-500">No rate tiers listed.</p>
        )}

        {!hideNotes ? (
          <div className="mt-6 border-t border-neutral-200 pt-4">
            <h4 className="text-sm font-semibold text-neutral-900">Notes</h4>
            {bb.isNegotiable ? (
              <p className="mt-2 text-sm text-neutral-700">
                The owner has indicated this placement may be negotiable.
              </p>
            ) : (
              <p className="mt-2 text-sm text-neutral-700">
                Pricing is as shown unless otherwise agreed on-platform.
              </p>
            )}
            {bb.creativeFulfillmentType === CreativeFulfillmentType.DIGITAL_UPLOAD &&
            bb.durationPerDisplay != null ? (
              <p className="mt-2 text-sm text-neutral-600">
                Each loop runs about {bb.durationPerDisplay} seconds on screen.
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 border-t border-neutral-200 pt-4">{actions}</div>
      </div>
    </aside>
  );
}
