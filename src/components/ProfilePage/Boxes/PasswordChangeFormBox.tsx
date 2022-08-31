import { useFormik } from "formik";
import React from "react";
import ProfileFormLayout from "../../../layouts/ProfileFormLayout";
import Button from "../../AuthenticationPage/Button";
import Input from "../../AuthenticationPage/Input";

const PasswordChangeFormBox: React.FC = () => {
  const passwordChangeFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    async onSubmit() {},
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
          />
        </div>
        <Button
          text="ذخیره"
          className="sm:mt-14 self-center sm:self-end py-4 px-16"
        />
      </div>
    </ProfileFormLayout>
  );
};

export default PasswordChangeFormBox;
