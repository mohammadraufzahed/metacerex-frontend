import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
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
import RangeSlider from "./RangeSlider";

type PropsT = {
  type: "SELL" | "BUY";
};

const ExchangeBox: React.FC<PropsT> = ({ type }) => {
  // States
  const [trade, setTrade] = useState<"INSTANT" | "MAIN">("MAIN");
  // Forms
  const form = useFormik({
    initialValues: {
      quantity: 0,
      quantity_percentage: "0",
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
  const [baseAmount, setBaseAmount] = useState<number>(0);
  const userTokenD = useRecoilValue(userToken);
  const navigate = useNavigate();
  const [reqData, setReqData] = useState<{
    order_side: "BUY" | "SELL";
    base_asset: string;
    quote_asset: string;
    calc_type: "BASE" | "QUOTE";
    quantity: string | null;
    balance_percentage: string | null;
    use_total_balance: boolean | null;
  }>({
    order_side: type,
    base_asset: "",
    quote_asset: "",
    calc_type: "BASE",
    quantity: "0",
    balance_percentage: null,
    use_total_balance: null,
  });
  const [exchange, setExchange] = useState<{
    value: string;
    fee: string;
    price: string;
    balance_toman: string;
    balance_usdt: string;
    unit_price_usdt_toman: string;
    base_asset_price_usdt: string;
    base_asset_price_toman: string;
  }>();
  // Conditions
  if (!userTokenD) return <Navigate to="/auth/login" replace />;
  // Functions
  function connectToWS() {
    const user = JSON.parse(sessionStorage.getItem("userToken") ?? "");
    if (user.userToken) {
      const wsTemp = new WebSocket(
        `${import.meta.env.VITE_WS_BASE}spot/order/?token=${
          user.userToken.access
        }`
      );
      wsTemp.onopen = () => {};
      wsTemp.onmessage = (event: any): any => {
        const data:
          | {
              value: string;
              fee: string;
              price: string;
              balance_toman: string;
              balance_usdt: string;
              unit_price_usdt_toman: string;
              base_asset_price_usdt: string;
              base_asset_price_toman: string;
            }
          | undefined = JSON.parse(event.data);
        if (data) {
          setExchange(data);
        }
      };
      wsTemp.onclose = () => {
        connectToWS();
      };
      setWs(wsTemp);
    }
  }
  useEffect(() => {
    if (exchange && activeBase) {
      if (reqData.calc_type == "BASE" || reqData.balance_percentage) {
        setBaseAmount(parseFloat(parseFloat(exchange.price).toFixed(6)));
        if (reqData.balance_percentage) {
          form.setFieldValue(
            "quantity",
            (
              parseFloat(exchange.price) /
              parseFloat(exchange.base_asset_price_usdt)
            ).toFixed(6)
          );
        }
      } else {
        if (activeBase.code == "TOMAN") {
          form.setFieldValue(
            "quantity",
            (
              parseFloat(exchange.price) /
              parseFloat(exchange.base_asset_price_toman)
            ).toFixed(6)
          );
        } else {
          form.setFieldValue(
            "quantity",
            (
              parseFloat(exchange.price) /
              parseFloat(exchange.base_asset_price_usdt)
            ).toFixed(6)
          );
        }
      }
      if (!reqData.balance_percentage) {
        if (activeBase.balance >= parseFloat(exchange.price)) {
          form.setFieldValue(
            "quantity_percentage",
            (activeBase.balance / parseFloat(exchange.price)).toFixed(6)
          );
        } else {
          form.setFieldValue("quantity_percentage", 0);
        }
      }
    }
  }, [exchange]);
  // Queries
  const assetsQuery = useQuery(["assets_list"], getDepositAssets);
  // Effects
  useEffect(() => {
    if (activeAsset) {
      setReqData((reqData) => ({ ...reqData, base_asset: activeAsset.code }));

      form.setFieldValue("base_asset_code", activeAsset.code);
    }
  }, [activeAsset]);
  useEffect(() => {
    if (activeBase) {
      setReqData((reqData) => ({ ...reqData, quote_asset: activeBase.code }));
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
      });
    }
    if (ws == undefined || ws.readyState == WebSocket.CLOSED) {
      connectToWS();
    }
    return () => {
      if (ws && ws.readyState == WebSocket.OPEN) {
        ws.close();
        setWs(undefined);
      }
    };
  }, []);
  useEffect(() => {
    if (
      (reqData.balance_percentage ||
        reqData.quantity ||
        reqData.use_total_balance) &&
      ws != undefined &&
      ws.readyState == WebSocket.OPEN
    ) {
      ws.send(JSON.stringify(reqData));
    }
  }, [reqData]);
  useEffect(() => {
    if (ws && ws.readyState == WebSocket.OPEN) {
      ws.close();
      setWs(undefined);
      setReqData({ ...reqData, order_side: type });
      connectToWS();
      form.resetForm();
      setActiveAsset(undefined);
      setActiveBase(undefined);
    }
  }, [type]);
  return (
    <>
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
                ? `${exchange.base_asset_price_toman} تومان`
                : `${exchange.base_asset_price_usdt} تتر`
              : "-"}
          </span>
        </div>
      ) : null}
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
              : form.values.quantity_percentage}
          </span>
          <span>%</span>
        </div>
      </div>
      <div className="w-full">
        <RangeSlider
          value={form.values.quantity_percentage}
          onChange={({ currentTarget }) => {
            form.setFieldValue(
              "quantity_percentage",
              (currentTarget as HTMLInputElement).value
            );
            setReqData({
              ...reqData,
              calc_type: "QUOTE",
              base_asset: activeBase ? activeBase.code : "",
              quote_asset: activeAsset ? activeAsset.code : "",
              quantity: null,
              use_total_balance: null,
              balance_percentage: form.values.quantity_percentage,
            });
          }}
          disabled={form.values.quantity_all_balance}
          min="0"
          max="100"
        />
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
        assetValue={form.values.quantity}
        assetOnChange={(number) => {
          form.setFieldValue("quantity", number);
          setReqData({
            ...reqData,
            balance_percentage: null,
            use_total_balance: null,
            quantity: number.toString(),
            calc_type: "BASE",
          });
        }}
        disabled={form.values.quantity_all_balance}
        assetName={activeAsset ? activeAsset.code : "-"}
        baseName={
          activeBase ? (activeBase.code == "TOMAN" ? "تومان" : "تتر") : "-"
        }
        baseValue={baseAmount}
        baseOnChange={(number) => {
          setBaseAmount(number);
          setReqData({
            ...reqData,
            balance_percentage: null,
            use_total_balance: null,
            quantity: number.toString(),
            calc_type: "QUOTE",
          });
        }}
      />
      <div className="w-full flex items-center justify-between font-vazir font-light text-xs text-neutral-900 dark:text-neutral-50">
        <span>کارمزد</span>
        <span>
          {exchange && !isNaN(exchange.fee) ? exchange.fee ?? "-" : "-"}
          &nbsp;
          {activeBase ? (activeBase.code == "TOMAN" ? "تومان" : "تتر") : ""}
        </span>
      </div>
      <div className="w-full flex items-center justify-between font-vazir font-light text-xs text-neutral-900 dark:text-neutral-50">
        <span>دریافتی</span>
        <span>
          {exchange && !isNaN(exchange.value) ? exchange.value ?? "-" : "-"}
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
              : "bg-error"
            : activeBase && activeBase.balance == 0
            ? "bg-primary-500"
            : "bg-success"
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
