import React from "react";

const PageNotFound = () => {
  return (
    <div className="h-[93vh] w-full flex flex-col items-center justify-center gap-9">
      <img src="/svgs/404.svg" />
      <div className="flex flex-col items-center font-vazir font-bold text-lg text-primary-500">
        <span>متاسفیم</span>
        <span>صفحه مورد نظر شما پیدا نشد</span>
      </div>
    </div>
  );
};

export default PageNotFound;
