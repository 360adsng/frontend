"use client";

import type { ReactNode } from "react";
import CreativeMedia from "@components/ui/CreativeMedia";
import { ClickableCampaignImage } from "@components/campaign/ClickableCampaignImage";
import { SectionLabel } from "@components/campaign/CampaignDetailShared";

export function CampaignBillboardAssetsSection({
  creativeKind,
  creativeImageUrl,
  creativeVideoUrl,
  creativeEmptyMessage = "No creative uploaded yet",
  creativeUnavailable = false,
  creativeUnavailableMessage = "Creative assets are not available for rejected bookings.",
  listingImageUrl,
  listingName,
  activeProofImageUrl,
  activeProofEmptyMessage = "No activation proof yet",
  arconPanel,
  underCreativeActions,
}: {
  creativeKind?: string | null;
  creativeImageUrl?: string | null;
  creativeVideoUrl?: string | null;
  creativeEmptyMessage?: string;
  creativeUnavailable?: boolean;
  creativeUnavailableMessage?: string;
  listingImageUrl?: string | null;
  listingName?: string | null;
  activeProofImageUrl?: string | null;
  activeProofEmptyMessage?: string;
  arconPanel?: ReactNode;
  underCreativeActions?: ReactNode;
}) {
  const hasCreative = Boolean(
    creativeImageUrl?.trim() || creativeVideoUrl?.trim(),
  );

  return (
    <div className="space-y-4 px-5 pb-6 sm:px-7">
      <div className="rounded-2xl border-2 border-amber-200/90 bg-[#FAFAF8] p-4 sm:p-5">
        <SectionLabel>Campaign creative</SectionLabel>
        <div className="mt-2">
          {creativeUnavailable ? (
            <p className="py-12 text-center text-sm text-stone-600">
              {creativeUnavailableMessage}
            </p>
          ) : hasCreative ? (
            <CreativeMedia
              creativeKind={creativeKind}
              creativeImageUrl={creativeImageUrl}
              creativeVideoUrl={creativeVideoUrl}
              hideActions
              featured
              enlargeOnClick
            />
          ) : (
            <p className="py-12 text-center text-sm text-stone-500">
              {creativeEmptyMessage}
            </p>
          )}
        </div>
        {underCreativeActions && !creativeUnavailable && hasCreative ? (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-stone-200/80 pt-4">
            {underCreativeActions}
          </div>
        ) : null}
      </div>

      {arconPanel}

      <div className="grid gap-4 sm:grid-cols-2">
        <ClickableCampaignImage
          title="Billboard"
          src={listingImageUrl}
          alt={listingName ?? "Billboard"}
          emptyMessage="No image"
        />
        <ClickableCampaignImage
          title="Active proof"
          src={activeProofImageUrl}
          alt="Activation proof"
          emptyMessage={activeProofEmptyMessage}
        />
      </div>
    </div>
  );
}

