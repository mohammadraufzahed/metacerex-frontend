import React from "react";
import { AdvancedChart } from "react-tradingview-embed";
import { motion } from "framer-motion";
import { financialbox } from "../signals/financialBox";
import { tradingview } from "../signals/tradingview";

const TradingView: React.FC = () => {
  const containerAnimation = {
    max: {
      height: 0,
    },
    idle: {
      height: "100%",
      maxHeight: "100%",
    },
    open: {
      height: "47%",
      maxHeight: "47%",
    },
  };
  return (
    <motion.div
      variants={containerAnimation}
      initial={{}}
      animate={financialbox.value}
      className="flex-a"
      transition={{ duration: 1 }}
    >
      <AdvancedChart
        widgetProps={{
          symbol: `${tradingview.value.toUpperCase()}USDT`,
          width: "100%",
          height: "100%",
          autosize: false,
          interval: "240",
          timezone: "Asia/Tehran",
          theme: "light",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          withdateranges: true,
          hide_side_toolbar: false,
        }}
      />
    </motion.div>
  );
};

export default TradingView;
