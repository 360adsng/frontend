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

  const hasSchedule =
    Boolean(durationText?.trim()) ||
    plan === "Days" ||
    plan === "Weeks" ||
    plan === "Months";

  return (
    <aside className="sticky top-24">
      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
        <div className="border-b border-stone-100 bg-[#F7F7F5] px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-500">
            Live preview
          </p>
          <p className="mt-0.5 text-sm text-stone-600">
            How your booking will look before checkout
          </p>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-xl border border-stone-200/80 bg-[#F7F7F7] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
              Schedule
            </p>
            {durationText?.trim() ? (
              <p className="mt-2 text-sm font-medium text-stone-900">
                {durationText}
              </p>
            ) : null}
            {plan === "Days" && selectedDate.length > 0 ? (
              <ul className="mt-2 space-y-1 text-sm text-stone-700">
                {selectedDate.map((day: valuePiece, i) => (
                  <li key={i} className="rounded-md bg-white px-2 py-1">
                    {day?.toDateString()}
                  </li>
                ))}
              </ul>
            ) : null}
            {plan === "Weeks" && !durationText?.trim() ? (
              <p className="mt-2 text-sm text-stone-500">
                Pick a start date and number of weeks.
              </p>
            ) : null}
            {plan === "Months" && !durationText?.trim() ? (
              <p className="mt-2 text-sm text-stone-500">
                Pick a start date and number of months.
              </p>
            ) : null}
            {!hasSchedule ? (
              <p className="mt-2 text-sm text-stone-400 italic">
                Select a duration plan to preview dates.
              </p>
            ) : null}
          </div>

          {needPlatform ? (
            <div className="rounded-xl border border-stone-200/80 bg-[#F7F7F7] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                Platforms
              </p>
              {platform.length > 0 ? (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {platform.map((p: string) => (
                    <li
                      key={p}
                      className="rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-stone-700 ring-1 ring-stone-200"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-stone-400 italic">
                  Select at least one platform.
                </p>
              )}
            </div>
          ) : null}

          {needMessage ? (
            <div className="rounded-xl border border-stone-200/80 bg-[#F7F7F7] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                Message
              </p>
              {writeup?.trim() ? (
                <p className="mt-2 max-h-28 overflow-y-auto text-sm text-stone-800 whitespace-pre-wrap break-words">
                  {writeup}
                </p>
              ) : (
                <p className="mt-2 text-sm text-stone-400 italic">
                  Your campaign brief will appear here.
                </p>
              )}
            </div>
          ) : null}

          <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-900/5">
            <p className="border-b border-stone-200/80 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-stone-500">
              Creative
            </p>
            <div className="flex min-h-[220px] items-center justify-center bg-stone-100 p-2">
              {attachmentType === "video" ? (
                previewVideo ? (
                  <video className="max-h-64 w-full rounded-lg" controls>
                    <source src={previewVideo.src} type="video/mp4" />
                    <source src={previewVideo.src} type="video/webm" />
                  </video>
                ) : yt ? (
                  <iframe
                    className="aspect-video w-full max-h-64 rounded-lg"
                    src={yt}
                    title="Video preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : externalVideoUrl?.trim() ? (
                  <a
                    className="break-all px-3 text-center text-sm font-medium text-amber-800 hover:underline"
                    href={externalVideoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open video link
                  </a>
                ) : (
                  <p className="px-4 text-center text-sm text-stone-500">
                    Paste a video link to preview
                  </p>
                )
              ) : attachmentType === "image" && previewImage ? (
                <img
                  alt="Creative preview"
                  src={previewImage.src}
                  className="max-h-64 w-full rounded-lg object-contain"
                />
              ) : (
                <p className="px-4 text-center text-sm text-stone-500">
                  Upload an image to preview
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Preview;
