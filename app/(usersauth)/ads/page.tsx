import Image from "next/image";
import Link from "next/link";

//import images
import digital from "@public/icons/digital.svg";
import billboard from "@public/icons/led2.svg";
import sms from "@public/icons/sms.svg";
import influencer from "@public/icons/influencer.svg";
import whatsapp from "@public/icons/whatsappCluster.svg";
import BackBtn from "@components/buttons/BackBtn";
import Steps from "@components/ui/Steps";

function Ads() {
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
          <Link key={i} href={ad.link}>
            <div className="group shadow flex justify-between rounded px-3 md:px-10 py-5 bg-white border border-ads360yellow-100 items-center">
              <div className="flex items-center">
                <Image width={70} height={70} alt={ad.name} src={ad.image} />
                <div className="px-4">
                  <h4 className="font-bold group-hover:text-ads360yellow-100">
                    {ad.name}
                  </h4>
                  <p className="text-stone-400 text-sm">{ad.text}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Ads;
