import Image from "next/image"
import think1 from "@public/images/think1.jpg";
import YellowButtons from "@components/buttons/YellowButton";
import Link from "next/link";

const HowWeThink = () => {
  return (
    <section id="howWeThink" className="bg-ads360light-100 pt-20">
    <div className="mx-auto w-11/12 md:w-10/12 xl:w-9/12">
      <h4 className="text-ads360yellow-100 mb-10">How we think</h4>

      <div className="md:flex justify-between mb-10">
        <div className="">
          <h3 className="text-2xl lg:text-4xl lg:mb-4 mb-2">
            We're challengers at heart and builders by nature.
          </h3>
          <h6 className="">
            We work as one team and deliver projects{" "}
            <span className="text-ads360yellow-100">concurrently...</span>
          </h6>
        </div>
        <Link className="block mt-5" href="/signup">
          <YellowButtons text="Dive into our culture" />
        </Link>
      </div>
      <Image width={0} height={0} src={think1} alt="" className="w-full"/>
    </div>
  </section>
  )
}

export default HowWeThink