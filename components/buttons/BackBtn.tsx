const Arrowleft = '/icons/Arrowleft.svg'
import { useRouter } from "@tanstack/react-router";

const BackBtn = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const goBack = () => {
    router.history.back();
  };
  return (
    <div onClick={goBack} className="flex items-center font-bold">
      <button
        type="button"
        className="group-hover:translate-x-32 transition bg-ads360black-100 mx-1 w-11  h-11 flex justify-center items-center rounded-[50%] color-white"
      >
        <img src={Arrowleft} alt="arrow" />
      </button>
      {children}
    </div>
  );
};

export default BackBtn;
