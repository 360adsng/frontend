import Image from "next/image";
import mark from "@public/icons/mark.svg";

const Steps = ({ step, text }: StepProps) => {
  return (
    <div>
      <div className="hidden items-center justify-center mx-auto mt-5 mb-14 md:flex">
        {step > 1 ? (
          <div className="font-bold text-sm">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border flex justify-center bg-ads360yellow-100">
                <Image src={mark} width={0} height={0} alt="" />
              </div>
              <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
            </div>
            <div className="relative -left-10">Select Campaign</div>
          </div>
        ) : (
          <div className="font-bold text-sm">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border border-ads360yellow-100"></div>
              <div className="w-[150px] lg:w-[200px] border border-gray-300 h-0"></div>
            </div>
            <div className="relative -left-10">Select Campaign</div>
          </div>
        )}

        {step > 2 ? (
          <div className="font-bold text-sm">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
                <Image src={mark} width={0} height={0} alt="" />
              </div>
              <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
            </div>
            <div className="relative -left-10">Onboarding</div>
          </div>
        ) : (
          <div className="font-bold text-sm">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border border-ads360yellow-100"></div>
              <div className="w-[150px] lg:w-[200px] border border-gray-300 h-0"></div>
            </div>
            <div className="relative -left-10">Onboarding</div>
          </div>
        )}

        {step > 3 ? (
          <div className="font-bold text-sm">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
                <Image src={mark} width={0} height={0} alt="" />
              </div>
              <div className="w-[150px] lg:w-[200px] border border-ads360yellow-100 h-0"></div>
            </div>
            <div className="relative -left-10">completion</div>
          </div>
        ) : (
          <div className="font-bold text-sm text-left">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border border-ads360yellow-100"></div>
              <div className="w-[150px] lg:w-[200px] border border-gray-300 h-0"></div>
            </div>
            <div className="relative -left-7">completion</div>
          </div>
        )}

        {step > 4 ? (
          <div className="font-bold text-sm">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border bg-ads360yellow-100 flex justify-center">
                <Image src={mark} width={0} height={0} alt="" />
              </div>
            </div>
            <div className="relative -left-5">Checkout</div>
          </div>
        ) : (
          <div className="font-bold text-sm">
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border border-ads360yellow-100"></div>
            </div>
            <div className="relative -left-5">Checkout</div>
          </div>
        )}
      </div>

      <div className="font-bold md:hidden text-right mt-5 mb-10">
       {text}
      </div>
    </div>
  );
};

export default Steps;
