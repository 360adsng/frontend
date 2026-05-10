import { useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
  createFileRoute,
} from "@tanstack/react-router";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { Toaster, toast } from "sonner";

import Checkbox from "@components/inputs/Checkbox";

//components
import FilesInput from "@components/inputs/FilesInput";
import Tick from "@components/inputs/Tick";
import CalenderBox from "@components/inputs/CalenderBox";
import Preview from "@components/ui/Preview";
import BackBtn from "@components/buttons/BackBtn";
import Steps from "@components/ui/Steps";
import {
  useInfluencerDirectoryById,
  useCreateInfluencerBooking,
} from "@endpoint/influencer/useInfluencer";
import { FaUsers } from "react-icons/fa";

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
  const [previewVideo, setPreviewVideo] = useState<Preview>();
  const params = useParams({ strict: false }) as { slug?: string };
  const selectedinfluencer = params.slug;
  const influencerId = useMemo(
    () => Number(selectedinfluencer),
    [selectedinfluencer],
  );
  const influencer = useInfluencerDirectoryById(
    Number.isFinite(influencerId) && influencerId > 0 ? influencerId : 0,
  );
  const createBooking = useCreateInfluencerBooking();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [creativeVideoUrl, setCreativeVideoUrl] = useState("");

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    const file = e.target.files;
    if (file !== null && file.length > 0) {
      const objectUrl = URL.createObjectURL(file[0]);
      if (type === "image") setImageFile(file[0]);

      if (type === "image") {
        setPreviewVideo(undefined);
        setPreviewImage({
          src: objectUrl,
          name: file[0].name,
        });
      } else {
        setPreviewImage(undefined);
        setPreviewVideo({
          src: objectUrl,
          name: file[0].name,
        });
      }
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
    type: string,
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
    if (!Number.isFinite(influencerId) || influencerId <= 0) {
      toast.error("Invalid influencer id");
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
            .map((d) => (d as Date).toISOString().slice(0, 10))
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
    <section className="px-4 md:px-7 xl:px-20 py-24">
      <BackBtn>Influencer Marketing</BackBtn>

      <Steps step={3} text="#3 - Completing" />

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

          {/* platform */}
          <div className="my-5">
            <h4 className="font-bold my-3">Chose Platform</h4>
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
                      <FaUsers className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      <span>{Number(p.numberOfFollowers ?? 0).toLocaleString()}</span>
                    </span>
                  </span>
                }
              />
            ))}
          </div>
          {/* message */}
          <div className="my-5">
            <h4 className="font-bold my-3">Message</h4>
            <textarea
              value={writeup}
              onChange={(e) => setWriteup(e.target.value)}
              rows={9}
              className="textscroll p-2 w-full border focus:outline-none  rounded-10 border-ads360yellowBtn-100"
            ></textarea>
          </div>

          {/* attachment */}
          <div className="mt-5">
            <h4 className="font-bold my-3">Attachments</h4>

            <div className="flex flex-wrap gap-3">
              <Tick
                label="No attachment"
                asset="none"
                setAttachmentType={setAttachmentType}
                attachmentType={attachmentType}
              />
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
                warning="Optional — recommended size 496(H) × 800(W)"
              />
            ) : attachmentType === "video" ? (
              <div className="mt-3">
                <label className="text-sm">Video URL</label>
                <input
                  value={creativeVideoUrl}
                  onChange={(e) => setCreativeVideoUrl(e.target.value)}
                  className="w-full bg-white rounded-10 p-2 focus:outline-none"
                  placeholder="https://..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Only video links are supported (no uploads).
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-stone-500">
                Image and video are optional. You can book with your message
                only.
              </p>
            )}
          </div>
        </div>

        <div className="lg:basis-7/12 md:basis-6/12 lg:my-0">
          <Preview
            previewImage={previewImage as Preview}
            attachmentType={attachmentType}
            previewVideo={previewVideo as Preview}
            needPlatform={true}
            needMessage={true}
            platform={platform}
            writeup={writeup}
            plan={plan}
            selectedDate={selectedDate}
          />
        </div>
      </section>

      <div className="flex justify-end">
        <button
          onClick={() => void handleNext()}
          className="group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12 disabled:opacity-60"
          disabled={createBooking.isPending}
        >
          {createBooking.isPending ? "Saving..." : "Next"}
        </button>
      </div>

      <Toaster position="top-center" closeButton />
    </section>
  );
}

export const Route = createFileRoute(
  "/_usersauth/ads/influencer/$slug/onboarding/",
)({
  component: Onboard,
});

export default Onboard;
