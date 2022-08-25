import React from "react";
import { AdvancedChart } from "react-tradingview-embed";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { financialBoxStatus } from "../atoms/financialBoxStatus";

const TradingView: React.FC = () => {
  const financialBoxStat = useRecoilValue(financialBoxStatus);
  const containerAnimation = {
    hideDesktop: {
      height: 0,
    },
    hideMobile: {
      height: 0,
      display: "none",
    },
    show: {
      flex: 1,
    },
  };
  return (
    <motion.div
      variants={containerAnimation}
      animate={
        financialBoxStat == "max"
          ? "hideDesktop"
          : financialBoxStat == "mobileOpen"
          ? "hideMobile"
          : "show"
      }
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
