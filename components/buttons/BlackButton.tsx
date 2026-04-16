"use client";

import { FiArrowRight } from "react-icons/fi";

type Props = {
  text: string;
  handleClick: () => void;
  isPending: boolean;
};

const BlackButtons: React.FC<Props> = ({
  text,
  handleClick,
  isPending = false,
}) => {
  const disabledStyles =
    "opacity-60 cursor-not-allowed pointer-events-none group-hover:translate-x-0 group-hover:-translate-x-0 group-hover:bg-ads360black-100 group-hover:text-ads360light-100";
  return (
    <>
      <span className="group flex w-[168px]">
        <button
          onClick={handleClick}
          disabled={isPending}
          className={`group-hover:translate-x-32 group-hover:text-ads360black-100 group-hover:bg-ads360yellowBtn-100 w-12 transition bg-ads360black-100 text-ads360light-100 mx-1 h-12 flex justify-center items-center rounded-[50%] color-white ${
            isPending ? disabledStyles : ""
          }`}
        >
          <FiArrowRight size={28} />
        </button>
        <button
          onClick={handleClick}
          disabled={isPending}
          className={`group-hover:-translate-x-10 group-hover:text-ads360black-100 group-hover:bg-ads360yellowBtn-100 w-32 transition rounded-10 text-ads360light-100 bg-ads360black-100 h-12 ${
            isPending ? disabledStyles : ""
          }`}
        >
          {text}
        </button>
      </span>
    </>
  );
};

export default BlackButtons;
