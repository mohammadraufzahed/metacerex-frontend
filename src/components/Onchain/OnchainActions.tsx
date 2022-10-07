import React from "react";
import { motion } from "framer-motion";
import Sidebar from "../../svgs/Sidebar";
import Star from "../../svgs/Star";
import Chart from "../../svgs/Chart";
import Notification from "../../svgs/Notification";
import OnchainButton from "../../components/Onchain/OnchainButton";
import { sidebar, star } from "../../pages/OnchainPage";

const OnchainActions = () => {
  return (
    <div className="flex flex-row items-center gap-6">
      <OnchainButton
        maxContent
        text=""
        onTap={() => (sidebar.value = !sidebar.value)}
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
          animate={sidebar ? "active" : "initial"}
        >
          <Sidebar className="stroke-primary-700 dark:stroke-primary-500" />
        </motion.div>
      </OnchainButton>
      <OnchainButton
        text="پسندیدن"
        active={star.value}
        onTap={() => (star.value = !star.value)}
      >
        <Star active={star.value} />
      </OnchainButton>
      <OnchainButton text="مقایسه">
        <Chart className="stroke-primary-700 dark:stroke-primary-500" />
      </OnchainButton>
      <OnchainButton text="ایجاد یادآور">
        <Notification className="stroke-primary-700 dark:stroke-primary-500" />
      </OnchainButton>
    </div>
  );
};

export default OnchainActions;
