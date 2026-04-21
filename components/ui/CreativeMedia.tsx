"use client";

import { useMemo } from "react";
import { toast } from "sonner";

type CreativeMediaProps = {
  creativeKind?: string | null;
  creativeImageUrl?: string | null;
  creativeVideoUrl?: string | null;
  className?: string;
  /** When true, only show media (no copy/open buttons) */
  hideActions?: boolean;
  /** Shown when there is no URL (default copy is for “not uploaded yet”). */
  emptyMessage?: string | null;
};

function youtubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
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
    // ignore invalid URL
  }
  return null;
}

async function copyText(text: string) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
      return;
    }
  } catch {
    // ignore
  }
  toast.error("Unable to copy");
}

export default function CreativeMedia({
  creativeKind,
  creativeImageUrl,
  creativeVideoUrl,
  className,
  hideActions = false,
  emptyMessage,
}: CreativeMediaProps) {
  const kind = String(creativeKind ?? "").toLowerCase();
  const url = (kind === "video" ? creativeVideoUrl : creativeImageUrl)?.trim() || "";
  const yt = useMemo(() => (url ? youtubeEmbed(url) : null), [url]);

  if (!url) {
    return (
      <div className={className ?? ""}>
        <div className="bg-white rounded-10 p-4 text-center text-stone-500 border">
          {emptyMessage?.trim() ||
            "No creative uploaded for this booking yet."}
        </div>
      </div>
    );
  }

  const canDownload = kind !== "video";

  return (
    <div className={className ?? ""}>
      {kind === "video" ? (
        yt ? (
          <iframe
            className="w-full h-80 rounded-10"
            src={yt}
            title="Creative video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="bg-white rounded-10 p-4 border">
            <div className="text-stone-500 text-sm mb-2">Video link</div>
            <a
              className="text-ads360yellow-100 break-all"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              {url}
            </a>
          </div>
        )
      ) : (
        <img
          alt="Creative"
          src={url}
          className="mx-auto w-full rounded-10 max-h-[420px] object-contain bg-white border"
        />
      )}

      {!hideActions ? (
        <div className="mt-3 flex flex-wrap gap-2 justify-end">
          <button
            type="button"
            className="px-3 py-2 rounded bg-white border hover:bg-stone-50 text-sm"
            onClick={() => copyText(url)}
          >
            Copy URL
          </button>
          <a
            className="px-3 py-2 rounded bg-ads360black-100/95 hover:bg-ads360black-100 text-ads360light-100 text-sm"
            href={url}
            target="_blank"
            rel="noreferrer"
            download={canDownload ? "" : undefined}
          >
            {canDownload ? "Download" : "Open"}
          </a>
        </div>
      ) : null}
    </div>
  );
}

