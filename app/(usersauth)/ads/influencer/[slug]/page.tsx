"use client";
import Image from "next/image";
import Arrowleft from "@public/icons/Arrowleft.svg";

import { useState } from "react";
import influencerImage2 from "@public/del/dav.png";
import whatsapp from "@public/icons/Whatsapp.svg";
import twitter from "@public/icons/twitter2.svg";
import facebook from "@public/icons/Facebook2.svg";


import Link from "next/link";
import { Modal } from "@components/modal/modal";

const InfluencerDetails = () => {

  const [preview, setPreview] = useState(false);

  const influencer = {
      id: 13,
      name: "Egbami",
      occupation: "influencer",
      negotiable: "yes",
      image: influencerImage2,
      reach: "190K",
  };

  return (
    <>
      <section className="bg-[#E9E9E9] px-4 md:px-10 pt-24 pb-7">
        <Link href='/ads/influencer' className="flex items-center font-bold">
          <button className="group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-11  h-11 flex justify-center items-center rounded-[50%] color-white">
            <Image src={Arrowleft} width={0} height={0} alt="arrow" />
          </button>
          influencer Details
        </Link>

        <p className="text-stone-400 mb-5 mt-3">
          View full details of influencer and proceed to checkout
        </p>

      </section>

      
            <section className="md:flex py-14 mx-auto w-11/12 md:w-10/12 lg:w-8/12">
              <div className="md:px-3 lg:px-6 basis-2/3">
          
                <Image
                  height={0}
                  width={0}
                  src={influencer.image}
                  alt="influencer"
                  className="rounded-10 w-96 h-96"
                  onClick={() => setPreview(true)}
                />
                

                <div className="md:w-4/5">
                  <h3 className="flex items-center font-bold text-lg my-3">
                    {influencer.name}
                  </h3>

                  <p className="my-3">
                    <b>Bio:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  </p>

            
                </div>
           
              </div>

              <div className="basis-1/3">
                <h4 className="my-3 font-semibold">Platforms</h4>
                <p className="my-3"><Image alt="" src={whatsapp} className="inline w-5 h-5"/> Whatsapp:<span className="font-semibold"> 36000</span></p>
                <p className="my-3"><Image alt="" src={twitter} className="inline w-5 h-5"/> Twitter: <span className="font-semibold"> 59000</span></p>
                <p className="my-3"><Image alt="" src={facebook} className="inline w-5 h-5"/> Facebook: <span className="font-semibold"> 20000</span></p>
                <p className="mt-3 mb-7">₦40,000 (per post)</p>

                <div className="">
                  <button className="group my-5 rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 px-2 h-12">
                    <Link href={`/ads/influencer/${influencer.id}/onboard`}>
                      Select influencer
                    </Link>
                  </button>
                </div>
              </div>
            </section>

      

      <Modal isOpen={preview}>
        <div className="transition duration-500">
          <div className="fixed w-full left-0 top-[30%]  md:left-[20%] md:top-[10%] md:w-2/3 z-[1000000000]">
            <Image
              height={0}
              width={0}
              src={influencerImage2}
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

export default InfluencerDetails;
