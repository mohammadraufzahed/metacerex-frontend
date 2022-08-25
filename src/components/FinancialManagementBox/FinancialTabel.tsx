import React from "react";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { financialBoxStatus } from "../../atoms/financialBoxStatus";

const FinancialTabel: React.FC = () => {
  const financialBoxStat = useRecoilValue(financialBoxStatus);
  const containerAnimation = {
    open: {
      height: 450,
      borderTopColor: "rgba(0 0 0 1)",
    },
    close: {
      height: 0,
      borderTopColor: "rgba(0 0 0 0)",
    },
    max: {
      height: 1060,
      borderTopColor: "rgba(0 0 0 1)",
    },
    maxMobile: {
      height: "82.3vh",
      bottom: 0,
      left: 0,
    },
  };
  return (
    <motion.div
      className="w-full bg-gray-50 overflow-hidden border-t-[1px]"
      initial={{ height: 0 }}
      variants={containerAnimation}
      animate={
        financialBoxStat == "open"
          ? "open"
          : financialBoxStat == "max"
          ? "max"
          : financialBoxStat == "mobileOpen"
          ? "maxMobile"
          : "close"
      }
      transition={{ duration: 1 }}
    >
      ss
    </motion.div>
  );
};

export default FinancialTabel;
