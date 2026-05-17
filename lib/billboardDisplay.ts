import type { PublicBillboardListing } from "@endpoint/billboard/billboard";
import { is24_7Schedule } from "@lib/billboardListingForm";
import {
  BillboardType,
  CreativeFulfillmentType,
} from "@endpoint/billboard/billboardListingEnums";

const BILLBOARD_TYPE_LABEL: Record<BillboardType, string> = {
  [BillboardType.STATIC]: "Static",
  [BillboardType.DIGITAL_SCREEN]: "Digital screen",
  [BillboardType.MOBILE_TRUCK]: "Mobile truck",
  [BillboardType.WALL_BRANDING]: "Wall branding",
  [BillboardType.LAMP_POST]: "Lamp post",
};

const CREATIVE_FULFILLMENT_LABEL: Record<CreativeFulfillmentType, string> = {
  [CreativeFulfillmentType.PRINT]: "Print / install",
  [CreativeFulfillmentType.DIGITAL_UPLOAD]: "Digital upload",
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
  if (pricing.quarterly != null && pricing.quarterly > 0)
    return `${formatNaira(pricing.quarterly)}/qtr`;
  if (pricing.semiAnnual != null && pricing.semiAnnual > 0)
    return `${formatNaira(pricing.semiAnnual)}/6 mo`;
  if (pricing.annual != null && pricing.annual > 0)
    return `${formatNaira(pricing.annual)}/yr`;
  return "—";
}

/** Amount + period label for detail hero (same tier priority as {@link primaryPrice}). */
export function primaryPriceHero(
  pricing: PublicBillboardListing["pricing"],
): { amount: string; periodLabel: string } | null {
  if (pricing.daily != null && pricing.daily > 0) {
    return { amount: formatNaira(pricing.daily), periodLabel: "per day" };
  }
  if (pricing.weekly != null && pricing.weekly > 0) {
    return { amount: formatNaira(pricing.weekly), periodLabel: "per week" };
  }
  if (pricing.monthly != null && pricing.monthly > 0) {
    return { amount: formatNaira(pricing.monthly), periodLabel: "per month" };
  }
  if (pricing.quarterly != null && pricing.quarterly > 0) {
    return {
      amount: formatNaira(pricing.quarterly),
      periodLabel: "per quarter (~3 mo)",
    };
  }
  if (pricing.semiAnnual != null && pricing.semiAnnual > 0) {
    return {
      amount: formatNaira(pricing.semiAnnual),
      periodLabel: "per half-year (~6 mo)",
    };
  }
  if (pricing.annual != null && pricing.annual > 0) {
    return {
      amount: formatNaira(pricing.annual),
      periodLabel: "per year (~12 mo)",
    };
  }
  return null;
}

export function formatRuntime(b: PublicBillboardListing): string {
  if (is24_7Schedule(b)) {
    return "24/7 · All days · 6:00 AM–6:00 AM";
  }
  const days = b.activeDays?.length ?? 0;
  const dayLabel =
    days === 0 ? "—" : days === 7 ? "7 days/week" : `${days} days/week`;
  return `${b.startTime}–${b.endTime} · ${dayLabel}`;
}

export function billboardTypeLabel(value: string): string {
  return BILLBOARD_TYPE_LABEL[value as BillboardType] ?? value.replace(/_/g, " ");
}

export function creativeFulfillmentLabel(value: string): string {
  return (
    CREATIVE_FULFILLMENT_LABEL[value as CreativeFulfillmentType] ??
    value.replace(/_/g, " ")
  );
}

export function listingTypeSummary(bb: PublicBillboardListing): string {
  return `${billboardTypeLabel(bb.billboardType)} · ${creativeFulfillmentLabel(bb.creativeFulfillmentType)}`;
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
