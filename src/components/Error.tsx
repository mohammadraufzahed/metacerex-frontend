import React from "react";
import { motion } from "framer-motion";

const Error: React.FC = () => {
  return (
    <motion.div
      className="bg-transparent w-full flex flex-col gap-4 font-vazir font-bold text-base text-error items-center rounded-sm border-error border-[1px] justify-center flex-auto"
      initial={{ borderColor: "rgba(0,0,0,0)" }}
      animate={{ borderColor: "#EE6055" }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
    >
      <span className="w-max">
        <img src="/svgs/emoji-sad.svg" width={100} />
      </span>
      <p className="text-xl">این قسمت به مشکل برخورد</p>
    </motion.div>
  );
};

export default Error;
