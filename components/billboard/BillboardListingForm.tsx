"use client";

import FilesInput from "@components/inputs/FilesInput";
import {
  BILLBOARD_TYPE_SELECT_OPTIONS,
  CREATIVE_FULFILLMENT_SELECT_OPTIONS,
  CreativeFulfillmentType,
} from "@endpoint/billboard/billboardListingEnums";
import {
  AUDIENCE_TYPES,
  FACING_DIRECTION,
  ILLUMINATION,
  USP_PLACEHOLDER,
  WEEKDAYS,
  apply24_7Schedule,
  countFilledPrices,
  DEFAULT_CUSTOM_SCHEDULE,
  is24_7Schedule,
  pickScheduleFields,
  type BillboardScheduleFields,
  toggleAudience,
  toggleDay,
} from "@lib/billboardListingForm";
import { useCallback, useRef, useState, type ReactNode } from "react";
import {
  cloneInitialForm,
  type BillboardListingFormState,
} from "@lib/billboardListingForm";

const fieldClass =
  "w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200/70";

const labelClass = "text-sm font-medium text-stone-800";
const hintClass = "mt-1 text-xs leading-relaxed text-stone-500";

function FormSection({
  title,
  description,
  children,
  step,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  step: string;
}) {
  return (
    <section className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-start gap-3 border-b border-stone-100 pb-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-950">
          {step}
        </span>
        <div>
          <h2 className="font-serif text-lg font-medium text-stone-900">
            {title}
          </h2>
          {description ? (
            <p className={`${hintClass} mt-0.5`}>{description}</p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function ChipToggle({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "border-stone-900 bg-stone-900 text-white shadow-sm"
          : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50"
      }`}
    >
      {label}
    </button>
  );
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-xl border border-stone-200 bg-[#FAFAF8] p-3 transition hover:border-amber-200/80"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-stone-900">
          {label}
        </span>
        {description ? (
          <span className="mt-0.5 block text-xs text-stone-500">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export type BillboardListingFormProps = {
  mode: "create" | "edit";
  form: BillboardListingFormState;
  setForm: React.Dispatch<React.SetStateAction<BillboardListingFormState>>;
  setField: <K extends keyof BillboardListingFormState>(
    key: K,
  ) => (
    v:
      | BillboardListingFormState[K]
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
  ) => void;
  imagePreviewUrl: string | null;
  imagePreviewName: string;
  imageError: string;
  onImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    accept: string,
  ) => void;
  validationError: string;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  imageRequired?: boolean;
};

export function BillboardListingForm({
  mode,
  form,
  setForm,
  setField,
  imagePreviewUrl,
  imagePreviewName,
  imageError,
  onImageChange,
  validationError,
  isSubmitting,
  onSubmit,
  submitLabel,
  imageRequired = mode === "create",
}: BillboardListingFormProps) {
  const priceCount = countFilledPrices(form);
  const isPrint = form.creativeFulfillmentType === CreativeFulfillmentType.PRINT;
  const isDigital =
    form.creativeFulfillmentType === CreativeFulfillmentType.DIGITAL_UPLOAD;
  const is24_7 = is24_7Schedule(form);
  const scheduleBefore24_7 = useRef<BillboardScheduleFields | null>(null);

  const handle24_7Toggle = (checked: boolean) => {
    if (checked) {
      if (!is24_7Schedule(form)) {
        scheduleBefore24_7.current = pickScheduleFields(form);
      }
      setForm((f) => ({ ...f, ...apply24_7Schedule() }));
      return;
    }
    const restore =
      scheduleBefore24_7.current ?? DEFAULT_CUSTOM_SCHEDULE;
    scheduleBefore24_7.current = null;
    setForm((f) => ({
      ...f,
      startTime: restore.startTime,
      endTime: restore.endTime,
      activeDays: [...restore.activeDays],
    }));
  };

  return (
    <form onSubmit={onSubmit} className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-start lg:gap-6">
      <div className="space-y-5">
        <FormSection
          step="1"
          title="Basics"
          description="Name your listing and define how campaigns run on this face."
        >
          <div className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="listing-name">
                Billboard name
              </label>
              <input
                id="listing-name"
                name="name"
                required
                value={form.name}
                onChange={setField("name")}
                className={`${fieldClass} mt-1.5`}
                placeholder="e.g. Lekki–Epe Express, Ajah-bound"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="billboard-type">
                  Billboard type
                </label>
                <select
                  id="billboard-type"
                  name="billboardType"
                  required
                  value={form.billboardType}
                  onChange={setField("billboardType")}
                  className={`${fieldClass} mt-1.5`}
                >
                  <option value="">Select type</option>
                  {BILLBOARD_TYPE_SELECT_OPTIONS.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="creative-fulfillment">
                  Creative fulfillment
                </label>
                <select
                  id="creative-fulfillment"
                  name="creativeFulfillmentType"
                  required
                  value={form.creativeFulfillmentType}
                  onChange={setField("creativeFulfillmentType")}
                  className={`${fieldClass} mt-1.5`}
                >
                  <option value="">Select fulfillment</option>
                  {CREATIVE_FULFILLMENT_SELECT_OPTIONS.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <p className={hintClass}>
                  Placement type and print vs digital are independent.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="orientation">
                  Orientation
                </label>
                <select
                  id="orientation"
                  name="orientation"
                  value={form.orientation}
                  onChange={setField("orientation")}
                  className={`${fieldClass} mt-1.5`}
                >
                  <option value="">Select</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ToggleRow
                id="isNegotiable"
                label="Negotiable pricing"
                description="Advertisers can counter-offer on this listing."
                checked={form.isNegotiable}
                onChange={(v) =>
                  setForm((f) => ({ ...f, isNegotiable: v }))
                }
              />
              <ToggleRow
                id="isAvailable"
                label="Open for booking"
                description="Turn off to hide from new campaigns temporarily."
                checked={form.isAvailable}
                onChange={(v) => setForm((f) => ({ ...f, isAvailable: v }))}
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          step="2"
          title="Location"
          description="Where the face is — helps advertisers plan logistics and targeting."
        >
          <div className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="address">
                Street address
              </label>
              <input
                id="address"
                name="address"
                required
                value={form.address}
                onChange={setField("address")}
                className={`${fieldClass} mt-1.5`}
                placeholder="Full street address"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  required
                  value={form.city}
                  onChange={setField("city")}
                  className={`${fieldClass} mt-1.5`}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="state">
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  required
                  value={form.state}
                  onChange={setField("state")}
                  className={`${fieldClass} mt-1.5`}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="latitude">
                  Latitude <span className="font-normal text-stone-500">(optional)</span>
                </label>
                <input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  value={form.latitude}
                  onChange={setField("latitude")}
                  className={`${fieldClass} mt-1.5`}
                  placeholder="6.4281"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="longitude">
                  Longitude <span className="font-normal text-stone-500">(optional)</span>
                </label>
                <input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  value={form.longitude}
                  onChange={setField("longitude")}
                  className={`${fieldClass} mt-1.5`}
                  placeholder="3.4219"
                />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="landmarks">
                Nearby landmarks
              </label>
              <input
                id="landmarks"
                name="nearbyLandmarks"
                value={form.nearbyLandmarks}
                onChange={setField("nearbyLandmarks")}
                className={`${fieldClass} mt-1.5`}
                placeholder="e.g. Near Eko Hotel, opposite Shoprite"
              />
            </div>
          </div>
        </FormSection>

        <FormSection
          step="3"
          title="Pricing"
          description="Add one or more tiers. Advertisers compare day, week, month, and longer runs."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {(
              [
                ["priceDaily", "Per day"],
                ["priceWeekly", "Per week"],
                ["priceMonthly", "Per month"],
                ["priceQuarterly", "Quarterly (~3 mo)"],
                ["priceSemiAnnual", "Half-year (~6 mo)"],
                ["priceAnnual", "Annual (12 mo)"],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className="text-xs font-medium text-stone-600">
                  {label}
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone-400">
                    ₦
                  </span>
                  <input
                    name={key}
                    type="number"
                    min={0}
                    step="0.01"
                    value={form[key]}
                    onChange={setField(key)}
                    className={`${fieldClass} pl-8`}
                    placeholder="—"
                  />
                </div>
              </div>
            ))}
          </div>
          <p className={`${hintClass} mt-3`}>
            {priceCount === 0
              ? "At least one tier is required."
              : `${priceCount} tier${priceCount === 1 ? "" : "s"} set`}
          </p>
        </FormSection>

        {(isPrint || isDigital) && (
          <FormSection
            step="4"
            title="Creative specifications"
            description={
              isPrint
                ? "Physical face dimensions for print production."
                : "Resolution and slot length for uploaded digital files."
            }
          >
            {isPrint ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Width (metres)</label>
                  <input
                    name="width"
                    type="number"
                    min={0}
                    step="any"
                    required
                    value={form.width}
                    onChange={setField("width")}
                    className={`${fieldClass} mt-1.5`}
                    placeholder="e.g. 12"
                  />
                </div>
                <div>
                  <label className={labelClass}>Height (metres)</label>
                  <input
                    name="height"
                    type="number"
                    min={0}
                    step="any"
                    required
                    value={form.height}
                    onChange={setField("height")}
                    className={`${fieldClass} mt-1.5`}
                    placeholder="e.g. 4"
                  />
                </div>
              </div>
            ) : null}
            {isDigital ? (
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Duration per display (seconds)</label>
                  <input
                    name="durationPerDisplay"
                    type="number"
                    min={0}
                    value={form.durationPerDisplay}
                    onChange={setField("durationPerDisplay")}
                    className={`${fieldClass} mt-1.5 max-w-xs`}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Pixel width</label>
                    <input
                      name="pixelWidth"
                      type="number"
                      min={0}
                      value={form.pixelWidth}
                      onChange={setField("pixelWidth")}
                      className={`${fieldClass} mt-1.5`}
                      placeholder="1920"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Pixel height</label>
                    <input
                      name="pixelHeight"
                      type="number"
                      min={0}
                      value={form.pixelHeight}
                      onChange={setField("pixelHeight")}
                      className={`${fieldClass} mt-1.5`}
                      placeholder="1080"
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </FormSection>
        )}

        <FormSection
          step={isPrint || isDigital ? "5" : "4"}
          title="Schedule"
          description="When this face is active for campaigns each week."
        >
          <ToggleRow
            id="schedule-24-7"
            label="24/7 operation"
            description="All days · 6:00 AM to 6:00 AM (round the clock, every day)."
            checked={is24_7}
            onChange={handle24_7Toggle}
          />
          <div
            className={`mt-4 space-y-4 ${is24_7 ? "pointer-events-none opacity-60" : ""}`}
            aria-disabled={is24_7}
          >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="startTime">
                Display from
              </label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                value={form.startTime}
                onChange={setField("startTime")}
                className={`${fieldClass} mt-1.5`}
                disabled={is24_7}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="endTime">
                Display until
              </label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                value={form.endTime}
                onChange={setField("endTime")}
                className={`${fieldClass} mt-1.5`}
                disabled={is24_7}
              />
            </div>
          </div>
          {is24_7 ? (
            <p className="text-xs font-medium text-amber-900/90">
              Showing 6:00 AM → 6:00 AM daily on Sun–Sat. Turn off 24/7 above to
              customize.
            </p>
          ) : null}
          <div>
            <p className={labelClass}>Active days</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {WEEKDAYS.map(({ bit, label }) => (
                <ChipToggle
                  key={bit}
                  label={label}
                  active={form.activeDays.includes(bit)}
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      activeDays: toggleDay(f.activeDays, bit),
                    }))
                  }
                />
              ))}
            </div>
            {!is24_7 ? (
              <p className={hintClass}>At least one day required.</p>
            ) : null}
          </div>
          </div>
        </FormSection>

        <FormSection
          step={isPrint || isDigital ? "6" : "5"}
          title="Audience & positioning"
          description="Help advertisers understand who sees the board and how it performs."
        >
          <div className="space-y-4">
            <div>
              <p className={labelClass}>Audience type</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {AUDIENCE_TYPES.map((a) => (
                  <ChipToggle
                    key={a.value}
                    label={a.label}
                    active={form.audienceTypes.includes(a.value)}
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        audienceTypes: toggleAudience(
                          f.audienceTypes,
                          a.value,
                        ),
                      }))
                    }
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="illumination">
                  Illumination
                </label>
                <select
                  id="illumination"
                  name="illumination"
                  value={form.illumination}
                  onChange={setField("illumination")}
                  className={`${fieldClass} mt-1.5`}
                >
                  <option value="">Select</option>
                  {ILLUMINATION.map((i) => (
                    <option key={i.value} value={i.value}>
                      {i.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="facingDirection">
                  Facing direction
                </label>
                <select
                  id="facingDirection"
                  name="facingDirection"
                  value={form.facingDirection}
                  onChange={setField("facingDirection")}
                  className={`${fieldClass} mt-1.5`}
                >
                  <option value="">Select</option>
                  {FACING_DIRECTION.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="usp">
                Unique selling point (USP)
              </label>
              <p className={hintClass}>
                Traffic quality, visibility, and why brands should book this site.
              </p>
              <textarea
                id="usp"
                name="trafficDescription"
                rows={5}
                value={form.trafficDescription}
                onChange={setField("trafficDescription")}
                placeholder={USP_PLACEHOLDER}
                className={`${fieldClass} mt-2 resize-y`}
              />
            </div>
          </div>
        </FormSection>
      </div>

      <aside className="mt-6 space-y-4 lg:mt-0 lg:sticky lg:top-6">
        <div className="overflow-hidden rounded-2xl border-2 border-amber-200/80 bg-white shadow-sm">
          <div className="border-b border-stone-100 bg-[#FAFAF8] px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-500">
              Live preview
            </p>
            <p className="mt-0.5 truncate font-serif text-lg text-stone-900">
              {form.name.trim() || "Untitled billboard"}
            </p>
            {(form.city || form.state) && (
              <p className="text-xs text-stone-500">
                {[form.city, form.state].filter(Boolean).join(", ")}
              </p>
            )}
          </div>
          <div className="flex min-h-[220px] items-center justify-center bg-stone-100/80 p-3">
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Billboard preview"
                className="max-h-[min(360px,50vh)] w-full rounded-lg object-contain shadow-md"
              />
            ) : (
              <div className="px-4 text-center">
                <p className="text-sm font-medium text-stone-600">
                  No hero image yet
                </p>
                <p className="mt-1 text-xs text-stone-500">
                  {imageRequired
                    ? "Upload a photo to show advertisers your face."
                    : "Upload a new image to replace the current one."}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm font-medium text-stone-900">Hero image</p>
          <p className={`${hintClass} mb-3`}>
            {mode === "create"
              ? "Required — JPG or PNG recommended."
              : "Optional — only upload if replacing the current photo."}
          </p>
          <FilesInput
            previewName={imagePreviewName}
            accept="image"
            handleChange={onImageChange}
            warning={imageError || " "}
          />
        </div>

        {validationError ? (
          <p
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            {validationError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-stone-900 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-800 disabled:pointer-events-none disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : submitLabel}
        </button>
      </aside>
    </form>
  );
}

export function useBillboardListingFormControls(
  initial?: BillboardListingFormState,
) {
  const [form, setForm] = useState<BillboardListingFormState>(
    () => initial ?? cloneInitialForm(),
  );

  const setField = useCallback(
    <K extends keyof BillboardListingFormState>(key: K) =>
      (
        v:
          | BillboardListingFormState[K]
          | React.ChangeEvent<
              HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >,
      ) => {
        if (v && typeof v === "object" && "target" in v) {
          const t = v.target;
          const val =
            t.type === "checkbox"
              ? (t as HTMLInputElement).checked
              : t.value;
          setForm((f) => ({ ...f, [key]: val }));
        } else {
          setForm((f) => ({ ...f, [key]: v as BillboardListingFormState[K] }));
        }
      },
    [],
  );

  return { form, setForm, setField };
}

export function BillboardListingFormPageShell({
  title,
  subtitle,
  backLink,
  children,
}: {
  title: string;
  subtitle: string;
  backLink?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="min-h-screen bg-[#E9E9E9] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-medium tracking-tight text-stone-900 md:text-3xl">
              {title}
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm text-stone-600">
              {subtitle}
            </p>
          </div>
          {backLink}
        </header>
        {children}
      </div>
    </section>
  );
}
