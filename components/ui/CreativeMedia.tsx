"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  MediaLightbox,
  type LightboxPayload,
} from "@components/ui/MediaLightbox";

type CreativeMediaProps = {
  creativeKind?: string | null;
  creativeImageUrl?: string | null;
  creativeVideoUrl?: string | null;
  className?: string;
  /** When true, only show media (no copy/open buttons) */
  hideActions?: boolean;
  /** Shown when there is no URL (default copy is for “not uploaded yet”). */
  emptyMessage?: string | null;
  /** Larger preview for campaign detail hero */
  featured?: boolean;
  /** Click to open lightbox (default true when featured) */
  enlargeOnClick?: boolean;
};

export function youtubeEmbed(url: string): string | null {
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
  featured = false,
  enlargeOnClick,
}: CreativeMediaProps) {
  const [lightbox, setLightbox] = useState<LightboxPayload | null>(null);
  const kind = String(creativeKind ?? "").toLowerCase();
  const url =
    (kind === "video" ? creativeVideoUrl : creativeImageUrl)?.trim() || "";
  const yt = useMemo(() => (url ? youtubeEmbed(url) : null), [url]);
  const useLightbox = enlargeOnClick ?? featured;
  const imageMaxH = featured
    ? "max-h-[min(70vh,560px)]"
    : "max-h-[420px]";
  const videoFrameH = featured
    ? "h-[min(50vh,480px)] min-h-[280px]"
    : "h-80";

  if (!url) {
    return (
      <div className={className ?? ""}>
        <div className="rounded-10 border bg-white p-4 text-center text-stone-500">
          {emptyMessage?.trim() ||
            "No creative uploaded for this booking yet."}
        </div>
      </div>
    );
  }

  const canDownload = kind !== "video";

  const lightboxPayload: LightboxPayload | null =
    kind === "video"
      ? yt
        ? {
            type: "video-youtube",
            embedUrl: yt,
            openUrl: url,
            title: "Creative video",
          }
        : {
            type: "video-file",
            url,
            title: "Creative video",
          }
      : { type: "image", url, title: "Campaign creative" };

  const mediaInner =
    kind === "video" ? (
      yt ? (
        <iframe
          className={`pointer-events-auto w-full rounded-10 ${videoFrameH}`}
          src={yt}
          title="Creative video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <video
          src={url}
          controls
          playsInline
          className={`w-full rounded-10 bg-black object-contain ${videoFrameH}`}
        >
          <track kind="captions" />
        </video>
      )
    ) : (
      <img
        alt="Creative"
        src={url}
        className={`mx-auto w-full rounded-10 border bg-white object-contain ${imageMaxH}`}
      />
    );

  const openInTab = (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="mt-2 inline-block text-xs font-medium text-ads360yellow-100 underline underline-offset-2"
      onClick={(e) => e.stopPropagation()}
    >
      Open in new tab
    </a>
  );

  return (
    <div className={className ?? ""}>
      {useLightbox && kind === "video" && yt ? (
        <div>
          {mediaInner}
          <button
            type="button"
            className="mt-2 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800 hover:bg-stone-50"
            onClick={() => setLightbox(lightboxPayload)}
          >
            Enlarge video
          </button>
        </div>
      ) : useLightbox ? (
        <button
          type="button"
          className="group relative w-full cursor-zoom-in text-left"
          onClick={() => setLightbox(lightboxPayload)}
          title="Click to enlarge"
        >
          {mediaInner}
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white opacity-0 transition group-hover:opacity-100">
            Enlarge
          </span>
        </button>
      ) : (
        mediaInner
      )}

      {useLightbox ? openInTab : null}

      <MediaLightbox payload={lightbox} onClose={() => setLightbox(null)} />

      {!hideActions ? (
        <div className="mt-3 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            className="rounded border bg-white px-3 py-2 text-sm hover:bg-stone-50"
            onClick={() => copyText(url)}
          >
            Copy URL
          </button>
          <a
            className="rounded bg-ads360black-100/95 px-3 py-2 text-sm text-ads360light-100 hover:bg-ads360black-100"
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
