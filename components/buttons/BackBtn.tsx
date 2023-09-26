"use client"
import Image from "next/image";
import Arrowleft from "@public/icons/Arrowleft.svg";
import { useRouter } from "next/navigation";

const BackBtn = ({ children }: { children: React.ReactNode }) => {
  const route = useRouter();
  const goBack = () => {
    route.back();
  };
  return (
    <button onClick={goBack} className="flex items-center font-bold">
      <button className="group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-11  h-11 flex justify-center items-center rounded-[50%] color-white">
        <Image src={Arrowleft} width={0} height={0} alt="arrow" />
      </button>
      {children}
    </button>
  );
};

export default BackBtn;
