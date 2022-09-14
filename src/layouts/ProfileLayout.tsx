import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import React, { lazy, Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userToken } from "../atoms/userToken";
import MenuItem from "../components/AuthenticationPage/MenuItem";
import ErrorFetch from "../components/ErrorFetch";
import Loading from "../components/Loading";

const ProfileLayout: React.FC = () => {
  // States
  const navigate = useNavigate();
  const location = useLocation();
  const userTokenObject = useRecoilValue(userToken);
  // Authentication check
  if (!userTokenObject) return <Navigate to="/auth" replace />;

  return (
    <div className="flex-auto flex flex-col px-4 py-10 lg:px-8">
      <div className="w-full grid grid-cols-3 lg:grid-cols-5">
        <MenuItem
          text="اطلاعات هویتی"
          onClick={() =>
            navigate("/dashboard/profile/information", { replace: true })
          }
          active={location.pathname === "/dashboard/profile/information"}
        />
        <MenuItem
          text="حساب بانکی"
          onClick={() =>
            navigate("/dashboard/profile/cards", { replace: true })
          }
          active={location.pathname === "/dashboard/profile/cards"}
        />
        <MenuItem
          text="امنیت"
          onClick={() => {
            navigate("/dashboard/profile/security", { replace: true });
          }}
          active={location.pathname === "/dashboard/profile/security"}
        />
        <MenuItem text="" onClick={() => {}} active={false} only="desktop" />
        <MenuItem text="" onClick={() => {}} active={false} only="desktop" />
      </div>
      <AnimatePresence mode="wait">
        <Suspense fallback={<Loading />}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }) => (
                  <ErrorFetch resetErrorBoundary={resetErrorBoundary} />
                )}
              >
                <Outlet />
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Suspense>
      </AnimatePresence>
    </div>
  );
};

export default ProfileLayout;
