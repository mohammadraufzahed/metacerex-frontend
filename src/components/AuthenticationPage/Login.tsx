import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import AuthenticationFormLayout from "../../layouts/AuthenticationFormLayout";
import Input from "./Input";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "./Button";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginFormik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: yup.object({
      phone: yup
        .string()
        .required("شماره تلفن وارد نشده است.")
        .matches(/^(\+98|0098|98|0)?9\d{9}$/g, "شماره تلفن معتبر نمیباشد."),
      password: yup.string().matches(
        /[a-zA-Z]+[0-9]+[!@#$&()\-`.+,\\]+/gm,
        `گذرواژه میبایست ترکیبی از حروف و اعداد انگلیسی و کارکترهای خاص
مانند @ # $ % & * باشد`
      ),
    }),
    async onSubmit() {},
  });
  return (
    <AuthenticationFormLayout key="loginForm">
      <Input
        label="شماره تلفن"
        id="phone"
        name="phone"
        type="phone"
        onChange={loginFormik.handleChange}
        value={loginFormik.values.phone}
        error={loginFormik.errors.phone}
      />
      <Input
        label="گذرواژه"
        id="password"
        name="password"
        type="password"
        onChange={loginFormik.handleChange}
        value={loginFormik.values.password}
        error={loginFormik.errors.password}
      />
      <ReCAPTCHA
        lang="fa"
        sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITEKEY}
      />
      <Button
        text="ورود"
        loading={isLoading}
        onClick={() => setIsLoading(!isLoading)}
      />
    </AuthenticationFormLayout>
  );
};

export default Login;
