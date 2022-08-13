import React, { lazy } from "react";
import { AdvancedChart } from "react-tradingview-embed";
const ListSelector = lazy(() => import("../components/ListSelector"));

const ListPage = () => {
  return (
    <div className="flex-auto w-full h-full flex flex-col gap-2 pt-4">
      <ListSelector />
      <div className="w-full">
        <div className="w-full">
          <AdvancedChart
            widgetProps={{
              theme: "light",
              hide_side_toolbar: true,
              hide_top_toolbar: true,
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPage;
