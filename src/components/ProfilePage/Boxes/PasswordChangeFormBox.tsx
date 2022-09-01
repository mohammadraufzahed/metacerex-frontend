import { useFormik } from "formik";
import React from "react";
import ProfileFormLayout from "../../../layouts/ProfileFormLayout";
import Button from "../../AuthenticationPage/Button";
import Input from "../../AuthenticationPage/Input";
import * as yup from "yup";
import { passwordReg } from "../../../regex/passwordReg";
import { httpClient } from "../../../axios";
import useCustomToast from "../../../hooks/useCustomToast";

const PasswordChangeFormBox: React.FC = () => {
  const passwordChangeFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: yup.object({
      currentPassword: yup.string().required("گذرواژه وارد نشده است."),
      newPassword: yup
        .string()
        .required("گذرواژه جدید وارد نشده است.")
        .matches(
          passwordReg,
          `گذرواژه میبایست ترکیبی از حروف و اعداد انگلیسی و کارکترهای خاص
مانند @ # $ % & * باشد`
        ),
      confirmNewPassword: yup
        .string()
        .oneOf(
          [yup.ref("newPassword"), null],
          "تکرار گذرواژه با گذرواژه جدید مغایرت دارد."
        ),
    }),
    async onSubmit({ currentPassword, newPassword, confirmNewPassword }) {
      return await httpClient
        .post("users/password/set/", {
          current_password: currentPassword,
          password1: newPassword,
          password2: confirmNewPassword,
        })
        .then((res) =>
          res.status == 200
            ? useCustomToast(
                "bottom-right",
                "success",
                "تغیر گذرواژه با موفقیت انجام شد."
              )
            : null
        );
    },
  });
  return (
    <ProfileFormLayout title="تغیر گذرواژه">
      <div className="flex flex-col gap-7 md:gap-14">
        <div className="grid grid-cols gap-y-6 gap-x-10 sm:grid-cols-2 md:grid-cols-3">
          <Input
            label="گذرواژه قبلی"
            id="currentPassword"
            name="currentPassword"
            type="password"
            error={passwordChangeFormik.errors.currentPassword}
            value={passwordChangeFormik.values.currentPassword}
            isPrimary
            fullWidth
            onChange={passwordChangeFormik.handleChange}
            required
          />
          <Input
            label="گذرواژه جدید"
            id="newPassword"
            name="newPassword"
            type="password"
            error={passwordChangeFormik.errors.newPassword}
            value={passwordChangeFormik.values.newPassword}
            isPrimary
            fullWidth
            onChange={passwordChangeFormik.handleChange}
            required
          />
          <Input
            label="تکرار گذرواژه جدید"
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            error={passwordChangeFormik.errors.confirmNewPassword}
            value={passwordChangeFormik.values.confirmNewPassword}
            isPrimary
            fullWidth
            className="sm:col-span-2 md:col-span-1"
            onChange={passwordChangeFormik.handleChange}
            required
          />
        </div>
        <Button
          text="ذخیره"
          className="sm:mt-14 self-center sm:self-end py-4 px-16"
          onClick={passwordChangeFormik.submitForm}
          loading={passwordChangeFormik.isSubmitting}
        />
      </div>
    </ProfileFormLayout>
  );
};

export default PasswordChangeFormBox;
