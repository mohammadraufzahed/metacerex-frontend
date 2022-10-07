import React from "react";

const WalletPopularCurrencyNotFound: React.FC = () => {
  return (
    <div className="w-full lg:flex-auto bg-neutral-50 dark:bg-neutral-900 rounded-lg flex flex-col-reverse py-4 h-max justify-between items-center px-2 lg:flex-row lg:h-20 lg:py-0">
      <span className="font-vazir font-bold text-sm text-primary-700 dark:text-primary-500 lg:text-xl">
        ارز مورد علاقه انتخاب نشده است!
      </span>
      <div>
        <img className="w-20 h-20" src="/svgs/ballon.svg" />
      </div>
    </div>
  );
};

export default WalletPopularCurrencyNotFound;
