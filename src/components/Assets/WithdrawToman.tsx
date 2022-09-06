import React, { useState } from "react";
import { useFormik } from "formik";
import Input from "../../components/Input";
import { AnimatedCheckBox } from "../../components/ProfilePage/Boxes/TwoSecActivateBox";
import Button from "../../components/AuthenticationPage/Button";
import CardSelectBox from "./CardSelectBox";
import RulesButton from "./RulesButton";
import { motion } from "framer-motion";

type PropsT = {
  onRuleClick: (event: MouseEvent) => void;
};

const WithdrawToman: React.FC<PropsT> = ({ onRuleClick }) => {
  // States
  const withdrawTomanFormik = useFormik({
    initialValues: { amount: 0, selected_card: "" },
    async onSubmit() {},
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key="toman_withdraw"
      transition={{ duration: 0.4, type: "spring" }}
      className="w-full flex flex-col gap-7 items-center"
    >
      <div className="w-full flex flex-col gap-4">
        <span className="font-vazir font-normal text-base">
          مبلغ مورد نظر جهت برداشت
        </span>
        <div className="w-full relative">
          <Input
            id="amount"
            name="amount"
            type="number"
            value={withdrawTomanFormik.values.amount}
            error={withdrawTomanFormik.errors.amount}
            onChange={withdrawTomanFormik.handleChange}
            isPrimary
          />
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
      <div className="w-full flex flex-row justify-between items-center font-vazir font-normal text-base">
        <span>مبلغ برداشتی</span>
        <span>0 تومان</span>
      </div>
      <CardSelectBox
        card_value={withdrawTomanFormik.values.selected_card}
        fieldUpdater={withdrawTomanFormik.setFieldValue}
      />
      <RulesButton onTap={onRuleClick} />
      <Button text="تایید و برداشت" fullWidth className="bg-primary-500" />
    </motion.div>
  );
};

export default WithdrawToman;
