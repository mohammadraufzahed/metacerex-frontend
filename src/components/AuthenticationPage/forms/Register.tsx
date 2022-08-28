import { useFormik } from "formik";
import React, { lazy } from "react";
import * as yup from "yup";
import Button from "../Button";

const AuthenticationFormLayout = lazy(
  () => import("../../../layouts/AuthenticationFormLayout")
);
const Input = lazy(() => import("../Input"));
const RulesCheckbox = lazy(() => import("../RulesCheckbox"));

const Register: React.FC = () => {
  const registerFormik = useFormik({
    initialValues: {
      phone: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object({
      phone: yup
        .string()
        .required("شماره تلفن وارد نشده است.")
        .matches(/^(\+98|0098|98|0)?9\d{9}$/g, "شماره تلفن معتبر نمیباشد."),
      password: yup
        .string()
        .required("گذرواژه وارد نشده است.")
        .matches(
          /[a-zA-Z]+[0-9]+[!@#$&()\-`.+,\\]+/gm,
          `گذرواژه میبایست ترکیبی از حروف و اعداد انگلیسی و کارکترهای خاص
مانند @ # $ % & * باشد`
        )
        .min(6, "گذرواژه باید حداقل 6 کاراکتر باشد."),
      passwordConfirm: yup
        .string()
        .required("تکرار گذرواژه وارد نشده است.")
        .oneOf([yup.ref("password")], "گذرواژه برابر نمیباشد."),
    }),
    async onSubmit() {},
  });
  return (
    <AuthenticationFormLayout key="registerForm">
      <Input
        label="شماره تلفن"
        id="phone"
        name="phone"
        value={registerFormik.values.phone}
        onChange={registerFormik.handleChange}
        error={registerFormik.errors.phone}
        type="phone"
      />
      <Input
        label="گذرواژه"
        id="password"
        name="password"
        value={registerFormik.values.password}
        error={registerFormik.errors.password}
        onChange={registerFormik.handleChange}
        type="password"
      />
      <Input
        label="تکرار گذرواژه"
        id="passwordConfirm"
        name="passwordConfirm"
        value={registerFormik.values.passwordConfirm}
        onChange={registerFormik.handleChange}
        type="password"
      />
      <RulesCheckbox />
      <Button text="ثبت نام" onClick={() => {}} />
    </AuthenticationFormLayout>
  );
};

export default Register;
