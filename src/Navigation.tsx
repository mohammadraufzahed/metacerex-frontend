import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageNotFound from "./pages/PageNotFound";

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
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default Navigation;
