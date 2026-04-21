import FilesInput from "@components/inputs/FilesInput";
import { Modal } from "@components/modal/modal";
import type { CreateBillboardListingPayload } from "@endpoint/billboard/billboard";
import { useCreateBillboardListing } from "@endpoint/billboard/useBillboard";
import { useEffect, useState } from "react";
import { useNavigate, createFileRoute } from "@tanstack/react-router";

/** Matches intended API / listing schema */
export const BOARD_TYPES = [
  { value: "digital", label: "Digital" },
  { value: "led", label: "LED" },
  { value: "unipole", label: "Unipole" },
  { value: "billboard_bridge", label: "Billboard bridge" },
] as const;

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

const WEEKDAYS = [
  { bit: 0, label: "Sun" },
  { bit: 1, label: "Mon" },
  { bit: 2, label: "Tue" },
  { bit: 3, label: "Wed" },
  { bit: 4, label: "Thu" },
  { bit: 5, label: "Fri" },
  { bit: 6, label: "Sat" },
] as const;

const inputClass =
  "bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]";

type FormState = {
  name: string;
  priceDaily: string;
  priceWeekly: string;
  priceMonthly: string;
  address: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  boardType: string;
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

const initialForm: FormState = {
  name: "",
  priceDaily: "",
  priceWeekly: "",
  priceMonthly: "",
  address: "",
  city: "",
  state: "",
  latitude: "",
  longitude: "",
  boardType: "",
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

function toggleDay(days: number[], bit: number): number[] {
  if (days.includes(bit)) return days.filter((d) => d !== bit);
  return [...days, bit].sort((a, b) => a - b);
}

function toggleAudience(list: string[], value: string): string[] {
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

function buildListingPayload(form: FormState): CreateBillboardListingPayload {
  const pd = parseFloat(form.priceDaily);
  const pw = parseFloat(form.priceWeekly);
  const pm = parseFloat(form.priceMonthly);
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
    },
    boardType: form.boardType,
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

const Add = () => {
  const { mutate: createListing, isPending } = useCreateBillboardListing();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [form, setForm] = useState<FormState>(() => ({
    ...initialForm,
    activeDays: [...initialForm.activeDays],
  }));
  const [imagePreviewName, setImagePreviewName] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const set =
    <K extends keyof FormState>(key: K) =>
    (v: FormState[K] | React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      if (v && typeof v === "object" && "target" in v) {
        const t = v.target;
        const val =
          t.type === "checkbox" ? (t as HTMLInputElement).checked : t.value;
        setForm((f) => ({ ...f, [key]: val }));
      } else {
        setForm((f) => ({ ...f, [key]: v as FormState[K] }));
      }
    };

  const handleImageChange: FileInputProps["handleChange"] = (e) => {
    const file = e.target.files?.[0];
    setImageError("");
    if (!file) {
      setImagePreviewName("");
      setImageFile(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setImageError("Use a JPG, PNG, or other image file.");
      setImagePreviewName("");
      setImageFile(null);
      e.target.value = "";
      return;
    }
    setImagePreviewName(file.name);
    setImageFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    if (!form.name.trim() || !form.address.trim() || !form.city.trim() || !form.state.trim()) {
      setValidationError("Fill in name, address, city, and state.");
      return;
    }
    if (!form.boardType) {
      setValidationError("Select a board type.");
      return;
    }
    const pd = parseFloat(form.priceDaily);
    const pw = parseFloat(form.priceWeekly);
    const pm = parseFloat(form.priceMonthly);
    const hasPrice =
      (!Number.isNaN(pd) && pd > 0) ||
      (!Number.isNaN(pw) && pw > 0) ||
      (!Number.isNaN(pm) && pm > 0);
    if (!hasPrice) {
      setValidationError("Enter at least one price: per day, per week, or per month.");
      return;
    }
    if (!imageFile) {
      const msg = "Upload a hero image.";
      setImageError(msg);
      setValidationError(msg);
      return;
    }
    if (form.activeDays.length === 0) {
      setValidationError("Select at least one active day.");
      return;
    }

    const payload = buildListingPayload(form);
    createListing(
      { payload, imageFile },
      { onSuccess: () => setShowSuccessModal(true) },
    );
  };

  return (
    <>
      <section className="min-h-screen bg-ads360-hash py-14">
        <div className="mx-auto w-11/12">
          <h3 className="text-2xl font-semibold">Add billboard</h3>
          <p className="text-sm text-neutral-600 mt-1">
            Listing details for location, pricing, schedule, and creative specs.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="md:flex mx-auto w-11/12 gap-0">
            <div className="basis-6/12 md:pr-5">
              <div className="my-3">
                <p className="text-sm font-medium mb-1">Billboard name</p>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={set("name")}
                  className={inputClass}
                  placeholder="e.g. Lekki-Epe Express facing VI"
                />
              </div>

              <div className="my-3">
                <p className="text-sm font-medium mb-1">Pricing (₦)</p>
                <p className="text-xs text-neutral-500 mb-2">
                  Add one or more: day, week, and month — advertisers can compare options.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-neutral-600 block mb-1">Per day</label>
                    <input
                      name="priceDaily"
                      type="number"
                      min={0}
                      step="0.01"
                      value={form.priceDaily}
                      onChange={set("priceDaily")}
                      className={inputClass}
                      placeholder="—"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-600 block mb-1">Per week</label>
                    <input
                      name="priceWeekly"
                      type="number"
                      min={0}
                      step="0.01"
                      value={form.priceWeekly}
                      onChange={set("priceWeekly")}
                      className={inputClass}
                      placeholder="—"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-600 block mb-1">Per month</label>
                    <input
                      name="priceMonthly"
                      type="number"
                      min={0}
                      step="0.01"
                      value={form.priceMonthly}
                      onChange={set("priceMonthly")}
                      className={inputClass}
                      placeholder="—"
                    />
                  </div>
                </div>
              </div>

              <div className="my-3">
                <p className="text-sm font-medium mb-1">Street address</p>
                <input
                  name="address"
                  required
                  value={form.address}
                  onChange={set("address")}
                  className={inputClass}
                  placeholder="Full street address"
                />
              </div>
              <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium mb-1">City</p>
                  <input
                    name="city"
                    required
                    value={form.city}
                    onChange={set("city")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">State</p>
                  <input
                    name="state"
                    required
                    value={form.state}
                    onChange={set("state")}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium mb-1">Latitude (optional)</p>
                  <input
                    name="latitude"
                    type="number"
                    step="any"
                    value={form.latitude}
                    onChange={set("latitude")}
                    className={inputClass}
                    placeholder="6.4281"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Longitude (optional)</p>
                  <input
                    name="longitude"
                    type="number"
                    step="any"
                    value={form.longitude}
                    onChange={set("longitude")}
                    className={inputClass}
                    placeholder="3.4219"
                  />
                </div>
              </div>

              <div className="my-3">
                <p className="text-sm font-medium mb-1">Board type</p>
                <select
                  name="boardType"
                  required
                  value={form.boardType}
                  onChange={set("boardType")}
                  className={inputClass}
                >
                  <option value="">Select type</option>
                  {BOARD_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="my-3">
                <p className="text-sm font-medium mb-1">Duration per display (seconds)</p>
                <input
                  name="durationPerDisplay"
                  type="number"
                  min={0}
                  value={form.durationPerDisplay}
                  onChange={set("durationPerDisplay")}
                  className={inputClass}
                />
              </div>

              <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium mb-1">Display from</p>
                  <input
                    name="startTime"
                    type="time"
                    value={form.startTime}
                    onChange={set("startTime")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Display until</p>
                  <input
                    name="endTime"
                    type="time"
                    value={form.endTime}
                    onChange={set("endTime")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="my-3">
                <p className="text-sm font-medium mb-1">Active days</p>
                <div className="flex flex-wrap gap-2">
                  {WEEKDAYS.map(({ bit, label }) => (
                    <label
                      key={bit}
                      className={`cursor-pointer rounded border px-2 py-1 text-sm ${
                        form.activeDays.includes(bit)
                          ? "bg-ads360black-100 text-white border-ads360black-100"
                          : "bg-white border-[#E4E4E4]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={form.activeDays.includes(bit)}
                        onChange={() =>
                          setForm((f) => ({
                            ...f,
                            activeDays: toggleDay(f.activeDays, bit),
                          }))
                        }
                      />
                      {label}
                    </label>
                  ))}
                </div>
                <p className="text-xs text-neutral-500 mt-1">At least one day required.</p>
              </div>

              <div className="my-3">
                <p className="text-sm font-medium mb-1">Physical dimensions (m)</p>
                <div className="flex gap-3">
                  <input
                    name="width"
                    type="number"
                    min={0}
                    step="any"
                    placeholder="Width"
                    value={form.width}
                    onChange={set("width")}
                    className={inputClass}
                  />
                  <input
                    name="height"
                    type="number"
                    min={0}
                    step="any"
                    placeholder="Height"
                    value={form.height}
                    onChange={set("height")}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="my-3">
                <p className="text-sm font-medium mb-1">Creative resolution (px)</p>
                <div className="flex gap-3">
                  <input
                    name="pixelWidth"
                    type="number"
                    min={0}
                    placeholder="Width"
                    value={form.pixelWidth}
                    onChange={set("pixelWidth")}
                    className={inputClass}
                  />
                  <input
                    name="pixelHeight"
                    type="number"
                    min={0}
                    placeholder="Height"
                    value={form.pixelHeight}
                    onChange={set("pixelHeight")}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="basis-6/12 md:pl-2">
              <div className="my-3">
                <p className="text-sm font-medium mb-1">Orientation</p>
                <select
                  name="orientation"
                  value={form.orientation}
                  onChange={set("orientation")}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              <div className="my-3 flex items-center gap-2">
                <input
                  id="isNegotiable"
                  type="checkbox"
                  checked={form.isNegotiable}
                  onChange={(e) => setForm((f) => ({ ...f, isNegotiable: e.target.checked }))}
                  className="rounded border-[#E4E4E4]"
                />
                <label htmlFor="isNegotiable" className="text-sm font-medium">
                  Price is negotiable
                </label>
              </div>

              <div className="my-3">
                <p className="text-sm font-medium mb-1">Availability</p>
                <div className="flex items-center gap-2">
                  <input
                    id="isAvailable"
                    type="checkbox"
                    checked={form.isAvailable}
                    onChange={(e) => setForm((f) => ({ ...f, isAvailable: e.target.checked }))}
                    className="rounded border-[#E4E4E4]"
                  />
                  <label htmlFor="isAvailable" className="text-sm">
                    Currently available for booking
                  </label>
                </div>
              </div>

              <div className="my-3">
                <p className="text-sm font-medium mb-1">Audience type</p>
                <div className="flex flex-wrap gap-2">
                  {AUDIENCE_TYPES.map((a) => (
                    <label
                      key={a.value}
                      className={`cursor-pointer rounded border px-2 py-1 text-sm ${
                        form.audienceTypes.includes(a.value)
                          ? "bg-ads360black-100 text-white border-ads360black-100"
                          : "bg-white border-[#E4E4E4]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={form.audienceTypes.includes(a.value)}
                        onChange={() =>
                          setForm((f) => ({
                            ...f,
                            audienceTypes: toggleAudience(f.audienceTypes, a.value),
                          }))
                        }
                      />
                      {a.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="my-3">
                <p className="text-sm font-medium mb-1">Nearby landmarks</p>
                <input
                  name="nearbyLandmarks"
                  value={form.nearbyLandmarks}
                  onChange={set("nearbyLandmarks")}
                  className={inputClass}
                  placeholder="e.g. Near Eko Hotel, opposite Shoprite"
                />
              </div>

              <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-sm font-medium mb-1">Illumination</p>
                  <select
                    name="illumination"
                    value={form.illumination}
                    onChange={set("illumination")}
                    className={inputClass}
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
                  <p className="text-sm font-medium mb-1">Facing direction</p>
                  <select
                    name="facingDirection"
                    value={form.facingDirection}
                    onChange={set("facingDirection")}
                    className={inputClass}
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

              <div className="my-3">
                <p className="text-sm font-medium mb-1">Traffic description</p>
                <textarea
                  name="trafficDescription"
                  rows={4}
                  value={form.trafficDescription}
                  onChange={set("trafficDescription")}
                  placeholder="Facing traffic along Adetokunbo Ademola by Eko Hotel, Ahmadu Bello Way…"
                  className={inputClass}
                />
              </div>

              <div className="my-3">
                <p className="text-sm font-medium mb-1">Hero image</p>
                <p className="text-xs text-neutral-600 mb-2">JPG, PNG, or other common image formats.</p>
                <FilesInput
                  previewName={imagePreviewName}
                  accept="image"
                  handleChange={handleImageChange}
                  warning={imageError || " "}
                />
              </div>

              <div className="bg-neutral-50 w-full min-h-[240px] rounded-10 border border-dashed border-[#E4E4E4] overflow-hidden flex items-center justify-center">
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt="Billboard hero image preview"
                    className="max-h-[min(480px,70vh)] w-full object-contain"
                  />
                ) : (
                  <p className="text-sm text-neutral-500 px-4 text-center">
                    Image preview appears here after you choose a file above.
                  </p>
                )}
              </div>

              {validationError ? (
                <p className="text-sm text-red-600 mt-4" role="alert">
                  {validationError}
                </p>
              ) : null}
              <div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5 text-white p-2 px-4 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {isPending ? "Submitting…" : "Submit listing"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
      <Modal isOpen={showSuccessModal}>
        <div className="bg-white w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10 grid grid-cols-1 content-center">
          <p className="text-green-500 border-b p-3 font-semibold">
            Billboard added successfully
          </p>
          <p className="px-3 py-5 border-b">
            Do you want to add another board?
          </p>
          <div className="flex justify-end space-x-2 p-3">
            <button
              type="button"
              onClick={() => {
                setShowSuccessModal(false);
                setValidationError("");
                setForm({
                  ...initialForm,
                  activeDays: [...initialForm.activeDays],
                });
                setImagePreviewName("");
                setImageFile(null);
                setImageError("");
              }}
              className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded text-white p-2"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/vendors/billboards/listing" })}
              className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded text-white p-2"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export const Route = createFileRoute("/vendors/billboards/add-billboard/")({
  component: Add,
});

export default Add;
