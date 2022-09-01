import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { getIdentity, setIdentity } from "../../../functions/identityForm";
import ProfileFormLayout from "../../../layouts/ProfileFormLayout";
import Button from "../../AuthenticationPage/Button";
import Input from "../../AuthenticationPage/Input";
import * as yup from "yup";
import { dateReg } from "../../../regex/dateReg";
import { phoneReg } from "../../../regex/phoneReg";

const IdentityFormBox = () => {
  const identityData = useQuery(["identityDataFetcher"], getIdentity);
  const identityFormik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      father_name: "",
      melli_code: "",
      birth_date: "",
      postal_code: "",
      mobile: "",
      phone: "",
      address: "",
      email: "",
    },
    validationSchema: yup.object({
      first_name: yup
        .string()
        .required("نام وارد نشده است")
        .max(150, "نام وارد شده بیشتر از 150 کاراکتر میباشد."),
      last_name: yup
        .string()
        .required("نام خانوادگی وارد نشده است.")
        .max(150, "نام خانوادگی وارد شده بیشتر از 150 کاراکتر میباشد."),
      father_name: yup
        .string()
        .max(64, "نام وارد شده بیشتر از 64 کاراکتر میباشد."),
      melli_code: yup
        .string()
        .matches(/^([0-9]){10}$/gi, "کد ملی وارد شده معتبر نمیباشد"),
      birth_date: yup.string().matches(dateReg, "تاریخ وارد شده صحیح نمیباشد."),
      postal_code: yup
        .string()
        .matches(/^[1-9]\d{9}$/gi, "کدپستی وارد شده صحیح نمیباشد."),
      mobile: yup
        .string()
        .matches(phoneReg, "شماره تلفن وارد شده صحیح نمیباشد."),
      phone: yup
        .string()
        .required("شماره تلفن ثابت وارد نشده است.")
        .matches(
          /^0[1-9]{1}[0-9]{1}[1-9]{1}[0-9]{7}$/gi,
          "شماره تلفن وارد شده صحیح نمیباشد."
        ),
      address: yup
        .string()
        .max(500, "آدرس وارد شده بیشتر از 500 کاراکتر میباشد."),
      email: yup.string().email("ایمیل وارد شده صحیح نمیباشد."),
    }),
    async onSubmit(identity): Promise<void> {
      await setIdentity(identity);
    },
  });
  useEffect(() => {
    if (identityData.data) {
      identityFormik.setValues(identityData.data);
    }
  }, [identityData.data]);
  return (
    <ProfileFormLayout title="اطلاعات هویتی">
      <div className="w-full h-full flex flex-col gap-6 sm:gap-10">
        <div className="w-full grid gap-y-6 grid-cols-1 sm:gap-y-10 sm:grid-cols-2 sm:gap-x-8 md:grid-cols-3 lg:grid-cols-4">
          <Input
            label="نام"
            id="first_name"
            name="first_name"
            error={identityFormik.errors.first_name}
            value={identityFormik.values.first_name}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
            required
          />
          <Input
            label="نام خانوادگی"
            id="last_name"
            name="last_name"
            error={identityFormik.errors.last_name}
            value={identityFormik.values.last_name}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
            required
          />
          <Input
            label="نام پدر"
            id="father_name"
            name="father_name"
            error={identityFormik.errors.father_name}
            value={identityFormik.values.father_name}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="کد ملی"
            id="melli_code"
            name="melli_code"
            error={identityFormik.errors.melli_code}
            value={identityFormik.values.melli_code}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="تاریخ تولد"
            id="birth_date"
            name="birth_date"
            error={identityFormik.errors.birth_date}
            value={identityFormik.values.birth_date}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="کد پستی"
            id="postal_code"
            name="postal_code"
            error={identityFormik.errors.postal_code}
            value={identityFormik.values.postal_code}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="شماره موبایل"
            id="mobile"
            name="mobile"
            error={identityFormik.errors.mobile}
            value={identityFormik.values.mobile}
            onChange={identityFormik.handleChange}
            type="text"
            fullWidth
            isPrimary
          />
          <Input
            label="شماره ثابت"
            id="phone"
            name="phone"
            error={identityFormik.errors.phone}
            value={identityFormik.values.phone}
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
          onClick={identityFormik.submitForm}
          loading={identityFormik.isSubmitting}
        />
      </div>
    </ProfileFormLayout>
  );
};

export default IdentityFormBox;
