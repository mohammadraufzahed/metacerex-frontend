import React from "react";
import { motion } from "framer-motion";

import { useRecoilState } from "recoil";
import { financialBoxStatus } from "../../atoms/financialBoxStatus";
import { FinancialBar, FinancialTable } from "./index";

const FinancialManagementBox: React.FC = () => {
  const [financialBoxStat, setFinancialBoxStat] =
    useRecoilState(financialBoxStatus);

  return (
    <motion.div
      variants={{
        idleMobile: {
          height: 0,
          overflow: "hidden",
          display: "none",
        },
      }}
      animate={financialBoxStat}
      transition={{
        duration: 1,
      }}
      className={`lg:w-full
      } ${
        financialBoxStat == "idle" || financialBoxStat == "open"
          ? "lg:pt-7"
          : ""
      } lg:block lg:relative lg:bottom-0`}
    >
      <FinancialBar />
      <FinancialTable />
    </motion.div>
  );
};

export default FinancialManagementBox;
