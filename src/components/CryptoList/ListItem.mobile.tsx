import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { TickerTable } from "../../types/API";
import { useRecoilState } from "recoil";
import { tradingviewAtom } from "../../atoms/tradingviewAtom";
import { setFavAsset } from "../../functions/assets";
import { tickers } from "../../atoms/tickers";
import { tickers_fav } from "../../atoms/tickers_fav";

const ListItem: React.FC<TickerTable> = ({ base_asset, price }) => {
  // States
  const growAnimation = {
    up: {
      color: "#60D394",
    },
    down: {
      color: "#EE6055",
    },
  };
  const [grow, setGrow] = useState<number>(0);
  const [tradingview, setTradingview] = useRecoilState(tradingviewAtom);
  const [tickersD, setTickers] = useRecoilState(tickers);
  const [tickersFavD, setTickersFav] = useRecoilState(tickers_fav);
  // Effects
  useEffect(() => {
    const growInterval = setInterval(() => {
      setGrow(Math.floor(Math.random() * -100) + 100);
    }, 30000);
    return () => clearInterval(growInterval);
  }, []);
  return (
    <motion.div
      variants={{
        initial: {
          x: "90vh",
          scale: 0,
        },
        show: {
          x: 0,
          scale: 1,
        },
        hide: {
          x: "-90h",
          scale: 0,
        },
        tap: {
          scale: 1.04,
        },
      }}
      initial="initial"
      animate="show"
      exit="hide"
      whileTap="tap"
      onTap={() => {
        if (base_asset.code !== "TOMAN") {
          setTradingview(base_asset.code);
        }
      }}
      onDoubleClick={() => setFavAsset(base_asset.code)}
      transition={{ duration: 0.5, type: "tween" }}
      className="font-vazir font-normal text-xs grid grid-cols-3 place-content-between border-b-[1px] border-b-neutral-300 pb-2"
    >
      <div className="flex flex-row gap-3 items-center text-neutral-900 place-self-start">
        <img src={base_asset.icon} width={16} />
        <span>{base_asset.name}</span>
      </div>
      <motion.span
        variants={growAnimation}
        animate={grow < 0 ? "down" : "up"}
        className="place-self-center"
      >
        {grow}%
      </motion.span>
      <span className="place-self-end">{price}</span>
    </motion.div>
  );
};

export default ListItem;
