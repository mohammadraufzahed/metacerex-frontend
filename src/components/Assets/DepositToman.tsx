import { useFormik } from "formik";
import React from "react";
import Input from "../Input";
import { motion } from "framer-motion";
import RulesButton from "./RulesButton";
import Button from "../AuthenticationPage/Button";
import * as yup from "yup";
import CardSelectBox from "./CardSelectBox";
import { useRecoilValue } from "recoil";
import { statusData } from "../../atoms/status";
import { httpClient } from "../../axios";
import useCustomToast from "../../hooks/useCustomToast";

type PropsT = {
  onRuleClick: (event: MouseEvent) => void;
};

const DepositToman: React.FC<PropsT> = ({ onRuleClick }) => {
  // States
  const statusD = useRecoilValue(statusData);
  const tomanDepositFormik = useFormik({
    initialValues: {
      amount: 0,
      selected_card: 0,
    },
    validationSchema: yup.object({
      amount: yup
        .number()
        .required("مقدار واریزی وارد نشده است.")
        .min(100000, "حداقل واریزی ۱۰۰ هزار تومان میباشد"),
      selected_card: yup
        .number()
        .required("لطفا کارت مورد نظر را انتخاب کنید."),
    }),
    async onSubmit(form) {
      return await httpClient
        .post("shetab/deposit/", {
          amount_toman: form.amount,
          gateway: statusD?.shetab_gateways[0][0],
          short_desc: "",
          card_id: form.selected_card,
          callback_url: window.location.origin + "/transaction",
        })
        .then((res) => {
          if (res.status === 201) {
            useCustomToast(
              "bottom-right",
              "success",
              "درخواست شما ثبت شد. به درگاه منتقل میشوید ..."
            );
            setTimeout(
              () => (window.location.href = res.data.redirect_url),
              2500
            );
          }
        });
    },
  });
  // Queries
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="w-full flex flex-col gap-4 justify-center items-center"
    >
      <div className="w-full flex flex-col gap-2">
        <span className="font-vazir font-normal text-sm">
          مبلغ مورد نظر جهت واریز
        </span>
        <Input
          label=""
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
        error={tomanDepositFormik.errors.selected_card}
      />
      <RulesButton onTap={onRuleClick} />
      <Button
        text="تایید و واریز"
        onClick={() => tomanDepositFormik.submitForm()}
        loading={tomanDepositFormik.isSubmitting}
        className="bg-primary-500 md:mt-60"
        fullWidth
      />
    </motion.div>
  );
};

export default DepositToman;
