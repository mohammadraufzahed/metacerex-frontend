import React from "react";
import { motion } from "framer-motion";
import { colorMode } from "../../signals/colorMode";

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
          background:
            colorMode.value == "dark"
              ? "rgba(38 38 38 1)"
              : "rgba(229 229 229 1)",
        },
        deactive: {
          background:
            colorMode.value == "dark"
              ? "rgba(38 38 38 0)"
              : "rgba(229 229 229 0)",
        },
        hover: {
          background:
            colorMode.value == "dark"
              ? "rgba(38 38 38 0.8)"
              : "rgba(229 229 229 0.8)",
        },
      }}
      initial="deactive"
      animate={active ? "active" : "deactive"}
      whileHover="hover"
      whileTap="active"
      onTapStart={onTap}
      transition={{ duration: 0.2, type: "tween" }}
      className="py-2 h-max  cursor-pointer px-2 sm:px-6 rounded-t-2xl"
    >
      <motion.span
        variants={{
          active: {
            color:
              colorMode.value == "dark"
                ? "rgba(36, 196, 249 1)"
                : "rgba(8 103 136 1)",
          },
          deactive: {
            color:
              colorMode.value == "dark"
                ? "rgba(36, 196, 249 0.4)"
                : "rgba(8 103 136 0.4)",
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
