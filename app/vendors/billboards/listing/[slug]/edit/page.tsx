"use client";
import FilesInput from "@components/inputs/FilesInput";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Edit = () => {
  const [successfull, setSuccessfull] = useState(false);
  const router = useRouter();
  const handleSubmitTemp = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessfull(true);
  };

  const billboard = {
    id: 9,
    name: "Adetokunbo Ademola led, victoria island",
    location: "Along Adetokunbo Ademola Street by Bishop",
    image: '',
    pricepd: "35000",
    negotiable:'yes',
    Impressions: "40 per day",
    type: "Double faced Gantry LED",
    duration: "14hrs (6am - 9pm) 6days/week",
  }

  return (
    <>
      <section className="min-h-screen bg-ads360-hash py-14">
        <div className="mx-auto w-11/12">
          <h3 className="text-2xl">Add Billboard</h3>
          <p>Add billboards here</p>
        </div>
        <form>
          <div className="md:flex mx-auto w-11/12">
            <div className="basis-6/12 md:pr-5">
              <div className="my-3">
                <p>Billboard name</p>
                <input 
                  value={billboard.name}
                  className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
                />
              </div>
              <div className="my-3">
                <p>Price</p>
                <input 
                  value={billboard.pricepd}
                  className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]" 
                />
              </div>
              <div className="my-3">
                <p>Location</p>
                <input 
                  value={billboard.location}
                  className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]" 
                />
              </div>
              <div className="my-3">
                <p>Board Type</p>
                <input 
                  value={billboard.type}
                  className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]" 
                />
              </div>
              <div className="my-3">
                <p>Daily Impressions</p>
                <input
                  type="number"
                  value={billboard.Impressions}
                  className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
                />
              </div>
              <div className="my-3">
                <p>Duration per display</p>
                <input
                  type="number"
                  value={billboard.duration}
                  className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
                />
              </div>
              <div className="my-3">
                <p>Time</p>
                <input
                  value="14hrs (6am - 9pm) 6days/week"
                  placeholder="14hrs (6am - 9pm) 6days/week"
                  className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
                />
              </div>
             
              <div className="my-3">
                <p>Dimention</p>
                <div className="flex space-x-3">
                  <div className="basis-1/2">
                    <input
                      placeholder="width"
                      value={800}
                      className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
                    />
                  </div>
                  <div className="basis-1/2">
                    <input
                      placeholder="height"
                      value={300}
                      className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
                    />
                  </div>
                </div>
              </div>
              <div className="my-3">
                <p>Pixel Size</p>
                <div className="flex space-x-3">
                  <div className="basis-1/2">
                    <input
                      placeholder="width"
                      value={800}
                      className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
                    />
                  </div>
                  <div className="basis-1/2">
                    <input
                      placeholder="height"
                      value={300}
                      className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
                    />
                  </div>
                </div>
              </div>
       
              
            </div>
            <div className="basis-6/12">
            <div className="my-3">
                <p>Orientation</p>
                <select defaultValue='select' className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]">
                  <option disabled>select</option>
                  <option selected>Potrait</option>
                  <option>Landscape</option>
                </select>
              </div>
              <div className="my-3">
                <p>Negotiable</p>
                <select defaultValue='select' className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]">
                  <option disabled>select</option>
                  <option selected>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="my-3">
                <p>Traffic Description</p>
                <textarea
                  rows={4}
                  value="Facing Traffic Along Adetokumbo Ademola Street by Eko Hotels,Ahmadu Bello Way, Akin Adesola & Ajose Adeogun."
                  placeholder="Facing Traffic Along Adetokumbo Ademola Street by Eko Hotels,Ahmadu Bello Way, Akin Adesola & Ajose Adeogun."
                  className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"
                ></textarea>
              </div>

              <div className="my-3">
                <p>Image</p>
                <FilesInput
                  previewName={""}
                  accept="image"
                  handleChange={() => {}}
                  warning="Require image size"
                />
              </div>

              <div className="bg-white w-full h-60 rounded-10"></div>
              <div>
                <button
                  onClick={handleSubmitTemp}
                  className={`bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-5  text-white p-2`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Edit;
