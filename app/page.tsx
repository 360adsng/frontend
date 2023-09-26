//import from next
import Image from "next/image";

//import from dependencies
import Link from "next/link";

//import from components
import BlackButtons from "@components/buttons/BlackButton";
import MobileCarousel from "@components/slides/MobileCarousel";
import DesktopCarousel from "@components/slides/DesktopCarousel";
import Why360 from "@components/ui/Why360";
import HowWeThink from "@components/ui/HowWeThink";
import NewsLetter from "@components/ui/NewsLetter";
import CountUp from "@components/ui/CountUp";
import LightNavbar from "@components/navs/LightNavBar";
import Footer from "@components/navs/Footer";

//import images
import heroGirl from "@public/images/herogirl.png";
import Group from "@public/images/Group.png";
import adsgirl from "@public/images/adsgirl.png";
import adsgirl3 from "@public/images/adsgirl3.png";

function Home() {
  return (
    <>
      <LightNavbar />
      <section id="Hero" className="bg-ads360light-100 pt-20">
        <div className="flex justify-center mx-auto w-11/12 md:w-10/12 xl:w-9/12">
          <div className="">
          <div>
            <div
              className='md:mr-[190px] text-5xl md:text-6xl lg:text-7xl font-[600]'
            >
              <h3>All day,</h3>
              <h3>Ad campaign </h3>
              <h3 className="text-ads360yellow-100">360...</h3>
            </div>

            <Link className="block mt-5" href="/signin">
              <BlackButtons text="Let's dive in" />
            </Link>
          </div>
          <div className="md:ml-[190px] md:-mt-[130px]">
            <Image width={0} height={0} src={heroGirl} alt="hero" />
          </div>
          </div>
        </div>
      </section>

      <section
        id="reach"
        className="bg-ads360black-100 py-24 text-ads360light-100"
      >
        <div className="mx-auto w-11/12 md:w-10/12 xl:w-9/12">
          <h3 className="text-justify md:text-center">
            At 360ads, our platform is designed to{" "}
            <span className="text-ads360yellowBtn-100">revolutionise</span> the
            way you handle your advertising needs. With our cutting-edge
            technology, we provide you with the tools and capabilities to
            efficiently manage your ad placements and maximise your brand's
            visibility. Our platform simplifies the process, empowering you to
            take full control of your advertising campaigns.
          </h3>
          <div className="md:flex flex-row-reverse mt-10">
            <div className="bg-ads360black-50 rounded-10 shadow-2xl shadow-black basis-1/3 pt-2">
              <h3 className="mb-4 px-2">
                Grow Your Business with our seamless{" "}
                <span className="text-ads360yellow-100">options...</span>
              </h3>
              <h4 className="mb-4 text-sm px-3 text-justify">
                We are your comprehensive solution for automating your ad
                placements, offering a platform that streamlines the entire
                process
              </h4>
              <div className="mx-auto w-1/2 md:w-3/4 xl:w-3/5 mb-10 md:mb-0">
                <Image
                  width={0}
                  height={0}
                  src={Group}
                  className="mx-auto w-full  sm:w-1/2 md:w-full"
                  alt="..."
                />
              </div>
            </div>
            <div className="flex text-center justify-evenly basis-3/5 md:mt-56">
              <div>
                <h2 className="text-2xl font-bold">
                  <CountUp end={123} duration={1} enableScrollSpy />
                  <span className="text-ads360yellow-100">+</span>
                </h2>
                <h3 className="">Completed</h3>
                <h3 className="">Sites</h3>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  <CountUp end={1300} duration={1} enableScrollSpy />
                  <span className="text-ads360yellow-100">+</span>
                </h2>
                <h3 className="">Happy</h3>
                <h3 className="">Customer</h3>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  <CountUp end={100} duration={1} enableScrollSpy />
                  <span className="text-ads360yellow-100">%</span>
                </h2>
                <h3 className="">Client</h3>
                <h3 className="">Reach</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowWeThink/>

      <section id="ourService" className="py-24 bg-ads360light-100">
        <div className="mx-auto w-11/12 md:w-10/12 xl:w-9/12">
          <div className="text-center mb-16">
            <h4 className="text-ads360yellow-100 mb-10">Our Services</h4>
            <h2 className="text-2xl lg:text-4xl lg:mb-4 mb-2">
              Get your audience’s attention with our services
            </h2>
            <h6 className="">
              Let’s help secure the right audience with our{" "}
              <span className="text-ads360yellow-100">services...</span>
            </h6>
          </div>

          <div className="hidden md:block">
            <DesktopCarousel />
          </div>
          <div className="md:hidden">
            <MobileCarousel display="block" />
          </div>
        </div>
      </section>

      <Why360 />
      <section id="contactus" className="bg-ads360light-100 pt-24">
        <div className="mx-auto w-11/12 md:w-10/12 xl:w-9/12">
          <div className="mb-10">
            <h4 className="text-ads360yellow-100 mb-10">Keep in touch</h4>
            <h3 className="text-2xl lg:text-4xl lg:mb-4 mb-2">
              Ready to Automate Your Advertising Strategy?
            </h3>
            <h6 className="">
              Get in<span className="text-ads360yellow-100"> touch </span>with
              us today
            </h6>
          </div>
          <div className="md:flex md:space-x-12">
            <div className="bg-white shadow-2xl shadow-zinc-600 rounded px-3 md:px-12 py-7 md:w-8/12 lg:w-6/12">
              <div className="my-5">
                <label htmlFor="name">Your Name:</label>
                <br />
                <input
                  type="text"
                  id="name"
                  className="border focus:outline-none drop-shadow-md rounded bg-[#E4E4E4] h-[38px] w-full px-2"
                  placeholder="Enter Your Name..."
                />
              </div>

              <div className="my-5">
                <label htmlFor="number">Phone Number:</label>
                <br />
                <input
                  type="text"
                  id="number"
                  className="border focus:outline-none drop-shadow-md rounded bg-[#E4E4E4] h-[38px] w-full px-2"
                  placeholder="Enter Phine Number..."
                />
              </div>

              <div className="my-5">
                <label htmlFor="email">Your Email:</label>
                <br />
                <input
                  type="text"
                  id="emain"
                  className="border focus:outline-none drop-shadow-md rounded h-[38px] bg-[#E4E4E4] w-full px-2"
                  placeholder="Enter Email Address..."
                />
              </div>
              <div className="mx-3 mt-12 flex justify-center">
                <BlackButtons text="Contact Us" />
              </div>
            </div>
            <div>
              <Image
                width={0}
                height={0}
                src={adsgirl}
                className="md:h-[400px] mx-auto"
                alt="..."
              />
            </div>
          </div>
        </div>
      </section>
      <NewsLetter img={adsgirl3}/>

      <Footer />
    </>
  );
}

export default Home;
