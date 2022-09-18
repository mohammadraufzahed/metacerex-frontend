import React, { useState } from "react";
import Button from "../components/AuthenticationPage/Button";
import DropboxSelect from "../components/DropboxSelect";
import { FinancialManagementBox } from "../components/FinancialManagementBox";
import MarketAction from "../components/Market/MarketActionsBox";
import { AnimatedCheckBox } from "../components/ProfilePage/Boxes/TwoSecActivateBox";
import RangeSlider from "../components/RangeSlider";
import TradingView from "../components/TradingView";

const BuyPage = () => {
  const [range, setRange] = useState<string>("0");
  return (
    <div className="flex-auto w-full h-full lg:grid lg:grid-cols-12 gap-4 px-4 py-2 2xl:grid-cols-10">
      <div className="w-full lg:h-full flex lg:col-span-5 xl:col-span-3 2xl:col-span-2">
        <MarketAction>
          <div className="w-full py-1 flex flex-row items-center justify-between">
            <span className="font-vazir font-normal text-sm">
              مبنای معامله:
            </span>
            <div className="relative w-7/12">
              <DropboxSelect
                enableSearch={false}
                onChange={() => {}}
                list={[{ text: "تومان", value: "toman" }]}
                placeholder="تومان"
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center font-vazir font-normal text-sm">
            <span>قیمت لحظه ای:</span>
            <span>785.222.458 تومان</span>
          </div>
          <div className="w-full">
            <DropboxSelect
              list={Array(100).fill({
                text: "BTC",
                icon: "/svgs/btc.svg",
                value: "btc",
              })}
              placeholder="BTC"
              onChange={() => {}}
            />
          </div>
          <div className="w-full grid grid-cols-2">
            <Button text="سریع" className="" fullWidth />
            <Button text="اصلی" className="" outlined fullWidth />
          </div>
          <div className="flex flex-col gap-2 w-full font-normal font-vazir text-sm">
            <div className="flex flex-row items-center gap-2">
              <img src="/svgs/wallet.svg" width={24} />
              <span>موجودی کیف پول (تومان) شما</span>
            </div>
            <span className="self-end">12.000.000 تومان</span>
          </div>
          <div className="w-full flex items-center justify-between font-vazir text-sm">
            <div className="w-max font-normal flex flex-row gap-2 items-center">
              <img src="/svgs/percentage-square.svg" />
              <span>درصد خرید از کل موجودی شما</span>
            </div>
            <div className="w-max flex flex-row gap-4 font-bold">
              <span>{range}</span>
              <span>% </span>
            </div>
          </div>
          <div className="w-full">
            <RangeSlider
              value={range}
              onChange={({ currentTarget }) =>
                setRange((currentTarget as HTMLInputElement).value)
              }
              min="0"
              max="100"
            />
          </div>
          <div className="w-full flex items-center justify-between font-vazir font-normal text-sm">
            <span>خرید با همه موجودی</span>
            <AnimatedCheckBox active onClick={() => {}} className="" />
          </div>
          <div className="w-full relative gap-2 flex flex-col justify-around h-24 border-primary-500 p-4  border-2 rounded-lg">
            <div className="w-full flex px-14 justify-between items-center font-vazir text-sm">
              <span className="font-bold">10.000.000</span>
              <span className="font-normal">تومان</span>
            </div>
            <div className="w-full h-[2px] bg-primary-500" />
            <div className="w-full flex px-14 justify-between items-center font-vazir text-sm">
              <span className="font-bold">1.000</span>
              <span className="font-normal">BTC</span>
            </div>
            <img
              width={24}
              height={24}
              src="/svgs/layer-prime-500.svg"
              className="absolute left-7 bg-neutral-50"
            />
          </div>
          <div className="w-full flex items-center justify-between font-vazir font-light text-xs">
            <span>کارمزد</span>
            <span>100 تومان</span>
          </div>
          <Button text="خرید" fullWidth className="bg-success" />
          <span className="font-vazir font-light text-xs text-neutral-700 text-justify">
            توجه : محاسبات بالا تخمینی است و پس از ارسال سفارش، ممکن است قیمت و
            مقادیر در بازار بالاتر یا پایین تر بسته شوند.
          </span>
        </MarketAction>
      </div>
      <div className="hidden lg:flex flex-col lg:col-span-7 xl:col-span-9 2xl:col-span-8">
        <TradingView />
        <FinancialManagementBox />
      </div>
    </div>
  );
};

export default BuyPage;
