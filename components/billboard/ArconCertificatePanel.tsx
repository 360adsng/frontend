import { useState } from "react";
import { SectionLabel } from "@components/campaign/CampaignDetailShared";
import { ClickableCampaignImage } from "@components/campaign/ClickableCampaignImage";
import {
  type ArconBookingFields,
  type ArconCertificateAudience,
  arconTurnaroundLabel,
  bookingInvolvesArcon,
  hasArconCertificateFile,
  isArconBookingPaid,
  isPlatformArconApplicationPending,
  resolveArconCertificateMessage,
} from "@lib/billboardArcon";

const fileInputClass =
  "block w-full text-sm text-neutral-700 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white";

type Props = {
  booking: ArconBookingFields & { paymentStatus?: string };
  audience: ArconCertificateAudience;
  onAdminUpload?: (file: File) => Promise<void>;
  adminUploadPending?: boolean;
  className?: string;
};

const toneStyles = {
  info: "border-sky-200 bg-sky-50 text-sky-950",
  warning: "border-amber-200 bg-amber-50 text-amber-950",
  action: "border-orange-300 bg-orange-50 text-orange-950",
} as const;

export function ArconCertificatePanel({
  booking,
  audience,
  onAdminUpload,
  adminUploadPending,
  className = "",
}: Props) {
  const [certFile, setCertFile] = useState<File | null>(null);

  if (!bookingInvolvesArcon(booking)) return null;

  const isPaid = isArconBookingPaid(booking.paymentStatus);

  const message = resolveArconCertificateMessage(booking, audience, {
    isPaid,
  });
  const certUrl = booking.arconCertificateUrl?.trim();
  const showAdminUpload =
    audience === "admin" &&
    isPaid &&
    isPlatformArconApplicationPending(booking) &&
    typeof onAdminUpload === "function";

  return (
    <div className={`px-5 pb-6 sm:px-7 ${className}`.trim()}>
      <div className="rounded-2xl border border-stone-200/80 bg-[#F7F7F5] p-5">
        <SectionLabel>ARCON certificate</SectionLabel>

        {booking.arconHasCertificate && !certUrl ? (
          <p className="mt-2 text-sm text-stone-600">
            Advertiser indicated they have a certificate; file not available on
            this record.
          </p>
        ) : null}

        {!booking.arconHasCertificate &&
        booking.arconApplicationTurnaround?.trim() ? (
          <p className="mt-1 text-xs text-stone-500">
            Platform application ·{" "}
            {arconTurnaroundLabel(booking.arconApplicationTurnaround)}
          </p>
        ) : null}

        {message ? (
          <div
            className={`mt-4 rounded-xl border px-4 py-3 ${toneStyles[message.tone]}`}
            role="status"
          >
            <p className="text-sm font-semibold">{message.title}</p>
            <p className="mt-1 text-sm leading-relaxed opacity-90">
              {message.body}
            </p>
          </div>
        ) : null}

        {hasArconCertificateFile(booking) && certUrl ? (
          <div className="mt-4 max-w-sm">
            <ClickableCampaignImage
              title="Certificate document"
              src={certUrl}
              alt="ARCON certificate"
              emptyMessage="No certificate file"
              maxHeightClass="max-h-40"
            />
          </div>
        ) : null}

        {showAdminUpload ? (
          <div className="mt-4 space-y-3 border-t border-stone-200 pt-4">
            <label className="block text-sm font-medium text-stone-800">
              Upload certificate (PNG, JPG, or WebP)
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className={fileInputClass}
              onChange={(e) => setCertFile(e.target.files?.[0] ?? null)}
            />
            {certFile ? (
              <p className="text-xs text-stone-600">Selected: {certFile.name}</p>
            ) : null}
            <button
              type="button"
              disabled={!certFile || adminUploadPending}
              onClick={() => {
                if (!certFile || !onAdminUpload) return;
                void onAdminUpload(certFile);
              }}
              className="rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white disabled:bg-stone-300"
            >
              {adminUploadPending ? "Uploading…" : "Save certificate"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

