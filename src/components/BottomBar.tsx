import React, { lazy } from "react";
import type { MouseEventHandler, SVGProps, LazyExoticComponent } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { financialbox } from "../signals/financialBox";
import { colorMode } from "../signals/colorMode";

const StatusUp = lazy(() => import("../svgs/StatusUp"));
const EmptyWallet = lazy(() => import("../svgs/EmptyWallet"));
const BitcoinConvert = lazy(() => import("../svgs/BitcoinConvert"));
const Diagram = lazy(() => import("../svgs/Diagram"));

const BottomBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="fixed bottom-0 w-screen grid grid-cols-5 z-20 bg-neutral-50 dark:bg-neutral-900 h-16 lg:hidden">
      <BottomBarItem
        title="چارت"
        Icon={Diagram}
        onClick={() => {
          if (location.pathname !== "/dashboard/list") {
            navigate("/dashboard/list", { replace: true });
          }
          if (financialbox.value == "mobileOpen") {
            financialbox.value = "idleMobile";
          }
        }}
        active={
          location.pathname == "/dashboard/list" &&
          financialbox.value !== "mobileOpen"
        }
      />

      <BottomBarItem
        title="مدیریت حساب"
        Icon={StatusUp}
        onClick={() => {
          if (location.pathname !== "/dashboard/list") {
            navigate("/dashboard/list", { replace: true });
          }
          if (financialbox.value == "idleMobile") {
            financialbox.value = "mobileOpen";
          }
        }}
        active={
          location.pathname == "/dashboard/list" &&
          financialbox.value == "mobileOpen"
        }
      />
      <BottomBarItem
        title="بازار"
        Icon={BitcoinConvert}
        onClick={() => navigate("/dashboard/market", { replace: true })}
        active={location.pathname.startsWith("/dashboard/market")}
      />
      <BottomBarItem
        title="آتی"
        Icon={StatusUp}
        onClick={() => navigate("/ati", { replace: true })}
        active={location.pathname == "/ati"}
      />
      <BottomBarItem
        title="کیف پول"
        Icon={EmptyWallet}
        onClick={() => navigate("/dashboard/wallet")}
        active={location.pathname == "/dashboard/wallet"}
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
          backgroundColor:
            colorMode.value == "dark" ? "rgb(36 196 249)" : "rgb(8 103 136)",
        },
        normal: {
          backgroundColor: "rgba(0 0 0 0)",
        },
      }}
      animate={active ? "active" : "normal"}
    >
      <Icon
        className={`${
          active
            ? "stroke-neutral-50 dark:stroke-neutral-900"
            : "stroke-primary-700 dark:stroke-primary-500"
        }`}
      />
      <span
        className={`font-vazir font-light text-[10px] sm:text-sm ${
          active
            ? "text-white dark:text-neutral-900"
            : "text-primary-700 dark:text-primary-500"
        }`}
      >
        {title}
      </span>
    </motion.div>
  );
};

export default BottomBar;
