"use client";

import { useEffect } from "react";
import { Modal } from "@components/modal/modal";

export type LightboxPayload =
  | { type: "image"; url: string; title?: string }
  | { type: "video-file"; url: string; title?: string }
  | { type: "video-youtube"; embedUrl: string; openUrl: string; title?: string };

function openUrlForPayload(payload: LightboxPayload): string {
  if (payload.type === "video-youtube") return payload.openUrl;
  return payload.url;
}

export function MediaLightbox({
  payload,
  onClose,
}: {
  payload: LightboxPayload | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!payload) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [payload, onClose]);

  const openUrl = payload ? openUrlForPayload(payload) : null;

  return (
    <Modal isOpen={!!payload}>
      <div
        className="relative mx-auto flex max-h-[92vh] w-full max-w-5xl flex-col items-center justify-center px-4 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-black/60 px-3 py-1.5 text-sm font-semibold text-white hover:bg-black/80"
          aria-label="Close"
        >
          Close
        </button>

        {payload?.type === "image" ? (
          <img
            src={payload.url}
            alt={payload.title ?? "Enlarged media"}
            className="max-h-[78vh] w-full rounded-lg object-contain"
          />
        ) : null}

        {payload?.type === "video-file" ? (
          <video
            src={payload.url}
            controls
            playsInline
            className="max-h-[78vh] w-full rounded-lg bg-black"
          >
            <track kind="captions" />
          </video>
        ) : null}

        {payload?.type === "video-youtube" ? (
          <iframe
            className="aspect-video w-full max-h-[78vh] rounded-lg bg-black"
            src={payload.embedUrl}
            title={payload.title ?? "Creative video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : null}

        {openUrl ? (
          <a
            href={openUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 text-sm font-medium text-white underline underline-offset-2 hover:text-amber-100"
          >
            Open in new tab
          </a>
        ) : null}
      </div>
    </Modal>
  );
}
