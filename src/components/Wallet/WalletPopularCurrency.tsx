import React from "react";

const WalletPopularCurrency: React.FC = () => {
  return (
    <div className="w-full flex-row flex justify-between items-center bg-neutral-50 rounded p-2 lg:w-[210px]">
      <div className="flex flex-row gap-5 items-center lg:flex-col lg:gap-8">
        <div className="flex flex-row gap-3 items-center h-max">
          <img
            className="w-3.5 shadow-secondary-700 shadow-sm lg:w-5"
            src="/svgs/btc.svg"
          />
          <span className="font-vazir font-bold text-lg text-primary-700">
            بیت کوین
          </span>
        </div>
        <span className="font-vazir font-normal text-sm text-primary-700">
          1.003456
        </span>
      </div>
      <span className="font-vazir font-normal text-sm text-success lg:self-end">
        23%
      </span>
    </div>
  );
};

export default WalletPopularCurrency;
