import * as React from "react";
import { SVGProps } from "react";
import { motion } from "framer-motion";
import { colorMode } from "../signals/colorMode";

type PropsT = {
  copied: number;
};

const AnimatedCopy = (props: SVGProps<SVGSVGElement> & PropsT) => {
  const pathThreeVariants = {
    idle: {
      d: "m6.08 15 1.95 1.95 3.89-3.9",
      pathLength: 0,
      stroke: "transparent",
    },
    done: {
      d: "m6.08 15 1.95 1.95 3.89-3.9",
      pathLength: 1,
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
        d="M22 11.1V6.9C22 3.4 20.6 2 17.1 2h-4.2C9.4 2 8 3.4 8 6.9V8h3.1c3.5 0 4.9 1.4 4.9 4.9V16h1.1c3.5 0 4.9-1.4 4.9-4.9Z"
        stroke={colorMode.value == "dark" ? "#ffffff" : "#292D32"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
      />
      <motion.path
        d="M16 17.1v-4.2C16 9.4 14.6 8 11.1 8H6.9C3.4 8 2 9.4 2 12.9v4.2C2 20.6 3.4 22 6.9 22h4.2c3.5 0 4.9-1.4 4.9-4.9Z"
        stroke={colorMode.value == "dark" ? "#ffffff" : "#292D32"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
      />
      <motion.path
        stroke={colorMode.value == "dark" ? "#ffffff" : "#292D32"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial="idle"
        animate={props.copied ? "done" : "idle"}
        variants={pathThreeVariants}
        className={props.className}
      />
    </svg>
  );
};

export default AnimatedCopy;
