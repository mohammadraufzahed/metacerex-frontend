import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../components/AuthenticationPage/Button";

const TransactionPage = () => {
  const location = useLocation();
  const isOk = location.search.includes("payment_status=OK");
  const navigate = useNavigate();
  return (
    <div className="flex-auto flex flex-col justify-center gap-10 lg:gap-24 items-center">
      <img
        className="w-28"
        src={`/svgs/card-tick-${isOk ? "success" : "error"}.svg`}
      />
      <span className="font-vazir font-bold text-2xl lg:text-3xl">
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
