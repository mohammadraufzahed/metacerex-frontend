import { useQuery } from "@tanstack/react-query";
import React, { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { statusData } from "../atoms/status";
import Loading from "../components/Loading";
import { getStatus } from "../functions/status";

const BottomBar = lazy(() => import("../components/BottomBar"));
const DashboardNavbar = lazy(() => import("../components/DashboardNavbar"));
const DashboardSidebar = lazy(() => import("../components/DashboardSidebar"));

const DashboardLayout: React.FC = () => {
  // States
  const [statusD, setStatus] = useRecoilState(statusData);
  // Queries
  const statusQuery = useQuery(["status"], getStatus, {
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
    refetchIntervalInBackground: true,
  });
  // Effects
  useEffect(() => setStatus(statusQuery.data ?? null), [statusQuery.data]);
  return (
    <div className="flex pb-16 flex-col w-screen min-h-screen h-max max-w-[100vw] overflow-y-hidden overflow-hidden scrollbar-vertical lg:pb-0">
      <header>
        <DashboardNavbar />
      </header>
      <main className="min-h-screen max-h-max h-full overflow-y-scroll scrollbar-vertical flex flex-row min-w-screen bg-background-50">
        <DashboardSidebar />
        <div className="flex-auto min-h-screen h-full flex py-16 px-12">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
        <BottomBar />
      </main>
    </div>
  );
};

export default DashboardLayout;
