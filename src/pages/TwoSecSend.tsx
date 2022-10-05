import { useFormik } from "formik";
import React from "react";
import { httpClient } from "../axios";
import Button from "../components/AuthenticationPage/Button";
import Input from "../components/Input";

type PropsT = {
  onSuccess: () => void;
};

const TwoSecSend: React.FC<PropsT> = ({ onSuccess }) => {
  const form = useFormik({
    initialValues: {
      otp: "",
    },
    async onSubmit({ otp }) {
      await httpClient
        .post("users/totp/send/", {
          otp,
        })
        .then((res) => {
          if (res.status == 200) {
            onSuccess();
          }
        });
    },
  });
  return (
    <div className="font-vazir w-screen h-screen bg-background-100">
      <div className="w-full h-full max-w-sm mx-auto px-6 flex flex-col items-center justify-center ">
        <h1 className="text-base">لطفا کد دو عاملی خود را وارد کنید.</h1>
        <Input
          id="otp"
          name="otp"
          label=""
          type="text"
          onChange={form.handleChange}
          value={form.values.otp}
          error={form.errors.otp}
          fullWidth
        />
        <Button
          text="تایید"
          loading={form.isSubmitting}
          onClick={form.submitForm}
          fullWidth
          className="mt-3"
        />
      </div>
    </div>
  );
};

export default TwoSecSend;
