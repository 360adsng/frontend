'use client'
import Image from "next/image";
import cancel from "@public/icons/usericon/modalCancelBotton.svg";

//import images
import digital from "@public/icons/digital.svg";
import billboard from "@public/icons/led2.svg";
import sms from "@public/icons/sms.svg";
import influencer from "@public/icons/influencer.svg";
import whatsapp from "@public/icons/whatsappCluster.svg";
import BackBtn from "@components/buttons/BackBtn";
import Steps from "@components/ui/Steps";
import { Modal } from "@components/modal/modal";
import { useState } from 'react'
import { useRouter } from "next/navigation";

function Ads() {
  const [open, setOpen] = useState(false)
  const route = useRouter()
  let user = 'verified'
  const handleRoute = (link:string) =>{
  
    if(user === 'verified' || link === 'ads/sms'){
      route.push(link)
    }else{
    setOpen(true)
    }
  }
  const ads = [
    {
      image: billboard,
      text: "Get access to a new world of campaigning with the right touch",
      link: "ads/billboard",
      name: "Billboard Ads",
    },
    {
      image: digital,
      text: "Hit your right target with smart Voice / SMS",
      link: "ads/digital",
      name: "Digital Ads",
    },
    {
      image: sms,
      text: "Bring speed and scale to your business with juicy and premium offers",
      link: "ads/sms",
      name: "Smart SMS",
    },
    {
      image: influencer,
      text: "Tap from our unlimited network of top influencers APP Download Campaign",
      link: "ads/influencer",
      name: "Influencer Ads",
    },
    {
      image: whatsapp,
      text: "Get cluster points and increase your stats in exchange for money",
      link: "ads/whatsapp",
      name: "WhatsApp Ads",
    },
  ];
  return (
    <section className="px-4 md:px-10 py-24">
      <BackBtn>Create an ad campaign</BackBtn>

      <Steps step={1} text="#1 - select campaign"/>

      <p className="text-stone-400 text-center">
        Select the goal that would make the campaign successful for you.
      </p>

      <div className="grid grid-cols-1 gap-5 my-10">
        {ads.map((ad, i) => (
          <div key={i} onClick={()=>handleRoute(ad.link)} className="cursor-pointer">
            <div className="group shadow flex rounded justify-between px-3 md:px-10 py-5 bg-white border border-ads360yellow-100 items-center">
              <div className="flex items-center">
                <Image width={70} height={70} alt={ad.name} src={ad.image} />
                <div className="px-4">
                  <h4 className="font-bold group-hover:text-ads360yellow-100">
                    {ad.name}
                  </h4>
                  <p className="text-stone-400 text-sm">{ad.text}</p>
                </div>
              </div>
              {user === 'not verified' && ad.name !== 'Smart SMS' &&
              <div className="flex justify-end">
                  <button className="p-1 rounded-10 text-sm bg-ads360yellowBtn-100">
                    get verified
                  </button>
                </div>
              }
              
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={open}>
        <div className="bg-white p-5 w-11/12 md:w-1/3 lg:w-1/4 mx-auto rounded-10">
        <div className="flex justify-between mb-5">
            <h4 className="">Get Verified</h4>
            <button onClick={() => setOpen(false)}>
              <Image
                src={cancel}
                width={0}
                height={0}
                alt="modal cancel botton"
                className="w-5"
              />
            </button>
          </div>
          <form>
            <div>
              <p>enter your NIN to get verified</p>
              <input className="p-2 focus:outline-none w-full border rounded-r"/>
            </div>
          </form>
        </div>
      </Modal>

    </section>
  );
}

export default Ads;
