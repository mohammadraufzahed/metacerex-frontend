import React from "react";
import { motion } from "framer-motion";

const GoogleButton: React.FC = () => {
  return (
    <motion.button
      type="button"
      initial={{ scale: 1, borderWidth: 1, borderColor: "rgba(0 0 0 0)" }}
      whileHover={{ scale: 1.02, borderColor: "#086788" }}
      className="w-full rounded mb-10 mt-5 flex gap-5 flex-row bg-white py-4 items-center justify-center"
    >
      <img src="/svgs/google.svg" width={23} />
      <span className="font-vazir font-bold text-xl text-neutral-400">
        ورود با گوگل
      </span>
    </motion.button>
  );
};

export default GoogleButton;
