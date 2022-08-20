import React from "react";
import { AiFillWarning } from "react-icons/ai";
import { motion } from "framer-motion";

const Error: React.FC = () => {
  return (
    <motion.div
      className="bg-neutral-50 flex items-center rounded-lg border-error border-[1px] justify-center flex-auto"
      initial={{ borderColor: "rgba(0,0,0,0)" }}
      animate={{ borderColor: "#EE6055" }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
    >
      <span className="font-vazir text-center font-extrabold text-error">
        <div>
          <span className="text-2xl flex flex-row items-center justify-center gap-2">
            <AiFillWarning /> خطا
          </span>
          <p className="text-xl">این قسمت به مشکل برخورد</p>
        </div>
      </span>
    </motion.div>
  );
};

export default Error;
