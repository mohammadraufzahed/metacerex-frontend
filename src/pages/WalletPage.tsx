import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userToken } from "../atoms/userToken";
import Button from "../components/AuthenticationPage/Button";
import WalletPopularCurrencyNotFound from "../components/Wallet/WalletPopularCurrencyNotFound";
import WalletTable from "../components/Wallet/WalletTable";
import WalletTableMobile from "../components/Wallet/WalletTableMobile";
import Layer from "../svgs/Layer";
import Search from "../svgs/Search";

const WalletPage: React.FC = () => {
  // States
  const userTokenD = useRecoilValue(userToken);

  // Conditions
  if (!userTokenD) return <Navigate to="/auth" replace />;
  return (
    <div className="py-6 px-4 flex flex-col gap-7 flex-auto max-w-[1600px] 2xl:mx-auto lg:gap-10">
      <div className="w-full flex flex-col gap-6 lg:flex-row-reverse">
        <div className="w-full flex flex-col gap-6 lg:w-5/12">
          <div className="grid grid-cols-2 items-center justify-center w-full">
            <Button text="مبنای قیمت ریال" fullWidth outlined />
            <Button
              text="مبنای قیمت تتر"
              fullWidth
              className="justify-self-end"
            />
          </div>
          <div className="font-vazir font-bold text-sm text-primary-700 bg-neutral-50 py-3 px-5 rounded flex flex-row justify-between items-center drop-shadow lg:py-9 lg:px-2 lg:text-base">
            <span className="flex flex-row gap-3 items-center justify-center">
              <Layer className="stroke-primary-700 hidden md:block" /> ارزش لحظه
              ای پرتفو
            </span>
            <span>۵۳۷.۰۲۱.۳۳۳</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:flex-auto lg:gap-7 lg:justify-between">
          <span className="font-vazir font-bold text-sm lg:text-2xl lg:font-normal">
            ارز های محبوب شما
          </span>
          <div className="w-full flex flex-col items-center justify-start gap-2 lg:flex-row">
            {/* <WalletPopularCurrency />
            <WalletPopularCurrency />
            <WalletPopularCurrency /> */}
            <WalletPopularCurrencyNotFound />
          </div>
        </div>
      </div>
      <div className="w-full flex-auto flex flex-col gap-7">
        <div className="flex flex-row w-full items-center justify-between">
          <span className="font-vazir font-bold text-sm lg:text-2xl lg:font-normal">
            همه ارزها
          </span>
          <div className="w-8/12 relative lg:max-w-[612px]">
            <input
              className="w-full h-8 rounded-lg placeholder:opacity-0 lg:placeholder:opacity-100 p-2 text-base font-vazir font-normal placeholder:text-neutral-700 outline-none border-[1px] border-primary-700 text-neutral-700"
              placeholder="جستجو در میان همه ارز ها"
            />
            <Search className="absolute left-2 stroke-neutral-800 bottom-1 lg:hidden" />
          </div>
        </div>
        <WalletTable />
        <WalletTableMobile />
      </div>
    </div>
  );
};

export default WalletPage;
