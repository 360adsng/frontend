import type { PublicBillboardListing } from "@endpoint/billboard/billboard";

export const BOARD_LABEL: Record<string, string> = {
  digital: "Digital",
  led: "LED",
  unipole: "Unipole",
  billboard_bridge: "Billboard bridge",
};

export function formatNaira(n: number): string {
  return new Intl.NumberFormat("en-NG").format(n);
}

export function primaryPrice(
  pricing: PublicBillboardListing["pricing"],
): string {
  if (pricing.daily != null && pricing.daily > 0)
    return formatNaira(pricing.daily);
  if (pricing.weekly != null && pricing.weekly > 0)
    return `${formatNaira(pricing.weekly)}/wk`;
  if (pricing.monthly != null && pricing.monthly > 0)
    return `${formatNaira(pricing.monthly)}/mo`;
  return "—";
}

export function formatRuntime(b: PublicBillboardListing): string {
  const days = b.activeDays?.length ?? 0;
  const dayLabel =
    days === 0 ? "—" : days === 7 ? "7 days/week" : `${days} days/week`;
  return `${b.startTime}–${b.endTime} · ${dayLabel}`;
}

export function boardTypeLabel(slug: string): string {
  return BOARD_LABEL[slug] ?? slug.replace(/_/g, " ");
}

const DAY_BIT_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** Active day bits 0–6 (Sun–Sat), same as add-billboard form. */
export function formatActiveDaysSummary(days: number[]): string {
  if (!days?.length) return "—";
  return [...days]
    .sort((a, b) => a - b)
    .map((d) => DAY_BIT_LABELS[d] ?? String(d))
    .join(", ");
}

export function formatListingDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function googleMapsSearchUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
