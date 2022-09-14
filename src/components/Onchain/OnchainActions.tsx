import React from "react";
import { motion } from "framer-motion";
import { sidebarSignal, starSignal } from "../../pages/OnchainPage";
import Sidebar from "../../svgs/Sidebar";
import Star from "../../svgs/Star";
import Chart from "../../svgs/Chart";
import Notification from "../../svgs/Notification";
import OnchainButton from "../../components/Onchain/OnchainButton";

const OnchainActions = () => {
  return (
    <div className="flex flex-row items-center gap-6">
      <OnchainButton
        maxContent
        text=""
        onTap={() => (sidebarSignal.value = !sidebarSignal.value)}
      >
        <motion.div
          variants={{
            initial: {
              rotate: 0,
            },
            active: {
              rotate: 180,
            },
          }}
          initial="initial"
          animate={sidebarSignal.value ? "active" : "initial"}
        >
          <Sidebar className="stroke-primary-700" />
        </motion.div>
      </OnchainButton>
      <OnchainButton
        text="پسندیدن"
        active={starSignal.value}
        onTap={() => (starSignal.value = !starSignal.value)}
      >
        <Star active={starSignal.value} />
      </OnchainButton>
      <OnchainButton text="مقایسه">
        <Chart className="stroke-primary-700" />
      </OnchainButton>
      <OnchainButton text="ایجاد یادآور">
        <Notification className="stroke-primary-700" />
      </OnchainButton>
    </div>
  );
};

export default OnchainActions;
