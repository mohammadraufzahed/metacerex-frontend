import React from "react";
import { motion } from "framer-motion";

type OnchainButtonT = {
  children?: React.ReactNode;
  active?: boolean;
  onTap?: () => void;
  text?: string;
  maxContent?: boolean;
};

const OnchainButton: React.FC<OnchainButtonT> = ({
  children,
  active,
  onTap,
  text,
  maxContent,
}) => {
  return (
    <motion.button
      variants={{
        initial: {
          y: 0,
          background: "rgba(8 103 136 0)",
        },
        hover: {
          y: -0.5,
        },
        tap: {
          y: -2,
        },
        active: {
          background: "rgba(8 103 136 1)",
        },
      }}
      onTap={onTap}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate={active ? "active" : "initial"}
      className={`py-2 border-[1px] w-12  flex flex-row items-center justify-center gap-2.5 rounded-lg border-primary-700 ${
        maxContent ? "lg:w-max lg:px-10" : "lg:w-44"
      }`}
    >
      {children}
      <motion.span
        variants={{
          initial: {
            color: "rgba(8 103 136 1)",
          },
          active: {
            color: "rgba(255, 255, 255 1)",
          },
        }}
        initial="initial"
        animate={active ? "active" : "initial"}
        className={`hidden ${
          text != "" ? "lg:block" : ""
        } font-vazir font-bold text-base`}
      >
        {text}
      </motion.span>
    </motion.button>
  );
};

export default OnchainButton;
