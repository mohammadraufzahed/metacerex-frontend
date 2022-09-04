import React, { useState } from "react";
import { motion } from "framer-motion";
import { TAction } from "./WalletTableUtils";

const fakeData = [
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
];

const WalletTableMobile = () => {
  return (
    <div className="lg:hidden flex p-2 flex-col bg-neutral-50 gap-4 w-full">
      <div className="flex flex-row font-vazir font-bold text-sm w-full justify-between items-center border-b-neutral-600 border-b-[1px] pb-2">
        <span>نماد</span>
        <span>مقدار</span>
        <span>عملیات</span>
      </div>
      <div className="flex flex-col">
        {fakeData.map((item, key) => (
          <WalletTableItem item={item} key={key} />
        ))}
      </div>
    </div>
  );
};

type WalletTableItemT = {
  item: any;
};

const WalletTableItem: React.FC<WalletTableItemT> = ({ item }) => {
  // States
  const [open, setOpen] = useState<boolean>(false);
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
          {item.information.icon ? (
            <img
              src={item.information.icon}
              className="shadow-secondary-700 shadow-sm"
              width={18}
            />
          ) : null}
          <span>{item.information.name}</span>
        </div>
        <span className="font-vazir font-bold text-sm text-primary-700">
          4.1005
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
            <span className="text-center">{item.price_toman}</span>
            <span>ریال</span>
          </div>
          <div className="flex font-vazir font-normal text-sm text-primary-700 w-full items-center justify-between">
            <span>قیمت خرید</span>
            <span className="text-center">{item.buy_price}</span>
            <span>ریال</span>
          </div>
          <div className="flex font-vazir font-normal text-sm text-primary-700 w-full items-center justify-between">
            <span>قیمت فروش</span>
            <span>{item.sell_price}</span>
            <span>ریال</span>
          </div>
        </div>
        <div className="w-full flex flex-row gap-2 items-center justify-center">
          <motion.button
            className="bg-success rounded-lg py-2 w-[51px] font-vazir font-normal text-sm text-white"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 1.04 }}
          >
            خرید
          </motion.button>
          <motion.button
            className="bg-error rounded-lg py-2 w-[59px] font-vazir font-normal text-sm text-white"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 1.04 }}
          >
            فروش
          </motion.button>
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
          >
            برداشت
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default WalletTableMobile;
