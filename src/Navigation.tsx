import React, { lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { screen } from "./atoms/screen";
import LogoutPage from "./pages/LogoutPage";
import PageNotFound from "./pages/PageNotFound";

const WalletPage = lazy(() => import("./pages/WalletPage"));
const NewsListPage = lazy(() => import("./pages/NewsListPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const BankCardsForm = lazy(
  () => import("./components/ProfilePage/forms/BankCardsForm")
);
const PersonalInformationForm = lazy(
  () => import("./components/ProfilePage/forms/PersonalInformationForm")
);
const SecurityForm = lazy(
  () => import("./components/ProfilePage/forms/SecurityForm")
);
const AuthenticationLayout = lazy(
  () => import("./layouts/AuthenticationLayout")
);
const Login = lazy(() => import("./components/AuthenticationPage/forms/Login"));
const Register = lazy(
  () => import("./components/AuthenticationPage/forms/Register")
);
const ProfileLayout = lazy(() => import("./layouts/ProfileLayout"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const ListPage = lazy(() => import("./pages/ListPage"));

const Navigation: React.FC = () => {
  const [screenR, setScreenR] = useRecoilState(screen);
  useEffect(() => {
    const resize = () =>
      setScreenR({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    let doit: NodeJS.Timeout;
    const resizeEventHandler = () => {
      clearTimeout(doit);
      doit = setTimeout(() => resize(), 200);
    };
    addEventListener("resize", resizeEventHandler);
    return () => {
      removeEventListener("resize", resizeEventHandler);
    };
  }, []);
  return (
    <>
      <Routes>
        <Route path="" element={<DashboardLayout />}>
          <Route path="dashboard">
            <Route
              path=""
              element={<Navigate to="/dashboard/list" replace />}
            />
            <Route path="list" element={<ListPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="profile" element={<ProfileLayout />}>
              <Route
                path=""
                element={
                  <Navigate to="/dashboard/profile/information" replace />
                }
              />
              <Route path="information" element={<PersonalInformationForm />} />
              <Route path="cards" element={<BankCardsForm />} />
              <Route path="security" element={<SecurityForm />} />
            </Route>
            <Route path="logout" element={<LogoutPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="auth" element={<AuthenticationLayout />}>
            <Route path="" element={<Navigate to="/auth/login" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="news" element={<NewsListPage />} />
          <Route path="news/:id/:slug" element={<NewsPage />} />
          <Route path="" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default Navigation;
