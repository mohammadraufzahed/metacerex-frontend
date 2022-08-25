import React, { lazy } from "react";
import type { MouseEventHandler, SVGProps, LazyExoticComponent } from "react";
import { motion } from "framer-motion";

import { useRecoilState } from "recoil";
import { financialBoxStatus } from "../atoms/financialBoxStatus";
import { useLocation, useNavigate } from "react-router-dom";

const StatusUp = lazy(() => import("../svgs/StatusUp"));
const EmptyWallet = lazy(() => import("../svgs/EmptyWallet"));
const BitcoinConvert = lazy(() => import("../svgs/BitcoinConvert"));
const Diagram = lazy(() => import("../svgs/Diagram"));

const BottomBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [financialBoxStat, setFinancialBoxStat] =
    useRecoilState(financialBoxStatus);
  return (
    <div className="fixed bottom-0 w-screen grid grid-cols-5 z-20 bg-neutral-50 h-16 lg:hidden">
      <BottomBarItem
        title="چارت"
        Icon={Diagram}
        onClick={() => {
          if (location.pathname !== "/dashboard/list") {
            navigate("/dashboard/list", { replace: true });
          }
          if (financialBoxStat == "mobileOpen") {
            setFinancialBoxStat("idleMobile");
          }
        }}
        active={
          location.pathname == "/dashboard/list" &&
          financialBoxStat !== "mobileOpen"
        }
      />

      <BottomBarItem
        title="مدیریت حساب"
        Icon={StatusUp}
        onClick={() => {
          if (location.pathname !== "/dashboard/list") {
            navigate("/dashboard/list", { replace: true });
          }
          if (financialBoxStat == "idleMobile") {
            setFinancialBoxStat("mobileOpen");
          }
        }}
        active={
          location.pathname == "/dashboard/list" &&
          financialBoxStat == "mobileOpen"
        }
      />
      <BottomBarItem
        title="بازار"
        Icon={BitcoinConvert}
        onClick={() => {}}
        active={false}
      />
      <BottomBarItem
        title="آتی"
        Icon={StatusUp}
        onClick={() => {}}
        active={false}
      />
      <BottomBarItem
        title="کیف پول"
        Icon={EmptyWallet}
        onClick={() => {}}
        active={false}
      />
    </div>
  );
};

type BottomBarItemT = {
  title: string;
  Icon: LazyExoticComponent<React.FC<SVGProps<SVGSVGElement>>>;
  onClick: MouseEventHandler;
  active: boolean;
};

const BottomBarItem: React.FC<BottomBarItemT> = ({
  title,
  Icon,
  onClick,
  active,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer justify-center gap-1"
      initial={{ backgroundColor: "rgba(0 0 0 0)" }}
      variants={{
        active: {
          backgroundColor: "#086788",
        },
        normal: {
          backgroundColor: "rgba(0 0 0 0)",
        },
      }}
      animate={active ? "active" : "normal"}
    >
      <Icon className={`${active ? "stroke-white" : "stroke-primary-700"}`} />
      <span
        className={`font-vazir font-light text-[10px] sm:text-sm ${
          active ? "text-white" : "text-primary-700"
        }`}
      >
        {title}
      </span>
    </motion.div>
  );
};

export default BottomBar;
