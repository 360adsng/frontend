"use client"

import { FiArrowRight } from "react-icons/fi"

type Props = {
    text: string
}

const BlackButtons : React.FC<Props> = ({text}) =>{
    return(
        <>
            <span className='group flex w-[168px]'>
                <button className='group-hover:translate-x-32 group-hover:text-ads360black-100 group-hover:bg-ads360yellowBtn-100 w-12 transition bg-ads360black-100 text-ads360light-100 mx-1 h-12 flex justify-center items-center rounded-[50%] color-white'><FiArrowRight size={28}/></button>
                <button className='group-hover:-translate-x-10 group-hover:text-ads360black-100 group-hover:bg-ads360yellowBtn-100 w-32 transition rounded-10 text-ads360light-100 bg-ads360black-100 h-12'>{text}</button>
            </span>
        </>
    )
}

export default BlackButtons;