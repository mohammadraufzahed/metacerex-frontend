import React, { lazy, useState } from "react";
import { motion } from "framer-motion";
import SearchBox from "./SearchBox";
import { useRecoilValue } from "recoil";
import { financialBoxStatus } from "../../atoms/financialBoxStatus";

const ListBoxMobile = lazy(() => import("./ListBox.mobile"));

const ListContainer: React.FC = () => {
  const financialBoxStat = useRecoilValue(financialBoxStatus);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const arrowAnimations = {
    rotate: {
      rotate: 180,
    },
    normal: {
      rotate: 0,
    },
  };
  const boxAnimation = {
    show: {
      height: "77.5vh",
    },
    hide: {
      height: 0,
    },
  };
  return (
    <motion.div
      variants={{
        hide: {
          height: 0,
          overflow: "hidden",
          display: "none",
        },
      }}
      animate={financialBoxStat == "mobileOpen" ? "hide" : ""}
    >
      <div
        className="font-vazir font-normal h-12 text-sm bg-neutral-50 flex flex-row justify-between items-center px-6 cursor-pointer border-b-[1px] border-b-primary-700 lg:hidden"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <div className="flex flex-row gap-3">
          <img src="/svgs/btc.svg" alt="bitcoin" />
          <span className="text-neutral-900">بیت کوین</span>
        </div>
        <span className="text-success">159.345.000</span>
        <div>
          <motion.img
            src="/svgs/arrow-down.svg"
            alt="Arrow SVG"
            variants={arrowAnimations}
            animate={openMenu ? "rotate" : "normal"}
            className="w-4"
          />
        </div>
      </div>
      <motion.div
        variants={boxAnimation}
        initial={{ height: 0 }}
        animate={openMenu ? "show" : "hide"}
        className="z-10 flex flex-col absolute w-full bg-neutral-50 overflow-hidden px-3 lg:hidden scrollbar-vertical"
        transition={{ duration: 0.8, type: "tween" }}
      >
        <div className="mt-4" />
        <SearchBox />
        {/* Mobile Version */}
        <div className="flex-auto flex flex-col h-max overflow-y-scroll">
          <ListBoxMobile />
          <ListBoxMobile title="مورد علاقه شما" />
        </div>
        {/* End mobile version */}
      </motion.div>
    </motion.div>
  );
};

export default ListContainer;
