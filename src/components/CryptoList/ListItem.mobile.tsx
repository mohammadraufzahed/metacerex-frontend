import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { TickerTable } from "../../types/API";
import { useRecoilState } from "recoil";
import { setFavAsset } from "../../functions/assets";
import { tradingview } from "../../signals/tradingview";

type PropsT = {
  onTapFav: () => void;
};

const ListItem: React.FC<TickerTable & PropsT> = ({
  onTapFav,
  base_asset,
  price,
}) => {
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
        if (base_asset) {
          if (base_asset.code !== "TOMAN") {
            tradingview.value = base_asset.code;
          }
        }
      }}
      onDoubleClick={() => {
        setFavAsset(base_asset.code).then(() => onTapFav());
      }}
      transition={{ duration: 0.5, type: "tween" }}
      className="font-vazir font-normal text-xs grid grid-cols-3 place-content-between border-b-[1px] border-b-neutral-300 pb-2"
    >
      <div className="flex flex-row gap-3 items-center text-neutral-900 dark:text-neutral-50 place-self-start">
        <img src={base_asset.icon} width={16} />
        <span>{base_asset.code}</span>
      </div>
      <motion.span
        variants={growAnimation}
        animate={grow < 0 ? "down" : "up"}
        className="place-self-center"
      >
        {grow}%
      </motion.span>
      <span className="place-self-end dark:text-neutral-50">{price}</span>
    </motion.div>
  );
};

export default ListItem;
