"use client";

import { useState } from "react";
import {
  MediaLightbox,
  type LightboxPayload,
} from "@components/ui/MediaLightbox";
import { SectionLabel } from "@components/campaign/CampaignDetailShared";

export function ClickableCampaignImage({
  title,
  src,
  alt,
  emptyMessage,
  maxHeightClass = "max-h-52",
}: {
  title: string;
  src?: string | null;
  alt: string;
  emptyMessage: string;
  maxHeightClass?: string;
}) {
  const [lightbox, setLightbox] = useState<LightboxPayload | null>(null);
  const url = src?.trim() ?? "";

  return (
    <div className="flex min-h-[160px] flex-col rounded-2xl border border-dashed border-amber-200/80 bg-[#FAFAF8] p-4">
      <SectionLabel>{title}</SectionLabel>
      <div className="flex flex-1 flex-col justify-center">
        {url ? (
          <>
            <button
              type="button"
              className="group relative w-full cursor-zoom-in text-left"
              onClick={() =>
                setLightbox({ type: "image", url, title: alt })
              }
              title="Click to enlarge"
            >
              <img
                src={url}
                alt={alt}
                className={`w-full rounded-lg border border-stone-200 bg-white object-contain ${maxHeightClass}`}
              />
              <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white opacity-0 transition group-hover:opacity-100">
                Enlarge
              </span>
            </button>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs font-medium text-ads360yellow-100 underline underline-offset-2"
            >
              Open in new tab
            </a>
            <MediaLightbox
              payload={lightbox}
              onClose={() => setLightbox(null)}
            />
          </>
        ) : (
          <p className="py-8 text-center text-sm text-stone-500">
            {emptyMessage}
          </p>
        )}
      </div>
    </div>
  );
}
