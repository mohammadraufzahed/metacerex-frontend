import React, { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GoogleButton from "../components/AuthenticationPage/GoogleButton";
import { useRecoilValue } from "recoil";
import { userToken } from "../atoms/userToken";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const MenuItem = lazy(
  () => import("../components/AuthenticationPage/MenuItem")
);

const AuthenticationLayout: React.FC = () => {
  const userTokenObject = useRecoilValue(userToken);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (userTokenObject?.access) {
      navigate("/dashboard/list");
    }
  }, [userTokenObject]);
  return (
    <div className="flex flex-row justify-center items-center flex-auto lg:justify-start lg:px-14">
      <div className="flex flex-col bg-neutral-50 overflow-hidden w-11/12 w-max-full mx-2 h-max-full h-max my-2 mb-16 rounded-lg justify-self-center max-w-[360px] px-6 lg:h-max lg:max-w-none lg:w-[30rem]">
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
          <div className="w-5/12 h-[1px] bg-neutral-400" />
          <span className="font-vazir font-normal text-2xl text-neutral-400">
            یا
          </span>

          <div className="w-5/12 h-[1px] bg-neutral-400" />
        </div>
        <GoogleButton />
      </div>
      <div className="hidden max-w-[600px] w-11/12 mr-4 mx-auto xl:mr-auto lg:flex items-center justify-center">
        <img src="/svgs/login-image.svg" alt="" />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
