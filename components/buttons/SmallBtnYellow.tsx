"use client"

import { FiArrowRight } from "react-icons/fi";


type Props = {
    text: string
}

const SmallBtnYello : React.FC<Props> = ({text}) =>{
    return(
        <>
            <span className='group flex w-[80px]'>
                <button className='group-hover:translate-x-7 group-hover:bg-ads360black-100 group-hover:text-ads360light-100 transition rounded-10 bg-ads360yellowBtn-100 w-14 h-8 text-xs text-ads360black-100 font-sgsb'>{text}</button>
                <button className='transition group-hover:-translate-x-14 group-hover:bg-ads360black-100 group-hover:text-ads360light-100 bg-ads360yellowBtn-100 ml-1 w-6 h-8 flex justify-center text-ads360black-100 items-center rounded-[50%] font-sgsb'><FiArrowRight size={24}/></button>
            </span>
        </>
    )
}

export default SmallBtnYello;