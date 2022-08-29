import React from "react";
import { motion } from "framer-motion";
import MaxMin from "../../svgs/MaxMin";
import { useRecoilState, useRecoilValue } from "recoil";
import { financialBoxStatus } from "../../atoms/financialBoxStatus";
import { screen } from "../../atoms/screen";

const FinancialBar: React.FC = () => {
  const [financialBoxStat, setFinancialBoxStat] =
    useRecoilState(financialBoxStatus);
  const screenR = useRecoilValue(screen);
  const arrowAnimation = {
    open: { rotate: 0 },
    close: {
      rotate: 180,
    },
  };
  const openOnClickHandler = () =>
    financialBoxStat == "open" || financialBoxStat == "mobileOpen"
      ? screenR.width < 1060
        ? setFinancialBoxStat("idleMobile")
        : setFinancialBoxStat("idle")
      : screenR.width < 1060
      ? setFinancialBoxStat("mobileOpen")
      : setFinancialBoxStat("open");

  return (
    <div className="flex flex-row z-50 justify-between bg-neutral-50 px-6 py-3 rounded-t-lg">
      <motion.span
        className="font-vazir font-bold text-xl cursor-pointer transition-all duration-300 text-black hover:drop-shadow-sm"
        onClick={openOnClickHandler}
      >
        مدیریت حساب
      </motion.span>
      <div className="flex flex-row gap-6">
        <motion.img
          className="cursor-pointer"
          onClick={openOnClickHandler}
          src="/svgs/arrow-down.svg"
          variants={arrowAnimation}
          animate={
            financialBoxStat == "open" || financialBoxStat == "mobileOpen"
              ? "open"
              : "close"
          }
        />
        <div
          className="cursor-pointer w-max"
          onClick={() =>
            financialBoxStat == "max" || financialBoxStat == "mobileOpen"
              ? screenR.width < 1060
                ? setFinancialBoxStat("idleMobile")
                : setFinancialBoxStat("idle")
              : setFinancialBoxStat("max")
          }
        >
          <MaxMin
            open={financialBoxStat == "max" || financialBoxStat == "mobileOpen"}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialBar;
