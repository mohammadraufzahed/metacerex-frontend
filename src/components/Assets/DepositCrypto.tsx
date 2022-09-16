import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { getItem } from "localforage";
import React, { useEffect, useState } from "react";
import { getDepositAssets } from "../../functions/assets";
import useCustomToast from "../../hooks/useCustomToast";
import AnimatedCopy from "../../svgs/AnimatedCopy";
import { AssetList, Networks } from "../../types/API";
import Button from "../AuthenticationPage/Button";
import DropboxSelect from "../DropboxSelect";
import Input from "../Input";
import RulesButton from "./RulesButton";
import * as yup from "yup";
import { httpClient } from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";

type PropsT = {
  onRuleClick: () => void;
};

const DepositCrypto: React.FC<PropsT> = ({ onRuleClick }) => {
  // States
  const [currentCurrencyCode, setCurrentCurrencyCode] = useState<string>("");
  const [currentCurrency, setCurrentCurrency] = useState<AssetList | null>(
    null
  );
  const [selectedNetwork, setSelectedNetwork] = useState<Networks | null>();
  const [copied, setCopied] = useState<0 | 1>(0);
  const navigate = useNavigate();
  const DepositCryptoFormik = useFormik({
    initialValues: {
      asset: "",
      network: "",
      txid_hash: "",
    },
    validationSchema: yup.object({
      asset: yup.string().required("لطفا ارز مورد نظر را انتخاب کنید"),
      network: yup.string().required("لطفا شبکه مورد نظر را انتخاب کنید"),
      txid_hash: yup.string().required("لطفا کد تراکنش را وارد نمایید"),
    }),
    async onSubmit(params) {
      return await httpClient
        .post("spot/deposit/", {
          ...params,
        })
        .then((res) => {
          if (res.status == 201) {
            navigate("/dashboard/profile", { replace: true });
            useCustomToast(
              "bottom-right",
              "success",
              "درخواست واریز با موفقیت ثبت شد"
            );
          }
        });
    },
  });
  // Queries
  const assetsQuery = useQuery(["assets_list"], getDepositAssets);
  // Effects
  useEffect(() => {
    if (assetsQuery.data) {
      setCurrentCurrency(
        assetsQuery.data.filter((item) => item.code == currentCurrencyCode)[0]
      );
    }
  }, [currentCurrencyCode]);
  useEffect(() => {
    if (selectedNetwork) {
      DepositCryptoFormik.setFieldValue("network", selectedNetwork.name);
    }
  }, [selectedNetwork]);
  useEffect(() => {
    if (currentCurrency) {
      DepositCryptoFormik.setFieldValue("asset", currentCurrency.code);
    }
  }, [currentCurrency]);
  useEffect(() => {
    for (const [key, value] of Object.entries(DepositCryptoFormik.errors)) {
      if (value) {
        useCustomToast("bottom-right", "error", value);
      }
    }
  }, [DepositCryptoFormik.errors]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="w-full flex flex-col items-center gap-8"
    >
      <DropboxSelect
        placeholder={
          currentCurrency
            ? currentCurrency.name_farsi
              ? currentCurrency.name_farsi
              : currentCurrency.name ?? ""
            : "رمز ارز"
        }
        onChange={(name) => {
          setCurrentCurrencyCode(name);
          setSelectedNetwork(null);
        }}
        list={
          assetsQuery.data
            ? assetsQuery.data
                .filter((item) => item.code != "TOMAN")
                .map((item) => ({
                  text: item.name_farsi == "" ? item.name : item.name_farsi,
                  value: item.code,
                  icon: item.icon,
                }))
            : []
        }
      />
      {currentCurrency ? (
        <DropboxSelect
          list={currentCurrency.networks.map((item) => ({
            text: item.name,
            value: item.name,
          }))}
          onChange={(name) =>
            setSelectedNetwork(
              currentCurrency.networks.filter((item) => item.name == name)[0]
            )
          }
          placeholder={
            selectedNetwork
              ? selectedNetwork.name
              : "لطفا شبکه مورد نظر را انتخاب کنید."
          }
        />
      ) : null}
      <div className="w-full flex flex-row items-center justify-between font-vazir font-normal text-sm">
        <div className="w-max flex flex-row items-center gap-2.5">
          <img src="/svgs/wallet.svg" width={20} />
          <span>
            {currentCurrency
              ? `موجودی کیف پول شما`
              : "لطفا ارز مورد نظر را انتخاب کنید."}
          </span>
        </div>
        <div className="flex flex-row items-center gap-2">
          {currentCurrency ? (
            <>
              <span>{currentCurrency.balance}</span>
              <span>
                {currentCurrency.name_farsi
                  ? currentCurrency.name_farsi
                  : currentCurrency.name}
              </span>
            </>
          ) : (
            <span>-</span>
          )}
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
          <span className="w-full border-b-2 border-primary-700 flex flex-row items-center justify-center font-vazir font-normal text-base px-2 py-3 text-primary-700">
            {selectedNetwork ? selectedNetwork.exchange_network_address : "-"}
          </span>
          <div className="w-full py-3.5 px-3 flex flex-row justify-between items-center">
            {currentCurrency ? (
              <span></span>
            ) : (
              <span className="font-vazir justify-self-start font-normal text-xs">
                لطفا رمز ارز مورد نظر خود را انتخاب نمایید.
              </span>
            )}
            <AnimatedCopy
              className="stroke-neutral-400 cursor-pointer"
              copied={copied}
              onClick={() => {
                if (selectedNetwork) {
                  navigator.clipboard.writeText(
                    selectedNetwork.exchange_network_address
                  );
                  setCopied(1);
                  setTimeout(() => setCopied(0), 2500);
                  useCustomToast(
                    "bottom-right",
                    "success",
                    "آدرس ولت با موقیت کپی شد"
                  );
                } else {
                  useCustomToast(
                    "bottom-right",
                    "error",
                    currentCurrency
                      ? "هیچ ارزی انتخواب نشده است"
                      : selectedNetwork
                      ? "هیچ شبکه ای انتخاب نشده است"
                      : ""
                  );
                }
              }}
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
        <Input
          label=""
          type="text"
          name="txid_hash"
          id="txid_hash"
          value={DepositCryptoFormik.values.txid_hash}
          error={DepositCryptoFormik.errors.txid_hash}
          onChange={DepositCryptoFormik.handleChange}
          isPrimary
          fullWidth
        />
        <span className="font-vazir font-light text-xs mt-4 text-neutral-700">
          کاربر گرامی، ثبت کد تراکنش (txid یا hash) برای واریز رمز ارز اجباری
          است. لطفا دقت فرمایید که کد تراکنش صحیح را تا حداکثر 2 ساعت پس از
          واریز در بخش مربوط به کد تراکنش ثبت نمایید. در غیر این صورت آبا‌ن‌تتر
          هیچ گونه مسئولیتی در قبال عدم واریز ارز به حساب کاربری شما نخواهد
          داشت.
        </span>
      </div>
      <RulesButton onTap={onRuleClick} />
      <Button
        onClick={DepositCryptoFormik.submitForm}
        loading={DepositCryptoFormik.isSubmitting}
        text="تایید واریز"
        fullWidth
        className="bg-primary-500"
      />
    </motion.div>
  );
};

export default DepositCrypto;
