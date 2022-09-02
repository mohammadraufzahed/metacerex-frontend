import { AnimatePresence } from "framer-motion";
import React, { lazy } from "react";
import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";
import { registerAtom } from "../../../atoms/registerAtom";
import RegisterFirstStep from "./steps/registerFirstStep";
import RegisterLastSetp from "./steps/registerLastStep";

const AuthenticationFormLayout = lazy(
  () => import("../../../layouts/AuthenticationFormLayout")
);

const Register: React.FC = () => {
  const registerData = useRecoilValue(registerAtom);
  return (
    <>
      <Helmet>
        <title>صرافی - ثبت نام</title>
      </Helmet>
      <AuthenticationFormLayout key="registerForm">
        <AnimatePresence exitBeforeEnter>
          {registerData?.status == "register" ? (
            <RegisterFirstStep />
          ) : (
            <RegisterLastSetp />
          )}
        </AnimatePresence>
      </AuthenticationFormLayout>
    </>
  );
};

export default Register;
