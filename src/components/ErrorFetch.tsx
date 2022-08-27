import React from "react";
import { AiFillWarning } from "react-icons/ai";
import { motion } from "framer-motion";

type PropsT = {
  resetErrorBoundary: Function;
};

const ErrorFetch: React.FC<PropsT> = ({ resetErrorBoundary }) => {
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
        <motion.button
          initial={{
            scale: 1,
          }}
          whileHover={{
            scale: 1.02,
          }}
          className="mt-5 bg-error rounded stroke text-white px-4 py-2"
          onClick={() => resetErrorBoundary()}
        >
          تلاش مجدد
        </motion.button>
      </span>
    </motion.div>
  );
};

export default ErrorFetch;
