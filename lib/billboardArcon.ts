export const ARCON_APPLICATION_OPTIONS = [
  { id: "1d" as const, label: "Within 1 day", priceNgn: 48_000 },
  { id: "3d" as const, label: "Within 3 days", priceNgn: 32_000 },
  { id: "1w" as const, label: "Within 1 week", priceNgn: 18_000 },
];

export type ArconTurnaroundId = (typeof ARCON_APPLICATION_OPTIONS)[number]["id"];

export function arconFeeForTurnaround(id: ArconTurnaroundId): number {
  const opt = ARCON_APPLICATION_OPTIONS.find((o) => o.id === id);
  return opt?.priceNgn ?? 0;
}

export function arconTurnaroundLabel(
  turnaround: string | null | undefined,
): string {
  const opt = ARCON_APPLICATION_OPTIONS.find((o) => o.id === turnaround);
  return opt?.label ?? (turnaround?.trim() ? turnaround : "—");
}

export type ArconBookingFields = {
  arconHasCertificate?: boolean;
  arconCertificateUrl?: string | null;
  arconApplicationTurnaround?: string | null;
  quotedArconTotal?: number | null;
};

export function bookingInvolvesArcon(b: ArconBookingFields): boolean {
  return Boolean(
    b.arconHasCertificate ||
      b.arconApplicationTurnaround?.trim() ||
      (b.quotedArconTotal ?? 0) > 0,
  );
}

export function isPlatformArconApplicationPending(b: ArconBookingFields): boolean {
  return (
    !b.arconHasCertificate &&
    Boolean(b.arconApplicationTurnaround?.trim()) &&
    !b.arconCertificateUrl?.trim()
  );
}

export function hasArconCertificateFile(b: ArconBookingFields): boolean {
  return Boolean(b.arconCertificateUrl?.trim());
}

export type ArconCertificateAudience = "advertiser" | "vendor" | "admin";

export function isArconBookingPaid(paymentStatus?: string | null): boolean {
  return String(paymentStatus ?? "").toLowerCase() === "paid";
}

export function resolveArconCertificateMessage(
  b: ArconBookingFields,
  audience: ArconCertificateAudience,
  opts?: { isPaid?: boolean },
): { tone: "info" | "warning" | "action"; title: string; body: string } | null {
  if (!bookingInvolvesArcon(b)) return null;

  if (hasArconCertificateFile(b)) return null;

  if (!isPlatformArconApplicationPending(b)) return null;

  const turnaround = arconTurnaroundLabel(b.arconApplicationTurnaround);
  const isPaid = opts?.isPaid ?? false;

  if (audience === "admin") {
    if (!isPaid) {
      return {
        tone: "info",
        title: "ARCON application — awaiting payment",
        body: `The advertiser requested a platform ARCON application (${turnaround}). Upload will be available after they complete payment.`,
      };
    }
    return {
      tone: "action",
      title: "Action required — ARCON certificate",
      body: `The advertiser paid for a platform ARCON application (${turnaround}). Upload the certificate when it is ready.`,
    };
  }

  if (audience === "advertiser") {
    return {
      tone: isPaid ? "info" : "warning",
      title: isPaid ? "ARCON application in progress" : "ARCON application — payment pending",
      body: isPaid
        ? `We are processing your ARCON certificate request (${turnaround}). You will see the certificate here once it is ready.`
        : `You requested a platform ARCON certificate (${turnaround}). Complete payment for this booking; we will process your certificate and display it here when it is ready.`,
    };
  }

  if (audience === "vendor") {
    if (!opts?.isPaid) return null;
    return {
      tone: "warning",
      title: "ARCON certificate pending",
      body:
        "The advertiser has paid and booked this placement. ARCON certification is still being processed — prepare your campaign materials, but wait until the certificate is available before going live.",
    };
  }

  return null;
}
