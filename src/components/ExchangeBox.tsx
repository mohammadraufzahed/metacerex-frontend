import { useSignal } from "@preact/signals-react";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { statusData } from "../atoms/status";
import { userToken } from "../atoms/userToken";
import { httpClient } from "../axios";
import { getAsset, getDepositAssets } from "../functions/assets";
import useCustomToast from "../hooks/useCustomToast";
import { colorMode } from "../signals/colorMode";
import { tradingview } from "../signals/tradingview";
import { AssetList } from "../types/API";
import Button from "./AuthenticationPage/Button";
import DropboxSelect from "./DropboxSelect";
import ExchangeRate from "./ExchangeRate";
import Input from "./Input";
import { AnimatedCheckBox } from "./ProfilePage/Boxes/TwoSecActivateBox";
type PropsT = {
  type: "SELL" | "BUY";
};

const ExchangeBox: React.FC<PropsT> = ({ type }) => {
  // States
  const [trade, setTrade] = useState<"INSTANT" | "MAIN">("INSTANT");
  const lastCalcType = useSignal<"quote" | "base">("base");
  const quoteAssetAmount = useSignal<number>(0);
  const status = useRecoilValue(statusData);
  // Forms
  const form = useFormik({
    initialValues: {
      quantity: 0,
      quantity_all_balance: false,
      base_asset_code: "",
      quote_asset_code: "",
      base_asset_expected_price: 0,
    },
    async onSubmit(props) {
      if (props.quantity == 0 || props.quantity_all_balance) {
        useCustomToast(
          "bottom-right",
          "error",
          "لطفا مقدار درخواستی را وارد نمایید."
        );
        return;
      }
      if (trade == "MAIN" && props.base_asset_expected_price == 0) {
        useCustomToast(
          "bottom-right",
          "error",
          "لطفا قیمت درخواستی را وارد نمایید."
        );
        return;
      }
      let data: any = {
        base_asset: props.base_asset_code,
        quote_asset: props.quote_asset_code,
      };
      if (props.quantity_all_balance) {
        data = { ...data, quote_asset_quantity_all_balance: true };
      } else {
        data = { ...data, quote_asset_quantity: props.quantity };
      }
      if (trade == "MAIN") {
        if (activeBase) {
          if (activeBase.code == "TOMAN") {
            data = {
              ...data,
              expected_price_toman: props.base_asset_expected_price,
            };
          } else {
            data = {
              ...data,
              expected_price_usdt: props.base_asset_expected_price,
            };
          }
        }
      }
      return await httpClient
        .post(
          `spot/orders/${
            type == "SELL" ? "sell" : "buy"
          }/${trade.toLowerCase()}`,
          data
        )
        .then((res) => {
          if (res.status == 201 || res.status == 200) {
            useCustomToast(
              "bottom-right",
              "success",
              `درخواست${type == "SELL" ? "فروش" : "خرید"} با موفقیت ثبت شد.`
            );
          }
        });
    },
  });
  const [activeAsset, setActiveAsset] = useState<AssetList>();
  const [ws, setWs] = useState<WebSocket>();
  const [baseCurrencies, setBaseCurrencies] = useState<
    {
      name: string;
      balance: number;
      value: string;
    }[]
  >([]);
  const [activeBase, setActiveBase] = useState<{
    code: string;
    balance: number;
  }>();
  const userTokenD = useRecoilValue(userToken);
  const navigate = useNavigate();
  const [exchange, setExchange] = useState<{
    usdt: number;
    toman: number;
  }>();
  // Conditions
  if (!userTokenD) return <Navigate to="/auth/login" replace />;
  // Functions
  function connectToWS(currency: string) {
    const wsTemp = new WebSocket(
      `${import.meta.env.VITE_WS_BASE}cryptobase/asset/price/?asset=${currency}`
    );
    wsTemp.onmessage = (event: any): any => {
      const prices: { usdt: any; toman: any } = JSON.parse(event.data);
      setExchange({
        toman: parseFloat(prices.toman),
        usdt: parseFloat(prices.usdt),
      });
    };
    setWs(wsTemp);
  }
  const setQuantity = (number: number) => {
    if (exchange && activeBase) {
      if (trade == "MAIN") {
        form.setFieldValue(
          "quantity",
          (number / form.values.base_asset_expected_price).toFixed(6)
        );
      } else {
        const base: "toman" | "usdt" = activeBase.code.toLowerCase();
        form.setFieldValue("quantity", (number / exchange[base]).toFixed(6));
      }
    }
  };
  const setQuoteQuantity = (number: number) => {
    if (exchange && activeBase) {
      if (trade == "MAIN") {
        quoteAssetAmount.value = parseFloat(
          (form.values.base_asset_expected_price * number).toFixed(6)
        );
      } else {
        const base: "toman" | "usdt" = activeBase.code.toLowerCase();
        quoteAssetAmount.value = parseFloat(
          (exchange[base] * number).toFixed(6)
        );
      }
    }
  };
  useEffect(() => {
    if (lastCalcType.value == "quote") {
      setQuantity(quoteAssetAmount.value);
    } else {
      setQuoteQuantity(form.values.quantity);
    }
  }, [exchange, form.values.base_asset_expected_price, trade]);
  // Queries
  const assetsQuery = useQuery(["assets_list"], getDepositAssets);
  // Effects
  useEffect(() => {
    if (assetsQuery.data && !activeAsset) {
      const btc = assetsQuery.data.filter((item) => item.code == "BTC")[0];
      setActiveAsset(btc);
    }
  }, [assetsQuery.data]);
  useEffect(() => {
    if (activeAsset) {
      setExchange(undefined);
      form.setFieldValue("base_asset_code", activeAsset.code);
      if (ws) {
        ws.close();
        setWs(undefined);
        connectToWS(activeAsset.code);
      }
    }
  }, [activeAsset]);
  useEffect(() => {
    if (activeBase) {
      form.setFieldValue("quote_asset_code", activeBase.code);
    }
  }, [activeBase]);
  useEffect(() => {
    if (baseCurrencies.length == 0) {
      getAsset(["toman", "usdt"]).then((bases) => {
        bases.balances.map((item) => {
          setBaseCurrencies((baseCurrencies) => [
            ...baseCurrencies,
            {
              name: item.asset.name_farsi
                ? item.asset.name_farsi
                : item.asset.code,
              balance: parseInt(item.total_balance),
              value: item.asset.code,
            },
          ]);
        });
        const toman = bases.balances.filter(
          (item) => item.asset.code == "TOMAN"
        )[0];
        setActiveBase({
          balance: parseInt(toman.total_balance),
          code: toman.asset.code,
        });
      });
    }
    connectToWS("btc");
    return () => {
      if (ws && ws.readyState == WebSocket.OPEN) {
        ws.close();
        setWs(undefined);
      }
    };
  }, []);
  useEffect(() => {
    if (ws && ws.readyState == WebSocket.OPEN) {
      form.resetForm();
    }
  }, [type]);
  return (
    <>
      <div className="w-full">
        <DropboxSelect
          list={
            assetsQuery.data
              ? assetsQuery.data.map((item) => ({
                  text: item.code,
                  icon: item.icon,
                  value: item.code,
                }))
              : []
          }
          placeholder={activeAsset ? activeAsset.code : "رمز ارز"}
          onChange={(code) => {
            const activeAsset = assetsQuery.data?.filter(
              (item) => item.code == code
            )[0];
            setActiveAsset(activeAsset);
            tradingview.value = activeAsset
              ? activeAsset.code
              : tradingview.value;
          }}
        />
      </div>
      <div className="w-full py-1 flex flex-row items-center justify-between text-neutral-900 dark:text-neutral-50">
        <span className="font-vazir font-normal text-sm">مبنای معامله:</span>
        <div className="relative w-7/12">
          <DropboxSelect
            enableSearch={false}
            onChange={(value) => {
              const active = baseCurrencies.filter((item) => {
                return item.value == value;
              })[0];
              setActiveBase({
                balance: active.balance,
                code: active.value,
              });
            }}
            list={baseCurrencies.map((item) => ({
              text: item.name,
              value: item.value,
            }))}
            placeholder={
              activeBase
                ? activeBase.code == "TOMAN"
                  ? "تومان"
                  : "تتر"
                : "ارز مبنا"
            }
          />
        </div>
      </div>
      {trade == "INSTANT" ? (
        <div className="w-full flex justify-between items-center font-vazir font-normal text-sm text-neutral-900 dark:text-neutral-50">
          <span>قیمت لحظه ای:</span>
          <span>
            {exchange && activeBase
              ? activeBase.code == "TOMAN"
                ? `${exchange.toman} تومان`
                : `${exchange.usdt} تتر`
              : "-"}
          </span>
        </div>
      ) : null}
      <div className="w-full grid grid-cols-2">
        <Button
          text="سریع"
          className="h-11"
          fullWidth
          outlined={trade !== "INSTANT"}
          onClick={() => {
            setTrade("INSTANT");
          }}
        />
        <Button
          text="اصلی"
          className="h-11"
          outlined={trade !== "MAIN"}
          onClick={() => {
            setTrade("MAIN");
          }}
          fullWidth
        />
      </div>
      {trade == "MAIN" ? (
        <div className="w-full">
          <Input
            label=""
            id="base_asset_expected_price"
            name="base_asset_expected_price"
            value={
              form.values.base_asset_expected_price > 0
                ? form.values.base_asset_expected_price
                : ""
            }
            onChange={({ currentTarget }) =>
              form.setFieldValue(
                "base_asset_expected_price",
                parseFloat((currentTarget as HTMLInputElement).value)
              )
            }
            type="number"
            isPrimary
            placeholder="قیمت درخواستی شما"
          />
        </div>
      ) : null}
      <div className="flex flex-row items-center justify-between w-full font-normal font-vazir text-sm text-neutral-900 dark:text-neutral-50">
        <div className="flex flex-row items-center gap-2">
          <img src={`/svgs/wallet-${colorMode.value}.svg`} width={24} />
          <span>موجودی شما</span>
        </div>
        <span className="self-end">
          {activeBase ? activeBase.balance : "-"}
          &nbsp;
          {activeBase ? (activeBase.code == "TOMAN" ? "تومان" : "تتر") : ""}
        </span>
      </div>
      <div className="w-full flex items-center justify-between font-vazir text-sm text-neutral-900 dark:text-neutral-50">
        <div className="w-max font-normal flex flex-row gap-2 items-center">
          <img src={`/svgs/percentage-square-${colorMode.value}.svg`} />
          <span>درصد موجودی</span>
        </div>
        <div className="w-max flex flex-row gap-4 font-bold">
          <span>
            {form.values.quantity_all_balance
              ? "100"
              : isNaN(form.values.quantity_percentage)
              ? 0
              : form.values.quantity_percentage}
          </span>
          <span>%</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-between font-vazir font-normal text-sm text-neutral-900 dark:text-neutral-50">
        <span>خرید با همه موجودی</span>
        <AnimatedCheckBox
          active={form.values.quantity_all_balance}
          onClick={() => {
            form
              .setFieldValue(
                "quantity_all_balance",
                !form.values.quantity_all_balance
              )
              .then(() => {
                setReqData({
                  ...reqData,
                  balance_percentage: null,
                  quantity: null,
                  use_total_balance: !form.values.quantity_all_balance,
                });
              });
          }}
        />
      </div>
      <ExchangeRate
        assetValue={isNaN(form.values.quantity) ? 0 : form.values.quantity}
        assetOnChange={(number) => {
          form.setFieldValue("quantity", number);
          lastCalcType.value = "base";
          setQuoteQuantity(number);
        }}
        disabled={form.values.quantity_all_balance}
        assetName={activeAsset ? activeAsset.code : "-"}
        baseName={
          activeBase ? (activeBase.code == "TOMAN" ? "تومان" : "تتر") : "-"
        }
        baseValue={quoteAssetAmount.value || 0}
        baseOnChange={(number) => {
          if (activeBase && exchange) {
            quoteAssetAmount.value = number;
            lastCalcType.value = "quote";
            setQuantity(number);
          }
        }}
      />
      <div className="w-full flex items-center justify-between font-vazir font-light text-xs text-neutral-900 dark:text-neutral-50">
        <span>کارمزد</span>
        <span>
          {status && !isNaN(quoteAssetAmount.value)
            ? quoteAssetAmount.value * status.fee_percentage_total
            : "-"}
          &nbsp;
          {activeBase ? (activeBase.code == "TOMAN" ? "تومان" : "تتر") : ""}
        </span>
      </div>
      <div className="w-full flex items-center justify-between font-vazir font-light text-xs text-neutral-900 dark:text-neutral-50">
        <span>دریافتی</span>
        <span>
          {!isNaN(quoteAssetAmount.value) && status
            ? (
                quoteAssetAmount.value -
                quoteAssetAmount.value * status.fee_percentage_total
              ).toFixed(6)
            : "-"}
          &nbsp;
          {activeBase ? (activeBase.code == "TOMAN" ? "تومان" : "تتر") : ""}
        </span>
      </div>
      <Button
        text={
          type == "SELL"
            ? activeAsset && parseFloat(activeAsset.balance) == 0
              ? "افزایش موجودی"
              : "فروش"
            : activeBase && activeBase.balance == 0
            ? "افزایش موجودی"
            : "خرید"
        }
        fullWidth
        onClick={() => {
          if (activeBase && activeBase.balance <= 0) {
            navigate("/dashboard/asset/deposit", { replace: true });
          } else {
            form.submitForm();
          }
        }}
        loading={form.isSubmitting}
        className={
          type == "SELL"
            ? activeAsset && parseFloat(activeAsset.balance) == 0
              ? "bg-primary-500"
              : "bg-error dark:bg-error"
            : activeBase && activeBase.balance == 0
            ? "bg-primary-500"
            : "bg-success dark:bg-success"
        }
      />
      <span
        className={`font-vazir font-light text-xs w-max max-w-full self-start transition-colors duration-300  text-justify ${
          activeBase && activeBase.balance == 0
            ? "text-warning"
            : "text-neutral-700 dark:text-neutral-50"
        }`}
      >
        {activeBase && activeBase.balance == 0
          ? "موجودی شما کافی نیست."
          : "توجه : محاسبات بالا تخمینی است و پس از ارسال سفارش، ممکن است قیمت و مقادیر در بازار بالاتر یا پایین تر بسته شوند."}
      </span>
    </>
  );
};

export default ExchangeBox;
