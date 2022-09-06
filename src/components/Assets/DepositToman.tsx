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
      <div className="w-full flex flex-col gap-2">
        <span className="font-vazir flex flex-row items-center gap-2.5 font-normal text-sm">
          <HiOutlineCreditCard className="text-xl" /> کارت های بانکی تایید شده
          شما :
        </span>
        {cardsQuery.data && cardsQuery.data.results ? (
          cardsQuery.data.results.map((item, key) => {
            let generatedCard = [...item.number].map((cardNumber, key) =>
              key > 5 && key < 14 ? "*" : cardNumber
            );
            let currectCard = "";
            for (let i = 0; i < generatedCard.length; i += 4) {
              currectCard += generatedCard.slice(i, i + 4).join("") + "-";
            }
            return (
              <div
                key={key}
                className="flex flex-row items-center w-full h-max gap-3"
              >
                <motion.div
                  initial="idle"
                  variants={{
                    selected: {
                      background: "rgba(8 103 136 1)",
                    },
                    hover: {
                      background: "rgba(8 103 136 0.5)",
                    },
                    idle: {
                      background: "rgba(8 103 136 0)",
                    },
                  }}
                  animate={
                    tomanDepositFormik.values.selected_card == item.number
                      ? "selected"
                      : "idle"
                  }
                  whileHover="hover"
                  whileTap="selected"
                  onTap={() =>
                    tomanDepositFormik.values.selected_card !== item.number
                      ? tomanDepositFormik.setFieldValue(
                          "selected_card",
                          item.number
                        )
                      : tomanDepositFormik.setFieldValue("selected_card", "")
                  }
                  className="w-4 cursor-pointer h-4 border-2 rounded-full border-primary-700"
                />
                <span
                  className="font-vazir mt-1 h-max font-bold text-primary-700 text-sm"
                  dir="ltr"
                >
                  {currectCard.slice(0, -1)}
                </span>
              </div>
            );
          })
        ) : (
          <NotFound text="کارت بانکی یافت نشد" />
        )}
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 1.05 }}
          onTap={() => navigate("/dashboard/profile/cards", { replace: true })}
          className="w-max flex flex-row gap-2.5 cursor-pointer text-primary-700 font-vazir font-light text-xs  items-center"
        >
          <IoAddCircleOutline className="text-xl" />
          <span className="border-b-[1px] border-primary-700/50 pb-0.5">
            افزودن کارت بانکی جدید
          </span>
        </motion.div>
      </div>
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
