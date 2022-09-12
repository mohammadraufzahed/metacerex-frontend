import React from "react";
import { motion } from "framer-motion";

import { useRecoilValue } from "recoil";
import { financialBoxStatus } from "../../atoms/financialBoxStatus";
import { FinancialBar, FinancialTable } from "./index";

const FinancialManagementBox: React.FC = () => {
  const financialBoxStat = useRecoilValue(financialBoxStatus);

  return (
    <motion.div
      variants={{
        idleMobile: {
          display: "none",
        },
        mobileOpen: {
          display: "block",
          position: "absolute",
          top: -15,
          width: "100vw",
          overflow: "scroll",
        },
      }}
      initial=""
      animate={financialBoxStat}
      className={
        financialBoxStat == "max" || financialBoxStat == "mobileOpen"
          ? ""
          : "mt-1"
      }
    >
      <FinancialBar />
      <FinancialTable />
    </motion.div>
  );
};

export default FinancialManagementBox;
