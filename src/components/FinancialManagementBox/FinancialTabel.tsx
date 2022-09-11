import React from "react";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { financialBoxStatus } from "../../atoms/financialBoxStatus";
import { userToken } from "../../atoms/userToken";
import LoginRequiredPage from "../../pages/LoginRequiredPage";

const FinancialTabel: React.FC = () => {
  const financialBoxStat = useRecoilValue(financialBoxStatus);
  const userTokenD = useRecoilValue(userToken);
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
      height: 960,
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
      className="w-full flex bg-gray-50 overflow-hidden border-t-[1px]"
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
      {!userTokenD ? <LoginRequiredPage /> : <></>}
    </motion.div>
  );
};

export default FinancialTabel;
