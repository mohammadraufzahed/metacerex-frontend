import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Input from "../../../Input";
import { useFormik } from "formik";
import Button from "../../Button";
import { object, string } from "yup";
import { useRecoilState, useRecoilValue } from "recoil";
import { registerAtom } from "../../../../atoms/registerAtom";
import { httpClient } from "../../../../axios";
import { CustomTokenObtain } from "../../../../types/API";
import { userToken } from "../../../../atoms/userToken";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../../../../hooks/useCustomToast";
import { useSignal } from "@preact/signals-react";
import { statusData } from "../../../../atoms/status";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { colorMode } from "../../../../signals/colorMode";
import dayjs from "dayjs";

const RegisterLastSetp: React.FC = () => {
  const [registerData, setRegisterData] = useRecoilState(registerAtom);
  const navigate = useNavigate();
  const [userTokenObject, settokenObject] = useRecoilState(userToken);
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
  const status = useRecoilValue(statusData);
  const value = useSignal(0);
  const date = useSignal(0);
  const timerString = useSignal("");
  useEffect(() => {
    if (status) {
      date.value = status.register_request_expires_in_seconds;
      setInterval(() => {
        if (date.value > 0) {
          value.value += 1;
          date.value -= 1;
          const time = (date.value / 60).toFixed(2);
          const minute = parseInt(time.toString().split(".")[0]);
          const second = parseInt(
            (parseFloat("0." + time.toString().split(".")[1]) * 60).toFixed(0)
          );
          timerString.value = `${minute >= 10 ? minute : `0${minute}`}:${
            second >= 10 ? second : `0${second}`
          }`;
        } else {
          window.location.reload();
        }
      }, 1000);
    }
  }, [status]);
  return (
    <motion.div
      className="w-full flex flex-col gap-6 items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <div style={{ maxWidth: 150 }} className="bg-pr">
        <CircularProgressbar
          minValue={0}
          maxValue={status ? status.register_request_expires_in_seconds : 100}
          value={value.value}
          text={timerString}
          styles={buildStyles({
            pathColor:
              colorMode.value == "dark"
                ? "rgb(36, 196, 249)"
                : "rgb(8, 103, 136)",
            textColor:
              colorMode.value == "dark"
                ? "rgb(36, 196, 249)"
                : "rgb(8, 103, 136)",
          })}
        />
      </div>
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
        fullWidth
      />
    </motion.div>
  );
};

export default RegisterLastSetp;
