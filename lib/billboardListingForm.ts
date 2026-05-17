import type { CreateBillboardListingPayload } from "@endpoint/billboard/billboard";
import type { PublicBillboardListing } from "@endpoint/billboard/billboard";
import { CreativeFulfillmentType } from "@endpoint/billboard/billboardListingEnums";

export const AUDIENCE_TYPES = [
  { value: "commuters", label: "Commuters" },
  { value: "high_income_area", label: "High-income area" },
  { value: "business_district", label: "Business district" },
] as const;

export const ILLUMINATION = [
  { value: "lit", label: "Lit" },
  { value: "unlit", label: "Unlit" },
] as const;

export const FACING_DIRECTION = [
  { value: "inbound_traffic", label: "Inbound traffic" },
  { value: "outbound_traffic", label: "Outbound traffic" },
] as const;

export const USP_PLACEHOLDER =
  "Example: High-visibility face on Lekki–Epe Express (Ajah-bound): 45,000+ vehicles on weekdays, peak dwell at the junction during evening commute, affluent residential and retail catchment within 2 km — brands here are seen during slow traffic, not at a glance.";

export const WEEKDAYS = [
  { bit: 0, label: "Sun" },
  { bit: 1, label: "Mon" },
  { bit: 2, label: "Tue" },
  { bit: 3, label: "Wed" },
  { bit: 4, label: "Thu" },
  { bit: 5, label: "Fri" },
  { bit: 6, label: "Sat" },
] as const;

/** All week active-day bits (Sun–Sat). */
export const ALL_WEEK_ACTIVE_DAYS = [0, 1, 2, 3, 4, 5, 6] as const;

/** Round-the-clock window: same start/end time = 24h daily cycle from 6:00 AM. */
export const SCHEDULE_24_7_START_TIME = "06:00";
export const SCHEDULE_24_7_END_TIME = "06:00";

export function is24_7Schedule(form: {
  startTime: string;
  endTime: string;
  activeDays: number[];
}): boolean {
  if (form.startTime !== SCHEDULE_24_7_START_TIME) return false;
  if (form.endTime !== SCHEDULE_24_7_END_TIME) return false;
  if (form.activeDays.length !== ALL_WEEK_ACTIVE_DAYS.length) return false;
  return ALL_WEEK_ACTIVE_DAYS.every((bit) => form.activeDays.includes(bit));
}

export function apply24_7Schedule(): Pick<
  BillboardListingFormState,
  "startTime" | "endTime" | "activeDays"
> {
  return {
    startTime: SCHEDULE_24_7_START_TIME,
    endTime: SCHEDULE_24_7_END_TIME,
    activeDays: [...ALL_WEEK_ACTIVE_DAYS],
  };
}

export type BillboardScheduleFields = Pick<
  BillboardListingFormState,
  "startTime" | "endTime" | "activeDays"
>;

/** Default when turning off 24/7 and no prior snapshot exists. */
export const DEFAULT_CUSTOM_SCHEDULE: BillboardScheduleFields = {
  startTime: "06:00",
  endTime: "21:00",
  activeDays: [1, 2, 3, 4, 5, 6],
};

export function pickScheduleFields(
  form: BillboardListingFormState,
): BillboardScheduleFields {
  return {
    startTime: form.startTime,
    endTime: form.endTime,
    activeDays: [...form.activeDays],
  };
}

export type BillboardListingFormState = {
  name: string;
  priceDaily: string;
  priceWeekly: string;
  priceMonthly: string;
  priceQuarterly: string;
  priceSemiAnnual: string;
  priceAnnual: string;
  address: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  billboardType: string;
  creativeFulfillmentType: string;
  orientation: string;
  isNegotiable: boolean;
  trafficDescription: string;
  durationPerDisplay: string;
  width: string;
  height: string;
  pixelWidth: string;
  pixelHeight: string;
  startTime: string;
  endTime: string;
  activeDays: number[];
  isAvailable: boolean;
  audienceTypes: string[];
  nearbyLandmarks: string;
  illumination: string;
  facingDirection: string;
};

export const initialBillboardListingForm: BillboardListingFormState = {
  name: "",
  priceDaily: "",
  priceWeekly: "",
  priceMonthly: "",
  priceQuarterly: "",
  priceSemiAnnual: "",
  priceAnnual: "",
  address: "",
  city: "",
  state: "",
  latitude: "",
  longitude: "",
  billboardType: "",
  creativeFulfillmentType: "",
  orientation: "",
  isNegotiable: false,
  trafficDescription: "",
  durationPerDisplay: "",
  width: "",
  height: "",
  pixelWidth: "",
  pixelHeight: "",
  startTime: "06:00",
  endTime: "21:00",
  activeDays: [1, 2, 3, 4, 5, 6],
  isAvailable: true,
  audienceTypes: [],
  nearbyLandmarks: "",
  illumination: "",
  facingDirection: "",
};

export function cloneInitialForm(): BillboardListingFormState {
  return {
    ...initialBillboardListingForm,
    activeDays: [...initialBillboardListingForm.activeDays],
    audienceTypes: [],
  };
}

export function toggleDay(days: number[], bit: number): number[] {
  if (days.includes(bit)) return days.filter((d) => d !== bit);
  return [...days, bit].sort((a, b) => a - b);
}

export function toggleAudience(list: string[], value: string): string[] {
  if (list.includes(value)) return list.filter((v) => v !== value);
  return [...list, value];
}

function optionalNumber(s: string): number | undefined {
  const t = s.trim();
  if (!t) return undefined;
  const n = Number(s);
  return Number.isNaN(n) ? undefined : n;
}

function optionalPositiveInt(s: string): number | undefined {
  if (s.trim() === "") return undefined;
  const n = Number(s);
  if (Number.isNaN(n)) return undefined;
  return Math.round(n);
}

export function buildListingPayload(
  form: BillboardListingFormState,
): CreateBillboardListingPayload {
  const pd = parseFloat(form.priceDaily);
  const pw = parseFloat(form.priceWeekly);
  const pm = parseFloat(form.priceMonthly);
  const pq = parseFloat(form.priceQuarterly);
  const ps = parseFloat(form.priceSemiAnnual);
  const pa = parseFloat(form.priceAnnual);
  return {
    name: form.name.trim(),
    address: form.address.trim(),
    city: form.city.trim(),
    state: form.state.trim(),
    latitude: optionalNumber(form.latitude),
    longitude: optionalNumber(form.longitude),
    pricing: {
      ...(pd > 0 && !Number.isNaN(pd) ? { daily: pd } : {}),
      ...(pw > 0 && !Number.isNaN(pw) ? { weekly: pw } : {}),
      ...(pm > 0 && !Number.isNaN(pm) ? { monthly: pm } : {}),
      ...(pq > 0 && !Number.isNaN(pq) ? { quarterly: pq } : {}),
      ...(ps > 0 && !Number.isNaN(ps) ? { semiAnnual: ps } : {}),
      ...(pa > 0 && !Number.isNaN(pa) ? { annual: pa } : {}),
    },
    billboardType:
      form.billboardType as CreateBillboardListingPayload["billboardType"],
    creativeFulfillmentType:
      form.creativeFulfillmentType as CreateBillboardListingPayload["creativeFulfillmentType"],
    orientation: form.orientation || undefined,
    isNegotiable: form.isNegotiable,
    trafficDescription: form.trafficDescription.trim() || undefined,
    durationPerDisplay: optionalNumber(form.durationPerDisplay),
    width: optionalNumber(form.width),
    height: optionalNumber(form.height),
    pixelWidth: optionalPositiveInt(form.pixelWidth),
    pixelHeight: optionalPositiveInt(form.pixelHeight),
    startTime: form.startTime,
    endTime: form.endTime,
    activeDays: form.activeDays,
    isAvailable: form.isAvailable,
    audienceTypes: form.audienceTypes,
    nearbyLandmarks: form.nearbyLandmarks.trim() || undefined,
    illumination: form.illumination || undefined,
    facingDirection: form.facingDirection || undefined,
  };
}

export function listingToForm(
  bb: PublicBillboardListing,
): BillboardListingFormState {
  return {
    name: bb.name,
    priceDaily:
      bb.pricing.daily != null && bb.pricing.daily > 0
        ? String(bb.pricing.daily)
        : "",
    priceWeekly:
      bb.pricing.weekly != null && bb.pricing.weekly > 0
        ? String(bb.pricing.weekly)
        : "",
    priceMonthly:
      bb.pricing.monthly != null && bb.pricing.monthly > 0
        ? String(bb.pricing.monthly)
        : "",
    priceQuarterly:
      bb.pricing.quarterly != null && bb.pricing.quarterly > 0
        ? String(bb.pricing.quarterly)
        : "",
    priceSemiAnnual:
      bb.pricing.semiAnnual != null && bb.pricing.semiAnnual > 0
        ? String(bb.pricing.semiAnnual)
        : "",
    priceAnnual:
      bb.pricing.annual != null && bb.pricing.annual > 0
        ? String(bb.pricing.annual)
        : "",
    address: bb.address,
    city: bb.city,
    state: bb.state,
    latitude: bb.latitude != null ? String(bb.latitude) : "",
    longitude: bb.longitude != null ? String(bb.longitude) : "",
    billboardType: bb.billboardType,
    creativeFulfillmentType: bb.creativeFulfillmentType,
    orientation: bb.orientation ?? "",
    isNegotiable: bb.isNegotiable,
    trafficDescription: bb.trafficDescription ?? "",
    durationPerDisplay:
      bb.durationPerDisplay != null ? String(bb.durationPerDisplay) : "",
    width: bb.width != null ? String(bb.width) : "",
    height: bb.height != null ? String(bb.height) : "",
    pixelWidth: bb.pixelWidth != null ? String(bb.pixelWidth) : "",
    pixelHeight: bb.pixelHeight != null ? String(bb.pixelHeight) : "",
    startTime: bb.startTime,
    endTime: bb.endTime,
    activeDays: [...bb.activeDays],
    isAvailable: bb.isAvailable,
    audienceTypes: [...bb.audienceTypes],
    nearbyLandmarks: bb.nearbyLandmarks ?? "",
    illumination: bb.illumination ?? "",
    facingDirection: bb.facingDirection ?? "",
  };
}

export function validateBillboardListingForm(
  form: BillboardListingFormState,
  options: { requireImage: boolean; hasImage: boolean },
): { ok: true } | { ok: false; message: string; imageError?: string } {
  if (
    !form.name.trim() ||
    !form.address.trim() ||
    !form.city.trim() ||
    !form.state.trim()
  ) {
    return { ok: false, message: "Fill in name, address, city, and state." };
  }
  if (!form.billboardType) {
    return { ok: false, message: "Select a billboard type." };
  }
  if (!form.creativeFulfillmentType) {
    return {
      ok: false,
      message: "Select how creative is fulfilled (print vs digital upload).",
    };
  }
  const pd = parseFloat(form.priceDaily);
  const pw = parseFloat(form.priceWeekly);
  const pm = parseFloat(form.priceMonthly);
  const pq = parseFloat(form.priceQuarterly);
  const ps = parseFloat(form.priceSemiAnnual);
  const pa = parseFloat(form.priceAnnual);
  const hasPrice =
    (!Number.isNaN(pd) && pd > 0) ||
    (!Number.isNaN(pw) && pw > 0) ||
    (!Number.isNaN(pm) && pm > 0) ||
    (!Number.isNaN(pq) && pq > 0) ||
    (!Number.isNaN(ps) && ps > 0) ||
    (!Number.isNaN(pa) && pa > 0);
  if (!hasPrice) {
    return {
      ok: false,
      message:
        "Enter at least one price: per day, week, month, quarter, half-year, or year.",
    };
  }
  if (options.requireImage && !options.hasImage) {
    const msg = "Upload a hero image.";
    return { ok: false, message: msg, imageError: msg };
  }
  if (form.activeDays.length === 0) {
    return { ok: false, message: "Select at least one active day." };
  }
  if (form.creativeFulfillmentType === CreativeFulfillmentType.PRINT) {
    const w = parseFloat(form.width);
    const h = parseFloat(form.height);
    if (!Number.isFinite(w) || w <= 0 || !Number.isFinite(h) || h <= 0) {
      return {
        ok: false,
        message: "Enter face width and height in metres for print listings.",
      };
    }
  }
  return { ok: true };
}

/** Count how many price tiers are filled (for preview). */
export function countFilledPrices(form: BillboardListingFormState): number {
  return [
    form.priceDaily,
    form.priceWeekly,
    form.priceMonthly,
    form.priceQuarterly,
    form.priceSemiAnnual,
    form.priceAnnual,
  ].filter((p) => {
    const n = parseFloat(p);
    return Number.isFinite(n) && n > 0;
  }).length;
}
