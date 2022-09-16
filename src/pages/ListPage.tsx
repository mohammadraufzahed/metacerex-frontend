import React, { lazy, Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { FinancialManagementBox } from "../components/FinancialManagementBox";
import { useRecoilState, useRecoilValue } from "recoil";
import { financialBoxStatus } from "../atoms/financialBoxStatus";

import { Helmet } from "react-helmet";
import { screen } from "../atoms/screen";

const TradingView = lazy(() => import("../components/TradingView"));
const NewsBox = lazy(() => import("../components/News/NewsBox"));
const ListSelector = lazy(
  () => import("../components/CryptoList/ListSelector")
);

const ListPage: React.FC = () => {
  const [financialBoxStat, setFinancialBoxStat] =
    useRecoilState(financialBoxStatus);
  const screenD = useRecoilValue(screen);
  useEffect(() => {
    if (screenD.width < 1024) {
      setFinancialBoxStat("idleMobile");
    } else {
      setFinancialBoxStat("idle");
    }
  }, [screenD]);
  return (
    <>
      <Helmet>
        <title>صرافی - لیست ارز ها</title>
      </Helmet>
      <div className="flex-auto h-[100vh] w-full flex flex-col pt-4">
        <div className="w-full flex flex-col flex-auto auto-cols-max pb-5 md:px-4 lg:grid lg:grid-cols-12 lg:gap-4 2xl:grid-cols-10 lg:overflow-hidden lg:h-[94vh] lg:max-h-[90vh] lg:justify-center ">
          <div className="w-full xl:flex xl:flex-col lg:col-span-4 2xl:col-span-3 xl:w-full lg:max-w-[440px]">
            <ErrorBoundary fallback={<Error />}>
              <Suspense fallback={<Loading />}>
                <ListSelector />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="w-full h-full min-w-full flex-auto mt-1 lg:col-span-8 lg:h-full 2xl:col-span-7 lg:mt-0 flex flex-col max-h-full relative">
            <TradingView />
            <FinancialManagementBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPage;
