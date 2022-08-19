import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";

const DashboardNavbar = lazy(() => import("../components/DashboardNavbar"));
const DashboardSidebar = lazy(() => import("../components/DashboardSidebar"));

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex flex-col w-screen h-screen max-w-[100vw] overflow-hidden">
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
      </main>
    </div>
  );
};

export default DashboardLayout;
