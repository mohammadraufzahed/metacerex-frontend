import { motion } from "framer-motion";
import React from "react";

type PropsT = {
  name?: {
    persian?: string;
    english?: string;
  };
  price?: string;
  icon?: string;
};

const ListItem: React.FC<PropsT> = ({ name, price, icon }) => {
  return (
    <tr className='font-vazir font-normal relative text-xs text-neutral-900 after:content-[""] after:w-full after:h-[1px] after:bg-neutral-200 after:absolute after:left-0 after:-bottom-2'>
      <td className="flex flex-row items-center justify-center">
        <img src={icon} width={14} />
        <span className="mx-2">{name?.persian}</span>
        {name?.english ? <span>{`(${name?.english})`}</span> : null}
      </td>
      <td className="text-center">{price}</td>
      <td className="flex flex-row gap-2 justify-center">
        <Button type="buy" />
        <Button type="sell" />
      </td>
    </tr>
  );
};

ListItem.defaultProps = {
  name: {
    persian: "بیت کوین",
    english: "BTC",
  },
  price: "346,000,000",
  icon: "/svgs/btc.svg",
};

type ButtonT = {
  type: "sell" | "buy";
};

const Button: React.FC<ButtonT> = ({ type }) => {
  return (
    <motion.button
      className={`text-white ${
        type == "buy" ? "bg-success" : "bg-error"
      } rounded-3xl px-4 py-0.5`}
      whileHover={{ scale: 1.05 }}
      whileFocus={{ scale: 1.07 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      {type == "sell" ? "فروش" : "خرید"}
    </motion.button>
  );
};

export default ListItem;
