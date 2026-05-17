import { createFileRoute } from "@tanstack/react-router";
import BackBtn from "@components/buttons/BackBtn";

function ArcOnLearnPage() {
  return (
    <section className="bg-[#E9E9E9] px-4 py-24 md:px-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
        <BackBtn>Billboard onboarding</BackBtn>
        <h1 className="mt-6 text-2xl font-bold text-neutral-900">
          What is ARCON? (dummy copy)
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700">
          The Architects Registration Council of Nigeria (ARCON) regulates how
          built-environment professionals advertise certain kinds of work. For
          out-of-home placements, a certificate or clearance may be required so
          your creative complies with professional advertising rules.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-neutral-700">
          This page is placeholder content. Your legal and compliance team should
          replace it with accurate guidance, timelines, and links to official
          ARCON channels before go-live.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>Dummy bullet: when a certificate is required vs optional.</li>
          <li>Dummy bullet: typical documents vendors upload (PDF scans).</li>
          <li>Dummy bullet: how 360ads can assist with expedited filing.</li>
        </ul>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_usersauth/ads/billboard/learn/arcon/")({
  component: ArcOnLearnPage,
});
