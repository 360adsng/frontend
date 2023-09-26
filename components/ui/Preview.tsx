import Image from "next/image";

const Preview = ({
  previewImage,
  attachmentType,
  previewVideo,
  needMessage,
  platform,
  needPlatform,
  writeup,
  plan,
  selectedDate,
}: PreviewProps) => {
  return (
    <div className="">
      <h4 className="font-bold text-xl my-3">Preview</h4>
      <div className="bg-white my-5 rounded-10 p-2 min-h-[40px]">
        {plan === "Immediate" && (
          <div>
            this ad will run once, immediately as soon as payment is confirm
          </div>
        )}
        {plan === "Days" && (
          <div>
            this ad will be run on seleted days{" "}
            {selectedDate.map((day: valuePiece, i) => (
              <div key={i}>{day?.toDateString()}</div>
            ))}
          </div>
        )}
        {plan === "Weeks" && <div>this ad will for 4 weeks from 1/2/2023</div>}
        {plan === "Months" && (
          <div>this ad will for 2 months from 1/2/2023</div>
        )}
        {plan === "" && (
          <div className="text-gray-500 text-center">Preview Duration Plan</div>
        )}
      </div>

      { needPlatform &&
      <div className="bg-white my-5 rounded-10 p-2 min-h-[40px]">
        {platform.length > 0 && (
          <div>
            {platform.map((platforms: string) => (
              <div key={platforms}>{platforms}</div>
            ))}
          </div>
        )}
        {platform.length === 0 && (
          <div className="text-gray-500 text-center">Preview Platforms</div>
        )}
      </div>
      }

      { needMessage &&
      <div className="prevText my-5 bg-white rounded-10 p-2 h-[200px] overflow-y-auto">
        {writeup !== "" ? (
          <p className="break-all">{writeup}</p>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Preview Message</p>
          </div>
        )}
      </div>
      }

      <div className="rounded-10 w-full">
        {attachmentType === "video" && previewVideo ? (
          <video className="rounded- h-80 w-full" controls>
            <source
              className="w-full"
              src={previewVideo.src}
              type="video/mp4"
            />
            <source
              className="w-full"
              src={previewVideo.src}
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        ) : attachmentType === "image" && previewImage ? (
          <Image
            height={0}
            width={0}
            alt="influencer"
            src={previewImage.src}
            className="mx-auto w-full rounded-10 h-80"
          />
        ) : (
          <div className="my-5 flex justify-center items-center bg-white rounded-10 p-2 h-[300px]">
            <p className="text-gray-500 text-center">Preview Media</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
