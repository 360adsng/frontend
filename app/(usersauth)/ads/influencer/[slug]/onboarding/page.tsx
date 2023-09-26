"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { Toaster, toast } from "sonner";

//import images
import mark from "@public/icons/mark.svg";
import Checkbox from "@components/inputs/Checkbox";

//components
import FilesInput from "@components/inputs/FilesInput";
import Tick from "@components/inputs/Tick";
import CalenderBox from "@components/inputs/CalenderBox";
import Preview from "@components/ui/Preview";
import BackBtn from "@components/buttons/BackBtn";

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
  const [attachmentType, setAttachmentType] = useState("image");
  const [previewImage, setPreviewImage] = useState<Preview>();
  const [previewVideo, setPreviewVideo] = useState<Preview>();
  const params = useParams();
  const selectedinfluencer = params.slug;

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
    type: string
  ) => {
    const file = e.target.files;
    if (file !== null && file.length > 0) {
      const objectUrl = URL.createObjectURL(file[0]);

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
    value: string
  ) => {
    if (e.target.checked) {
      setPlatform((current) => [...current, value]);
    } else {
      setPlatform((current) => current.filter((each) => each !== value));
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

  return (
    <section className="px-4 md:px-7 xl:px-20 py-24">
      <BackBtn>Influencer Marketing</BackBtn>
     

      {/* steps */}
      <div className="hidden items-center justify-center mx-auto mt-5 mb-14 md:flex">
        <div className="font-bold text-sm">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full border flex justify-center bg-ads360yellow-100">
              <Image src={mark} width={0} height={0} alt="" />
            </div>
            <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
          </div>
          <div className="relative -left-10">Select Campaign</div>
        </div>

        <div className="font-bold text-sm">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
              <Image src={mark} width={0} height={0} alt="" />
            </div>
            <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
          </div>
          <div className="relative -left-10">Onboarding</div>
        </div>

        <div className="font-bold text-sm text-left">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full border border-ads360yellow-100"></div>
            <div className="w-[150px] lg:w-[200px] border border-gray-300 h-0"></div>
          </div>
          <div className="relative -left-7">completion</div>
        </div>

        <div className="font-bold text-sm">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full border border-ads360yellow-100"></div>
          </div>
          <div className="relative -left-5">Checkout</div>
        </div>
      </div>

      <div className="font-bold md:hidden text-right mt-5 mb-10">
        #3 - Completing
      </div>

      {/* steps */}

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
            <Checkbox
              id="facebook"
              onClick={handlePlatform}
              label="Facebook 38000"
            />
            <Checkbox id="blog" onClick={handlePlatform} label="Blog 39000" />
            <Checkbox
              id="twitter"
              onClick={handlePlatform}
              label="Twitter 39000"
            />
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
                warning="Required influencer image dimension: 496(H) by 800(W)"
              />
            ) : (
              <FilesInput
                previewName={previewVideo?.name as string}
                accept="video"
                handleChange={handleChange}
                warning="Required influencer video dimension: 496(H) by 800(W)"
              />
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
        <button className="group rounded-10 hover:animate-changeColor text-white bg-ads360yellow-100 w-123 h-12">
          <Link href={`/ads/influencer/${2}/onboard/checkout`}>Next</Link>
        </button>
      </div>

      <Toaster position="top-center" closeButton />
    </section>
  );
}

export default Onboard;