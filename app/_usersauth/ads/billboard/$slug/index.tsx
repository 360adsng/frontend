const led = "/icons/led.svg";
const duration = "/icons/duration.svg";
const impression = "/icons/impression.svg";
const dash = "/icons/dash.svg";

import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Modal } from "@components/modal/modal";
import { motion, AnimatePresence } from "framer-motion";
import BackBtn from "@components/buttons/BackBtn";
import {
  BillboardDetailMainColumn,
  BillboardDetailPricingColumn,
} from "@components/billboard/BillboardDetailInfo";
import { useBillboardListing } from "@endpoint/billboard/useBillboard";
import {
  boardTypeLabel,
  formatListingDate,
  formatRuntime,
} from "@lib/billboardDisplay";

const Billboard = () => {
  const { slug } = Route.useParams();
  const parsed = Number.parseInt(slug, 10);
  const listingId =
    Number.isFinite(parsed) && parsed > 0 ? parsed : null;

  const { data: bb, isPending, isError, error, refetch } =
    useBillboardListing(listingId);

  const [view, setView] = useState("Billboard Overview");
  const [preview, setPreview] = useState(false);

  if (listingId == null) {
    return (
      <section className="bg-[#E9E9E9] px-4 md:px-10 pt-24">
        <BackBtn> Billboard Details</BackBtn>
        <p className="mt-4 text-red-700">Invalid billboard link.</p>
      </section>
    );
  }

  if (isPending) {
    return (
      <section className="bg-[#E9E9E9] px-4 md:px-10 pt-24">
        <BackBtn> Billboard Details</BackBtn>
        <p className="mt-4 text-stone-500">Loading billboard…</p>
      </section>
    );
  }

  if (isError || !bb) {
    return (
      <section className="bg-[#E9E9E9] px-4 md:px-10 pt-24">
        <BackBtn> Billboard Details</BackBtn>
        <div className="mt-4 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p>
            {error instanceof Error
              ? error.message
              : "Could not load this billboard."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-2 underline"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  const displayLine =
    bb.durationPerDisplay != null
      ? `${bb.durationPerDisplay}s per display`
      : "—";

  return (
    <>
      <section className="bg-[#E9E9E9] px-4 md:px-10 pt-24">
        <div className="mx-auto w-full max-w-6xl">
          <BackBtn> Billboard Details</BackBtn>

          <p className="mb-4 mt-3 text-sm text-stone-500">
            View full details and proceed to checkout
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setView("Billboard Overview")}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                view === "Billboard Overview"
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              Overview
            </button>

            <button
              type="button"
              onClick={() => setView("License Agreement")}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                view === "License Agreement"
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              License agreement
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {view === "Billboard Overview" && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                ease: "easeOut",
                duration: 0.15,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
              transition: {
                ease: "easeIn",
                duration: 0.15,
              },
            }}
          >
            <section className="bg-[#E9E9E9] px-4 py-8 md:px-10">
              <div className="mx-auto w-full max-w-6xl">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="space-y-6 lg:col-span-2">
                    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                      <button
                        type="button"
                        onClick={() => setPreview(true)}
                        className="block w-full"
                      >
                        <img
                          src={bb.imageUrl}
                          alt={bb.name}
                          className="h-[260px] w-full object-cover md:h-[360px]"
                        />
                      </button>

                      <div className="flex flex-wrap gap-2 border-t border-neutral-200 p-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
                          <img src={impression} alt="" className="h-4 w-4" />
                          {displayLine}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800">
                          <img src={duration} alt="" className="h-4 w-4" />
                          {formatRuntime(bb)}
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800">
                          <img src={led} alt="" className="h-4 w-4" />
                          {boardTypeLabel(bb.boardType)}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                      <BillboardDetailMainColumn bb={bb} showOwnerCompanyName />
                    </div>
                  </div>

                  <BillboardDetailPricingColumn
                    bb={bb}
                    actions={
                      <Link
                        to="/ads/billboard/$slug/onboard"
                        params={{ slug: String(bb.id) }}
                        search={{ data: bb }}
                        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-ads360yellow-100 px-4 text-sm font-semibold text-white hover:opacity-95"
                      >
                        Select billboard
                      </Link>
                    }
                  />
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {view === "License Agreement" && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                ease: "easeOut",
                duration: 0.15,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
              transition: {
                ease: "easeIn",
                duration: 0.15,
              },
            }}
          >
            <section className="px-4 md:px-14 lg:px-24 py-14">
              <h3 className="my-3 text-2xl font-semibold">Parties Involved</h3>
              <p>
                360ads - NG is an investment platform, that enables Africans to
                purchase fractional shares of global real estate assets.
                Meristem Trustees - Investments & Assets are managed by SEC-
                regulated Meristem trustees
              </p>

              <h3 className="my-3 text-2xl font-semibold">Negotiations</h3>
              <p>
                {bb.isNegotiable
                  ? "Pricing and terms may be negotiated according to platform rules."
                  : "Pricing for this placement is fixed as listed."}
              </p>

              <p className="mt-6 text-sm text-neutral-500">
                Listing #{bb.id} · Terms snapshot as of{" "}
                {formatListingDate(bb.updatedAt)}.
              </p>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal isOpen={preview}>
        <div className="transition duration-500">
          <div className="fixed w-full left-0 top-[30%]  md:left-[20%] md:top-[10%] md:w-2/3 z-[1000000000]">
            <img
              src={bb.imageUrl}
              alt={bb.name}
              className="rounded-10 w-full"
            />
          </div>

          <div
            role="presentation"
            onClick={() => setPreview(false)}
            className="fixed w-full px-5 py-10 bg-black/20 top-0 left-0 h-full z-[100000]"
          />
        </div>
      </Modal>
    </>
  );
};

export const Route = createFileRoute("/_usersauth/ads/billboard/$slug/")({
  component: Billboard,
});

export default Billboard;
