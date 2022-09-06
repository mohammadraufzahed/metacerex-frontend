import React, { MouseEventHandler } from "react";
import { motion } from "framer-motion";
import Button from "../AuthenticationPage/Button";

type PropsT = {
  children: React.ReactNode;
  onClose: MouseEventHandler;
  show: boolean;
};

const RulesBox: React.FC<PropsT> = ({ children, onClose, show }) => {
  return (
    <>
      <motion.div
        initial="initial"
        variants={{
          initial: {
            position: "fixed",
            width: "100vw",
            left: 0,
            opacity: 0,
            bottom: "100vh",
            height: "100vh",
            zIndex: 200,
          },
          open: {
            opacity: 1,
            bottom: 0,
          },
        }}
        transition={{ duration: 1.1, type: "spring" }}
        animate={show ? "open" : "initial"}
        className="bg-neutral-50 flex flex-col gap-10 items-center justify-start py-14 px-2 overflow-y-scroll overflow-x-hidden md:hidden"
      >
        {children}
        <Button text="بستن" onClick={onClose} outlined className="w-16 h-9" />
      </motion.div>
      <div className="hidden md:flex flex-col h-full max-h-[750px] w-full ">
        {children}
      </div>
    </>
  );
};

export default RulesBox;
