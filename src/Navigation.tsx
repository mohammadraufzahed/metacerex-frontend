import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";

const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const ListPage = lazy(() => import("./pages/ListPage"));

const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="list" element={<ListPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default Navigation;
