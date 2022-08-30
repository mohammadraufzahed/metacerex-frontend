import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../../Input";
import { useFormik } from "formik";
import Button from "../../Button";
import { object, string } from "yup";
import { useRecoilState } from "recoil";
import { registerAtom } from "../../../../atoms/registerAtom";
import { httpClient } from "../../../../axios";
import { CustomTokenObtain } from "../../../../types/API";
import { user } from "../../../../atoms/user";
import { useNavigate } from "react-router-dom";

const RegisterLastSetp: React.FC = () => {
  const [status, setStatus] = useState<null | "faild">(null);
  const [registerData, setRegisterData] = useRecoilState(registerAtom);
  const navigate = useNavigate();
  const [userD, setUserD] = useRecoilState(user);
  const verifyCodeFormik = useFormik({
    initialValues: {
      verifyCode: "",
    },
    validationSchema: object({
      verifyCode: string()
        .required("کد تایید وارد نشده است.")
        .matches(/^[0-9]{6}$/gi, "کد وارد شده صحیح نمیباشد."),
    }),
    async onSubmit({ verifyCode }) {
      const data = {
        uuid: registerData?.uuid,
        response: verifyCode,
      };
      await httpClient
        .post("users/register/verify/", data)
        .then((res) => {
          if (res.status == 200) {
            const data: CustomTokenObtain = res.data;
            setUserD(data);
            setRegisterData(null);
            setTimeout(
              () => navigate("/dashboard/list", { replace: true }),
              5000
            );
          }
        })
        .catch(() => {
          setStatus("faild");
          setTimeout(() => setStatus(null), 5000);
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
      <AnimatePresence exitBeforeEnter>
        {status == "faild" ? (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 70 }}
            exit={{ height: 0 }}
            className="bg-error rounded-lg w-full flex items-center justify-center font-bold text-xl font-vazir text-shades-0"
          >
            کد وارد شده صحیح نمیباشد.
          </motion.div>
        ) : null}
      </AnimatePresence>
      <Input
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
      />
    </motion.div>
  );
};

export default RegisterLastSetp;
