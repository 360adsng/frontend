import type { ReactNode } from "react";
import type { PublicBillboardListing } from "@endpoint/billboard/billboard";
import {
  boardTypeLabel,
  formatActiveDaysSummary,
  formatListingDate,
  formatNaira,
  formatRuntime,
  googleMapsSearchUrl,
  primaryPrice,
} from "@lib/billboardDisplay";

const locationIcon = "/icons/location.svg";

type MainProps = { bb: PublicBillboardListing };

export function BillboardDetailMainColumn({ bb }: MainProps) {
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

  return (
    <div className="md:w-4/5 space-y-4">
      <h3 className="flex items-center gap-2 font-bold text-lg">
        <img alt="" src={locationIcon} className="h-5 w-5 shrink-0" />
        {bb.name}
      </h3>

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

      <div>
        <h4 className="text-sm font-semibold text-neutral-600">Board type</h4>
        <p className="mt-0.5">{boardTypeLabel(bb.boardType)}</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-neutral-600">Location</h4>
        <p className="mt-0.5">{bb.address}</p>
        <p className="text-neutral-700">
          {bb.city}, {bb.state}
        </p>
        {hasCoords ? (
          <a
            href={googleMapsSearchUrl(bb.latitude!, bb.longitude!)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-sm text-ads360yellowBtn-100 underline"
          >
            Open in Google Maps
          </a>
        ) : null}
      </div>

      {bb.nearbyLandmarks ? (
        <div>
          <h4 className="text-sm font-semibold text-neutral-600">Nearby</h4>
          <p className="mt-0.5">{bb.nearbyLandmarks}</p>
        </div>
      ) : null}

      {bb.trafficDescription ? (
        <div>
          <h4 className="text-sm font-semibold text-neutral-600">Traffic</h4>
          <p className="mt-0.5">{bb.trafficDescription}</p>
        </div>
      ) : null}

      {sizeLine ? (
        <div>
          <h4 className="text-sm font-semibold text-neutral-600">
            Physical size
          </h4>
          <p className="mt-0.5">{sizeLine}</p>
        </div>
      ) : null}

      {pixelLine ? (
        <div>
          <h4 className="text-sm font-semibold text-neutral-600">Pixel size</h4>
          <p className="mt-0.5">{pixelLine}</p>
        </div>
      ) : null}

      {bb.orientation ? (
        <div>
          <h4 className="text-sm font-semibold text-neutral-600">Orientation</h4>
          <p className="mt-0.5">{bb.orientation}</p>
        </div>
      ) : null}

      {bb.illumination ? (
        <div>
          <h4 className="text-sm font-semibold text-neutral-600">Illumination</h4>
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
        <h4 className="text-sm font-semibold text-neutral-600">Schedule</h4>
        <p className="mt-0.5">{formatRuntime(bb)}</p>
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

      {bb.durationPerDisplay != null ? (
        <div>
          <h4 className="text-sm font-semibold text-neutral-600">
            Spot duration
          </h4>
          <p className="mt-0.5">
            About {bb.durationPerDisplay} seconds per display rotation
          </p>
        </div>
      ) : null}

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
};

export function BillboardDetailPricingColumn({ bb, actions }: PricingProps) {
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

  return (
    <div className="md:px-3 basis-1/3">
      <h4 className="my-3 font-semibold">Price</h4>
      <p className="mt-1 text-lg font-medium text-ads360black-100">
        From ₦{primaryPrice(bb.pricing)}
        {p.daily != null && p.daily > 0 ? (
          <span className="text-sm font-normal text-neutral-600"> / day</span>
        ) : null}
      </p>

      {rows.length > 0 ? (
        <ul className="mt-4 space-y-2 border-t border-neutral-200 pt-4 text-sm">
          {rows.map((r) => (
            <li key={r.label} className="flex justify-between gap-3">
              <span className="text-neutral-600">{r.label}</span>
              <span className="font-medium">{r.value}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-neutral-500">No rate tiers listed.</p>
      )}

      <div className="mt-6 border-t border-neutral-200 pt-4">
        <h4 className="font-semibold text-neutral-800">Notes</h4>
        {bb.isNegotiable ? (
          <p className="mt-2 text-sm text-neutral-700">
            The owner has indicated this placement may be negotiable.
          </p>
        ) : (
          <p className="mt-2 text-sm text-neutral-700">
            Pricing is as shown unless otherwise agreed on-platform.
          </p>
        )}
        {bb.durationPerDisplay != null ? (
          <p className="mt-2 text-sm text-neutral-600">
            Each loop runs about {bb.durationPerDisplay} seconds on screen.
          </p>
        ) : null}
      </div>

      <div className="mt-6">{actions}</div>
    </div>
  );
}
