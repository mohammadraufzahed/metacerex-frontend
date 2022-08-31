import React, { useState } from "react";
import { useFormik } from "formik";
import { boolean, object, string } from "yup";
import AuthenticationFormLayout from "../../../layouts/AuthenticationFormLayout";
import Input from "../Input";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../Button";
import { emailOrPhone } from "../../../regex/emailOrPhone";
import { httpClient } from "../../../axios";
import { AnimatePresence, motion } from "framer-motion";
import { CustomTokenObtain } from "../../../types/API";
import { useRecoilState } from "recoil";
import { user } from "../../../atoms/user";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../../../hooks/useCustomToast";

const Login: React.FC = () => {
  const [userD, setUserD] = useRecoilState(user);
  const navigate = useNavigate();
  const loginFormik = useFormik({
    initialValues: {
      identity: "",
      password: "",
      captcha: false,
    },
    validationSchema: object({
      identity: string()
        .required("شماره تلفن یا ایمیل وارد نشده است.")
        .matches(emailOrPhone, "شماره موبایل یا ایمیل معتبر نمیباشد."),
      password: string().required("رمز عبور وارد نشده است."),
      captcha: boolean().required().isTrue(),
    }),
    async onSubmit({ identity, password }) {
      await httpClient
        .post("users/token/obtain/", {
          username: identity,
          password,
        })
        .then((res) => {
          if (res.status == 200) {
            const user: CustomTokenObtain = res.data;
            setUserD(user);
            useCustomToast(
              "bottom-right",
              "success",
              "شما با موفقیت وارد شدید"
            );
            navigate("/dashboard/list", { replace: true });
          }
        });
    },
  });
  return (
    <AuthenticationFormLayout key="loginForm">
      <Input
        fullWidth
        label="ایمیل / موبایل"
        id="identity"
        name="identity"
        type="text"
        required
        onChange={loginFormik.handleChange}
        value={loginFormik.values.identity}
        error={loginFormik.errors.identity}
      />
      <Input
        fullWidth
        label="گذرواژه"
        id="password"
        name="password"
        type="password"
        required
        onChange={loginFormik.handleChange}
        value={loginFormik.values.password}
        error={loginFormik.errors.password}
      />
      <ReCAPTCHA
        lang="fa"
        onChange={(token) => {
          if (token) {
            loginFormik.setFieldValue("captcha", true);
          } else {
            loginFormik.setFieldValue("captcha", false);
          }
        }}
        sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITEKEY}
      />
      <Button
        text="ورود"
        loading={loginFormik.isSubmitting}
        onClick={() => loginFormik.submitForm()}
        fullWidth
      />
    </AuthenticationFormLayout>
  );
};

export default Login;
