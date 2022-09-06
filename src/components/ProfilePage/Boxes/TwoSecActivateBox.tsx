import React, { MouseEventHandler, useState } from "react";
import { motion } from "framer-motion";
import { BsFillXCircleFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";

const TwoSecActivateBox: React.FC = () => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div className="flex flex-col bg-gray-50 w-full rounded-2xl items-center justify-center py-2 gap-4 md:flex-row md:justify-between md:px-8 md:py-7">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-7">
        <img src="/svgs/2af.svg" width={32} height={32} />
        <div className="font-vazir font-bold text-sm">
          <span>احراز هویت دو عاملی: </span>
          <span>غیر فعال</span>
        </div>
      </div>
      <AnimatedCheckBox
        active={active}
        onClick={() => setActive((active) => !active)}
      />
    </div>
  );
};

type AnimatedCheckBoxT = {
  active: boolean;
  onClick: MouseEventHandler;
  className?: string;
};

export const AnimatedCheckBox: React.FC<AnimatedCheckBoxT> = ({
  active,
  onClick,
  className,
}) => (
  <motion.div
    variants={{
      active: {
        background: "rgba(8, 103, 136 1)",
      },
      deactive: {
        background: "rgb(212 212 212)",
      },
    }}
    animate={active ? "active" : "deactive"}
    className={`w-16 h-9 rounded-2xl cursor-pointer ${className}`}
    onClick={onClick}
  >
    <motion.div
      variants={{
        active: {
          x: -36,
          color: "#ffffff",
        },
        deactive: {
          y: 6,
          x: -3,
          color: "rgb(163, 163, 163)",
        },
      }}
      transition={{ duration: 1, type: "spring" }}
      animate={active ? "active" : "deactive"}
      initial={{ y: 6, x: -3 }}
    >
      {!active ? (
        <BsFillXCircleFill className="text-2xl" />
      ) : (
        <AiFillCheckCircle className="text-2xl" />
      )}
    </motion.div>
  </motion.div>
);

export default TwoSecActivateBox;
