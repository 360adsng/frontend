import { createFileRoute } from "@tanstack/react-router";
import BackBtn from "@components/buttons/BackBtn";

function CreativeLearnPage() {
  return (
    <section className="bg-[#E9E9E9] px-4 py-24 md:px-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
        <BackBtn>Billboard onboarding</BackBtn>
        <h1 className="mt-6 text-2xl font-bold text-neutral-900">
          What is a “creative” here? (dummy copy)
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700">
          In billboard booking, your <strong>creative</strong> is the actual ad
          asset: the image file or the video link that will run on the face or
          screen. Specs usually follow the vendor&apos;s width and height (for
          print) or pixel dimensions and safe zones (for digital).
        </p>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700">
          This page is placeholder content. Replace it with brand guidelines,
          bleed/safe-area rules, and accepted formats before production.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>Dummy bullet: static print vs digital loop differences.</li>
          <li>Dummy bullet: colour profiles and proofing expectations.</li>
          <li>Dummy bullet: how ARCON relates to the creative you upload.</li>
        </ul>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_usersauth/ads/billboard/learn/creative/")({
  component: CreativeLearnPage,
});
