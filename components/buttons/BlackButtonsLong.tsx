"use client"

import { FiArrowRight } from "react-icons/fi";

type Props = {
    text: string
}

const BlackButtonsLong : React.FC<Props> = ({text}) =>{
    return(
        <>
            <span className='group flex w-[216px]'>
                <button className='group-hover:translate-x-10 w-44 group-hover:text-ads360black-100 group-hover:bg-ads360yellowBtn-100 transition rounded-10 text-ads360light-100 bg-ads360black-100 h-12'>{text}</button>
                <button className='group-hover:-translate-x-44 w-12 group-hover:text-ads360black-100 group-hover:bg-ads360yellowBtn-100  transition text-ads360light-100 bg-ads360black-100 mx-1 h-12 flex justify-center items-center rounded-[50%] color-white'><FiArrowRight size={28}/></button>
            </span>
        </>
    )
}

export default BlackButtonsLong;