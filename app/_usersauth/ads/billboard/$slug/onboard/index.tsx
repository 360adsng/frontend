import { useMemo, useState } from "react";
import { useNavigate, useParams, createFileRoute } from "@tanstack/react-router";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { Toaster, toast } from "sonner";
import type { PublicBillboardListing } from "@endpoint/billboard/billboard";

//components
import { BillboardCreativeSection } from "@components/billboard/BillboardCreativeSection";
import { CampaignScheduleFields } from "@components/onboarding/CampaignScheduleFields";
import Preview from "@components/ui/Preview";
import BackBtn from "@components/buttons/BackBtn";
import Steps from "@components/ui/Steps";
import { useCreateBillboardBooking } from "@endpoint/billboard/useBillboard";
import { useBillboardListing } from "@endpoint/billboard/useBillboard";
import {
  ArconCreativeModal,
  type ArconChoice,
} from "@components/billboard/ArconCreativeModal";
import { BillboardOnboardFormExtras } from "@components/billboard/BillboardOnboardFormExtras";
import { CreativeFulfillmentType } from "@endpoint/billboard/billboardListingEnums";
import type { ArconTurnaroundId } from "@lib/billboardArcon";

function isoDateOnly(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function isPastDateOnly(dateOnly: string): boolean {
  if (!dateOnly) return false;
  const d = new Date(`${dateOnly}T00:00:00`);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() < startOfToday().getTime();
}

function Onboard() {
  const search = Route.useSearch();
  const [arcGateDone, setArcGateDone] = useState(false);
  const [arconChoice, setArconChoice] = useState<ArconChoice | null>(null);
  const [arconCertificateFile, setArconCertificateFile] = useState<File | null>(
    null,
  );
  const [arconTurnaround, setArconTurnaround] =
    useState<ArconTurnaroundId | null>(null);
  const [plan, setPlan] = useState("");
  const [startWeek, setStartWeek] = useState<Duration>({
    startday: "",
    duration: "",
  });
  const [startMonth, setStartMonth] = useState<Duration>({
    startday: "",
    duration: "",
  });
  const [platform, setPlatform] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<valuePiece[]>([]);
  const [attachmentType, setAttachmentType] = useState("image");
  const [previewImage, setPreviewImage] = useState<Preview>();
  const params = useParams({ strict: false }) as { slug?: string };
  const selectedbillboard = params.slug;
  const listingId = useMemo(() => Number(selectedbillboard), [selectedbillboard]);
  const navigate = useNavigate();
  const createBooking = useCreateBillboardBooking();
  const { data: listingFromApi, isPending: listingLoading } =
    useBillboardListing(
      Number.isFinite(listingId) && listingId > 0 ? listingId : null,
    );
  const listing: PublicBillboardListing | undefined = useMemo(() => {
    const api = listingFromApi;
    const cached = search.data;
    if (!api && !cached) return undefined;
    if (!cached) return api;
    if (!api) return cached;
    return {
      ...cached,
      ...api,
      width: api.width ?? cached.width,
      height: api.height ?? cached.height,
      printingPricePerSqMeter:
        api.printingPricePerSqMeter ?? cached.printingPricePerSqMeter,
    };
  }, [listingFromApi, search.data]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [creativeVideoUrl, setCreativeVideoUrl] = useState("");
  const durationText = useMemo(() => {
    if (plan === "Weeks") {
      const n = Number(startWeek.duration);
      if (startWeek.startday && Number.isFinite(n) && n > 0) {
        return `This ad will run for ${n} week(s) from ${startWeek.startday}.`;
      }
      return "";
    }
    if (plan === "Months") {
      const n = Number(startMonth.duration);
      if (startMonth.startday && Number.isFinite(n) && n > 0) {
        return `This ad will run for ${n} month(s) from ${startMonth.startday}.`;
      }
      return "";
    }
    return "";
  }, [plan, startWeek.duration, startWeek.startday, startMonth.duration, startMonth.startday]);


  const handlePlan = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "Select") {
      toast.error("kindly selete a duration plan");
      setPlan("");
    } else {
      setPlan(value);
    }
  };

  const addDate = (info: Value) => {
    const check = selectedDate.find((date) => {
      return info?.toLocaleString() === date?.toLocaleString();
    });

    if (check) {
      toast.error("You have selected this date already");
    } else {
      setSelectedDate((prev) => [...prev, info as valuePiece]);
    }
  };

  const removeDate = (rmDate: valuePiece) => {
    const updateDate = selectedDate.filter((dates) => rmDate !== dates);
    setSelectedDate(updateDate);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (type !== "image") return;
    const file = e.target.files;
    if (file !== null && file.length > 0) {
      const objectUrl = URL.createObjectURL(file[0]);
      setImageFile(file[0]);
      setPreviewImage({
        src: objectUrl,
        name: file[0].name,
      });
    }
  };

  const handleDuration = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "week" | "month",
  ) => {
    const { value, name } = e.target;
    if (type === "week") {
      setStartWeek((current) => ({ ...current, [name]: value }));
      setStartMonth({
        startday: "",
        duration: "",
      });
    } else {
      setStartMonth((current) => ({ ...current, [name]: value }));
      setSelectedDate([]);
      setStartWeek({
        startday: "",
        duration: "",
      });
    }
    setSelectedDate([]);
  };

  const handleNext = async () => {
    if (!arcGateDone || !arconChoice) {
      toast.error("Please complete the ARCON certificate step in the dialog.");
      return;
    }
    if (arconChoice === "yes" && !arconCertificateFile) {
      toast.error("Please upload your ARCON certificate.");
      return;
    }
    if (arconChoice === "no" && !arconTurnaround) {
      toast.error("Choose how quickly you need the ARCON certificate.");
      return;
    }
    if (
      listing?.creativeFulfillmentType === CreativeFulfillmentType.PRINT &&
      (!listing.width ||
        !listing.height ||
        !listing.printingPricePerSqMeter ||
        listing.printingPricePerSqMeter <= 0)
    ) {
      toast.error(
        "Print pricing is not available for this listing. Contact the vendor or pick another face.",
      );
      return;
    }
    if (!Number.isFinite(listingId) || listingId <= 0) {
      toast.error("Invalid billboard id");
      return;
    }

    const durationPlan =
      plan === "Days"
        ? "days"
        : plan === "Weeks"
          ? "weeks"
          : plan === "Months"
            ? "months"
            : null;

    if (!durationPlan) {
      toast.error("kindly selete a duration plan");
      return;
    }

    const selectedDates =
      durationPlan === "days"
        ? selectedDate
            .filter((d) => d instanceof Date)
            .map((d) => isoDateOnly(d as Date))
        : undefined;

    const periodStart =
      durationPlan === "weeks"
        ? startWeek.startday || undefined
        : durationPlan === "months"
          ? startMonth.startday || undefined
          : undefined;

    const periodDurationCount =
      durationPlan === "weeks"
        ? Number(startWeek.duration)
        : durationPlan === "months"
          ? Number(startMonth.duration)
          : undefined;

    const creativeKind = attachmentType === "image" ? "image" : "video";
    const payload = {
      durationPlan,
      selectedDates,
      periodStart,
      periodDurationCount:
        periodDurationCount != null && Number.isFinite(periodDurationCount)
          ? periodDurationCount
          : undefined,
      creativeKind,
      creativeVideoUrl:
        creativeKind === "video"
          ? creativeVideoUrl.trim() || undefined
          : undefined,
      arconHasCertificate: arconChoice === "yes",
      arconApplicationTurnaround:
        arconChoice === "no" && arconTurnaround ? arconTurnaround : undefined,
    } as const;

    if (creativeKind === "image" && !imageFile) {
      toast.error("Please select an image file");
      return;
    }
    if (creativeKind === "video" && !payload.creativeVideoUrl) {
      toast.error("Please paste a video link");
      return;
    }

    if (selectedDates?.some((d) => isPastDateOnly(d))) {
      toast.error("You cannot select a past date");
      return;
    }
    if (periodStart && isPastDateOnly(periodStart)) {
      toast.error("Start date cannot be in the past");
      return;
    }

    try {
      const res = await createBooking.mutateAsync({
        listingId,
        payload,
        imageFile: imageFile ?? undefined,
        arconCertificateFile: arconCertificateFile ?? undefined,
      });
      await navigate({
        to: `/ads/billboard/${listingId}/onboard/checkout`,
        search: { bookingId: res.id },
      });
    } catch {
      // toast handled by hook
    }
  };



  return (
    <>
      <ArconCreativeModal
        isOpen={
          Number.isFinite(listingId) && listingId > 0 && !arcGateDone
        }
        onComplete={(choice) => {
          setArconChoice(choice);
          setArconCertificateFile(null);
          setArconTurnaround(null);
          setArcGateDone(true);
        }}
      />

      <section className="min-h-screen bg-[#E9E9E9] px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <BackBtn>Billboard marketing</BackBtn>
          <Steps step={3} text="#3 - Completing" />

          <p className="mt-2 text-center text-sm text-stone-500">
            Provide campaign schedule, creative, and compliance details
          </p>

          <section className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="w-full space-y-5 lg:max-w-xl">
              <BillboardOnboardFormExtras
            listing={listing}
            listingLoading={listingLoading}
            arconChoice={arconChoice}
            certificateFile={arconCertificateFile}
            onCertificateChange={setArconCertificateFile}
            turnaround={arconTurnaround}
            onTurnaroundChange={setArconTurnaround}
              />

              <CampaignScheduleFields
            plan={plan}
            onPlanChange={handlePlan}
            selectedDate={selectedDate}
            addDate={addDate}
            removeDate={removeDate}
            startWeek={startWeek}
            startMonth={startMonth}
            onDurationChange={handleDuration}
            minStartDate={isoDateOnly(startOfToday())}
          />

          <BillboardCreativeSection
            attachmentType={attachmentType}
            setAttachmentType={setAttachmentType}
            imageFile={imageFile}
            onImageChange={(e) => handleChange(e, "image")}
            creativeVideoUrl={creativeVideoUrl}
            onVideoUrlChange={(url) => {
              setCreativeVideoUrl(url);
              setImageFile(null);
              setPreviewImage(undefined);
            }}
          />
        </div>

        <div className="w-full flex-1 lg:max-w-md">
          <Preview
            previewImage={previewImage as Preview}
            attachmentType={attachmentType}
            previewVideo={undefined}
            externalVideoUrl={attachmentType === "video" ? creativeVideoUrl : undefined}
            platform={platform}
            needPlatform={false}
            needMessage={false}
            writeup=""
            plan={plan}
            selectedDate={selectedDate}
            durationText={durationText}
          />
        </div>
      </section>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={createBooking.isPending}
          className="rounded-xl bg-ads360yellow-100 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-60"
        >
          {createBooking.isPending ? "Saving..." : "Continue to checkout"}
        </button>
      </div>

          <Toaster position="top-center" closeButton />
        </div>
      </section>
    </>
  );
}

export const Route = createFileRoute("/_usersauth/ads/billboard/$slug/onboard/")({
  validateSearch: (
    raw: Record<string, unknown>,
  ): { data?: PublicBillboardListing } => ({
    data: raw.data as PublicBillboardListing | undefined,
  }),
  component: Onboard,
});
