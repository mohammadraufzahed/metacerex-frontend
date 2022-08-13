import React from "react";
import { motion } from "framer-motion";

type PropsT = {
  icon?: string;
  name?: string;
  grow?: number;
  price?: string;
};

const ListItem: React.FC<PropsT> = ({ icon, name, grow, price }) => {
  const growAnimation = {
    up: {
      color: "#60D394",
    },
    down: {
      color: "#EE6055",
    },
  };
  return (
    <div className="font-vazir font-normal text-xs flex flex-row items-center justify-between">
      <div className="flex flex-row gap-3 items-center text-neutral-900">
        <img src={icon} />
        <span>{name}</span>
      </div>
      <motion.span
        variants={growAnimation}
        animate={grow && grow < 0 ? "down" : "up"}
      >
        {grow?.toString().replace("-", "")}%
      </motion.span>
      <span>{price}</span>
    </div>
  );
};

ListItem.defaultProps = {
  icon: "/svgs/btc.svg",
  name: "بیت کوین (BTC)",
  grow: 4.56,
  price: "34.000.000",
};

export default ListItem;
