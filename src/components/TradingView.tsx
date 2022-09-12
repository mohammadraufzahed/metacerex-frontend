import React from "react";
import { AdvancedChart } from "react-tradingview-embed";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { financialBoxStatus } from "../atoms/financialBoxStatus";

const TradingView: React.FC = () => {
  const financialBoxStat = useRecoilValue(financialBoxStatus);
  const containerAnimation = {
    max: {
      height: 0,
    },
    idle: {
      height: "85.5vh",
    },
    open: {
      height: "42vh",
    },
  };
  return (
    <motion.div
      variants={containerAnimation}
      initial={{}}
      animate={financialBoxStat}
      className="flex-a"
      transition={{ duration: 1 }}
    >
      <AdvancedChart
        widgetProps={{
          theme: "light",
          hide_side_toolbar: true,
          hide_top_toolbar: true,
          width: "100%",
          height: "100%",
          allow_symbol_change: false,
        }}
      />
    </motion.div>
  );
};

export default TradingView;
