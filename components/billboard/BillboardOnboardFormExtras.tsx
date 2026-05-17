import { useMemo } from "react";
import type { PublicBillboardListing } from "@endpoint/billboard/billboard";
import { CreativeFulfillmentType } from "@endpoint/billboard/billboardListingEnums";
import { formatNaira } from "@lib/billboardDisplay";
import {
  ARCON_APPLICATION_OPTIONS,
  type ArconTurnaroundId,
} from "@lib/billboardArcon";
import type { ArconChoice } from "@components/billboard/ArconCreativeModal";

type Props = {
  listing: PublicBillboardListing | undefined;
  listingLoading?: boolean;
  arconChoice: ArconChoice | null;
  certificateFile: File | null;
  onCertificateChange: (file: File | null) => void;
  turnaround: ArconTurnaroundId | null;
  onTurnaroundChange: (id: ArconTurnaroundId) => void;
};

export function BillboardOnboardFormExtras({
  listing,
  listingLoading,
  arconChoice,
  certificateFile,
  onCertificateChange,
  turnaround,
  onTurnaroundChange,
}: Props) {
  const isPrint =
    listing?.creativeFulfillmentType === CreativeFulfillmentType.PRINT;

  const printEstimate = useMemo(() => {
    const w = listing?.width;
    const h = listing?.height;
    const ppm = listing?.printingPricePerSqMeter;
    if (
      w == null ||
      h == null ||
      w <= 0 ||
      h <= 0 ||
      ppm == null ||
      !Number.isFinite(ppm) ||
      ppm <= 0
    ) {
      return null;
    }
    const areaSqm = w * h;
    return {
      widthM: w,
      heightM: h,
      areaSqm,
      pricePerSqm: ppm,
      totalNgn: areaSqm * ppm,
    };
  }, [listing?.width, listing?.height, listing?.printingPricePerSqMeter]);

  if (!arconChoice) return null;

  return (
    <div className="mt-5 space-y-5">
      {isPrint ? (
        <section className="rounded-xl border border-neutral-200 bg-white p-4">
          <h4 className="font-bold text-neutral-900">Print material</h4>
          <p className="mt-1 text-xs text-neutral-500">
            Estimated vinyl / print cost for this face (paid to the billboard
            owner).
          </p>

          {listingLoading ? (
            <p className="mt-3 text-sm text-neutral-500">Loading listing...</p>
          ) : null}

          {printEstimate ? (
            <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-sm text-neutral-800">
              <p className="font-semibold text-amber-900">
                Printable placement — estimated print material
              </p>
              <ul className="mt-2 space-y-1 text-neutral-700">
                <li>
                  Price per m2 (vendor):{" "}
                  <span className="font-semibold">
                    {formatNaira(printEstimate.pricePerSqm)}
                  </span>
                </li>
                <li>
                  Face size:{" "}
                  <span className="font-semibold">
                    {printEstimate.widthM} m x {printEstimate.heightM} m
                  </span>
                </li>
                <li>
                  Area:{" "}
                  <span className="font-semibold">
                    {printEstimate.areaSqm.toFixed(2)} m2
                  </span>
                </li>
                <li className="pt-1 text-base font-semibold text-neutral-900">
                  Print subtotal:{" "}
                  {formatNaira(Math.round(printEstimate.totalNgn))}
                </li>
              </ul>
              <p className="mt-2 text-xs text-neutral-600">
                Print cost is paid to the billboard owner and is not negotiable.
              </p>
            </div>
          ) : null}

          {!printEstimate && listing && !listingLoading ? (
            <p className="mt-3 rounded-lg bg-neutral-100 p-2 text-xs text-amber-900">
              {[
                !listing.width || listing.width <= 0 ? "face width" : null,
                !listing.height || listing.height <= 0 ? "face height" : null,
                !listing.printingPricePerSqMeter ||
                listing.printingPricePerSqMeter <= 0
                  ? "vendor print price per m2"
                  : null,
              ]
                .filter(Boolean)
                .join(", ")}{" "}
              could not be loaded. Refresh the page or contact support if this
              listing was created correctly.
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="rounded-xl border border-neutral-200 bg-white p-4">
        <h4 className="font-bold text-neutral-900">ARCON</h4>
        <p className="mt-1 text-xs text-neutral-500">
          Creative compliance for out-of-home advertising in Nigeria.
        </p>

        {arconChoice === "yes" ? (
          <div className="mt-3 space-y-2">
            <label className="block text-sm font-medium text-neutral-800">
              Upload ARCON certificate (PDF or image)
            </label>
            <input
              type="file"
              accept=".pdf,application/pdf,image/png,image/jpeg,image/webp"
              className="block w-full text-sm text-neutral-700 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
              onChange={(e) => {
                onCertificateChange(e.target.files?.[0] ?? null);
              }}
            />
            {certificateFile ? (
              <p className="text-xs text-neutral-600">
                Selected: {certificateFile.name}
              </p>
            ) : null}
          </div>
        ) : null}

        {arconChoice === "no" ? (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium text-neutral-800">
              ARCON application — choose turnaround
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {ARCON_APPLICATION_OPTIONS.map((opt) => {
                const selected = turnaround === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onTurnaroundChange(opt.id)}
                    className={`rounded-xl border p-3 text-left text-sm transition ${
                      selected
                        ? "border-amber-600 bg-amber-50 ring-2 ring-amber-400"
                        : "border-neutral-200 bg-white hover:border-amber-300"
                    }`}
                  >
                    <div className="font-semibold text-neutral-900">
                      {opt.label}
                    </div>
                    <div className="mt-1 text-base font-bold text-amber-900">
                      {formatNaira(opt.priceNgn)}
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-neutral-500">
              ARCON fee is paid to the platform and is not negotiable.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
