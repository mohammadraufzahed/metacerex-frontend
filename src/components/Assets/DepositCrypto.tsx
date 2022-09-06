import { motion } from "framer-motion";
import React, { useState } from "react";
import AnimatedCopy from "../../svgs/AnimatedCopy";
import Button from "../AuthenticationPage/Button";
import DropboxSelect from "../DropboxSelect";
import Input from "../Input";
import RulesButton from "./RulesButton";

type PropsT = {
  onRuleClick: () => void;
};

const DepositCrypto: React.FC<PropsT> = ({ onRuleClick }) => {
  // States
  const [currentCurrency, setCurrentCurrency] = useState<string>("");
  return (
    <motion.div
      key="crypto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className="w-full flex flex-col items-center gap-8"
    >
      <DropboxSelect
        placeholder={currentCurrency == "" ? "رمز ارز" : currentCurrency}
        onChange={(name) => setCurrentCurrency(name)}
        list={[...Array(100).fill({ text: "بیت کوین", value: "btc" })]}
      />
      <div className="w-full flex flex-row items-center justify-between font-vazir font-normal text-sm">
        <div className="w-max flex flex-row items-center gap-2.5">
          <img src="/svgs/wallet.svg" width={20} />
          <span>
            {currentCurrency !== ""
              ? `موجودی کیف پول شما`
              : "لطفا ارز مورد نظر را انتخاب کنید."}
          </span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <span>{currentCurrency != "" ? 31231.31231 : "-"}</span>
          <span>{currentCurrency}</span>
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-between">
        <div className="flex flex-row gap-2.5 items-center self-start">
          <img src="/svgs/wallet-money.svg" />
          <span className="font-vazir font-normal text-base ">آدرس ولت</span>
        </div>
        <span className="w-full font-light font-vazir mt-2 text-xs">
          آدرس ولت در شبکه انتقال مورد نظر خود را کپی کنید
        </span>
        <div className="w-full mt-6 border-[1px] rounded-lg border-primary-700">
          <span className="w-full border-b-2 border-primary-700 flex flex-row items-center justify-center font-vazir font-normal text-base">
            -
          </span>
          <div className="w-full py-3.5 px-3 flex flex-row justify-between items-center">
            {currentCurrency == "" ? (
              <span className="font-vazir justify-self-start font-normal text-xs">
                لطفا رمز ارز مورد نظر خود را انتخاب نمایید.
              </span>
            ) : (
              <span></span>
            )}
            <AnimatedCopy
              className="stroke-neutral-400 cursor-pointer"
              copied={0}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-row items-center gap-2.5">
          <img src="/svgs/scroll.svg" width={24} />
          <span className="font-vazir font-normal text-base">
            کد تراکنش (Hash)
          </span>
        </div>
        <span className="font-vazir font-light text-xs mt-2 mb-4">
          پس از انتقال، کد تراکنش (hash) را کپی و در باکس زیر وارد کنید
        </span>
        <Input isPrimary fullWidth />
        <span className="font-vazir font-light text-xs mt-4 text-neutral-700">
          کاربر گرامی، ثبت کد تراکنش (txid یا hash) برای واریز رمز ارز اجباری
          است. لطفا دقت فرمایید که کد تراکنش صحیح را تا حداکثر 2 ساعت پس از
          واریز در بخش مربوط به کد تراکنش ثبت نمایید. در غیر این صورت آبا‌ن‌تتر
          هیچ گونه مسئولیتی در قبال عدم واریز ارز به حساب کاربری شما نخواهد
          داشت.
        </span>
      </div>
      <RulesButton onTap={onRuleClick} />
      <Button text="تایید واریز" fullWidth className="bg-primary-500" />
    </motion.div>
  );
};

export default DepositCrypto;
