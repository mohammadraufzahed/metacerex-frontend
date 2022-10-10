import React, { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import GoogleButton from "../components/AuthenticationPage/GoogleButton";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import MenuItem from "../components/AuthenticationPage/MenuItem";

const AuthenticationLayout: React.FC = () => {
  const userTokenObject = sessionStorage.getItem("userToken");
  const location = useLocation();
  const navigate = useNavigate();
  if (userTokenObject && JSON.parse(userTokenObject).userToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-row justify-center items-center lg:h-[93vh] overflow-y-scroll scrollbar-vertical w-full lg:justify-start lg:px-14">
      <div className="flex flex-col bg-neutral-50 dark:bg-neutral-900 overflow-hidden w-11/12 w-max-full mx-2 h-max-full h-[79vh] my-2 mb-16 rounded-lg justify-self-center max-w-[360px] px-6 lg:max-w-none lg:w-[30rem] lg:max-h-[94vh] overflow-y-scroll scrollbar-vertical">
        <div className="w-full h-max grid grid-cols-2 pt-10 place-items-center place-content-center font-vazir font-bold text-lg">
          <MenuItem
            text="ورود"
            active={location.pathname == "/auth/login"}
            onClick={() => navigate("/auth/login", { replace: true })}
          />
          <MenuItem
            text="ثبت نام"
            active={location.pathname == "/auth/register"}
            onClick={() => navigate("/auth/register", { replace: true })}
          />
        </div>
        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </Suspense>
        <div className="w-full flex place-items-center place-content-center gap-2">
          <div className="w-5/12 h-[1px] bg-neutral-400 dark:bg-neutral-50" />
          <span className="font-vazir font-normal text-2xl text-neutral-400 dark:text-neutral-50">
            یا
          </span>

          <div className="w-5/12 h-[1px] bg-neutral-400 dark:bg-neutral-50" />
        </div>
        <GoogleButton />
      </div>
      <div className="hidden max-w-[600px] min-h-max w-11/12 mr-4 mx-auto xl:mr-auto lg:flex items-center justify-center">
        <img src="/svgs/login-image.svg" alt="" />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
