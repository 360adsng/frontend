"use client"
import { useEffect, useRef, useLayoutEffect } from "react";

interface ModalProps {
    children:React.ReactNode
    isOpen:Boolean
}


function Modal({ isOpen, children }: ModalProps) {

  const modalRef = useRef<HTMLDivElement>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (isOpen) {
        if(modalRef.current !== null){
            modalRef.current.classList.remove('hide')
            modalRef.current.classList.add('show')
        }
      setTimeout(()=>{
        if(modalRef.current !== null && modalContentRef.current !== null){
            modalRef.current.style.opacity = '1'
            modalContentRef.current.style.transform = 'scale(1)'
        }
      }, 300)
    } else {
        if(modalRef.current !== null && modalContentRef.current !== null){
            modalRef.current.style.opacity = '0'
            modalContentRef.current.style.transform = 'scale(0)'
        }
      setTimeout(()=>{
        if(modalRef.current !== null){
            modalRef.current.classList.remove('show')
            modalRef.current.classList.add('hide')
        }
      }, 1000)
    }
  }, [isOpen]);

  


  return (
    <div ref={modalRef} className='hide transition duration-500 opacity-0 w-full fixed z-[100000] h-full bg-black/50 top-0'>
      <div ref={modalContentRef} className="transition duration-500">
        {children}
      </div>
    </div>
  );
}

export default Modal;

