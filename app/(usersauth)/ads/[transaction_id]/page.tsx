"use client";
import Image from "next/image";
import Link from "next/link";

//import images
import card from "@public/icons/usericon/card.svg";
import dollar from "@public/icons/usericon/dollar-sign.svg";
import purse from "@public/icons/usericon/purse.svg";
import Arrowleft from "@public/icons/Arrowleft.svg";
import mark from "@public/icons/mark.svg";
import cancel from "@public/icons/usericon/modalCancelBotton.svg";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@components/modal/modal";

const Payment = () => {
  const amount = 27000;
  const wallet = 0;
  const router = useRouter();
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
      image: purse,
      link: "ads/",
      name: "Wallet",
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
      <section className="px-4 md:px-10 py-24">
        <div className="flex items-center font-bold">
          <button
            onClick={() => router.back()}
            className="group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-11  h-11 flex justify-center items-center rounded-[50%] color-white"
          >
            <Image src={Arrowleft} width={0} height={0} alt="arrow" />
          </button>
          Payment Method
        </div>

        <div className="hidden items-center justify-center mx-auto mt-5 mb-10 md:flex">
          <div className="font-bold text-sm">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
                <Image src={mark} width={0} height={0} alt="" />
              </div>
              <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
            </div>
            <div className="relative -left-10">Select Campaign</div>
          </div>

          <div className="font-bold text-sm">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
                <Image src={mark} width={0} height={0} alt="" />
              </div>
              <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
            </div>
            <div className="relative -left-10">Onboarding</div>
          </div>

          <div className="font-bold text-sm text-left">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
                <Image src={mark} width={0} height={0} alt="" />
              </div>
              <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
            </div>
            <div className="relative -left-7">Completing</div>
          </div>

          <div className="font-bold text-sm">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border border-ads360yellow-100"></div>
            </div>
            <div className="relative -left-5">Checkout</div>
          </div>
        </div>

        <div className="font-bold md:hidden text-right mt-5 mb-10">
          #4 - Checkout
        </div>

        <p className="text-stone-400 text-center">
          Choose a payment to complete your campaign.
        </p>

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
        {selected === "Wallet" ? (
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
              <div className="p-2 w-full border rounded-r text-black/50">
                {amount}
              </div>
            </div>

            {wallet < amount ? (
              <div className="my-3">
                <p className="text-red-700 text-xs">
                  Not enough money on wallet, please use a different option. or
                  click <Link href="/users/wallet/fundwallet" className="text-red-900 font-semibold">here</Link> to fun wallet
                </p>
              </div>
            ) : null}

            <div className="flex justify-center">
              <button
                disabled={wallet < amount ? true : false}
                className={`${
                  wallet < amount
                    ? "bg-ads360gray-100 mt-5"
                    : "bg-ads360black-100/95 hover:bg-ads360black-100 mt-10"
                } rounded  text-white  w-5/6 h-10`}
              >
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
              <div className="p-2 w-full border rounded-r">{amount}</div>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-10  text-white  w-5/6 h-10">
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
