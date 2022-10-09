import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { httpClient } from "../axios";
import Button from "../components/AuthenticationPage/Button";
import useCustomToast from "../hooks/useCustomToast";
import { colorMode } from "../signals/colorMode";

const TransactionPage = () => {
  const location = useLocation();
  const isOk = location.search.includes("payment_status=OK");
  const navigate = useNavigate();
  if (!location.search.includes("payment_status"))
    return <Navigate to="/dashboard" replace />;
  useEffect(() => {
    if (!import.meta.env.PROD) {
      const data = location.search
        .replace("?", "")
        .split("&")
        .map((item) => item.split("="));
      const token = data.filter((item) => item[0] == "token")[0][1];
      const payment_status = data.filter(
        (item) => item[0] == "payment_status"
      )[0][1];
      httpClient
        .post("shetab/deposit/verify/", {
          token,
          payment_status,
        })
        .then((res) => {
          if (res.status == 200) {
            useCustomToast(
              "bottom-right",
              "success",
              "واریز شما با موفقیت تایید شد"
            );
          }
        });
    }
  }, []);
  return (
    <div className="w-full h-[93vh] flex flex-col justify-center gap-10 lg:gap-24 items-center">
      <img
        className="w-28"
        src={`/svgs/card-tick-${isOk ? "success" : "error"}-${
          colorMode.value
        }.svg`}
      />
      <span className="font-vazir font-bold text-2xl lg:text-3xl text-neutral-900 dark:text-neutral-50">
        {isOk ? "پرداخت با موفقیت انجام شد" : "خطا در عملیات پرداخت"}
      </span>
      <div className="flex flex-col items-center gap-10 lg:flex-row">
        {isOk ? (
          <Button
            text="بازار"
            className="px-16"
            onClick={() => navigate("/dashboard/market", { replace: true })}
          />
        ) : null}
        <Button
          text="کیف پول"
          className=" px-16"
          onClick={() => navigate("/dashboard/wallet", { replace: true })}
          outlined
        />
      </div>
    </div>
  );
};

export default TransactionPage;
