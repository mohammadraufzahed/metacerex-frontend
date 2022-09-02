import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import React, { lazy, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilValue } from "recoil";
import { userToken } from "../atoms/userToken";
import MenuItem from "../components/AuthenticationPage/MenuItem";
import ErrorFetch from "../components/ErrorFetch";
import Loading from "../components/Loading";
import BankCardsForm from "../components/ProfilePage/forms/BankCardsForm";
import SecurityForm from "../components/ProfilePage/forms/SecurityForm";
import LoginRequiredPage from "./LoginRequiredPage";

const PersonalInformationForm = lazy(
  () => import("../components/ProfilePage/forms/PersonalInformationForm")
);

const ProfilePage: React.FC = () => {
  // States
  const [currentTab, setCurrentTab] = useState<
    "personalInformation" | "bankInformation" | "securityInformation"
  >("personalInformation");
  const userTokenObject = useRecoilValue(userToken);
  // Authentication check
  if (!userTokenObject) return <LoginRequiredPage />;

  return (
    <div className="flex-auto flex flex-col px-4 py-10 lg:px-8">
      <div className="w-full grid grid-cols-3 lg:grid-cols-5">
        <MenuItem
          text="اطلاعات هویتی"
          onClick={() =>
            currentTab != "personalInformation"
              ? setCurrentTab("personalInformation")
              : null
          }
          active={currentTab === "personalInformation"}
        />
        <MenuItem
          text="حساب بانکی"
          onClick={() =>
            currentTab != "bankInformation"
              ? setCurrentTab("bankInformation")
              : null
          }
          active={currentTab === "bankInformation"}
        />
        <MenuItem
          text="امنیت"
          onClick={() => {
            currentTab != "securityInformation"
              ? setCurrentTab("securityInformation")
              : null;
          }}
          active={currentTab === "securityInformation"}
        />
        <MenuItem text="" onClick={() => {}} active={false} only="desktop" />
        <MenuItem text="" onClick={() => {}} active={false} only="desktop" />
      </div>
      <Suspense fallback={<Loading />}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <ErrorFetch resetErrorBoundary={resetErrorBoundary} />
              )}
            >
              <AnimatePresence exitBeforeEnter>
                {currentTab == "personalInformation" ? (
                  <PersonalInformationForm />
                ) : currentTab == "bankInformation" ? (
                  <BankCardsForm />
                ) : currentTab == "securityInformation" ? (
                  <SecurityForm />
                ) : null}
              </AnimatePresence>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Suspense>
    </div>
  );
};

export default ProfilePage;
