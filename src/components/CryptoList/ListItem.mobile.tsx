import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { TickerTable } from "../../types/API";

const ListItem: React.FC<TickerTable> = ({ base_asset, price }) => {
  const growAnimation = {
    up: {
      color: "#60D394",
    },
    down: {
      color: "#EE6055",
    },
  };
  const [grow, setGrow] = useState<number>(0);
  useEffect(() => {
    const growInterval = setInterval(() => {
      setGrow(Math.floor(Math.random() * -100) + 100);
    }, 30000);
  });
  return (
    <div className="font-vazir font-normal text-xs flex flex-row items-center justify-between border-b-[1px] border-b-neutral-300 pb-2">
      <div className="flex flex-row gap-3 items-center text-neutral-900">
        <img src={base_asset.icon} width={20} />
        <span>{base_asset.name}</span>
      </div>
      <motion.span
        variants={growAnimation}
        animate={grow < 0 ? "down" : "up"}
        className=""
      >
        {grow}%
      </motion.span>
      <span>{price}</span>
    </div>
  );
};

export default ListItem;
