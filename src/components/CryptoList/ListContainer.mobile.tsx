import React, { lazy, useState } from "react";
import { motion } from "framer-motion";
import Search from "../../svgs/Search";

const ListBoxMobile = lazy(() => import("./ListBox.mobile"));

const ListContainer = () => {
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
    <div>
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
        className="z-10 flex flex-col gap-4 absolute w-full bg-neutral-50 overflow-hidden px-3 lg:hidden"
        transition={{ duration: 0.8, type: "tween" }}
      >
        <div className="w-full relative drop-shadow-xl mt-4">
          <input
            className="w-full py-2 font-vazir font-normal text-sm text-neutral-300 outline-none pr-12 border-[1px] border-neutral-300 rounded-lg"
            placeholder="جستجو در میان بیش از 840 رمز ارز"
          />
          <Search className="absolute bottom-1.5 right-3 stroke-neutral-300" />
        </div>
        {/* Mobile Version */}
        <div className="flex-auto flex flex-col h-max overflow-y-scroll">
          <ListBoxMobile />
          <ListBoxMobile title="مورد علاقه شما" />
        </div>
        {/* End mobile version */}
      </motion.div>
    </div>
  );
};

export default ListContainer;
