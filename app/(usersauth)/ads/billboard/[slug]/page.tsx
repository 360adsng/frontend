"use client";
import Image from "next/image";
import led from "@public/icons/led.svg";
import duration from "@public/icons/duration.svg";
import impression from "@public/icons/impression.svg";
import location from "@public/icons/location.svg";
import dash from "@public/icons/dash.svg";

import { useState } from "react";
import billboardImage2 from "@public/del/billboard2.png";
import Link from "next/link";
import { Modal } from "@components/modal/modal";
import { motion, AnimatePresence } from "framer-motion";
import BackBtn from "@components/buttons/BackBtn";

const Billboard = () => {
  const [view, setView] = useState("Billboard Overview");
  const [preview, setPreview] = useState(false);

  const billboard = {
    id: 2,
    name: "Adetokunbo Ademola led, victoria island",
    location: "Along Adetokunbo Ademola Street by Bishop",
    image: billboardImage2,
    pricepd: "30000",
    Impressions: "40 per day",
    type: "Double faced Gantry LED",
    duration: "14hrs (6am - 9pm) 6days/week",
  };

  return (
    <>
      <section className="bg-[#E9E9E9] px-4 md:px-10 pt-24">
       
        <BackBtn> Billboard Details</BackBtn>

        <p className="text-stone-400 mb-5 mt-3">
          View full details of billboard and proceed to checkout
        </p>
        <div className="w-full flex text-sm md:text-base justify-between md:justify-start md:space-x-3">
          <button
            className=""
            onClick={() => setView("Billboard Overview")}
          >
            Billboard Overview
            {view === "Billboard Overview" && (
              <Image
                height={0}
                width={0}
                alt="Billboard Overview selected"
                src={dash}
                className="w-2/3 mx-auto relative top-[4px] -left-2"
              />
            )}
          </button>

          <button
            className=""
            onClick={() => setView("License Agreement")}
          >
            License Agreement
            {view === "License Agreement" && (
              <Image
                height={0}
                width={0}
                alt="Billboard Overview selected"
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
            className=""
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
                <Image
                  height={0}
                  width={0}
                  src={billboardImage2}
                  alt="billboard"
                  className="rounded-t-10 w-full"
                  onClick={() => setPreview(true)}
                />
                <div className="md:flex bg-ads360black-100 space-y-2 md:space-y-0 w-full rounded-b-10 text-white py-2">
                  <div className="flex items-center space-x-1 lg:px-3">
                    <Image
                      height={0}
                      width={0}
                      src={impression}
                      alt="boardtype LED"
                      className="rounded-t-10"
                    />
                    <p>70 impressions daily</p>
                  </div>

                  <div className="flex items-center space-x-1 lg:px-3">
                    <Image
                      height={0}
                      width={0}
                      src={duration}
                      alt="boardtype LED"
                      className="rounded-t-10"
                    />
                    <p>14hrs (6am - 9pm) 6days/week</p>
                  </div>

                  <div className="flex items-center space-x-1 lg:px-3">
                    <Image
                      height={0}
                      width={0}
                      src={led}
                      alt="boardtype LED"
                      className="rounded-t-10"
                    />
                    <p>Double faced Gantry LED</p>
                  </div>
                </div>

                <div className="md:w-4/5">
                  <h3 className="flex items-center font-bold text-lg my-3">
                    <Image height={0} width={0} alt="location" src={location} />
                    Hebert Macaulay Way LED
                  </h3>

                  <p className="my-3">
                    <b>Traffic:</b> Facing Traffic Along Adetokumbo Ademola
                    Street by Eko Hotels,Ahmadu Bello Way, Akin Adesola & Ajose
                    Adeogun.
                  </p>

                  <p className="my-3">
                    <b>Size:</b> 4m(H) by 12m(W)
                  </p>

                  <p className="my-3">
                    <b>Pixel Size:</b> 385(H) by 1125(W)
                  </p>

                  <p className="my-3">
                    <b>Orientation:</b> Landscape
                  </p>
                </div>
              </div>

              <div className="md:px-3 basis-1/3">
                <h4 className="my-3 font-semibold">Daily price</h4>
                <p className="mt-3 mb-7">₦40,000 (per day)</p>

                <h4 className="my-3 font-semibold">Note:</h4>
                <p className="my-3">
                  Your advert will be displayed 70 times daily on the billboard.
                </p>

                <p className="my-3">
                  Adverts will be displayed for 10 seconds each time it appears
                  on the billboard.
                </p>

                <div className="flex justify-end">
                  <button className="group my-5 rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 px-2 h-12">
                    <Link href={`/ads/billboard/${billboard.id}/onboard`}>
                      Select Billboard
                    </Link>
                  </button>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {view === "License Agreement" && (
          <motion.div
            className=""
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
                360ads - NG is an investment platform, that enables Africans to
                purchase fractional shares of global real estate assets.
                Meristem Trustees - Investments & Assets are managed by SEC-
                regulated Meristem trustees
              </p>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal isOpen={preview}>
        <div className="transition duration-500">
          <div className="fixed w-full left-0 top-[30%]  md:left-[20%] md:top-[10%] md:w-2/3 z-[1000000000]">
            <Image
              height={0}
              width={0}
              src={billboardImage2}
              alt="billboard"
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

export default Billboard;
