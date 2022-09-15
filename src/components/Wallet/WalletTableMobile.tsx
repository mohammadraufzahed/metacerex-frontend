import React, { useState } from "react";
import { motion } from "framer-motion";
import { TAction } from "./WalletTableUtils";
import { Wallet } from "../../types/API";
import { useNavigate } from "react-router-dom";

type PropsT = {
  wallets: Wallet[];
  quote: "usdt" | "toman";
};

const WalletTableMobile: React.FC<PropsT> = ({ wallets, quote }) => {
  return (
    <div className="lg:hidden flex p-2 flex-col bg-neutral-50 gap-4 w-full">
      <div className="flex flex-row font-vazir font-bold text-sm w-full justify-between items-center border-b-neutral-600 border-b-[1px] pb-2">
        <span>نماد</span>
        <span>مقدار</span>
        <span>عملیات</span>
      </div>
      <div className="flex flex-col">
        {wallets.map((item, key) => (
          <WalletTableItem quote={quote} item={item} key={key} />
        ))}
      </div>
    </div>
  );
};

type WalletTableItemT = {
  item: Wallet;
  quote: "usdt" | "toman";
};

const WalletTableItem: React.FC<WalletTableItemT> = ({ item, quote }) => {
  // States
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <motion.div
      variants={{
        close: {
          height: 40,
        },
        open: {
          height: 220,
        },
      }}
      initial="close"
      className="overflow-hidden"
      animate={open ? "open" : "close"}
      transition={{ duration: 0.7 }}
    >
      <div
        className={`flex flex-row items-center justify-between h-10 border-b-[1px] ${
          open ? "border-b-transparent" : "border-b-neutral-300"
        }`}
        onClick={() => setOpen((open) => !open)}
      >
        <div className="flex flex-row gap-2 items-center w-max font-vazir font-normal text-primary-700 text-sm">
          {item.asset.icon ? (
            <img
              src={item.asset.icon}
              className="shadow-secondary-700 shadow-sm"
              width={18}
            />
          ) : null}
          <span>{item.asset.name}</span>
        </div>
        <span className="font-vazir font-bold text-sm text-primary-700">
          {item.amount ? item.amount : "-"}
        </span>
        <motion.img
          src="/svgs/arrow-down.svg"
          variants={{
            open: {
              rotate: 180,
            },
            close: {
              rotate: 0,
            },
          }}
          className="cursor-pointer"
          initial="close"
          animate={open ? "open" : "close"}
        />
      </div>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-4 items-center py-2 px-7">
          <div className="flex font-vazir font-normal text-sm text-primary-700 w-full items-center justify-between">
            <span>ارزش</span>
            <span className="text-center">{item.value ? item.value : "-"}</span>
            <span>{quote == "toman" ? "تومان" : "تتر"}</span>
          </div>
          <div className="flex font-vazir font-normal text-sm text-primary-700 w-full items-center justify-between">
            <span>قیمت خرید</span>
            <span className="text-center w-max">
              {item.price_buy ? item.price_buy : "-"}
            </span>
            <span>{quote == "toman" ? "تومان" : "تتر"}</span>
          </div>
          <div className="flex font-vazir font-normal text-sm text-primary-700 w-full items-center justify-between">
            <span>قیمت فروش</span>
            <span className="text-center">
              {item.price_sell ? item.price_sell : "-"}
            </span>
            <span>{quote == "toman" ? "تومان" : "تتر"}</span>
          </div>
        </div>
        <div className="w-full flex flex-row gap-2 items-center justify-center">
          {item.asset.code !== "TOMAN" ? (
            <>
              <motion.button
                className="bg-success rounded-lg py-2 w-[51px] font-vazir font-normal text-sm text-white"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1.04 }}
                onTap={() => navigate("/dashboard/buy")}
              >
                خرید
              </motion.button>
              <motion.button
                className="bg-error rounded-lg py-2 w-[59px] font-vazir font-normal text-sm text-white"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1.04 }}
                onTap={() => navigate("/dashboard/sell")}
              >
                فروش
              </motion.button>
            </>
          ) : null}
          <motion.button
            className="rounded-lg py-2 w-[49px] font-vazir font-normal text-sm"
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
            onTap={() => navigate("/dashboard/asset/deposit")}
          >
            واریز
          </motion.button>
          <motion.button
            className="rounded-lg py-2 w-[67px] font-vazir font-normal text-sm"
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
            onTap={() => navigate("/dashboard/asset/withdraw")}
          >
            برداشت
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default WalletTableMobile;
