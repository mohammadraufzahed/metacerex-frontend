import React, { lazy } from "react";
import { AdvancedChart } from "react-tradingview-embed";

const NewsBox = lazy(() => import("../components/News/NewsBox"));
const ListSelector = lazy(
  () => import("../components/CryptoList/ListSelector")
);

const ListPage: React.FC = () => {
  return (
    <div className="flex-auto w-full h-full flex flex-col pt-4">
      <div className="w-full flex flex-col flex-auto pb-14 md:px-4 lg:grid lg:grid-cols-12 lg:gap-x-2 lg:mb-10">
        <div className="lg:col-span-5 xl:col-span-3 xl:flex xl:flex-col">
          <ListSelector />
          <NewsBox />
        </div>
        <div className="w-full flex-auto mt-1 lg:mt-0 lg:col-span-7 xl:col-span-9">
          <AdvancedChart
            widgetProps={{
              theme: "light",
              hide_side_toolbar: true,
              hide_top_toolbar: true,
              width: "100%",
              height: "100%",
              allow_symbol_change: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPage;
