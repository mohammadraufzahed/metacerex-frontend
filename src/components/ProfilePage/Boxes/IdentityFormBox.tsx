import { useFormik } from "formik";
import React from "react";
import ProfileFormLayout from "../../../layouts/ProfileFormLayout";
import Button from "../../AuthenticationPage/Button";
import Input from "../../AuthenticationPage/Input";

const IdentityFormBox = () => {
  const identityFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      fatherName: "",
      nationalCode: "",
      birthdate: "",
      postalCode: "",
      phone: "",
      homePhone: "",
      address: "",
      email: "",
    },
    async onSubmit() {},
  });
  return (
    <ProfileFormLayout title="اطلاعات هویتی">
      <div className="w-full h-full flex flex-col gap-6 sm:gap-10">
        <div className="w-full grid gap-y-6 grid-cols-1 sm:gap-y-10 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-4">
          <Input
            label="نام"
            id="firstName"
            name="firstName"
            error={identityFormik.errors.firstName}
            value={identityFormik.values.firstName}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="نام خانوادگی"
            id="lastName"
            name="lastName"
            error={identityFormik.errors.lastName}
            value={identityFormik.values.lastName}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="نام پدر"
            id="fatherName"
            name="fatherName"
            error={identityFormik.errors.fatherName}
            value={identityFormik.values.fatherName}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="کد ملی"
            id="nationalCode"
            name="nationalCode"
            error={identityFormik.errors.nationalCode}
            value={identityFormik.values.nationalCode}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="تاریخ تولد"
            id="birthdate"
            name="birthdate"
            error={identityFormik.errors.birthdate}
            value={identityFormik.values.birthdate}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="کد پستی"
            id="postalCode"
            name="postalCode"
            error={identityFormik.errors.postalCode}
            value={identityFormik.values.postalCode}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="شماره موبایل"
            id="phone"
            name="phone"
            error={identityFormik.errors.phone}
            value={identityFormik.values.phone}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="شماره ثابت"
            id="homePhone"
            name="homePhone"
            error={identityFormik.errors.homePhone}
            value={identityFormik.values.homePhone}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
        </div>
        <div className="flex flex-col gap-6 md:gap-10 md:flex-row">
          <Input
            label="آدرس"
            id="address"
            name="address"
            error={identityFormik.errors.address}
            value={identityFormik.values.address}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="‌ایمیل"
            id="email"
            name="email"
            error={identityFormik.errors.email}
            value={identityFormik.values.email}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
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

export default IdentityFormBox;
