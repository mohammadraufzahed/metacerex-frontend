import React from "react";
import { motion } from "framer-motion";
import Button from "../../AuthenticationPage/Button";
import { useFormik } from "formik";
import Input from "../../Input";
import Select from "../../Select";
import * as yup from "yup";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../../Error";
import { Card } from "../../../types/API";
import { httpClient } from "../../../axios";
import useCustomToast from "../../../hooks/useCustomToast";

const banksOption = [
  { name: "ملی", key: "MELLI" },
  { name: "پارسیان", key: "PARSIAN" },
  { name: "اقتصاد نوین", key: "ENBANK" },
  { name: "پاسارگاد", key: "PASARGAD" },
  { name: "کشاورزی", key: "KESHAVARZI" },
  { name: "سامان", key: "SAMAN" },
  { name: "ملت", key: "MELLAT" },
  { name: "صادرات", key: "SADERAT" },
  { name: "رفاه", key: "REFAH" },
  { name: "سرمایه", key: "SARMAYEH" },
];

const accountOption = [
  { name: "حساب قرض الحسنه پس انداز", key: "SAVING_LOAN" },
  { name: "حساب قرض الحسنه جاری", key: "CURRENT_LOAN" },
  { name: "سپرده کوتاه مدت عادی", key: "SHORT_DEPOSIT" },
  { name: "سپرده بلند مدت", key: "LONG_DEPOSIT" },
  { name: "سپرده های طرح دار", key: "PLANNED_DEPOSIT" },
];

type PropsT = {
  card: Card;
  newCard: boolean;
};

const BankCardBox: React.FC<PropsT> = ({ card, newCard }) => {
  const cardFormik = useFormik({
    initialValues: {
      ...card,
    },
    validationSchema: yup.object({
      bank: yup
        .string()
        .oneOf(
          [...banksOption.map((item) => item.key)],
          "مقدار انتخاب شده صحیح نمیباشد."
        )
        .required("بانک انتخاب نشده است"),
      branch: yup.string().required("نام شعبه وارد نشده است"),
      number: yup
        .string()
        .required("شماره کارت وارد نشده است")
        .matches(/^[1-9]{1}[0-9]{15}$/gi, "شماره کارت وارد شده معتبر نمیباشد"),
      sheba: yup
        .string()
        .required("شماره شبا وارد نشده است")
        .matches(
          /^IR[1-9]{1}[0-9]{23}$/,
          "شماره شبا وارد شده صحیح نمیباشد. مثال:‌‌ IR201879127208899154229134"
        ),
      account_type: yup
        .string()
        .required("نوع حساب انتخاب نشده است")
        .oneOf(
          [...accountOption.map((item) => item.key)],
          "نوع حساب انتخاب شده صحیح نمیباشد"
        ),
    }),
    async onSubmit({ number, sheba, bank, branch, account_type }) {
      return await httpClient(`shetab/card/${!newCard ? card.id : ""}`, {
        method: newCard ? "post" : "patch",
        data: {
          number,
          sheba,
          bank,
          branch,
          account_type,
        },
      }).then((data) => {
        if (data.status == 200 || data.status == 201) {
          useCustomToast(
            "bottom-right",
            "success",
            `حساب بانکی با موفقیت ${newCard ? "ذخیره" : "بروز رسانی"} شد`
          );
        }
      });
    },
  });
  return (
    <ErrorBoundary fallback={<Error />}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, type: "spring" }}
        className="bg-gray-50 overflow-hidden w-full px-2 py-6 flex flex-col gap-10 items-center justify-center rounded-2xl md:flex-row"
      >
        <div className="w-full grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10 md:grid-cols-3">
          <Select
            id="bank"
            name="bank"
            label="نام بانک"
            value={cardFormik.values.bank ?? ""}
            error={cardFormik.errors.bank}
            onChange={cardFormik.handleChange}
            options={banksOption}
            isPrimary
            required
          />
          <Input
            name="branch"
            id="branch"
            label="شعبه"
            type="text"
            value={cardFormik.values.branch ?? ""}
            error={cardFormik.errors.branch}
            isPrimary
            onChange={cardFormik.handleChange}
            fullWidth
            required
          />
          <Input
            name="number"
            id="number"
            label="شماره حساب"
            type="text"
            value={cardFormik.values.number}
            error={cardFormik.errors.number}
            isPrimary
            onChange={cardFormik.handleChange}
            fullWidth
            required
          />
          <Select
            name="account_type"
            id="account_type"
            label="نوع حساب"
            value={cardFormik.values.account_type ?? ""}
            error={cardFormik.errors.account_type}
            required
            options={accountOption}
            isPrimary
            onChange={cardFormik.handleChange}
            fullWidth
          />
          <Input
            name="sheba"
            id="sheba"
            label="شماره شبا"
            type="text"
            value={cardFormik.values.sheba}
            error={cardFormik.errors.sheba}
            isPrimary
            onChange={cardFormik.handleChange}
            fullWidth
            className="md:col-span-2"
            required
          />
        </div>
        <div className="md:w-4/12 xl:w-3/12 flex justify-center items-center">
          <Button
            text="ذخیره تغییرات"
            className="px-12 py-3"
            onClick={cardFormik.submitForm}
            loading={cardFormik.isSubmitting}
          />
        </div>
      </motion.div>
    </ErrorBoundary>
  );
};

export default BankCardBox;
