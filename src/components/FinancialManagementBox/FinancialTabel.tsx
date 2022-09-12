import React, { Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { financialBoxStatus } from "../../atoms/financialBoxStatus";
import { userToken } from "../../atoms/userToken";
import LoginRequiredPage from "../../pages/LoginRequiredPage";
import { TabItem } from "./TabItem";
import OpenOrderTable from "./tables/OpenOrderTable";
import OrderHistoryTable from "./tables/OrderHistoryTable";
import Loading from "../Loading";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFetch from "../ErrorFetch";
import TransactionHistory from "./tables/TransactionHistory";

const FinancialTabel: React.FC = () => {
  // States
  const financialBoxStat = useRecoilValue(financialBoxStatus);
  const [orderHistorySearch, setOrderHistorySearch] = useState<string>("");
  const userTokenD = useRecoilValue(userToken);
  const [currentTab, setCurrentTap] = useState<
    "open_order" | "order_history" | "transaction_history"
  >("open_order");
  return (
    <motion.div
      initial={{ height: 0 }}
      variants={{
        max: {
          height: "85vh",
        },
        open: {
          height: "42vh",
        },
        mobileOpen: {
          height: "79vh",
        },
      }}
      animate={financialBoxStat}
      transition={{ duration: 1 }}
      className="w-full flex flex-col overflow-y-scroll scrollbar-vertical bg-gray-50 overflow-x-hidden border-t-[1px] px-4"
    >
      <div className="px-2 relative py-4 flex flex-auto flex-col h-full w-full">
        {!userTokenD ? (
          <LoginRequiredPage />
        ) : (
          <div className="w-full">
            <div className="w-full justify-between flex flex-row">
              <div className=" flex flex-row gap-4">
                <TabItem
                  text="سفارشات باز"
                  onTap={() => setCurrentTap("open_order")}
                  active={currentTab == "open_order"}
                />
                <TabItem
                  text="تاریخچه سفارشات"
                  onTap={() => setCurrentTap("order_history")}
                  active={currentTab == "order_history"}
                />
                <TabItem
                  text="تاریخچه تراکنش"
                  onTap={() => setCurrentTap("transaction_history")}
                  active={currentTab == "transaction_history"}
                />
              </div>
              <motion.div
                variants={{
                  initial: {
                    y: 0,
                    scale: 1,
                  },
                  hover: {
                    y: -3,
                  },
                  tap: {
                    y: -5,
                    scale: 1.05,
                  },
                }}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="fixed bottom-20 left-[28%] lg:relative lg:bottom-1 lg:left-0 bg-white flex self-center flex-row gap-2 items-center border-[1px] border-primary-700 rounded-2xl py-2 px-4"
              >
                <span className="font-light font-vazir text-sm text-primary-700">
                  دریافت خروجی اکسل
                </span>
                <img src="/svgs/excel.svg" />
              </motion.div>
            </div>
            <div className="flex-auto py-3.5 h-full flex flex-col overflow-hidden scrollbar-vertical gap-2 relative bg-neutral-200">
              <Suspense fallback={<Loading />}>
                <QueryErrorResetBoundary>
                  {({ reset }) => (
                    <ErrorBoundary
                      onReset={reset}
                      fallbackRender={({ resetErrorBoundary }) => (
                        <ErrorFetch resetErrorBoundary={resetErrorBoundary} />
                      )}
                    >
                      <AnimatePresence mode="wait">
                        {currentTab == "open_order" ? (
                          <OpenOrderTable />
                        ) : currentTab == "order_history" ? (
                          <OrderHistoryTable />
                        ) : (
                          <TransactionHistory />
                        )}
                      </AnimatePresence>
                    </ErrorBoundary>
                  )}
                </QueryErrorResetBoundary>
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FinancialTabel;
