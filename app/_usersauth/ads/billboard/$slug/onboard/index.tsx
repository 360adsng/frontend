import { useMemo, useState } from "react";
import { useNavigate, useParams, createFileRoute } from '@tanstack/react-router';
import { Value } from "react-calendar/dist/cjs/shared/types";
import { Toaster, toast } from "sonner";

//components
import FilesInput from "@components/inputs/FilesInput";
import Tick from "@components/inputs/Tick";
import CalenderBox from "@components/inputs/CalenderBox";
import Preview from "@components/ui/Preview";
import BackBtn from "@components/buttons/BackBtn";
import Steps from "@components/ui/Steps";
import { useCreateBillboardBooking } from "@endpoint/billboard/useBillboard";

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
  const { data } = Route.useSearch();
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
    type: string
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
    if (!Number.isFinite(listingId) || listingId <= 0) {
      toast.error("Invalid billboard id");
      return;
    }

    const durationPlan =
      plan === "Immediate"
        ? "immediate"
        : plan === "Days"
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
    <section className="px-4 md:px-7 xl:px-20 py-24">
      
      <BackBtn>billboard Marketing</BackBtn>
      <Steps step={3} text="#3 - Completing"/>

      <p className="text-stone-400 text-center">
        Provide all requested details to help complete the campaign creation
      </p>

      <section className="md:flex my-10 md:space-x-5 xl:space-x-16">
        <div className="md:basis-6/12 xl:basis-5/12">
          <h4 className="font-bold my-3">Choose day(s) to run campaign</h4>
          <select
            onChange={handlePlan}
            className="mb-3 bg-white focus:outline-none w-full p-2 rounded-10"
          >
            <option>Select</option>
            <option>Immediate</option>
            <option>Days</option>
            <option>Weeks</option>
            <option>Months</option>
          </select>
          {plan === "Days" ? (
            <CalenderBox
              addDate={addDate}
              selectedDate={selectedDate}
              removeDate={removeDate}
            />
          ) : plan === "Weeks" ? (
            <div className="flex justify-between space-x-2 md:space-x-0 my-3">
              <div>
                <p>Start day</p>
                <input
                  type="date"
                  min={isoDateOnly(startOfToday())}
                  value={startWeek?.startday}
                  name="startday"
                  onChange={(e) => handleDuration(e, "week")}
                  className="w-full bg-white rounded-10 p-2 focus:outline-none"
                />
              </div>
              <div>
                <p>Number of weeks</p>
                <input
                  value={startWeek?.duration}
                  name="duration"
                  type="number"
                  onChange={(e) => handleDuration(e, "week")}
                  className="w-full bg-white rounded-10 p-2 focus:outline-none"
                />
              </div>
            </div>
          ) : plan === "Months" ? (
            <div className="flex justify-between space-x-2 md:space-x-0 my-3">
              <div>
                <p>Start day</p>
                <input
                  value={startMonth?.startday}
                  name="startday"
                  onChange={(e) => handleDuration(e, "month")}
                  type="date"
                  min={isoDateOnly(startOfToday())}
                  className="w-full bg-white rounded-10 p-2 focus:outline-none"
                />
              </div>
              <div>
                <p>Number of Months</p>
                <input
                  value={startMonth?.duration}
                  name="duration"
                  onChange={(e) => handleDuration(e, "month")}
                  type="number"
                  className="w-full bg-white rounded-10 p-2 focus:outline-none"
                />
              </div>
            </div>
          ) : null}

         

          {/* attachment */}
          <div className="mt-5">
            <h4 className="font-bold my-3">Attachments</h4>

            <div className="flex space-x-3">
              <Tick
                label="Image Assets"
                asset="image"
                setAttachmentType={setAttachmentType}
                attachmentType={attachmentType}
              />

              <Tick
                label="Video Assets"
                asset="video"
                setAttachmentType={setAttachmentType}
                attachmentType={attachmentType}
              />
            </div>
            {attachmentType === "image" ? (
              <FilesInput
                previewName={previewImage?.name as string}
                accept="image"
                handleChange={handleChange}
                warning={`Required billboard image dimension: ${data?.width}px by ${data?.height}px (W x H)`}
              />
            ) : (
              <div>
                <input
                  value={creativeVideoUrl}
                  onChange={(e) => {
                    setCreativeVideoUrl(e.target.value);
                    setImageFile(null);
                    setPreviewImage(undefined);
                  }}
                  placeholder="Paste YouTube / video link"
                  className="mb-2 bg-white focus:outline-none w-full p-2 rounded-10"
                />
                <p className="text-stone-500 text-xs">
                  Videos are links only (e.g. YouTube). No video upload.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:basis-7/12 md:basis-6/12 lg:my-0">
          <Preview
            previewImage={previewImage as Preview}
            attachmentType={attachmentType}
            previewVideo={undefined}
            externalVideoUrl={attachmentType === "video" ? creativeVideoUrl : undefined}
            platform={platform}
            needPlatform={false}
            needMessage={false}
            writeup={''}
            plan={plan}
            selectedDate={selectedDate}
            durationText={durationText}
          />
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={createBooking.isPending}
          className="group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12 disabled:opacity-60"
        >
          {createBooking.isPending ? "Saving..." : "Next"}
        </button>
      </div>

      <Toaster position="top-center" closeButton />
    </section>
  );
}

export const Route = createFileRoute("/_usersauth/ads/billboard/$slug/onboard/")({
  component: Onboard,
})

export default Onboard
