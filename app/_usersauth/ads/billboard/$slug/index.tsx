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
        <BackBtn> Billboard Details</BackBtn>

        <p className="text-stone-400 mb-5 mt-3">
          View full details of billboard and proceed to checkout
        </p>
        <div className="w-full flex text-sm md:text-base justify-between md:justify-start md:space-x-3">
          <button type="button" onClick={() => setView("Billboard Overview")}>
            Billboard Overview
            {view === "Billboard Overview" && (
              <img
                alt="Billboard Overview selected"
                src={dash}
                className="w-2/3 mx-auto relative top-[4px] -left-2"
              />
            )}
          </button>

          <button type="button" onClick={() => setView("License Agreement")}>
            License Agreement
            {view === "License Agreement" && (
              <img
                alt="License Agreement selected"
                src={dash}
                className="w-2/3 mx-auto relative top-[4px] -left-2"
              />
            )}
          </button>
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
            <section className="md:flex px-4 md:px-7 lg:px-20 py-14">
              <div className="md:px-3 lg:px-6 basis-2/3">
                <img
                  src={bb.imageUrl}
                  alt={bb.name}
                  className="rounded-t-10 w-full"
                  onClick={() => setPreview(true)}
                />
                <div className="md:flex bg-ads360black-100 space-y-2 md:space-y-0 w-full rounded-b-10 text-white py-2">
                  <div className="flex items-center space-x-1 lg:px-3">
                    <img
                      src={impression}
                      alt=""
                      className="rounded-t-10"
                    />
                    <p>{displayLine}</p>
                  </div>

                  <div className="flex items-center space-x-1 lg:px-3">
                    <img src={duration} alt="" className="rounded-t-10" />
                    <p>{formatRuntime(bb)}</p>
                  </div>

                  <div className="flex items-center space-x-1 lg:px-3">
                    <img src={led} alt="" className="rounded-t-10" />
                    <p>{boardTypeLabel(bb.boardType)}</p>
                  </div>
                </div>

                <BillboardDetailMainColumn bb={bb} />
              </div>

              <BillboardDetailPricingColumn
                bb={bb}
                actions={
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="group rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 px-4 h-12"
                    >
                      <Link
                        to="/ads/billboard/$slug/onboard"
                        params={{ slug: String(bb.id) }}
                        search={{ data:bb }}
                      >
                        Select Billboard
                      </Link>
                    </button>
                  </div>
                }
              />
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
