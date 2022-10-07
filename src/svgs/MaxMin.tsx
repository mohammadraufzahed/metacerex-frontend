import * as React from "react";
import type { SVGProps } from "react";
import { motion } from "framer-motion";
import { colorMode } from "../signals/colorMode";

const MaxMin = (
  props: SVGProps<SVGSVGElement> & {
    open: boolean;
  }
) => {
  const animateVariant = {
    max: {
      d: "M2 9V6.5C2 4.01 4.01 2 6.5 2H9M15 2h2.5C19.99 2 22 4.01 22 6.5V9M22 16v1.5c0 2.49-2.01 4.5-4.5 4.5H16M9 22H6.5C4.01 22 2 19.99 2 17.5V15",
    },
    min: {
      d: "M9 2v2.5C9 6.99 6.99 9 4.5 9H2M22 9h-2.5C17.01 9 15 6.99 15 4.5V2M16 22v-1.5c0-2.49 2.01-4.5 4.5-4.5H22M2 15h2.5C6.99 15 9 17.01 9 19.5V22",
    },
  };
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <motion.path
        initial={{
          d: "M2 9V6.5C2 4.01 4.01 2 6.5 2H9M15 2h2.5C19.99 2 22 4.01 22 6.5V9M22 16v1.5c0 2.49-2.01 4.5-4.5 4.5H16M9 22H6.5C4.01 22 2 19.99 2 17.5V15",
        }}
        variants={animateVariant}
        animate={props.open ? "min" : "max"}
        className={
          colorMode.value == "dark" ? "stroke-neutral-50" : "stroke-neutral-900"
        }
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MaxMin;
