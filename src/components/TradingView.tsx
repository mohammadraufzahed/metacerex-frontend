import React from "react";
import { AdvancedChart } from "react-tradingview-embed";
import { motion } from "framer-motion";
import { financialBoxStatus } from "../atoms/financialBoxStatus";
import { useRecoilValue } from "recoil";
import { tradingviewAtom } from "../atoms/tradingviewAtom";

const TradingView: React.FC = () => {
  const financialBoxStat = useRecoilValue(financialBoxStatus);
  const tradingview = useRecoilValue(tradingviewAtom);
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
      animate={financialBoxStat}
      className="flex-a"
      transition={{ duration: 1 }}
    >
      <AdvancedChart
        widgetProps={{
          symbol: `${(tradingview != ""
            ? tradingview
            : "btc"
          ).toUpperCase()}USDT`,
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
