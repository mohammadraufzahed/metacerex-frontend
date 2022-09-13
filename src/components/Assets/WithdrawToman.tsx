import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Input from "../../components/Input";
import { AnimatedCheckBox } from "../../components/ProfilePage/Boxes/TwoSecActivateBox";
import Button from "../../components/AuthenticationPage/Button";
import CardSelectBox from "./CardSelectBox";
import RulesButton from "./RulesButton";
import { motion } from "framer-motion";
import * as yup from "yup";
import { httpClient } from "../../axios";
import useCustomToast from "../../hooks/useCustomToast";
import { getDepositAssets } from "../../functions/assets";
import { useQuery } from "@tanstack/react-query";
import { AssetList } from "../../types/API";
import { nanoid } from "nanoid";

type PropsT = {
  onRuleClick: (event: MouseEvent) => void;
};

const WithdrawToman: React.FC<PropsT> = ({ onRuleClick }) => {
  // States
  const [wallet, setWallet] = useState<AssetList>();
  const withdrawTomanFormik = useFormik({
    initialValues: { amount: 0, selected_card: 0, full: false },
    validationSchema: yup.object({
      amount: yup
        .number()
        .max(
          Math.min(wallet ? parseFloat(wallet.balance) : 50000000, 50000000),
          `حداکثر برداشت ${
            wallet ? parseFloat(wallet.balance) : 50000000
          } میلیون تومان میباشد`
        ),
      full: yup.boolean(),
      selected_card: yup.number().required("لطفا یک کارت را انتخاب فرمایید"),
    }),
    async onSubmit(props) {
      if (!props.amount && !props.full) {
        useCustomToast(
          "bottom-right",
          "error",
          "لطفا مبلغ درخاستی را وارد نمایید"
        );
        return;
      }
      return await httpClient
        .post("shetab/withdraw/", {
          amount_toman: props.amount,
          sheba_number: props.selected_card,
          total_balance: props.full,
          short_desc: "",
        })
        .then((res) =>
          res.status == 201
            ? useCustomToast(
                "bottom-right",
                "success",
                "درخواست برداشت با موفقیت انجام شد"
              )
            : null
        );
    },
  }); // Queries
  const assetsQuery = useQuery(["assets_list"], getDepositAssets);
  // Effects
  useEffect(() => {
    if (assetsQuery.data) {
      setWallet(assetsQuery.data.filter((item) => item.code === "TOMAN")[0]);
    }
  }, [assetsQuery.data]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="w-full flex flex-col gap-7 items-center"
    >
      <div className="w-full flex flex-col gap-4">
        <div className="font-vazir font-normal text-base w-full flex flex-row justify-between items-center">
          <span>مبلغ مورد نظر جهت برداشت</span>
          <span>
            {wallet?.balance}
            &nbsp; تومان
          </span>
        </div>
        <div className="w-full relative">
          <Input
            label=""
            id="amount"
            name="amount"
            type="number"
            value={withdrawTomanFormik.values.amount}
            error={withdrawTomanFormik.errors.amount}
            disabled={withdrawTomanFormik.values.full}
            onChange={withdrawTomanFormik.handleChange}
            isPrimary
          />
          <span
            className={`font-vazir font-normal text-base text-neutral-700 absolute left-2 top-4`}
          >
            تومان
          </span>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <span className="font-vazir font-normal text-base">
          برداشت همه موجودی
        </span>
        <AnimatedCheckBox
          active={withdrawTomanFormik.values.full}
          onClick={() =>
            withdrawTomanFormik.setFieldValue(
              "full",
              !withdrawTomanFormik.values.full
            )
          }
          className="h-8"
        />
      </div>
      <div className="w-full flex flex-row justify-between items-center font-vazir font-normal text-base">
        <span>مبلغ برداشتی</span>
        <span>{withdrawTomanFormik.values.amount} تومان</span>
      </div>
      <CardSelectBox
        card_value={withdrawTomanFormik.values.selected_card}
        fieldUpdater={withdrawTomanFormik.setFieldValue}
        error={withdrawTomanFormik.errors.selected_card}
      />
      <RulesButton onTap={onRuleClick} />
      <Button
        onClick={withdrawTomanFormik.submitForm}
        loading={withdrawTomanFormik.isSubmitting}
        text="تایید و برداشت"
        fullWidth
        className="bg-primary-500"
      />
    </motion.div>
  );
};

export default WithdrawToman;
