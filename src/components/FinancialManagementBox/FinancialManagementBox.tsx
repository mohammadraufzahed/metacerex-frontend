import React from "react";
import { motion } from "framer-motion";

import { useRecoilValue } from "recoil";
import { FinancialBar, FinancialTable } from "./index";
import { financialbox } from "../../signals/financialBox";

const FinancialManagementBox: React.FC = () => {
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
      animate={financialbox.value}
      className={
        financialbox.value == "max" || financialbox.value == "mobileOpen"
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
