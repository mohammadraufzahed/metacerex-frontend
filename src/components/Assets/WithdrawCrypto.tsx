import { motion } from "framer-motion";
import React from "react";
import Button from "../AuthenticationPage/Button";
import DropboxSelect from "../DropboxSelect";
import Input from "../Input";
import { AnimatedCheckBox } from "../ProfilePage/Boxes/TwoSecActivateBox";
import RulesButton from "./RulesButton";

type PropsT = {
  onRuleClick: (event: MouseEvent) => void;
};

const WithdrawCrypto: React.FC<PropsT> = ({ onRuleClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
      key="crypto_withdraw"
      className="w-full flex flex-col gap-7 items-center"
    >
      <DropboxSelect
        list={[...Array(100).fill({ text: "بیت کوین", value: "btc" })]}
        placeholder="رمز ارز"
        onChange={() => {}}
      />
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row gap-2 items-center font-vazir font-normal text-sm">
          <img src="/svgs/hierarchy.svg" width={16} />
          <span>شبکه ها</span>
        </div>
        <DropboxSelect
          list={[...Array(100).fill({ text: "ERC20", value: "erc20" })]}
          placeholder="شبکه مورد نظر خود را انتخاب کنید"
          onChange={() => {}}
        />
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row gap-2 items-center font-vazir font-normal text-sm">
          <img src="/svgs/empty-wallet-change.svg" width={16} />
          <span>آدرس ولت مقصد</span>
        </div>
        <Input isPrimary fullWidth />
        <span className="font-vazir font-light text-xs text-neutral-700">
          این آدرس مربوط به انتقال در شبکه است
        </span>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row gap-2 items-center font-vazir font-normal text-sm">
          <img src="/svgs/warning.svg" width={16} />
          <span>مموی خود را با دقت وارد کنید</span>
        </div>
        <Input isPrimary fullWidth />
      </div>
      <div className="w-full flex flex-col gap-4">
        <span className="font-vazir font-normal text-base">
          مبلغ مورد نظر جهت برداشت
        </span>
        <div className="w-full relative">
          <Input isPrimary fullWidth />
          <span className="font-vazir font-normal text-base text-neutral-700 absolute left-2 bottom-2">
            تومان
          </span>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <span className="font-vazir font-normal text-base">
          برداشت همه موجودی
        </span>
        <AnimatedCheckBox active={true} onClick={() => {}} className="h-8" />
      </div>
      <RulesButton onTap={onRuleClick} />
      <Button text="تایید و برداشت" fullWidth className="bg-primary-500" />
    </motion.div>
  );
};

export default WithdrawCrypto;
