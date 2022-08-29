import React, { lazy, Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { FinancialManagementBox } from "../components/FinancialManagementBox";
import { useRecoilState, useRecoilValue } from "recoil";
import { financialBoxStatus } from "../atoms/financialBoxStatus";
import { screen } from "../atoms/screen";

const TradingView = lazy(() => import("../components/TradingView"));
const NewsBox = lazy(() => import("../components/News/NewsBox"));
const ListSelector = lazy(
  () => import("../components/CryptoList/ListSelector")
);

const ListPage: React.FC = () => {
  const [financialBoxStat, setFinancialBoxStat] =
    useRecoilState(financialBoxStatus);
  const screenR = useRecoilValue(screen);
  useEffect(() => {
    if (screenR.width < 1060) {
      setFinancialBoxStat("idleMobile");
    } else {
      setFinancialBoxStat("idle");
    }
  }, [screenR]);
  return (
    <div className="flex-auto w-full h-max-full flex flex-col pt-4 max-w-[2000px]">
      <div className="w-full flex flex-col flex-auto pb-5 md:px-4 lg:grid lg:grid-cols-12 lg:gap-x-2 lg:justify-center lg:max-h-[1060px]">
        <div className="lg:col-span-5 xl:col-span-3 gap-2 xl:flex xl:flex-col">
          <ErrorBoundary fallback={<Error />}>
            <Suspense fallback={<Loading />}>
              <ListSelector />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<Error />}>
            <Suspense fallback={<Loading />}>
              <NewsBox />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="w-full flex-auto mt-1 lg:mt-0 lg:col-span-7 xl:col-span-9 flex flex-col max-h-full relative">
          <TradingView />
          <FinancialManagementBox />
        </div>
      </div>
    </div>
  );
};

export default ListPage;
