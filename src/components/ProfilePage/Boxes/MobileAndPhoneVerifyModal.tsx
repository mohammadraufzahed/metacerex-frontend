import { useFormik } from "formik";
import React from "react";
import { HiX } from "react-icons/hi";
import Modal from "react-modal";
import { useRecoilValue } from "recoil";
import * as yup from "yup";
import { userProfile } from "../../../atoms/userProfile";
import { httpClient } from "../../../axios";
import useCustomToast from "../../../hooks/useCustomToast";
import Button from "../../AuthenticationPage/Button";
import Input from "../../Input";

Modal.setAppElement("#root");

type PropsT = {
  active: boolean;
  onClose: () => void;
};

const MobileAndPhoneVerifyModal: React.FC<PropsT> = ({ active, onClose }) => {
  const profile = useRecoilValue(userProfile);
  const form = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: yup.object({
      code: yup
        .string()
        .required("کد وارد نشده است.")
        .matches(/^[0-9]{6}$/gi, "کد وارد شده صحیح نمیباشد."),
    }),
    async onSubmit({ code }) {
      return await httpClient
        .put("users/profile/email-mobile/update/verify/", {
          code,
        })
        .then((res) => {
          if (res.status == 200) {
            useCustomToast(
              "bottom-right",
              "success",
              profile
                ? profile.is_email_verified !== true
                  ? "ایمیل شما با موفقیت تایید شد"
                  : "تلفن همراه شما با موفقیت تایید شد"
                : ""
            );
            onClose();
          }
        });
    },
  });
  return (
    <Modal
      isOpen={active}
      onRequestClose={onClose}
      className="mx-auto  mt-[4.666667%] max-w-2xl w-11/12 h-max gap-4 bg-neutral-100 rounded-2xl shadow-xl flex flex-col items-center py-5 px-4"
    >
      <div className="w-full h-full" onClick={onClose}>
        <HiX className="text-3xl transition-all duration-300 text-neutral-400 hover:text-neutral-500 focus:text-neutral-500 cursor-pointer" />
      </div>
      <div className="w-full justify-self-center">
        <h1 className="font-vazir font-bold text-2xl text-primary-700">
          {profile
            ? profile.is_email_verified != true
              ? "تایید ایمیل"
              : "تایید شماره همراه"
            : ""}
        </h1>
        <div className="w-full flex flex-col gap-4 mt-2 items-center">
          <Input
            id="code"
            name="code"
            label=""
            onChange={form.handleChange}
            value={form.values.code}
            error={form.errors.code}
            type="text"
            className="w-full"
            isPrimary
          />
          <Button
            text="تایید"
            fullWidth
            className=""
            onClick={form.submitForm}
            loading={form.isSubmitting}
          />
        </div>
      </div>
    </Modal>
  );
};

export default MobileAndPhoneVerifyModal;
