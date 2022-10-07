import React, { lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchBox from "./SearchBox";
import { useRecoilState, useRecoilValue } from "recoil";
import { tickers } from "../../atoms/tickers";
import { tickers_fav } from "../../atoms/tickers_fav";
import { userToken } from "../../atoms/userToken";
import LoginRequiredPage from "../../pages/LoginRequiredPage";
import { TickerTable } from "../../types/API";
import { financialbox } from "../../signals/financialBox";
import { tradingview } from "../../signals/tradingview";
import { colorMode } from "../../signals/colorMode";

const ListBoxMobile = lazy(() => import("./ListBox.mobile"));

type PropsT = {
  onScroll: (e: HTMLDivElement) => void;
  onScrollFav: (e: HTMLDivElement) => void;
  onTapFav: () => void;
};

const ListContainer: React.FC<PropsT> = ({
  onTapFav,
  onScroll,
  onScrollFav,
}) => {
  // States
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const tickersAll = useRecoilValue(tickers);
  const tickersFav = useRecoilValue(tickers_fav);
  const [currentTicker, setCurrentTicker] = useState<TickerTable | null>();
  const userTokenD = useRecoilValue(userToken);
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
      height: "90vh",
      zIndex: 120,
    },
    hide: {
      height: 0,
    },
  };
  // Effects
  useEffect(() => {
    if (tickersAll.length != 0 || tickersFav.length !== 0) {
      const ticker = [...tickersAll, ...tickersFav].filter(
        (item) =>
          item.base_asset.code.toUpperCase() == tradingview.value.toUpperCase()
      );
      if (ticker.length == 0 && tickersAll.length !== 0) {
        setCurrentTicker(tickersAll[1]);
        tradingview.value = tickersAll[1].base_asset.code;
      } else if (ticker.length > 0) {
        setCurrentTicker(ticker[0]);
      }
    }
  }, [tradingview.value, tickersAll]);
  return (
    <motion.div
      variants={{
        hide: {
          height: 0,
          overflow: "hidden",
          display: "none",
        },
      }}
      animate={financialbox.value == "mobileOpen" ? "hide" : ""}
    >
      <div
        className="font-vazir font-normal h-12 text-sm bg-neutral-50 dark:bg-neutral-900 flex flex-row justify-between items-center px-6 cursor-pointer border-b-[1px] border-b-primary-700 lg:hidden"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <div className="flex items-center flex-row gap-3">
          <img
            src={currentTicker ? currentTicker.base_asset.icon : ""}
            width={28}
          />
          <span className="text-neutral-900 dark:text-neutral-50">
            {currentTicker ? currentTicker.base_asset.code : ""}
          </span>
        </div>
        <div>
          <motion.img
            src={`/svgs/arrow-down-${colorMode.value}.svg`}
            alt="Arrow SVG"
            variants={arrowAnimations}
            animate={openMenu ? "rotate" : "normal"}
            className="w-5"
          />
        </div>
      </div>
      <motion.div
        variants={boxAnimation}
        initial={{ height: 0 }}
        animate={openMenu ? "show" : "hide"}
        className="z-10 flex flex-col absolute w-full bg-neutral-50 dark:bg-neutral-900 overflow-x-hidden px-3 lg:hidden scrollbar-vertical"
        transition={{ duration: 0.8, type: "tween" }}
      >
        <div className="mt-4" />
        <SearchBox />
        {/* Mobile Version */}
        <div className="flex-auto flex flex-col h-full overflow-">
          <ListBoxMobile
            onTapFav={onTapFav}
            list={tickersAll.length == 0 ? [] : tickersAll}
            onScroll={onScroll}
          />
          {userTokenD ? (
            <ListBoxMobile
              onTapFav={onTapFav}
              list={tickersFav.length == 0 ? [] : tickersFav}
              onScroll={onScrollFav}
              title="مورد علاقه شما"
            />
          ) : (
            <div className="h-4/6">
              <LoginRequiredPage />
            </div>
          )}
        </div>
        {/* End mobile version */}
      </motion.div>
    </motion.div>
  );
};

export default ListContainer;
