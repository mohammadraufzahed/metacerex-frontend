import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));

const Navigation = () => {
  return (
    <>
      <Helmet>
        <title>Hello WOrld</title>
      </Helmet>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="overview" element={<Helmet title="Hello World" />} />
          <Route
            path="*"
            element={
              <span className="w-full h-full flex justify-center items-center">
                صفحه پیدا نشد
              </span>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default Navigation;
