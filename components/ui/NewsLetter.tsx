import Image, { StaticImageData } from "next/image"
import SmallBtnYello from "@components/buttons/SmallBtnYellow";


const NewsLetter = ({img}:{img:StaticImageData}) => {
  return (
    <section id="newsletter" className="bg-ads360light-100 pt-20 md:pb-20">
    <div className="mx-auto px-1 md:px-0 pt-5 w-11/12 xl:w-10/12 text-center text-white md:bg-ads360black-100 md:rounded">
      <div className="relative">
        <div className="bg-ads360black-100 pt-10 pb-10 md:pb-5 rounded md:rounded-none">
          <h3 className="text-2xl lg:text-4xl">
            Subscribe to Our Newsletter
          </h3>
          <h6 className="">
            For exclusives updates &{" "}
            <span className="text-ads360yellow-100">news</span>
          </h6>
          <div className="mt-5 md:mt-10">
            {/* <form> */}
            <div className="flex text-black px-1 rounded h-[38px] md:h-[45px] w-11/12 md:w-1/2 mx-auto items-center justify-center bg-ads360light-100">
              <input
                type="text"
                className="w-full focus:outline-none bg-transparent h-[38px] md:h-[45px]"
                placeholder="Enter Email..."
              />
              <div>
                <SmallBtnYello text="Submit" />
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
        <div className="flex justify-center md:mt-5">
          <Image width={0} height={0} src={img} alt="..." />
        </div>
      </div>
    </div>
  </section>
  )
}

export default NewsLetter