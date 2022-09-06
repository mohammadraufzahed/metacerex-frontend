import { useFormik } from "formik";
import React, { MouseEventHandler, useState } from "react";
import Input from "../Input";
import { getCards } from "../../functions/cards";
import { useQuery } from "@tanstack/react-query";
import NotFound from "../NotFound";
import { motion } from "framer-motion";
import { HiOutlineCreditCard } from "react-icons/hi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import RulesButton from "./RulesButton";
import Button from "../AuthenticationPage/Button";
import * as yup from "yup";
import CardSelectBox from "./CardSelectBox";

type PropsT = {
  onRuleClick: (event: MouseEvent) => void;
};

const DepositToman: React.FC<PropsT> = ({ onRuleClick }) => {
  // States
  const navigate = useNavigate();
  const tomanDepositFormik = useFormik({
    initialValues: {
      amount: 0,
      selected_card: "",
    },
    validationSchema: yup.object({
      amount: yup
        .number()
        .required("مقدار واریزی وارد نشده است.")
        .min(100000, "حداقل واریزی ۱۰۰ هزار تومان میباشد"),
    }),
    async onSubmit() {},
  });
  // Queries
  const cardsQuery = useQuery(["cards_deposit"], getCards);
  return (
    <motion.div
      key="toman"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full flex flex-col gap-4"
    >
      <div className="w-full flex flex-col gap-2">
        <span className="font-vazir font-normal text-sm">
          مبلغ مورد نظر جهت واریز
        </span>
        <Input
          name="amount"
          id="amount"
          type="number"
          value={tomanDepositFormik.values.amount}
          error={tomanDepositFormik.errors.amount}
          onChange={tomanDepositFormik.handleChange}
          isPrimary
          fullWidth
        />
      </div>
      <CardSelectBox
        card_value={tomanDepositFormik.values.selected_card}
        fieldUpdater={tomanDepositFormik.setFieldValue}
      />
      <RulesButton onTap={onRuleClick} />
      <Button
        text="تایید و واریز"
        className="bg-primary-500 md:mt-60"
        fullWidth
      />
    </motion.div>
  );
};

export default DepositToman;
