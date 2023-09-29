"use client"
import FilesInput from "@components/inputs/FilesInput"
import Tick from "@components/inputs/Tick";
import COUNTRIES from "@utils/countries"
import {useState} from 'react'
import BackBtn from "@components/buttons/BackBtn";
import Link from "next/link";


function Sms() {

  const [attachmentType, setAttachmentType] = useState("image");
  const [numberInput, setNumberInput] = useState("type");
  const [previewImage, setPreviewImage] = useState<Preview>();
  const [previewVideo, setPreviewVideo] = useState<Preview>();
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = e.target.files;
    if (file !== null && file.length > 0) {
      const objectUrl = URL.createObjectURL(file[0]);

      if (type === "image") {
        setPreviewVideo(undefined);
        setPreviewImage({
          src: objectUrl,
          name: file[0].name,
        });
      } else {
        setPreviewImage(undefined);
        setPreviewVideo({
          src: objectUrl,
          name: file[0].name,
        });
      }
    }
  };

  const handleNumber = () =>{

  }


  return (
    <section className="px-4 md:px-10 py-24">
      
        <BackBtn>Smart SMS / Display Ad</BackBtn>
        <p className="text-stone-400 mb-5 mt-3">
        Provide all requested details to send sms campaign
        </p>
      
      <div className="md:flex justify-between">
        <div className="basis-1/2">
          <div>
            <form>
              <div>
                <select className="my-3 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]">
                  <option>Select Channel</option>
                </select>
              </div>
              <div>
                <select className="my-3 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]">
                  <option>Your Sender ID</option>
                </select>
              </div>

              <div className="my-3">
                <p className="text-xs">if you dont have a sender id, kindly select from 360ads sender id</p>
                <select className="bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]">
                  <option>Our Sender ID</option>
                </select>
              </div>

              <div>
                <input type="url" placeholder="Input URL audiences can view products with..." className="my-3 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"/>
              </div>


              <div className="flex my-3">
                <select className="basis-2/12 bg-ads360gray-100 w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]">
                  {
                    COUNTRIES.map((country)=>(
                      <option selected ={country.name === 'Nigeria' ? true : false} key={country.name}>
                        {country.code + ' ' + country.mobileCode}
                      </option>
                    ))
                  }
                </select>
                <input placeholder="Enter Phone Number" className="basis-10/12 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"/>
              </div>

              <div>
                <input placeholder="Input Call To Action e.g Buy now..." className="my-3 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"/>
              </div>

              <div>
                <textarea rows={4} placeholder="Input Call To Action e.g Buy now..." className="my-3 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"></textarea>
              </div>

              <div className="flex space-x-3">
              <Tick
                label="Image Assets"
                asset="image"
                setAttachmentType={setAttachmentType}
                attachmentType={attachmentType}
              />

              <Tick
                label="Video Assets"
                asset="video"
                setAttachmentType={setAttachmentType}
                attachmentType={attachmentType}
              />
            </div>
              
              {attachmentType === "image" ? (
              <FilesInput
                previewName={previewImage?.name as string}
                accept="image"
                handleChange={handleChange}
                warning="Required image size"
              />
            ) : (
              <FilesInput
                previewName={previewVideo?.name as string}
                accept="video"
                handleChange={handleChange}
                warning="Required video size"
              />
            )}


        <div className="">
        <div className="my-3">

          <Tick
            label="Type Number"
            asset="type"
            setAttachmentType={setNumberInput}
            attachmentType={numberInput}
          />
          </div>

            <div className="my-3">
              <Tick
                  label="Import Number"
                  asset="import"
                  setAttachmentType={setNumberInput}
                  attachmentType={numberInput}
                />
            </div>
             
              
            
              {numberInput === "type" ? (
              <div>
                <div>
                  <p>Enter msisdns separated by commas e.g. 23480xxxxxxxx,23480xxxxxxxx</p>
                  <textarea rows={4} placeholder="23480xxxxxxxx,23480xxxxxxxx" className="my-3 bg-white w-full rounded-[5px] p-2 focus:outline-none border border-[#E4E4E4]"></textarea>
                </div>
              </div>
            ) : (
              <FilesInput
                previewName={''}
                accept=".cvs"
                handleChange={handleNumber}
                warning="Require an excel or cvs file"
              />
            )}
        </div>

                


            </form>
            <button className="group my-5 rounded-10 hover:animate-changeColor hover:text-white border bg-ads360yellow-100 px-6 h-12">
                    <Link href={`/ads/sms/checkout`}>
                      Next
                    </Link>
                  </button>
          </div>
        </div>
        <div className="basis-1/3">
            <div className="w-11/12 md:w-full lg:w-9/12 h-[550px] bg-white mx-auto border-[15px] rounded-[40px] border-[#1D1D1B]">
              <div className="mx-auto w-3/12 bg-[#1D1D1B] h-6 my-3 rounded-10"></div>
              <div className="w-10/12 mx-auto bg-ads360light-100 rounded-md">
                
              </div>
            </div>
            <div className="rounded-[90%] my-5 h-5 w-9/12 lg:w-8/12 border mx-auto bg-gray-400">
            </div>
        </div>
        <div>

        </div>
      </div>
     
    </section>
  )
}

export default Sms