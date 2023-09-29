"use client";
import Image from "next/image";
import Link from "next/link";

//import images

import angleDown from "@public/icons/angledown.svg";
import inf from "@public/del/team.jpg";
import inf2 from "@public/del/dav.png";
import inf3 from "@public/del/girl.jpg";
import mark from "@public/icons/mark.svg";
import Arrowleft from "@public/icons/Arrowleft.svg";
import cancel from "@public/icons/usericon/modalCancelBotton.svg";
import { useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

import { Modal } from "@components/modal/modal";
import BackBtn from "@components/buttons/BackBtn";
import Steps from "@components/ui/Steps";

function Influencer() {
  const [filter, setFilter] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [wishlist, setWishlist] = useState([4, 8, 2, 9]);
  
  const handleWishlist = (influencerId: number) => {
    if (wishlist.includes(influencerId)) {
      setWishlist(wishlist.filter((item) => item !== influencerId));
    } else {
      setWishlist((prev) => [...prev, influencerId]);
    }
  };

  const influencers = [
    {
      id: 1,
      name: "Pankeeroy",
      occupation: "influencer",
      negotiable: "no",
      image: inf,
      reach: "180K",
    },
    {
      id: 2,
      name: "Kraks Tv",
      occupation: "influencer",
      negotiable: "yes",
      image: inf2,
      reach: "190K",
    },
    {
      id: 3,
      name: "Pankeeroy",
      occupation: "influencer",
      negotiable: "yes",
      image: inf3,
      reach: "170K",
    },
    {
      id: 4,
      name: "Pankeeroy",
      occupation: "influencer",
      negotiable: "no",
      image: inf,
      reach: "180K",
    },
    {
      id: 5,
      name: "Rodney",
      occupation: "influencer",
      negotiable: "yes",
      image: inf2,
      reach: "190K",
    },
    {
      id: 6,
      name: "SplufikNg",
      occupation: "influencer",
      negotiable: "no",
      image: inf3,
      reach: "170K",
    },
    {
      id: 7,
      name: "Tiwalola",
      occupation: "influencer",
      negotiable: "no",
      image: inf,
      reach: "180K",
    },
    {
      id: 8,
      name: "Egbami",
      occupation: "influencer",
      negotiable: "yes",
      image: inf2,
      reach: "190K",
    },
    {
      id: 9,
      name: "SplufikNg",
      occupation: "influencer",
      negotiable: "no",
      image: inf3,
      reach: "170K",
    },
    {
      id: 10,
      name: "SplufikNg",
      occupation: "influencer",
      negotiable: "no",
      image: inf3,
      reach: "170K",
    },
    {
      id: 11,
      name: "Tiwalola",
      occupation: "influencer",
      negotiable: "no",
      image: inf,
      reach: "180K",
    },
    {
      id: 12,
      name: "Egbami",
      occupation: "influencer",
      negotiable: "yes",
      image: inf2,
      reach: "190K",
    },
    {
      id: 13,
      name: "Egbami",
      occupation: "influencer",
      negotiable: "yes",
      image: inf2,
      reach: "190K",
    },
    {
      id: 14,
      name: "SplufikNg",
      occupation: "influencer",
      negotiable: "no",
      image: inf3,
      reach: "170K",
    },
    {
      id: 15,
      name: "SplufikNg",
      occupation: "influencer",
      negotiable: "no",
      image: inf3,
      reach: "170K",
    },
    {
      id: 16,
      name: "Tiwalola",
      occupation: "influencer",
      negotiable: "no",
      image: inf,
      reach: "180K",
    },
    {
      id: 17,
      name: "Egbami",
      occupation: "influencer",
      negotiable: "yes",
      image: inf2,
      reach: "190K",
    },
    
    
  ];

  return (
    <>
      <section className="px-4 md:px-10 py-24">
    
        <BackBtn>influencer Marketing</BackBtn>

    <Steps step={2} text="#2 - Onboarding"/>


        <section className="lg:flex my-5">
          <div className="gap-5 md:px-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 basis-4/5">
            {influencers.map((influencer) => (
          
              <div
                key={influencer.id}
                className="bg-white rounded-10 grid grid-cols-2 gap-2"
              >
                <div className="p-1">
                <Link href={`/ads/influencer/${influencer.id}`}>
                  <Image alt="" src={influencer.image} className="w-full h-32 rounded-10"/>
                  </Link>
                </div>
                <div className="relative grid grid-cols-1 content-center">
   
                  {
                    influencer.negotiable === 'yes' && <p className="text-xs rounded-tr-10 text-ads360light-100 p-1 bg-ads360yellow-100 absolute top-0 right-0">Negotiable</p>
                  }
                  <h2 className="font-bold truncate ...">{influencer.name}</h2>
                  <div className="text-sm text-gray-400">
                  <p>{influencer.occupation}</p>
                  <p>{influencer.reach}</p>
                  </div>
                  <div className="font-semibold text-ads360yellowBtn-100 hover:bg-ads360yellowBtn-100/30 hover:rounded-full flex justify-center w-8 h-8 p-2">
                    {
                      wishlist.includes(influencer.id) ? <button onClick={()=>handleWishlist(influencer.id)}><BsSuitHeartFill size={20}/></button>
                      :<button onClick={()=>handleWishlist(influencer.id)}><BsSuitHeart size={20}/></button>
                    }
                  </div>
  
               
                 
                </div>
              </div>
         
            ))}
          </div>


          <div className="basis-1/5 text-sm">
            <div className="top-[12.5rem] sticky rounded p-3 border border-ads360yellow-100 bg-white hidden lg:block">
              <p>Filter influencer</p>

              <div className="my-2">
                <p>influencer Type</p>
                <select className="p-2 w-full border focus:outline-none rounded">
                  <option>select</option>
                  <option>Double faced Gantry LED</option>
                  <option>Single faced Gantry LED</option>
                  <option>Double faced Gantry LED</option>
                </select>
              </div>

              <div className="my-2">
                <p>Price Range</p>
                <div className="flex justify-between space-x-1">
                  <div className="basis-1/2">
                    <label>from:</label>
                    <input
                      type="number"
                      className="rounded w-full border focus:outline-none p-2"
                    />
                  </div>

                  <div className="basis-1/2">
                    <label>to:</label>
                    <input
                      type="number"
                      className="rounded w-full border focus:outline-none p-2"
                    />
                  </div>
                </div>
              </div>

              

              <div className="my-2">
                <p>Status</p>
                <select className="p-2 w-full border focus:outline-none rounded">
                  <option>Negotiable</option>
                  <option>Non Negotiable</option>
                </select>
              </div>

              <button 
              className='bg-ads360black-100/95 hover:bg-ads360black-100 rounded mt-3  text-white  w-2/6 h-10'>
              Search
          </button>
            </div>
          </div>
        </section>
      </section>

      <Modal isOpen={showDetails}>
                    <div className="bg-white p-3 w-10/12 md:w-9/12 mx-auto rounded-10">
                    <button onClick={()=>setShowDetails(false)}>
                      close
                      </button>

                    </div>
                  </Modal>
    </>
  );
}

export default Influencer;
