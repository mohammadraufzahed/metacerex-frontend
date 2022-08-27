import React from "react";
import { motion } from "framer-motion";
import type { MouseEventHandler } from "react";

type PropsT = {
  text: string;
  active: boolean;
  onClick: MouseEventHandler;
};

const MenuItem: React.FC<PropsT> = ({ text, active, onClick }) => {
  const spanAnimation = {
    initial: {
      borderBottomColor: "#a3a3a3",
      color: "#a3a3a3",
    },
    active: {
      borderBottomColor: "#086788",
      color: "#086788",
    },
  };
  return (
    <motion.span
      className="w-full text-center py-3 border-b-2 cursor-pointer"
      variants={spanAnimation}
      transition={{ duration: 0.5, type: "spring" }}
      onClick={onClick}
      animate={active ? "active" : "initial"}
    >
      {text}
    </motion.span>
  );
};

export default MenuItem;
