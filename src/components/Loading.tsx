import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="w-full flex-auto flex flex-col gap-3 items-center justify-center min-h-[inherit] bg-background-50">
      <motion.img
        src="/svgs/logo-white.svg"
        width={50}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
      <span className="font-vazir font-normal text-sm text-neutral-400">
        درحال بارگزاری
      </span>
    </div>
  );
};

export default Loading;
