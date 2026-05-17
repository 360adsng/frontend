const fs = require("fs");
const p =
  "c:/Users/user/OneDrive/Desktop/360/360frontend/app/_usersauth/ads/billboard/$slug/onboard/index.tsx";
const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);
const head = lines.slice(0, 325).join("\n");
const tail = `
      <section className="min-h-screen bg-[#E9E9E9] px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
      <BackBtn>billboard Marketing</BackBtn>
      <Steps step={3} text="#3 - Completing"/>

      <p className="mt-2 text-center text-sm text-stone-500">
        Provide campaign schedule, creative, and compliance details
      </p>

      <section className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="w-full space-y-5 lg:max-w-xl">
          <BillboardOnboardFormExtras
            listing={listing}
            listingLoading={listingLoading}
            arconChoice={arconChoice}
            certificateFile={arconCertificateFile}
            onCertificateChange={setArconCertificateFile}
            turnaround={arconTurnaround}
            onTurnaroundChange={setArconTurnaround}
          />

          <CampaignScheduleFields
            plan={plan}
            onPlanChange={handlePlan}
            selectedDate={selectedDate}
            addDate={addDate}
            removeDate={removeDate}
            startWeek={startWeek}
            startMonth={startMonth}
            onDurationChange={handleDuration}
            minStartDate={isoDateOnly(startOfToday())}
          />

          <BillboardCreativeSection
            attachmentType={attachmentType}
            setAttachmentType={setAttachmentType}
            imageFile={imageFile}
            onImageChange={handleChange}
            creativeVideoUrl={creativeVideoUrl}
            onVideoUrlChange={(url) => {
              setCreativeVideoUrl(url);
              setImageFile(null);
              setPreviewImage(undefined);
            }}
            dimensionHint={\`Required dimensions: \${listing?.pixelWidth ?? listing?.width ?? "—"}px × \${listing?.pixelHeight ?? listing?.height ?? "—"}px (W × H)\`}
          />
        </div>

        <div className="w-full flex-1 lg:max-w-md">
          <Preview
            previewImage={previewImage as Preview}
            attachmentType={attachmentType}
            previewVideo={undefined}
            externalVideoUrl={attachmentType === "video" ? creativeVideoUrl : undefined}
            platform={platform}
            needPlatform={false}
            needMessage={false}
            writeup=""
            plan={plan}
            selectedDate={selectedDate}
            durationText={durationText}
          />
        </div>
      </section>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={createBooking.isPending}
          className="rounded-xl bg-ads360yellow-100 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 disabled:opacity-60"
        >
          {createBooking.isPending ? "Saving..." : "Continue to checkout"}
        </button>
      </div>

      <Toaster position="top-center" closeButton />
      </div>
    </section>
    </>
  );
}

export const Route = createFileRoute("/_usersauth/ads/billboard/$slug/onboard/")({
  validateSearch: (
    raw: Record<string, unknown>,
  ): { data?: PublicBillboardListing } => ({
    data: raw.data as PublicBillboardListing | undefined,
  }),
  component: Onboard,
});
`;
fs.writeFileSync(p, head + tail.replace(/div/g, "div"));
console.log("patched");
