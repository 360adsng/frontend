"use client";
import Image from "next/image";
import Link from "next/link";

//import images
import card from "@public/icons/usericon/card.svg";
import dollar from "@public/icons/usericon/dollar-sign.svg";
import bank from "@public/icons/usericon/banking.svg";
import cancel from "@public/icons/usericon/modalCancelBotton.svg";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@components/modal/modal";

const Payment = () => {

  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (paymentMethod: string) => {
    if (paymentMethod === "USD Card") {
      return;
    }
    setIsOpen(true);
    setSelected(paymentMethod);
  };

  const payment = [
    {
      image: bank,
      link: "ads/",
      name: "Bank Transfer",
    },
    {
      image: card,
      link: "ads/",
      name: "Naira Funding Card",
    },
    {
      image: dollar,
      link: "ads/",
      name: "USD Card",
    },
  ];
  return (
    <>
      <section className="min-h-screen bg-ads360-hash px-4 md:px-10 py-14">

        <h2 className="text-2xl">Fund Wallet</h2>
        <p className="text-stone-400">Choose a payment to fund your wallet.</p>

        <div className="grid grid-cols-1 gap-5 my-10">
          {payment.map((ad, i) => (
            <div key={i} onClick={() => handleClick(ad.name)}>
              <div
                className={`${
                  ad.name === "USD Card"
                    ? "bg-white/50 text-gray-400"
                    : "bg-white group cursor-pointer"
                } shadow flex justify-between rounded px-3 md:px-10 py-7 border border-ads360yellow-100 items-center`}
              >
                <div className="flex items-center space-x-5">
                  <Image width={45} height={45} alt={ad.name} src={ad.image} />
                  <div className="px-4">
                    <h4 className="group-hover:text-ads360yellow-100 font-semibold">
                      {ad.name}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Modal isOpen={isOpen}>
        {selected === "Bank Transfer" ? (
          <div className="bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10">
            <div className="flex justify-end mb-5">
              <button onClick={() => setIsOpen(false)}>
                <Image
                  src={cancel}
                  width={0}
                  height={0}
                  alt="modal cancel botton"
                  className="w-5"
                />
              </button>
            </div>

            

            <div className="text-sm">
              <p className="mb-2">Make Tranfer to the following account and click proceed when you are done</p>
              <p className="my-1">
                Account Name:
             </p>
             <p className="text-stone-400 text-lg">
                360Ads
             </p>
             <p className="mt-2 mb-1">
                Account Number:
             </p>
             <p className="text-stone-400 text-lg">
             1234567890
             </p>
            </div>



            <div className="flex justify-center">
              <button className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5  text-white  w-5/6 h-10">
                Proceed
              </button>
            </div>
          </div>
        ) : selected === "Naira Funding Card" ? (
          <div className="bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10">
            <div className="flex justify-between mb-5">
              <h4 className="">Amount</h4>
              <button onClick={() => setIsOpen(false)}>
                <Image
                  src={cancel}
                  width={0}
                  height={0}
                  alt="modal cancel botton"
                  className="w-5"
                />
              </button>
            </div>

            <div className="flex">
              <div className="bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-1/5 content-center text-black/50">
                {" "}
                ₦{" "}
              </div>
              <input className="p-2 w-full border rounded-r text-black/50 focus:outline-none"/>
                
            </div>

            <div className="flex justify-center">
            <button className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5  text-white  w-5/6 h-10">
                Proceed
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default Payment;
