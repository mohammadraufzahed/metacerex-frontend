import React, { lazy, Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { FinancialManagementBox } from "../components/FinancialManagementBox";

import { Helmet } from "react-helmet";
import { screen } from "../signals/screen";
import { financialbox } from "../signals/financialBox";

const TradingView = lazy(() => import("../components/TradingView"));
const ListSelector = lazy(
  () => import("../components/CryptoList/ListSelector")
);

const ListPage: React.FC = () => {
  useEffect(() => {
    if (screen.value.width < 1024) {
      financialbox.value = "idleMobile";
    } else {
      financialbox.value = "idle";
    }
  }, [screen.value]);
  return (
    <>
      <Helmet>
        <title>صرافی - لیست ارز ها</title>
      </Helmet>
      <div className="w-full h-[86vh] flex flex-col pt-4">
        <div className="w-full flex flex-col flex-auto auto-cols-max pb-5 md:px-4 lg:grid lg:grid-cols-12 lg:gap-4 2xl:grid-cols-10 lg:overflow-hidden lg:justify-center lg:h-[93vh] lg:overflow-y-hidden">
          <div className="w-full flex-auto xl:flex xl:flex-col lg:col-span-4 2xl:col-span-3 xl:w-full lg:max-w-[440px]">
            <ErrorBoundary fallback={<Error />}>
              <Suspense fallback={<Loading />}>
                <ListSelector />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="w-full h-full flex-auto mt-1 lg:col-span-8 lg:h-full 2xl:col-span-7 lg:mt-0 flex flex-col max-h-full relative lg:max-h-[84vh]">
            <TradingView />
            <FinancialManagementBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPage;
