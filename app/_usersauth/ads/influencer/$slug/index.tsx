;
import { Link, createFileRoute, useParams } from '@tanstack/react-router';
import { useMemo, useState } from "react";
import { Modal } from "@components/modal/modal";
import BackBtn from "@components/buttons/BackBtn";
import { useInfluencerDirectoryById } from "@endpoint/influencer/useInfluencer";

const FALLBACK_PHOTO = "/icons/user.png";

const InfluencerDetails = () => {

  const [preview, setPreview] = useState(false);

  const params = useParams({ from: "/_usersauth/ads/influencer/$slug/" });
  const id = Number((params as any).slug);

  const q = useInfluencerDirectoryById(id);
  const influencer = q.data;

  const fmtFollowers = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return String(n);
  };

  return (
    <>
      <section className="bg-[#E9E9E9] px-4 md:px-10 pt-24 pb-7">
        <BackBtn>influencer Details</BackBtn>

        <p className="text-stone-400 mb-5 mt-3">
          View full details of influencer and proceed to checkout
        </p>

      </section>

      
            <section className="md:flex py-14 mx-auto w-11/12 md:w-10/12 lg:w-8/12">
              {q.isLoading ? (
                <div className="text-sm text-gray-600">Loading...</div>
              ) : q.isError || !influencer ? (
                <div className="text-sm text-red-600">
                  Could not load influencer details.
                </div>
              ) : (
                <>
                  <div className="md:px-3 lg:px-6 basis-2/3">
                    <img
                      src={influencer.photo || FALLBACK_PHOTO}
                      alt="influencer"
                      className="rounded-10 w-96 h-96 object-cover cursor-pointer"
                      onClick={() => setPreview(true)}
                    />

                    <div className="md:w-4/5">
                      <h3 className="flex items-center font-bold text-lg my-3">
                        {influencer.mediaName}
                        {influencer.allowNegotiation ? (
                          <span className="ml-2 text-xs rounded-full px-2 py-1 bg-ads360yellow-100 text-ads360light-100">
                            Negotiable
                          </span>
                        ) : null}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {fmtFollowers(influencer.followers)} followers •{" "}
                        {influencer.influencerType}
                      </p>

                      <p className="my-3">
                        <b>Bio:</b>{" "}
                        {influencer.bio?.trim()
                          ? influencer.bio
                          : "No bio provided."}
                      </p>
                    </div>
                  </div>

                  <div className="basis-1/3">
                    <h4 className="my-3 font-semibold">Platforms</h4>
                    {influencer.platforms.length === 0 ? (
                      <p className="text-sm text-gray-600">
                        No platforms added yet.
                      </p>
                    ) : (
                      influencer.platforms.map((p) => (
                        <div key={p.id} className="my-3 text-sm">
                          <p className="font-semibold capitalize">{p.name}</p>
                          <p className="text-gray-500 truncate">{p.platformUrl}</p>
                          <p className="text-gray-500">
                            @{p.username} • {fmtFollowers(p.numberOfFollowers)} followers
                          </p>
                          <p className="mt-1">
                            ₦{Number(p.amountRate || 0).toLocaleString()} (per post)
                          </p>
                        </div>
                      ))
                    )}

                    <div className="">
                      <button className="group my-5 rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 px-2 h-12">
                        <Link to={`/ads/influencer/${influencer.id}/onboarding`}>
                          Select influencer
                        </Link>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>

      

      <Modal isOpen={preview}>
        <div className="transition duration-500">
          <div className="fixed w-full left-0 top-[30%]  md:left-[20%] md:top-[10%] md:w-2/3 z-[1000000000]">
            <img
              src={influencer?.photo || FALLBACK_PHOTO}
              alt="influencer"
              className="rounded-10 w-full"
            />
          </div>

          <div
            onClick={() => setPreview(false)}
            className={`fixed w-full px-5 py-10 bg-black/20 top-0 left-0 h-full z-[100000]`}
          ></div>
        </div>
      </Modal>
    </>
  );
};

export const Route = createFileRoute("/_usersauth/ads/influencer/$slug/")({
  component: InfluencerDetails,
})

export default InfluencerDetails
