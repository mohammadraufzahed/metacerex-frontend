import React, { lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { screen } from "./signals/screen";
import ExchangeBox from "./components/ExchangeBox";
import PageNotFound from "./pages/PageNotFound";
import TransactionPage from "./pages/TransactionPage";
import MarketLayout from "./layouts/MarketLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { statusData } from "./atoms/status";
import HomePage from "./pages/HomePage";
import NotificationPage from "./pages/NotificationPage";

const LogoutPage = lazy(() => import("./pages/LogoutPage"));
const OnchainPage = lazy(() => import("./pages/OnchainPage"));
const DepositPage = lazy(() => import("./pages/DepositPage"));
const WithdrawPage = lazy(() => import("./pages/WithdrawPage"));
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
  const status = useRecoilValue(statusData);
  useEffect(() => {
    const resize = () =>
      (screen.value = {
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
    <GoogleOAuthProvider clientId={status ? status.oa2_google_client_id : ""}>
      <Routes>
        <Route path="" element={<DashboardLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="dashboard">
            <Route
              path=""
              element={<Navigate to="/dashboard/list" replace />}
            />
            <Route path="notification" element={<NotificationPage />} />
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
            <Route path="asset">
              <Route
                path=""
                element={<Navigate to="/dashboard/asset/deposit" />}
              />
              <Route path="deposit" element={<DepositPage />} />
              <Route path="withdraw" element={<WithdrawPage />} />
            </Route>
            <Route path="market" element={<MarketLayout />}>
              <Route
                path=""
                element={<Navigate to="/dashboard/market/buy" replace />}
              />
              <Route path="buy" element={<ExchangeBox type="BUY" />} />
              <Route path="sell" element={<ExchangeBox type="SELL" />} />
            </Route>
            <Route path="onchain" element={<OnchainPage />} />
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
          <Route path="transaction" element={<TransactionPage />} />
          <Route path="" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default Navigation;
