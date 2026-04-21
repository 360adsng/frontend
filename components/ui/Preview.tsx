;

const Preview = ({
  previewImage,
  attachmentType,
  previewVideo,
  externalVideoUrl,
  needMessage,
  platform,
  needPlatform,
  writeup,
  plan,
  selectedDate,
  durationText,
}: PreviewProps) => {
  const yt = (() => {
    const raw = externalVideoUrl?.trim();
    if (!raw) return null;
    try {
      const u = new URL(raw);
      const host = u.hostname.replace(/^www\./, "");
      if (host === "youtu.be") {
        const id = u.pathname.split("/").filter(Boolean)[0];
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
      if (host === "youtube.com" || host === "m.youtube.com") {
        const id = u.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }
    } catch {
      // ignore
    }
    return null;
  })();

  return (
    <div className="">
      <h4 className="font-bold text-xl my-3">Preview</h4>
      <div className="bg-white my-5 rounded-10 p-2 min-h-[40px]">
        {durationText?.trim() ? <div>{durationText}</div> : null}
        {plan === "Immediate" && (
          <div>
            This ad will run once, immediately after payment is confirmed.
          </div>
        )}
        {plan === "Days" && (
          <div>
            This ad will run on selected day(s):
            {selectedDate.map((day: valuePiece, i) => (
              <div key={i}>{day?.toDateString()}</div>
            ))}
          </div>
        )}
        {plan === "Weeks" && !durationText?.trim() && (
          <div>Choose a start date and number of weeks to preview.</div>
        )}
        {plan === "Months" && !durationText?.trim() && (
          <div>Choose a start date and number of months to preview.</div>
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
        {attachmentType === "video" ? (
          previewVideo ? (
            <video className="rounded- h-80 w-full" controls>
              <source className="w-full" src={previewVideo.src} type="video/mp4" />
              <source className="w-full" src={previewVideo.src} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          ) : yt ? (
            <iframe
              className="w-full h-80 rounded-10"
              src={yt}
              title="Video preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : externalVideoUrl?.trim() ? (
            <div className="my-5 bg-white rounded-10 p-4">
              <div className="text-stone-500 text-sm mb-2">Video link</div>
              <a
                className="text-ads360yellow-100 break-all"
                href={externalVideoUrl}
                target="_blank"
                rel="noreferrer"
              >
                {externalVideoUrl}
              </a>
            </div>
          ) : (
            <div className="my-5 flex justify-center items-center bg-white rounded-10 p-2 h-[300px]">
              <p className="text-gray-500 text-center">Paste a video link to preview</p>
            </div>
          )
        ) : attachmentType === "image" && previewImage ? (
          <img alt="influencer"
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
