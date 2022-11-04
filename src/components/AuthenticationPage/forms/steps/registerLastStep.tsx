import React from "react";
import { motion } from "framer-motion";
import Input from "../../../Input";
import { useFormik } from "formik";
import Button from "../../Button";
import { object, string } from "yup";
import { useRecoilState, useRecoilValue } from "recoil";
import { registerAtom } from "../../../../atoms/registerAtom";
import { httpClient } from "../../../../axios";
import { CustomTokenObtain } from "../../../../types/API";
import useCustomToast from "../../../../hooks/useCustomToast";
import Timer from "../../../Timer";

const RegisterLastSetp: React.FC = () => {
  const [registerData, setRegisterData] = useRecoilState(registerAtom);
  const verifyCodeFormik = useFormik({
    initialValues: {
      verifyCode: "",
    },
    validationSchema: object({
      verifyCode: string()
        .required("کد تایید را وارد نمایید")
        .matches(/^[0-9]{6}$/gi, "یک عدد ۶ رقمی وارد نمایید"),
    }),
    async onSubmit({ verifyCode }) {
      const data = {
        uuid: registerData?.uuid,
        response: verifyCode,
      };
      await httpClient.post("users/register/verify/", data).then((res) => {
        if (res.status == 200) {
          const data: CustomTokenObtain = res.data;
          setRegisterData(null);
          useCustomToast(
            "bottom-right",
            "success",
            "حساب شما با موفقیت تایید شد"
          );
          sessionStorage.setItem(
            "userToken",
            JSON.stringify({
              userToken: {
                access: data.access,
                refresh: data.refresh,
                session_id: data.session_id,
              },
            })
          );
          setTimeout(
            () =>
              (window.location.href =
                window.location.origin + "/dashboard/list"),
            2500
          );
        }
      });
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
      <Timer />
      <Input
        fullWidth
        id="verifyCode"
        name="verifyCode"
        label="کد"
        type="text"
        value={verifyCodeFormik.values.verifyCode}
        error={verifyCodeFormik.errors.verifyCode}
        onChange={verifyCodeFormik.handleChange}
        required
      />
      <Button
        text="تایید کد"
        loading={verifyCodeFormik.isSubmitting}
        onClick={() => verifyCodeFormik.submitForm()}
        disabled={!verifyCodeFormik.isValid}
        fullWidth
      />
    </motion.div>
  );
};

export default RegisterLastSetp;
