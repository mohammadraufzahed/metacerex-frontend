import React from "react";
import { motion } from "framer-motion";
import { sidebarAtom, starAtom } from "../../pages/OnchainPage";
import Sidebar from "../../svgs/Sidebar";
import Star from "../../svgs/Star";
import Chart from "../../svgs/Chart";
import Notification from "../../svgs/Notification";
import OnchainButton from "../../components/Onchain/OnchainButton";
import { useRecoilState } from "recoil";

const OnchainActions = () => {
  const [sidebar, setSidebar] = useRecoilState(sidebarAtom);
  const [star, setStar] = useRecoilState(starAtom);
  return (
    <div className="flex flex-row items-center gap-6">
      <OnchainButton
        maxContent
        text=""
        onTap={() => setSidebar((sidebar) => !sidebar)}
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
          <Sidebar className="stroke-primary-700" />
        </motion.div>
      </OnchainButton>
      <OnchainButton
        text="پسندیدن"
        active={star}
        onTap={() => setStar((star) => !star)}
      >
        <Star active={star} />
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
