import { useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
  createFileRoute,
} from "@tanstack/react-router";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { Toaster, toast } from "sonner";
import Checkbox from "@components/inputs/Checkbox";
import Preview from "@components/ui/Preview";
import BackBtn from "@components/buttons/BackBtn";
import Steps from "@components/ui/Steps";
import { CampaignScheduleFields } from "@components/onboarding/CampaignScheduleFields";
import { InfluencerCreativeSection } from "@components/influencer/InfluencerCreativeSection";
import {
  useInfluencerDirectoryById,
  useCreateInfluencerBooking,
} from "@endpoint/influencer/useInfluencer";
import { FaUsers } from "react-icons/fa";

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

function Onboard() {
  const [plan, setPlan] = useState("");
  const [writeup, setWriteup] = useState("");
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
  const [attachmentType, setAttachmentType] = useState("none");
  const [previewImage, setPreviewImage] = useState<Preview>();
  const params = useParams({ strict: false }) as { slug?: string };
  const influencerId = useMemo(() => Number(params.slug), [params.slug]);
  const influencer = useInfluencerDirectoryById(
    Number.isFinite(influencerId) && influencerId > 0 ? influencerId : 0,
  );
  const createBooking = useCreateInfluencerBooking();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [creativeVideoUrl, setCreativeVideoUrl] = useState("");

  const durationText = useMemo(() => {
    if (plan === "Weeks") {
      const n = Number(startWeek.duration);
      if (startWeek.startday && Number.isFinite(n) && n > 0) {
        return `Campaign runs for ${n} week(s) from ${startWeek.startday}.`;
      }
      return "";
    }
    if (plan === "Months") {
      const n = Number(startMonth.duration);
      if (startMonth.startday && Number.isFinite(n) && n > 0) {
        return `Campaign runs for ${n} month(s) from ${startMonth.startday}.`;
      }
      return "";
    }
    return "";
  }, [
    plan,
    startWeek.duration,
    startWeek.startday,
    startMonth.duration,
    startMonth.startday,
  ]);

  const handlePlan = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "Select") {
      toast.error("Select a duration plan");
      setPlan("");
    } else {
      setPlan(value);
    }
  };

  const addDate = (info: Value) => {
    const check = selectedDate.find(
      (date) => info?.toLocaleString() === date?.toLocaleString(),
    );
    if (check) {
      toast.error("You have selected this date already");
    } else {
      setSelectedDate((prev) => [...prev, info as valuePiece]);
    }
  };

  const removeDate = (rmDate: valuePiece) => {
    setSelectedDate(selectedDate.filter((dates) => rmDate !== dates));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    if (type !== "image") return;
    const file = e.target.files;
    if (file !== null && file.length > 0) {
      const objectUrl = URL.createObjectURL(file[0]);
      setImageFile(file[0]);
      setPreviewImage({ src: objectUrl, name: file[0].name });
    }
  };

  const handlePlatform = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    if (e.target.checked) {
      setPlatform((current) => [...current, value]);
    } else {
      setPlatform((current) => current.filter((each) => each !== value));
    }
  };

  const handleDuration = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "week" | "month",
  ) => {
    const { value, name } = e.target;
    if (type === "week") {
      setStartWeek((current) => ({ ...current, [name]: value }));
      setStartMonth({ startday: "", duration: "" });
    } else {
      setStartMonth((current) => ({ ...current, [name]: value }));
      setStartWeek({ startday: "", duration: "" });
    }
    setSelectedDate([]);
  };

  const handleNext = async () => {
    if (!Number.isFinite(influencerId) || influencerId <= 0) {
      toast.error("Invalid influencer id");
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
      toast.error("Select a duration plan");
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

    const videoUrl = creativeVideoUrl.trim();
    const creativeKind =
      attachmentType === "image" && imageFile
        ? "image"
        : attachmentType === "video" && videoUrl
          ? "video"
          : "none";

    const influencerPlatforms = influencer.data?.platforms ?? [];
    const nameToId = new Map(
      influencerPlatforms.map((p) => [String(p.name).toLowerCase(), p.id]),
    );
    const platformIds = platform
      .map((n) => nameToId.get(String(n).toLowerCase()))
      .filter((x): x is number => typeof x === "number");

    if (platformIds.length === 0) {
      toast.error("Please select at least one platform");
      return;
    }
    if (!writeup.trim()) {
      toast.error("Please enter a message");
      return;
    }

    try {
      const res = await createBooking.mutateAsync({
        influencerProfileId: influencerId,
        payload: {
          durationPlan,
          selectedDates,
          periodStart,
          periodDurationCount:
            periodDurationCount != null && Number.isFinite(periodDurationCount)
              ? periodDurationCount
              : undefined,
          creativeKind,
          creativeVideoUrl: creativeKind === "video" ? videoUrl : undefined,
          platformIds,
          message: writeup.trim(),
        },
        imageFile:
          creativeKind === "image" && imageFile ? imageFile : undefined,
      });
      await navigate({
        to: `/ads/influencer/${influencerId}/onboarding/checkout`,
        search: { bookingId: res.id },
      });
    } catch {
      // toast handled by hook
    }
  };

  return (
    <section className="min-h-screen bg-[#E9E9E9] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <BackBtn>Influencer marketing</BackBtn>
        <Steps step={3} text="#3 - Completing" />

        <p className="mt-2 text-center text-sm text-stone-500">
          Set your schedule, platforms, message, and optional creative
        </p>

        <section className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="w-full space-y-5 lg:max-w-xl">
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

            <section className="rounded-xl border border-neutral-200 bg-white p-4">
              <h4 className="font-bold text-neutral-900">Platforms</h4>
              <p className="mt-1 text-xs text-neutral-500">
                Select where this influencer should promote your campaign.
              </p>
              <div className="mt-3 space-y-2">
                {(influencer.data?.platforms ?? []).map((p) => (
                  <Checkbox
                    key={p.id}
                    id={String(p.id)}
                    optionValue={p.name}
                    onClick={(e, value) => handlePlatform(e, value)}
                    label={
                      <span className="inline-flex flex-wrap items-center gap-1.5">
                        <span className="font-medium">{p.name}</span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-700">
                          ₦{Number(p.amountRate ?? 0).toLocaleString()}/day
                        </span>
                        <span className="text-stone-400">·</span>
                        <span
                          className="inline-flex items-center gap-1 text-stone-600"
                          title="Followers"
                        >
                          <FaUsers
                            className="h-3.5 w-3.5 shrink-0"
                            aria-hidden
                          />
                          <span>
                            {Number(p.numberOfFollowers ?? 0).toLocaleString()}
                          </span>
                        </span>
                      </span>
                    }
                  />
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-neutral-200 bg-white p-4">
              <h4 className="font-bold text-neutral-900">Message</h4>
              <p className="mt-1 text-xs text-neutral-500">
                Brief the influencer on goals, tone, and deliverables.
              </p>
              <textarea
                value={writeup}
                onChange={(e) => setWriteup(e.target.value)}
                rows={6}
                className="textscroll mt-3 w-full rounded-xl border border-neutral-200 p-3 text-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                placeholder="Describe your campaign…"
              />
            </section>

            <InfluencerCreativeSection
              attachmentType={attachmentType}
              setAttachmentType={setAttachmentType}
              imageFile={imageFile}
              onImageChange={(e) => handleChange(e, "image")}
              creativeVideoUrl={creativeVideoUrl}
              onVideoUrlChange={setCreativeVideoUrl}
            />
          </div>

          <div className="w-full flex-1 lg:max-w-md">
            <Preview
              previewImage={previewImage as Preview}
              attachmentType={attachmentType}
              previewVideo={undefined}
              externalVideoUrl={
                attachmentType === "video" ? creativeVideoUrl : undefined
              }
              needPlatform
              needMessage
              platform={platform}
              writeup={writeup}
              plan={plan}
              selectedDate={selectedDate}
              durationText={durationText}
            />
          </div>
        </section>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => void handleNext()}
            disabled={createBooking.isPending}
            className="rounded-xl bg-ads360yellow-100 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-60"
          >
            {createBooking.isPending ? "Saving…" : "Continue to checkout"}
          </button>
        </div>

        <Toaster position="top-center" closeButton />
      </div>
    </section>
  );
}

export const Route = createFileRoute(
  "/_usersauth/ads/influencer/$slug/onboarding/",
)({
  component: Onboard,
});
