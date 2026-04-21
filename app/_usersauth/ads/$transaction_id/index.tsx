import { Link, createFileRoute, useNavigate, useParams } from '@tanstack/react-router';

//import images
const card = '/icons/usericon/card.svg'
const dollar = '/icons/usericon/dollar-sign.svg'
const purse = '/icons/usericon/purse.svg'
const Arrowleft = '/icons/Arrowleft.svg'
const mark = '/icons/mark.svg'
const cancel = '/icons/usericon/modalCancelBotton.svg'

import { useState } from "react";
import { Modal } from "@components/modal/modal";
import { usePayNow, useWallet } from "@endpoint/wallet/useWallet";
import { useBillboardBooking } from "@endpoint/billboard/useBillboard";
import { toast } from "sonner";

const Payment = () => {
  const params = useParams({ strict: false }) as { transaction_id?: string };
  const bookingId = Number(params.transaction_id);
  const booking = useBillboardBooking(
    Number.isFinite(bookingId) && bookingId > 0 ? bookingId : null,
  );
  const walletQuery = useWallet();
  const payNow = usePayNow();
  const navigate = useNavigate();

  const amount = Number(booking.data?.negotiatedAmount ?? booking.data?.quotedTotal ?? 0);
  const walletBalance = Number(walletQuery.data?.balance ?? 0);
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
      name: "Flutterwave Payment",
    }
  ];
  return (
    <>
      <section className="px-4 md:px-10 py-24">
        <div className="flex items-center font-bold">
          <button
            onClick={() => window.history.back()}
            className="group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-11  h-11 flex justify-center items-center rounded-[50%] color-white"
          >
            <img src={Arrowleft} alt="arrow" />
          </button>
          Payment Method
        </div>

        <div className="hidden items-center justify-center mx-auto mt-5 mb-10 md:flex">
          <div className="font-bold text-sm">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
                <img src={mark} alt="" />
              </div>
              <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
            </div>
            <div className="relative -left-10">Select Campaign</div>
          </div>

          <div className="font-bold text-sm">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
                <img src={mark} alt="" />
              </div>
              <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
            </div>
            <div className="relative -left-10">Onboarding</div>
          </div>

          <div className="font-bold text-sm text-left">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
                <img src={mark} alt="" />
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
                  <img width={45} height={45} alt={ad.name} src={ad.image} />
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
                <img
                  src={cancel} alt="modal cancel botton"
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

            {walletBalance < amount ? (
              <div className="my-3">
                <p className="text-red-700 text-xs">
                  Not enough money on wallet, please use a different option. or
                  click <Link to="/users/wallet/fundwallet" className="text-red-900 font-semibold">here</Link> to fun wallet
                </p>
              </div>
            ) : null}

            <div className="flex justify-center">
              <button
                disabled={walletBalance < amount || payNow.isPending || !bookingId}
                onClick={async () => {
                  if (!bookingId) return;
                  try {
                    await payNow.mutateAsync({
                      bookingId,
                      paymentMethod: "wallet",
                    });
                    setIsOpen(false);
                    toast.success("Payment successful");
                    await navigate({ to: "/users/campaign" });
                  } catch {
                    // toast handled by hook
                  }
                }}
                className={`${
                  walletBalance < amount
                    ? "bg-ads360gray-100 mt-5"
                    : "bg-ads360black-100/95 hover:bg-ads360black-100 mt-10"
                } rounded  text-white  w-5/6 h-10`}
              >
                {payNow.isPending ? "Processing..." : "Proceed"}
              </button>
            </div>
          </div>
        ) : selected === "Flutterwave Payment" ? (
          <div className="bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10">
            <div className="flex justify-between mb-5">
              <h4 className="">Amount</h4>
              <button onClick={() => setIsOpen(false)}>
                <img
                  src={cancel} alt="modal cancel botton"
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
                disabled={payNow.isPending || !bookingId}
                onClick={async () => {
                  if (!bookingId) return;
                  try {
                    const res = await payNow.mutateAsync({
                      bookingId,
                      paymentMethod: "flutterwave",
                    });
                    const link = (res as any)?.data?.link;
                    if (typeof link === "string" && link.length > 0) {
                      window.location.href = link;
                      return;
                    }
                    toast.error("Payment link not returned");
                  } catch {
                    // toast handled by hook
                  }
                }}
                className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-10  text-white  w-5/6 h-10 disabled:opacity-60"
              >
                {payNow.isPending ? "Starting..." : "Proceed"}
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export const Route = createFileRoute("/_usersauth/ads/$transaction_id/")({
  component: Payment,
})

export default Payment
