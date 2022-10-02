import { Outlet } from "react-router-dom";
import { FinancialManagementBox } from "../components/FinancialManagementBox";
import MarketAction from "../components/Market/MarketActionsBox";
import TradingView from "../components/TradingView";

const MarketLayout = () => {
  return (
    <div className="w-full h-[93vh] overflow-y-scroll pb-5 scrollbar-vertical lg:grid lg:grid-cols-12 gap-4 px-4 py-2 2xl:grid-cols-10">
      <div className="w-full flex lg:col-span-5 xl:col-span-3 2xl:col-span-2">
        <MarketAction>
          <Outlet />
        </MarketAction>
      </div>
      <div className="hidden lg:flex flex-col lg:col-span-7 xl:col-span-9 2xl:col-span-8">
        <TradingView />
        <FinancialManagementBox />
      </div>
    </div>
  );
};

export default MarketLayout;