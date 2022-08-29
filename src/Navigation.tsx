import React, { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { screen } from "./atoms/screen";
import AuthenticationPage from "./pages/AuthenticationPage";
import PageNotFound from "./pages/PageNotFound";
import ProfilePage from "./pages/ProfilePage";

const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const ListPage = lazy(() => import("./pages/ListPage"));

const Navigation = () => {
  const [screenR, setScreenR] = useRecoilState(screen);
  useEffect(() => {
    let doit: NodeJS.Timeout;
    addEventListener("resize", () => {
      clearTimeout(doit);
      doit = setTimeout(
        () =>
          setScreenR({
            width: window.innerWidth,
            height: window.innerHeight,
          }),
        100
      );
    });
    removeEventListener("resize");
  });
  return (
    <>
      <Routes>
        <Route path="" element={<DashboardLayout />}>
          <Route path="dashboard">
            <Route path="" element={<ListPage />} />
            <Route path="list" element={<ListPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="auth" element={<AuthenticationPage />} />
          <Route path="" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default Navigation;
