"use client";
import { useState } from "react";
import cancel from "@public/icons/usericon/modalCancelBotton.svg";
import billboardImage2 from "@public/del/billboard2.png";
import Image from "next/image";
import { Modal } from "@components/modal/modal";
import { AiOutlineDownload } from 'react-icons/ai'
import FilesInput from "@components/inputs/FilesInput";

const Request = ({ params }: { params: { slug: string } }) => {
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

  const [billboard, setBillboard] = useState({
    id: 2,
    name: "Adetokunbo Ademola led, victoria island",
    location: "Along Adetokunbo Ademola Street by Bishop",
    image: billboardImage2,
    status:
      params.slug === "3"
        ? "paid"
        : params.slug === "2"
        ? "negotiating"
        : params.slug === "1" ? "new" 
        : 'completed',
    pricepd: "30000",
    negotiationCount: 1,
    feedback: "",
    finalprice: "29500",
    yourPrice: "28000",
    Impressions: "40 per day",
    minimumNegotiableAmount: 26000,
    type: "Double faced Gantry LED",
    duration: "14hrs (6am - 9pm) 6days/week",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBillboard((prev) => ({ ...prev, negotiationCount: 1 }));
  };

  return (
    <section className="px-4 md:px-10 py-14   min-h-screen bg-ads360-hash">
      <div className="my-5 font-bold"></div>

      <div className="relative mx-auto w-8/12">
        <div className="absolute right-0 bg-black text-white p-2 cursor-pointer">
          <AiOutlineDownload size={20}/>
        </div>
        <Image
          height={0}
          width={0}
          alt="billboard"
          className="w-full"
          src={billboardImage2}
        />
      </div>

      <div className="w-full overflow-x-auto my-5">
        <table className="min-w-full bg-white">
          <thead className="bg-[#D0B301]/40">
            <tr>
              <th className="py-2 px-2 md:px-3 border-b">Name</th>
              <th className="py-2 px-2 md:px-3 border-b">Location</th>
              <th className="py-2 px-2 md:px-3 border-b">Size</th>
              <th className="py-2 px-2 md:px-3 border-b">Duration</th>
              <th className="py-2 px-2 md:px-3 border-b">Start Date</th>
              <th className="py-2 px-2 md:px-3 border-b">End Date</th>
              <th className="py-2 px-2 md:px-3 border-b">Cost/day</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-2 md:px-3 border-b">
                Eko hotel LED, Victoria Island
              </td>
              <td className="py-2 px-2 md:px-3 border-b">
                Along Adetokunbo Ademola Street by Eko Hotels
              </td>
              <td className="py-2 px-2 md:px-3 border-b">4m(H) by 12m(W)</td>
              <td className="py-2 px-2 md:px-3 border-b">1 day(s)</td>
              <td className="py-2 px-2 md:px-3 border-b">2023-05-20</td>
              <td className="py-2 px-2 md:px-3 border-b">2023-05-21</td>
              <td className="py-2 px-2 md:px-3 border-b">₦30,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="md:flex md:space-x-2 justify-end">
        <div className="bg-[#D0B301]/40  w-full p-5 md:w-1/2 lg:w-1/3">
          <div className="flex">
            <h4 className="basis-1/2">Status</h4>
            <div className="font-bold basis-1/2">{billboard.status}</div>
          </div>

          <div className="flex">
            <h4 className="basis-1/2">Total Amount</h4>
            <div className="basis-1/2">
              <div className="font-bold">30000</div>
              <div>cost x 1 day(s)</div>
            </div>
          </div>
        </div>

        {billboard.status === "negotiating" && (
          <div className="bg-[#D0B301]/40  w-full p-5 md:w-1/2 lg:w-1/3 my-5 md:my-0">
            <div className="">
              <h4 className="font-bold">Remark</h4>
              <div className="">
                <p>
                  this user is negotiating this product for{" "}
                  <b>{billboard.yourPrice}</b> kindly accept or reject the offer
                </p>
                <button
                  onClick={() => setAccept(true)}
                  className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3 text-white p-2"
                >
                  accept
                </button>
                <button
                  onClick={() => setReject(true)}
                  className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3 mx-2 text-white p-2"
                >
                  reject
                </button>
              </div>
            </div>
          </div>
        )}

        {billboard.status === "paid" && (
          <div className="bg-[#D0B301]/40  w-full p-5 md:w-1/2 lg:w-1/3 my-5 md:my-0">
            <div className="">
              <h4 className="font-bold">Remark</h4>
              <div className="">
                <p>
                  this user has made payment this transaction
                </p>
                <div>
                  notify user when you carry out transaction
                  <div>
                  <FilesInput
                    previewName={""}
                    accept="image"
                    handleChange={() => {}}
                    warning="Require image size"
                  />
                  <button
                    className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded text-white p-2"
                  >
                    Upload
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={accept}>
        <div className="bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10">
          <div className="flex justify-between mb-5">
            <h4 className="">Accept Offer</h4>
            <button onClick={() => setAccept(false)}>
              <Image
                src={cancel}
                width={0}
                height={0}
                alt="modal cancel botton"
                className="w-5"
              />
            </button>
          </div>
          <div>
            <button
              onClick={() => setAccept(true)}
              className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3 text-white p-2"
            >
              Yes
            </button>
            <button
              onClick={() => setAccept(true)}
              className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3 mx-2 text-white p-2"
            >
              No
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={reject}>
        <div className="bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10">
          <div className="flex justify-between mb-5">
            <h4 className="">Reject Offer</h4>
            <button onClick={() => setReject(false)}>
              <Image
                src={cancel}
                width={0}
                height={0}
                alt="modal cancel botton"
                className="w-5"
              />
            </button>
          </div>
          <div>
            <div>
              <form>
                <div>
                  <p>
                    kindly enter the minimum price you would accept for this
                    offer
                  </p>
                  <input className="p-2 focus:outline-none w-full border rounded" />
                  <button
                    className="bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3 text-white p-2"
                  >
                    Reject
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Request;
