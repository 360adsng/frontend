;
import { Link, createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

import { Modal } from "@components/modal/modal";
import BackBtn from "@components/buttons/BackBtn";
import Steps from "@components/ui/Steps";
import { useInfluencerDirectory } from "@endpoint/influencer/useInfluencer";

const FALLBACK_PHOTO = "/icons/user.png";

function Influencer() {
  const [showDetails, setShowDetails] = useState(false);
  const [wishlist, setWishlist] = useState([4, 8, 2, 9]);
  const [q, setQ] = useState("");
  const [influencerType, setInfluencerType] = useState<string>("");
  const [allowNegotiation, setAllowNegotiation] = useState<string>("");
  const [page, setPage] = useState(1);
  const limit = 12;
  
  const handleWishlist = (influencerId: number) => {
    if (wishlist.includes(influencerId)) {
      setWishlist(wishlist.filter((item) => item !== influencerId));
    } else {
      setWishlist((prev) => [...prev, influencerId]);
    }
  };

  const query = useMemo(() => {
    const allow =
      allowNegotiation === "" ? undefined : allowNegotiation === "true";
    return {
      page,
      limit,
      q: q.trim() || undefined,
      influencerType: influencerType || undefined,
      allowNegotiation: allow,
    };
  }, [allowNegotiation, influencerType, limit, page, q]);

  const dir = useInfluencerDirectory(query);
  const influencers = dir.data?.items ?? [];
  const totalPages = dir.data?.totalPages ?? 1;

  const fmtFollowers = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return String(n);
  };

  return (
    <>
      <section className="px-4 md:px-10 py-24">
    
        <BackBtn>influencer Marketing</BackBtn>

    <Steps step={2} text="#2 - Onboarding"/>


        <section className="lg:flex my-5">
          <div className="basis-4/5">
            <div className="md:px-5 mb-4">
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                placeholder="Search influencer by media name..."
                className="w-full md:w-1/2 rounded border bg-white p-2 focus:outline-none"
              />
            </div>

            {dir.isLoading ? (
              <div className="md:px-5 text-sm text-gray-600">Loading...</div>
            ) : dir.isError ? (
              <div className="md:px-5 text-sm text-red-600">
                Could not load influencers.
              </div>
            ) : (
              <div className="gap-5 md:px-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {influencers.map((influencer) => (
          
              <div
                key={influencer.id}
                className="bg-white rounded-10 grid grid-cols-2 gap-2"
              >
                <div className="p-1">
                <Link to={`/ads/influencer/${influencer.id}`}>
                  <img
                    alt=""
                    src={influencer.photo || FALLBACK_PHOTO}
                    className="w-full h-32 rounded-10 object-cover"
                  />
                  </Link>
                </div>
                <div className="relative grid grid-cols-1 content-center">
                  {influencer.allowNegotiation ? (
                    <p className="text-xs rounded-tr-10 text-ads360light-100 p-1 bg-ads360yellow-100 absolute top-0 right-0">
                      Negotiable
                    </p>
                  ) : null}
                  <h2 className="font-bold truncate ...">{influencer.mediaName}</h2>
                  <div className="text-sm text-gray-400">
                  <p>Influencer</p>
                  <p>{fmtFollowers(influencer.followers)} followers</p>
                  </div>
                  <div className="font-semibold text-ads360yellowBtn-100 hover:bg-ads360yellowBtn-100/30 hover:rounded-full flex justify-center w-8 h-8 p-2">
                    {
                      wishlist.includes(influencer.id) ? <button onClick={()=>handleWishlist(influencer.id)}><BsSuitHeartFill size={20}/></button>
                      :<button onClick={()=>handleWishlist(influencer.id)}><BsSuitHeart size={20}/></button>
                    }
                  </div>
  
               
                 
                </div>
              </div>
         
                ))}
              </div>
            )}

            <div className="md:px-5 mt-6 flex items-center justify-between">
              <button
                className="rounded border bg-white px-3 py-2 text-sm disabled:opacity-50"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <div className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </div>
              <button
                className="rounded border bg-white px-3 py-2 text-sm disabled:opacity-50"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>


          <div className="basis-1/5 text-sm">
            <div className="top-[12.5rem] sticky rounded p-3 border border-ads360yellow-100 bg-white hidden lg:block">
              <p>Filter influencer</p>

              <div className="my-2">
                <p>influencer Type</p>
                <select
                  className="p-2 w-full border focus:outline-none rounded"
                  value={influencerType}
                  onChange={(e) => {
                    setInfluencerType(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All</option>
                  <option value="influencer">Influencer</option>
                  <option value="content creator">Content creator</option>
                  <option value="brand">Brand</option>
                  <option value="agency">Agency</option>
                  <option value="advertiser">Advertiser</option>
                  <option value="marketing agency">Marketing agency</option>
                  <option value="ad network">Ad network</option>
                  <option value="actor">Actor</option>
                  <option value="actress">Actress</option>
                  <option value="model">Model</option>
                  <option value="musician">Musician</option>
                  <option value="dancer">Dancer</option>
                  <option value="comedian">Comedian</option>
                  <option value="writer">Writer</option>
                  <option value="director">Director</option>
                  <option value="producer">Producer</option>
                  <option value="editor">Editor</option>
                  <option value="photographer">Photographer</option>
                  <option value="videographer">Videographer</option>
                  <option value="graphic designer">Graphic designer</option>
                  <option value="seo specialist">SEO specialist</option>
                  <option value="social media manager">Social media manager</option>
                  <option value="social media specialist">Social media specialist</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="my-2">
                <p>Status</p>
                <select
                  className="p-2 w-full border focus:outline-none rounded"
                  value={allowNegotiation}
                  onChange={(e) => {
                    setAllowNegotiation(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All</option>
                  <option value="true">Negotiable</option>
                  <option value="false">Non Negotiable</option>
                </select>
              </div>

              <button
                className='bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3 text-white w-full h-10'
                onClick={() => setPage(1)}
              >
                Apply
              </button>
            </div>
          </div>
        </section>
      </section>

      <Modal isOpen={showDetails}>
                    <div className="bg-white p-3 w-10/12 md:w-9/12 mx-auto rounded-10">
                    <button onClick={()=>setShowDetails(false)}>
                      close
                      </button>

                    </div>
                  </Modal>
    </>
  );
}

export const Route = createFileRoute("/_usersauth/ads/influencer/")({
  component: Influencer,
})

export default Influencer
