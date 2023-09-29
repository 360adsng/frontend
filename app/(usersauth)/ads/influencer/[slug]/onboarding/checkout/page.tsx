"use client";
import { useState } from "react";
import cancel from "@public/icons/usericon/modalCancelBotton.svg";
import success from "@public/icons/usericon/checkSuccess.svg";
import Image from "next/image";
import { Modal } from "@components/modal/modal";
import Link from "next/link";
import BackBtn from "@components/buttons/BackBtn";
import card from "@public/del/cards.png";
import influencerImg from "@public/del/girl.jpg";



const Checkout = () => {
  const [negotia, setNegotia] = useState(false);
  const [negotiatedAmount, setNegotiatedAmount] = useState("");
  const [successfull, setSuccessfull] = useState(false);
  const [influencer, setinfluencer] = useState({
    id: 2,
    name: "Egbami",
    image: influencerImg,
    paid:'no',
    platform: ['facebook 30000', 'twitter 45000', 'instagram 15000'],
    negotiationCount: 0,
    minimumNegotiableAmount: 85000,
    type: "influencer",
    duration: "3 days",
  });

  const handleNegotiate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNegotiatedAmount(e.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessfull(true);
    setNegotia(false);
    setinfluencer((prev) => ({ ...prev, negotiationCount: 1 }));
    setTimeout(() => {
      setSuccessfull(false);
    }, 4000);
  };

  return (
    <>
      <section className="mx-4 md:mx-10 pt-32 pb-24">
      <BackBtn>influencer Marketing</BackBtn>

        <div className="mt-10 md:flex justify-between my-10">
            <div className="basis-5/12">
                <h4 className="my-5 text-[#292728] text-xl">Post Message</h4>
                <p className="mb-5">
                    "Unlock the road to convenience with our rideshare app. Say goodbye to traffic woes and hello to hassle-free rides!" 
                    Contact us @drapmeinc or mail us info@drapme.co
                    #rideshare #luxurycars #chaffeurservices
                </p>
            </div>
            <div className="basis-5/12">
                <Image
                height={0}
                width={0}
                alt="influencer"
                src={card}
                className="mx-auto"
                />
            </div>
        </div>
        <div className="w-full overflow-x-auto my-5">
          <table className="min-w-full bg-white">
            <thead className="bg-[#D0B301]/40">
              <tr>
                <th className="py-2 px-2 md:px-3 border-b">Vendor</th>
                <th className="py-2 px-2 md:px-3 border-b">Type</th>
                <th className="py-2 px-2 md:px-3 border-b">Platform/Price</th>
                <th className="py-2 px-2 md:px-3 border-b">Duration</th>
                <th className="py-2 px-2 md:px-3 border-b">Start Date</th>
                <th className="py-2 px-2 md:px-3 border-b">End Date</th>
                <th className="py-2 px-2 md:px-3 border-b">Total Amount</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="py-2 px-2 md:px-3">
                <Image alt="" src={influencer.image} className="inline" width={40} height={40}/>
                {influencer.name}
                </td>
                <td className="py-2 px-2 md:px-3 border-b">
                  Influencer
                </td>
                <td className="py-2 px-2 md:px-3 border-b">
                    <div>
                        Facebook<span className="text-sm text-gray-400"> ₦30000</span>
                    </div>
                    <div>
                        Twitter<span className="text-sm text-gray-400"> ₦45000</span>
                    </div>
                    <div>
                        Instagram<span className="text-sm text-gray-400"> ₦15000</span>
                    </div>
                </td>
                <td className="py-2 px-2 md:px-3 border-b">1 day(s)</td>
                <td className="py-2 px-2 md:px-3 border-b">2023-05-21</td>
                <td className="py-2 px-2 md:px-3 border-b">2023-05-21</td>
                <td className="py-2 px-2 md:px-3 border-b">₦90,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#D0B301]/40 flex justify-between w-full py-10  px-5 md:w-1/2 lg:w-1/3">
            <h4>Total Amount</h4>
            <div>
              <div className="font-bold">₦90,000</div>
            </div>
          </div>
        </div>

        <div className="flex md:justify-end space-x-3 my-3">
          <button
            disabled={influencer.negotiationCount > 0 ? true : false}
            onClick={() => setNegotia(true)}
            className={`w-123 h-12 rounded-10 my-2 ${
              influencer.negotiationCount > 0
                ? "bg-ads360yellow-100/50 text-black/50"
                : "hover:animate-changeColor hover:text-white bg-ads360yellow-100"
            }`}
          >
            Negotiate
          </button>

          <button disabled={influencer.paid === 'yes' ? true : false} className={`${influencer.paid === 'yes' ? 'bg-ads360yellow-100/50 text-black/50' : 'hover:animate-changeColor hover:text-white bg-ads360yellow-100'} w-123 h-12 rounded-10 my-2 `}>
            <Link href={`/ads/${2}`}>Pay Now</Link>
          </button>
        </div>
      </section>

      <Modal isOpen={negotia}>
        <div className="bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10">
          <div className="flex justify-between mb-5">
            <h4 className="">Input Amount</h4>
            <button onClick={() => setNegotia(false)}>
              <Image
                src={cancel}
                width={0}
                height={0}
                alt="modal cancel botton"
                className="w-5"
              />
            </button>
          </div>
          <form onSubmit={submit}>
            <div className="flex">
              <div className="bg-ads360black-50/10 rounded-l text-center grid grid-cols-1 basis-1/5 content-center text-black/50">
                {" "}
                ₦{" "}
              </div>
              <input
                type="number"
                value={negotiatedAmount}
                onChange={handleNegotiate}
                className="p-2 focus:outline-none w-full border rounded-r"
              />
            </div>
            <div className="my-3">
              <p className="text-red-700 text-xs">
                You cannot negotiat lower than ₦
                {influencer.minimumNegotiableAmount}
              </p>
              <p className="text-red-700 text-xs">You can only negotiat once</p>
            </div>
            <div className="flex justify-center">
              <button
                disabled={
                  negotiatedAmount === "" ||
                  parseInt(negotiatedAmount) < influencer.minimumNegotiableAmount
                    ? true
                    : false
                }
                className={`${
                  negotiatedAmount === "" ||
                  parseInt(negotiatedAmount) < influencer.minimumNegotiableAmount
                    ? "bg-ads360gray-100"
                    : "bg-ads360black-100/95 hover:bg-ads360black-100"
                } rounded mt-5  text-white  w-5/6 h-10`}
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal isOpen={successfull}>
        <div className="bg-white px-5 py-10 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10 grid grid-cols-1 content-center">
          <Image
            width={0}
            height={0}
            alt=""
            src={success}
            className="mx-auto w-2/6"
          />
          <div>
            <p className="text-green-500 text-center mt-5 font-semibold">
              Request Sent <br /> Successfully
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Checkout;
