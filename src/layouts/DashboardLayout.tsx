import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";

const BottomBar = lazy(() => import("../components/BottomBar"));
const DashboardNavbar = lazy(() => import("../components/DashboardNavbar"));
const DashboardSidebar = lazy(() => import("../components/DashboardSidebar"));

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex pb-16 flex-col w-screen h-screen max-w-[100vw] overflow-y-scroll overflow-x-hidden scrollbar-vertical lg:pb-0">
      <Helmet>
        <title>صرافی - حساب کاربری</title>
      </Helmet>
      <header>
        <DashboardNavbar />
      </header>
      <main className="flex-auto flex flex-row w-screen bg-background-50">
        <DashboardSidebar />
        <div className="flex-auto flex">
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
