import { AnimatePresence, motion } from "framer-motion";
const cancel = '/icons/usericon/modalCancelBotton.svg'


type NotificationProps = {
  isOpen: boolean;
  children: React.ReactNode;
  handleNotification:()=>void
};

export const Notification = ({ isOpen, children, handleNotification }: NotificationProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed z-[10000000] inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close notifications"
            className="absolute inset-0 bg-black/50"
            onClick={handleNotification}
          />

          <motion.div
            className="bg-[#F7F8F8] fixed right-0 top-0 w-10/12 md:w-6/12 lg:w-4/12 h-full"
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { ease: "easeOut", duration: 0.25 } }}
            exit={{ x: "100%", transition: { ease: "easeIn", duration: 0.2 } }}
          >
            <div className="bg-ads360black-100 text-ads360light-100 p-5 flex justify-between">
              <p>Notifications</p>
              <button type="button" onClick={handleNotification}>
                <img src={cancel} alt="cancel" className="w-5 h-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
