import { useFormik } from "formik";
import React, { useState } from "react";
import { object, string, ref, boolean } from "yup";
import { emailOrPhone } from "../../../../regex/emailOrPhone";
import { passwordReg } from "../../../../regex/passwordReg";
import Button from "../../Button";
import Input from "../../Input";
import RulesCheckbox from "../../RulesCheckbox";
import { AnimatePresence, motion } from "framer-motion";
import { emailReg } from "../../../../regex/emailReg";
import { RegisterRequest } from "../../../../types/API";
import { httpClient } from "../../../../axios";
import { useRecoilState } from "recoil";
import { registerAtom } from "../../../../atoms/registerAtom";
import ReCAPTCHA from "react-google-recaptcha";
import useCustomToast from "../../../../hooks/useCustomToast";

const RegisterFirstStep: React.FC = () => {
  const [registerData, setRegisterData] = useRecoilState(registerAtom);
  const registerFormik = useFormik({
    initialValues: {
      identity: "",
      password: "",
      passwordConfirm: "",
      referrer_code: "",
      rules_accepted: false,
      captcha: false,
    },
    validationSchema: object({
      identity: string()
        .required("شماره تلفن یا ایمیل وارد نشده است.")
        .matches(emailOrPhone, "شماره موبایل یا ایمیل معتبر نمیباشد."),
      password: string()
        .required("گذرواژه وارد نشده است.")
        .matches(
          passwordReg,
          `گذرواژه میبایست ترکیبی از حروف و اعداد انگلیسی و کارکترهای خاص
مانند @ # $ % & * باشد`
        )
        .min(6, "گذرواژه باید حداقل 6 کاراکتر باشد."),
      passwordConfirm: string().oneOf(
        [ref("password"), null],
        "گذرواژه برابر نمیباشد."
      ),
      referrer_code: string().matches(
        /[A-Z0-9]{6}/gi,
        "کد معرف معتبر نمیباشد."
      ),
      rules_accepted: boolean().required().isTrue(),
      captcha: boolean().required().isTrue(),
    }),
    async onSubmit(props) {
      let user: RegisterRequest = {
        password: props.password,
      };
      if (props.referrer_code && props.referrer_code != "") {
        user.referrer_code = props.referrer_code;
      }
      if (emailReg.test(props.identity)) {
        user.email = props.identity;
      } else {
        user.mobile = props.identity;
      }
      await httpClient
        .post("users/register/request/", {
          ...user,
        })
        .then((data) => {
          if (data.status == 200 || data.status == 201) {
            useCustomToast(
              "bottom-right",
              "success",
              "کد تایید با موفقیت ارسال شد"
            );
            setRegisterData({
              ...registerData,
              uuid: data.data.uuid,
              status: "mobileConfirm",
            });
          }
        })
        .catch((e) =>
          useCustomToast(
            "bottom-right",
            "error",
            e.response.data.mobile ?? e.response.data.email
          )
        );
    },
  });
  return (
    <motion.div
      className="w-full flex flex-col gap-6 items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <Input
        label="ایمیل / موبایل"
        id="identity"
        name="identity"
        value={registerFormik.values.identity}
        onChange={registerFormik.handleChange}
        error={registerFormik.errors.identity}
        type="text"
        required
      />
      <Input
        label="گذرواژه"
        id="password"
        name="password"
        value={registerFormik.values.password}
        error={registerFormik.errors.password}
        onChange={registerFormik.handleChange}
        type="password"
        required
      />
      <Input
        label="تکرار گذرواژه"
        id="passwordConfirm"
        name="passwordConfirm"
        error={registerFormik.errors.passwordConfirm}
        value={registerFormik.values.passwordConfirm}
        onChange={registerFormik.handleChange}
        type="password"
        required
      />
      <Input
        label="کد معرف"
        id="referrer_code"
        name="referrer_code"
        error={registerFormik.errors.referrer_code}
        value={registerFormik.values.referrer_code}
        onChange={registerFormik.handleChange}
        type="password"
      />
      <ReCAPTCHA
        lang="fa"
        onChange={(token) => {
          if (token) {
            registerFormik.setFieldValue("captcha", true);
          } else {
            registerFormik.setFieldValue("captcha", false);
          }
        }}
        sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITEKEY}
      />
      <RulesCheckbox
        onChange={registerFormik.handleChange}
        value={registerFormik.values.rules_accepted}
        name="rules_accepted"
        id="rules_accepted"
        className="mr-6"
      />
      <Button
        text="ثبت نام"
        onClick={() => {
          registerFormik.submitForm();
        }}
        loading={registerFormik.isSubmitting}
      />
    </motion.div>
  );
};

export default RegisterFirstStep;
