import React from "react";
import { TickerTable } from "../../types/API";

type PropsT = {
  ticker: TickerTable;
};

const WalletPopularCurrency: React.FC<PropsT> = ({ ticker }) => {
  return (
    <div className="w-full flex-row flex justify-center items-center bg-neutral-50 dark:bg-neutral-900 rounded p-2 lg:w-[230px] lg:py-9">
      <div className="flex flex-row gap-5 items-center lg:gap-8">
        <div className="flex flex-row gap-3 items-center">
          <img
            className="w-3.5 shadow-secondary-700 dark:shadow-none shadow-sm lg:w-5"
            src={ticker.base_asset.icon}
          />
          <span className="font-vazir font-bold text-lg text-primary-700 dark:text-primary-500">
            {ticker.base_asset.code}
          </span>
        </div>
        <span className="font-vazir font-normal text-sm text-primary-700 dark:text-primary-500">
          {ticker.price ? ticker.price : "-"}
        </span>
      </div>
    </div>
  );
};

export default WalletPopularCurrency;
