import React from "react";
import { motion } from "framer-motion";

type PropsT = {
  active?: boolean;
  onTap: () => void;
  text: string;
};

export const TabItem: React.FC<PropsT> = ({ active, onTap, text }) => {
  return (
    <motion.div
      variants={{
        active: {
          background: "rgb(229 229 229)",
        },
        deactive: {
          background: "rgba(229 229 229 0)",
        },
        hover: {
          background: "rgba(229 229 229 0.8)",
        },
      }}
      initial="deactive"
      animate={active ? "active" : "deactive"}
      whileHover="hover"
      whileTap="active"
      onTapStart={onTap}
      transition={{ duration: 0.2, type: "tween" }}
      className="py-2 h-max cursor-pointer px-2 sm:px-6 rounded-t-2xl"
    >
      <motion.span
        variants={{
          active: {
            color: "rgb(8 103 136)",
          },
          deactive: {
            color: "rgba(82, 82, 82 0.8)",
          },
        }}
        initial="deactive"
        animate={active ? "active" : "deactive"}
        className="font-vazir font-normal text-center text-sm lg:font-bold sm:text-base"
      >
        {text}
      </motion.span>
    </motion.div>
  );
};
