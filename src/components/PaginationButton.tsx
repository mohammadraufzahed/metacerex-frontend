import { motion } from "framer-motion";
import type { MouseEventHandler } from "react";
import React from "react";
import { colorMode } from "../signals/colorMode";

type PaginationButtonT = {
  text: string;
  disabled?: boolean;
  onClick: MouseEventHandler;
};

const PaginationButton: React.FC<PaginationButtonT> = ({
  text,
  disabled,
  onClick,
}) => (
  <motion.button
    variants={{
      enabled: {
        background:
          colorMode.value == "dark"
            ? "rgba(38, 38, 38 1)"
            : "rgba(226 232 240 1)",
      },
      disabled: {
        background:
          colorMode.value == "dark"
            ? "rgba(38, 38, 38 0.5)"
            : "rgba(226 232 240 0.5)",
      },
      tap: {
        background:
          colorMode.value == "dark"
            ? "rgba(38, 38, 38 1)"
            : "rgba(203, 213, 225 1)",
      },
    }}
    animate={disabled ? "disabled" : "enabled"}
    initial="enabled"
    disabled={disabled ? true : false}
    whileTap="tap"
    onClick={onClick}
    className=" font-vazir bg-ne px-2 py-1 rounded font-light text-sm text-neutral-900 dark:text-neutral-50 cursor-pointer disabled:cursor-default"
  >
    {text}
  </motion.button>
);

export default PaginationButton;
