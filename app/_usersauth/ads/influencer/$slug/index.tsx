import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Modal } from "@components/modal/modal";
import BackBtn from "@components/buttons/BackBtn";
import { useInfluencerDirectoryById } from "@endpoint/influencer/useInfluencer";
import { FaUsers } from "react-icons/fa";

const FALLBACK_PHOTO = "/icons/user.png";

function fmtFollowers(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

const InfluencerDetails = () => {
  const [preview, setPreview] = useState(false);
  const { slug } = Route.useParams();
  const id = Number(slug);
  const q = useInfluencerDirectoryById(
    Number.isFinite(id) && id > 0 ? id : 0,
  );
  const influencer = q.data;

  return (
    <>
      <section className="min-h-screen bg-[#E9E9E9] px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-6xl">
          <BackBtn>Influencer details</BackBtn>
          <p className="mt-2 text-sm text-stone-500">
            View profile, platforms, and rates before booking a campaign.
          </p>

          {q.isLoading ? (
            <p className="mt-10 text-center text-stone-600">Loading…</p>
          ) : null}

          {q.isError || (!q.isLoading && !influencer) ? (
            <p className="mt-10 text-center text-red-600">
              Could not load influencer details.
            </p>
          ) : null}

          {!q.isLoading && influencer ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-amber-200/40 bg-white shadow-sm">
              <div className="flex flex-col gap-8 p-5 md:flex-row md:p-8">
                <button
                  type="button"
                  onClick={() => setPreview(true)}
                  className="mx-auto shrink-0 overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 md:mx-0"
                >
                  <img
                    src={influencer.photo || FALLBACK_PHOTO}
                    alt={influencer.mediaName}
                    className="h-56 w-56 object-cover md:h-64 md:w-64"
                  />
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-serif text-2xl font-medium text-stone-900 md:text-3xl">
                      {influencer.mediaName}
                    </h1>
                    {influencer.allowNegotiation ? (
                      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
                        Negotiable
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-2 text-sm text-stone-600">
                    {fmtFollowers(influencer.followers)} total followers ·{" "}
                    <span className="capitalize">{influencer.influencerType}</span>
                  </p>

                  <div className="mt-5 rounded-xl border border-stone-200/80 bg-[#F7F7F5] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                      Bio
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-stone-800">
                      {influencer.bio?.trim()
                        ? influencer.bio
                        : "No bio provided."}
                    </p>
                  </div>

                  <Link
                    to="/ads/influencer/$slug/onboarding"
                    params={{ slug: String(influencer.id) }}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-ads360yellow-100 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                  >
                    Select influencer
                  </Link>
                </div>
              </div>

              <div className="border-t border-stone-100 px-5 py-6 md:px-8">
                <h2 className="font-serif text-xl text-stone-900">Platforms</h2>
                {influencer.platforms.length === 0 ? (
                  <p className="mt-3 text-sm text-stone-500">
                    No platforms added yet.
                  </p>
                ) : (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {influencer.platforms.map((p) => (
                      <li
                        key={p.id}
                        className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
                      >
                        <p className="font-semibold capitalize text-stone-900">
                          {p.name}
                        </p>
                        <p className="mt-1 truncate text-xs text-stone-500">
                          {p.platformUrl}
                        </p>
                        <p className="mt-2 text-sm text-stone-600">
                          @{p.username}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                          <span
                            className="inline-flex items-center gap-1 text-stone-600"
                            title="Followers"
                          >
                            <FaUsers className="h-3.5 w-3.5" aria-hidden />
                            {fmtFollowers(p.numberOfFollowers)}
                          </span>
                          <span className="font-semibold text-stone-900">
                            ₦{Number(p.amountRate || 0).toLocaleString()}
                            <span className="font-normal text-stone-500">
                              {" "}
                              / post
                            </span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <Modal isOpen={preview}>
        <div className="relative mx-auto max-w-2xl rounded-2xl bg-white p-4 shadow-xl">
          <button
            type="button"
            onClick={() => setPreview(false)}
            className="absolute right-3 top-3 rounded-full bg-stone-100 px-2 py-1 text-sm text-stone-700"
          >
            Close
          </button>
          <img
            src={influencer?.photo || FALLBACK_PHOTO}
            alt={influencer?.mediaName ?? "Influencer"}
            className="w-full rounded-xl object-contain"
          />
        </div>
      </Modal>
    </>
  );
};

export const Route = createFileRoute("/_usersauth/ads/influencer/$slug/")({
  component: InfluencerDetails,
});
