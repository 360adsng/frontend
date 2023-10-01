"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import cancel from "@public/icons/usericon/modalCancelBotton.svg";


type NotificationProps = {
  isOpen: boolean;
  children: React.ReactNode;
  handleNotification:()=>void
};

export const Notification = ({ isOpen, children, handleNotification }: NotificationProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          <motion.div
            className="fixed z-[10000000] top-0 w-full bg-black/50 h-full"
            initial={{
            //   opacity: 0,
              right: 0,
            }}
            animate={{
            //   opacity: 1,
              right: 1,
              transition: {
                ease: "easeOut",
                duration: 1,
              },
            }}
            exit={{
            //   opacity: 0,
              right: 0,
              transition: {
                ease: "easeIn",
                duration: 0.5,
              },
            }}
          >
            <div className="bg-[#F7F8F8] fixed right-0 w-10/12 md:w-6/12 lg:w-4/12 h-full">
              <div className="bg-ads360black-100 text-ads360light-100 p-5 flex justify-between">
                <p>Notifications</p>
                <button className="" onClick={handleNotification}>
                    <Image src={cancel} alt="cancel" className="w-5 h-5"/>
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
