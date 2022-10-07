import React from "react";
import { motion } from "framer-motion";
import { Wallet } from "../../types/API";
import { useNavigate } from "react-router-dom";
import { colorMode } from "../../signals/colorMode";

type THeadT = {
  children: React.ReactNode;
  style?: object;
  colSpan: number;
};

export const THead: React.FC<THeadT> = ({ children, style, colSpan }) => (
  <th
    className="font-vazir font-bold text-sm p-2 text-neutral-900 dark:text-neutral-50"
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
  <div className="w-full text-neutral-900 dark:text-neutral-50 flex flex-row font-vazir font-normal items-center justify-center gap-3 text-sm py-4">
    {icon ? <img src={icon} className="w-5" /> : null}
    {name}
  </div>
);

type TCellT = {
  title: string;
};

export const TCell: React.FC<TCellT> = ({ title }) => (
  <span className="font-vazir font-normal text-neutral-900 dark:text-neutral-50 text-center text-sm flex justify-center items-center w-full py-4">
    {title}
  </span>
);

type TActionT = {
  wallet: Wallet;
};

export const TAction: React.FC<TActionT> = ({ wallet }) => {
  // States
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center items-center pl-10">
      <div className="grid grid-cols-4 items-center place w-max gap-x-6">
        {wallet.asset.code == "TOMAN" ? null : (
          <>
            <motion.button
              className="bg-success rounded-lg py-1.5 w-[63px] font-vazir font-normal text-base text-neutral-50 dark:text-neutral-900"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1.04 }}
              onTap={() => navigate(`/dashboard/buy`, { replace: true })}
            >
              خرید
            </motion.button>
            <motion.button
              className="bg-error rounded-lg py-1.5 w-[72px] font-vazir font-normal text-base text-neutral-50 dark:text-neutral-900"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1.04 }}
              onTap={() => navigate(`/dashboard/sell`, { replace: true })}
            >
              فروش
            </motion.button>
          </>
        )}
        <motion.button
          className="rounded-lg py-1.5 w-[61px] font-vazir font-normal text-base border-primary-700 dark:border-primary-500"
          initial={{
            scale: 1,
            color:
              colorMode.value == "dark"
                ? "rgb(36 196 249)"
                : "rgb(8, 103, 136)",
            borderWidth: 1,
            background: "rgba(0 0 0 0)",
          }}
          whileHover={{
            scale: 1.02,
            background:
              colorMode.value == "dark"
                ? "rgb(36 196 249)"
                : "rgb(8, 103, 136)",
            color: "#ffffff",
          }}
          whileTap={{ scale: 1.04 }}
          onTap={() =>
            navigate(`/dashboard/asset/deposit`, {
              replace: true,
            })
          }
        >
          واریز
        </motion.button>
        <motion.button
          className="rounded-lg py-1.5 w-[81px] font-vazir font-normal text-base border-primary-700 dark:border-primary-500"
          initial={{
            scale: 1,
            color:
              colorMode.value == "dark"
                ? "rgb(36 196 249)"
                : "rgb(8, 103, 136)",
            borderWidth: 1,
            background: "rgba(0 0 0 0)",
          }}
          whileHover={{
            scale: 1.02,
            background:
              colorMode.value == "dark"
                ? "rgb(36 196 249)"
                : "rgb(8, 103, 136)",
            color: "#ffffff",
          }}
          whileTap={{ scale: 1.04 }}
          onTap={() =>
            navigate(`/dashboard/asset/withdraw`, {
              replace: true,
            })
          }
        >
          برداشت
        </motion.button>
      </div>
    </div>
  );
};
