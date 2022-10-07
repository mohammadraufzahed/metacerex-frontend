import React from "react";
import { motion } from "framer-motion";
import MaxMin from "../../svgs/MaxMin";
import { useRecoilState, useRecoilValue } from "recoil";
import { screen } from "../../signals/screen";
import { financialbox } from "../../signals/financialBox";
import { colorMode } from "../../signals/colorMode";

const FinancialBar: React.FC = () => {
  const arrowAnimation = {
    open: { rotate: 0 },
    close: {
      rotate: 180,
    },
  };

  const openOnClickHandler = () =>
    financialbox.value == "open" || financialbox.value == "mobileOpen"
      ? screen.value.width < 1024
        ? (financialbox.value = "idleMobile")
        : (financialbox.value = "idle")
      : screen.value.width < 1024
      ? (financialbox.value = "mobileOpen")
      : (financialbox.value = "open");
  return (
    <div className="flex w-full flex-row z-50 justify-between bg-neutral-50 dark:bg-neutral-900 px-6 py-3 rounded-t-lg">
      <motion.span
        className="font-vazir font-bold text-xl cursor-pointer transition-all duration-300 text-neutral-900 dark:text-neutral-50 hover:drop-shadow-sm"
        onClick={openOnClickHandler}
      >
        مدیریت حساب
      </motion.span>
      <div className="flex flex-row gap-6">
        <motion.img
          className="cursor-pointer"
          onClick={openOnClickHandler}
          src={`/svgs/arrow-down-${colorMode.value}.svg`}
          variants={arrowAnimation}
          animate={
            financialbox.value == "open" || financialbox.value == "mobileOpen"
              ? "open"
              : "close"
          }
        />
        <div
          className="cursor-pointer w-max"
          onClick={() =>
            financialbox.value == "max" || financialbox.value == "mobileOpen"
              ? screen.value.width < 1024
                ? (financialbox.value = "idleMobile")
                : (financialbox.value = "idle")
              : (financialbox.value = "max")
          }
        >
          <MaxMin
            open={
              financialbox.value == "max" || financialbox.value == "mobileOpen"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialBar;
