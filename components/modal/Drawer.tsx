"use client"
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import CloseAside from '@public/icons/closeAside.svg'
import WhiteLogo from '@components/logo/WhiteLogo'






interface Props {
    isOpen:boolean,
    children:React.ReactNode,
    toggleDrawer: ()=>void
}

const Drawer: React.FC<Props> = ({isOpen, toggleDrawer, children}) => {

    const drawer = useRef<HTMLElement>(null)
    
    useEffect(()=>{

        if(isOpen){
            drawer.current?.classList.add('forward')
            drawer.current?.classList.remove('reverse')
            drawer.current?.classList.remove('-left-[100%]')

        }else{
            drawer.current?.classList.add('reverse')
            drawer.current?.classList.remove('forward')
        }
    
    }, [isOpen])




    return(
        <>
        <aside ref={drawer}   className='bg-ads360black-100 text-white z-30 -left-[100%] md:hidden fixed w-full h-full top-0 overflow-y-scroll'>
            <div className='px-5'>
                <div className='flex justify-between  py-5'>
                    <div className='py-5'>
                    <WhiteLogo/>
                    </div>
                    <div className="md:hidden" onClick={toggleDrawer}>
                    <Image 
                        src={CloseAside} 
                        width={0}
                        height={0}
                        alt=""
                    />
                    </div>
                </div>

                {children}

            </div>
        </aside>
        </>
    )
}

export default Drawer;