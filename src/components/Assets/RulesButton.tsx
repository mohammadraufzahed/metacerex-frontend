import React, { MouseEventHandler } from "react";
import { motion } from "framer-motion";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

type PropsT = {
  onTap: (event: MouseEvent) => void;
};

const RulesButton: React.FC<PropsT> = ({ onTap }) => {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 1.015 }}
      onTap={onTap}
      className="w-11/12 flex flex-row gap-2.5 py-3.5 items-center justify-center rounded text-primary-700 dark:text-primary-500 font-vazir font-normal text-sm bg-secondary-500 dark:bg-secondary-700 md:hidden"
    >
      <RiArrowLeftSLine className="text-base" />
      مطالعه شرایط و قوانین
      <RiArrowRightSLine className="text-base" />
    </motion.button>
  );
};

export default RulesButton;
