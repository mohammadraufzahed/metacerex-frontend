import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { getDepositAssets } from "../../functions/assets";
import Button from "../AuthenticationPage/Button";
import DropboxSelect from "../DropboxSelect";
import Input from "../Input";
import { AnimatedCheckBox } from "../ProfilePage/Boxes/TwoSecActivateBox";
import RulesButton from "./RulesButton";
import * as yup from "yup";
import useCustomToast from "../../hooks/useCustomToast";
import { httpClient } from "../../axios";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

type PropsT = {
  onRuleClick: (event: MouseEvent) => void;
};

const WithdrawCrypto: React.FC<PropsT> = ({ onRuleClick }) => {
  const navigate = useNavigate();
  const withdrawFormik = useFormik({
    initialValues: {
      asset: "",
      amount: "",
      network: "",
      address: "",
      address_tag: "",
      full: false,
    },
    validationSchema: yup.object({
      asset: yup.string().required("لطفا ارز مورد نظر را انتخاب کنید"),
      amount: yup
        .string()
        .matches(
          /^-?\d{0,22}(?:\.\d{0,8})?$/gi,
          "مقدار برداشت وارد شده صحیح نمیباشد."
        ),
      network: yup.string().required("لطفا شبکه مورد نظر را انتخاب کنید."),
      address: yup
        .string()
        .required("لطفا آدرس ولت مورد نظر را وارد نمایید.")
        .max(255, "آدرس وارد شده بیشتر از ۲۵۵ کاراکتر است."),
      address_tag: yup
        .string()
        .max(255, "ممو وارد شده بیشتر از ۲۵۵ کاراکتر است."),
    }),
    async onSubmit({ full, asset, amount, network, address, address_tag }) {
      if (!amount && !full) {
        useCustomToast(
          "bottom-right",
          "error",
          "لطفا مبلغ درخاستی را وارد نمایید"
        );
        return;
      }
      if (hasMemo && address_tag == "") {
        useCustomToast("bottom-right", "error", "لطفا مموی خود را وارد کنید");
        return;
      }
      return await httpClient
        .post("spot/withdraw/", {
          asset,
          amount,
          network,
          address,
          address_tag,
          total_balance: full,
        })
        .then((res) => {
          if (res.status === 201) {
            useCustomToast(
              "bottom-right",
              "success",
              "درخواست برداشت شما با موفقیت ثبت شد"
            );
            setTimeout(
              () => navigate("/dashboard/profile", { replace: true }),
              2500
            );
          }
        });
    },
  });
  const [hasMemo, setHasMemo] = useState<boolean>(false);
  const [assetName, setAssetName] = useState<string | undefined>("");
  // Queries
  const assetsQuery = useQuery(["assets_list"], getDepositAssets);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="w-full flex flex-col gap-7 items-center"
    >
      <DropboxSelect
        list={
          assetsQuery.data
            ? assetsQuery.data
                .filter((item) => item.code != "TOMAN")
                .map((item) => ({
                  text: item.name_farsi ? item.name_farsi : item.name,
                  icon: item.icon,
                  value: item.code,
                }))
            : []
        }
        placeholder={
          withdrawFormik.values.asset && assetsQuery.data
            ? assetName ?? ""
            : "رمز ارز"
        }
        onChange={(code) => {
          if (assetsQuery.data) {
            const asset = assetsQuery.data.filter(
              (item) => item.code == code
            )[0];
            withdrawFormik.setFieldValue("asset", asset.code);
            setAssetName(
              asset.name_farsi != "" ? asset.name_farsi : asset.name
            );
          }
        }}
      />
      {assetsQuery.data && withdrawFormik.values.asset != "" ? (
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-row gap-2 items-center font-vazir font-normal text-sm">
            <img src="/svgs/hierarchy.svg" width={16} />
            <span>شبکه ها</span>
          </div>
          <DropboxSelect
            list={assetsQuery.data
              .filter((item) => item.code == withdrawFormik.values.asset)[0]
              .networks.map((item) => ({
                text: item.name,
                value: item.name,
                memo: item.has_memo,
              }))}
            placeholder={
              withdrawFormik.values.network
                ? withdrawFormik.values.network
                : "شبکه مورد نظر خود را انتخاب کنید"
            }
            hasMemo={hasMemo}
            onChange={(data) => {
              const network = assetsQuery.data
                .filter((item) => item.code === withdrawFormik.values.asset)[0]
                .networks.filter((item) => item.name == data)[0];
              withdrawFormik.setFieldValue("network", network.name);
              setHasMemo(network.has_memo);
            }}
          />
        </div>
      ) : null}
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row gap-2 items-center font-vazir font-normal text-sm">
          <img src="/svgs/empty-wallet-change.svg" width={16} />
          <span>آدرس ولت مقصد</span>
        </div>
        <Input
          id="address"
          name="address"
          label=""
          value={withdrawFormik.values.address}
          error={withdrawFormik.errors.address}
          onChange={withdrawFormik.handleChange}
          type="text"
          isPrimary
          fullWidth
        />
        <span className="font-vazir font-light text-xs text-neutral-700">
          این آدرس مربوط به انتقال در شبکه است
        </span>
      </div>
      {hasMemo ? (
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-row gap-2 items-center font-vazir font-normal text-sm">
            <img src="/svgs/warning.svg" width={16} />
            <span>مموی خود را با دقت وارد کنید</span>
          </div>
          <Input
            id="address_tag"
            name="address_tag"
            label=""
            onChange={withdrawFormik.handleChange}
            type="text"
            value={withdrawFormik.values.address_tag}
            error={withdrawFormik.errors.address_tag}
            isPrimary
            fullWidth
          />
        </div>
      ) : null}
      <div className="w-full flex flex-col gap-4">
        <span className="font-vazir font-normal text-base">
          مبلغ مورد نظر جهت برداشت
        </span>
        <div className="w-full relative">
          <Input
            id="amount"
            name="amount"
            label=""
            value={withdrawFormik.values.amount}
            error={withdrawFormik.errors.amount}
            onChange={withdrawFormik.handleChange}
            type="number"
            disabled={withdrawFormik.values.full}
            isPrimary
            fullWidth
          />
          <span className="font-vazir font-normal text-base text-neutral-700 absolute left-2 top-4">
            تومان
          </span>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <span className="font-vazir font-normal text-base">
          برداشت همه موجودی
        </span>
        <AnimatedCheckBox
          active={withdrawFormik.values.full}
          onClick={() =>
            withdrawFormik.setFieldValue("full", !withdrawFormik.values.full)
          }
          className="h-8"
        />
      </div>
      <RulesButton onTap={onRuleClick} />
      <Button
        onClick={withdrawFormik.submitForm}
        loading={withdrawFormik.isSubmitting}
        text="تایید و برداشت"
        fullWidth
        className="bg-primary-500"
      />
    </motion.div>
  );
};

export default WithdrawCrypto;
