import React from "react";
import { motion } from "framer-motion";

type THeadT = {
  children: React.ReactNode;
  style?: object;
  colSpan: number;
};

export const THead: React.FC<THeadT> = ({ children, style, colSpan }) => (
  <th
    className="font-vazir font-bold text-base p-2"
    style={style}
    colSpan={colSpan}
  >
    {children}
  </th>
);

type TTitleCell = {
  name: string;
  icon?: string;
};

export const TTitleCell: React.FC<TTitleCell> = ({ name, icon }) => (
  <div className="w-full flex flex-row font-vazir font-normal items-center justify-center gap-3 text-base py-7">
    {icon ? <img src={icon} className="w-5" /> : null}
    {name}
  </div>
);

type TCellT = {
  title: string;
};

export const TCell: React.FC<TCellT> = ({ title }) => (
  <span className="font-vazir font-normal text-base flex justify-center items-center w-full py-4">
    {title}
  </span>
);

export const TAction: React.FC = () => {
  return (
    <div className="w-full flex justify-center items-center pl-10">
      <div className="grid grid-cols-4 items-center place w-max gap-x-6">
        <motion.button
          className="bg-success rounded-lg py-2 w-[63px] font-vazir font-normal text-base text-white"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 1.04 }}
        >
          خرید
        </motion.button>
        <motion.button
          className="bg-error rounded-lg py-2 w-[72px] font-vazir font-normal text-base text-white"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 1.04 }}
        >
          فروش
        </motion.button>
        <motion.button
          className="rounded-lg py-2 w-[61px] font-vazir font-normal text-base"
          initial={{
            scale: 1,
            color: "rgb(8, 103, 136)",
            borderWidth: 1,
            borderColor: "rgb(8, 103, 136)",
            background: "rgba(0 0 0 0)",
          }}
          whileHover={{
            scale: 1.02,
            background: "rgb(8, 103, 136)",
            color: "#ffffff",
          }}
          whileTap={{ scale: 1.04 }}
        >
          واریز
        </motion.button>
        <motion.button
          className="rounded-lg py-2 w-[81px] font-vazir font-normal text-base"
          initial={{
            scale: 1,
            color: "rgb(8, 103, 136)",
            borderWidth: 1,
            borderColor: "rgb(8, 103, 136)",
            background: "rgba(0 0 0 0)",
          }}
          whileHover={{
            scale: 1.02,
            background: "rgb(8, 103, 136)",
            color: "#ffffff",
          }}
          whileTap={{ scale: 1.04 }}
        >
          برداشت
        </motion.button>
      </div>
    </div>
  );
};
