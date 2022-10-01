import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { setIdentity } from "../../../functions/identityForm";
import ProfileFormLayout from "../../../layouts/ProfileFormLayout";
import Button from "../../AuthenticationPage/Button";
import Input from "../../Input";
import * as yup from "yup";
import { dateReg } from "../../../regex/dateReg";
import { phoneReg } from "../../../regex/phoneReg";
import { useRecoilState } from "recoil";
import MobileAndPhoneVerifyModal from "./MobileAndPhoneVerifyModal";
import { httpClient } from "../../../axios";
import useCustomToast from "../../../hooks/useCustomToast";
import { toGregorian } from "jalaali-js";
import { useDateToString } from "../../../utils/date";
import { profile } from "../../../signals/profile";

type PropsT = {
  onUpdate: () => void;
};

const IdentityFormBox: React.FC<PropsT> = ({ onUpdate }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const mobileAndEmailFormik = useFormik({
    initialValues: {
      mobile: "",
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("ایمیل وارد شده صحیح نمیباشد.").nullable(true),
      mobile: yup
        .string()
        .matches(phoneReg, "شماره تلفن وارد شده صحیح نمیباشد.")
        .nullable(true),
    }),
    async onSubmit({ email, mobile }) {
      const data: {
        mobile?: string;
        email?: string;
      } = {};
      if (
        (profile.value && profile.value.is_email_verified != true) ||
        email != ""
      ) {
        data.email = email;
      } else if (
        (profile.value && profile.value.is_mobile_verified != true) ||
        mobile != ""
      ) {
        data.mobile = mobile;
      }
      if (data.email || data.mobile) {
        httpClient
          .post("users/profile/email-mobile/update/", data)
          .then((res) => {
            if (res.status == 200) {
              useCustomToast(
                "bottom-right",
                "success",
                `کد تایید برای ${
                  profile.value
                    ? profile.value.is_email_verified != true
                      ? "ایمیل"
                      : "تلفن"
                    : ""
                } شما ارسال شد`
              );
              setModalOpen(true);
            }
          });
      }
    },
  });
  const identityFormik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      father_name: "",
      melli_code: "",
      birth_date: "",
      postal_code: "",
      phone: "",
      address: "",
    },
    validationSchema: yup.object({
      first_name: yup
        .string()
        .required("نام وارد نشده است")
        .max(150, "نام وارد شده بیشتر از 150 کاراکتر میباشد.")
        .nullable(true),
      last_name: yup
        .string()
        .required("نام خانوادگی وارد نشده است.")
        .max(150, "نام خانوادگی وارد شده بیشتر از 150 کاراکتر میباشد.")
        .nullable(true),
      father_name: yup
        .string()
        .max(64, "نام وارد شده بیشتر از 64 کاراکتر میباشد.")
        .nullable(true),
      melli_code: yup
        .string()
        .matches(/^([0-9]){10}$/gi, "کد ملی وارد شده معتبر نمیباشد")
        .nullable(true),
      birth_date: yup
        .string()
        .matches(dateReg, "تاریخ وارد شده صحیح نمیباشد.")
        .nullable(true),
      postal_code: yup
        .string()
        .matches(/^[1-9]\d{9}$/gi, "کدپستی وارد شده صحیح نمیباشد.")
        .nullable(true),
      phone: yup
        .string()
        .required("شماره تلفن ثابت وارد نشده است.")
        .matches(
          /^0[1-9]{1}[0-9]{1}[1-9]{1}[0-9]{7}$/gi,
          "شماره تلفن وارد شده صحیح نمیباشد."
        ),
      address: yup
        .string()
        .max(500, "آدرس وارد شده بیشتر از 500 کاراکتر میباشد.")
        .nullable(true),
    }),
    async onSubmit(identity): Promise<void> {
      const date = identity.birth_date.split("-");
      const gregorianDate = toGregorian(
        parseInt(date[0]),
        parseInt(date[1]),
        parseInt(date[2])
      );
      await setIdentity({
        ...identity,
        birth_date: `${gregorianDate.gy}-${gregorianDate.gm}-${gregorianDate.gd}`,
      });
    },
  });
  useEffect(() => {
    if (profile.value) {
      identityFormik.setValues(profile.value);
      const date = useDateToString(profile.value.birth_date);
      identityFormik.setFieldValue(
        "birth_date",
        `${date.year}-${date.month_number}-${date.day}`
      );
      mobileAndEmailFormik.setValues({
        email: profile.value.email,
        mobile: profile.value.mobile,
      });
    }
  }, [profile.value]);
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
            disabled={
              profile.value ? profile.value.is_identity_verified == true : false
            }
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
            disabled={
              profile.value ? profile.value.is_identity_verified == true : false
            }
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
            disabled={
              profile.value ? profile.value.is_identity_verified == true : false
            }
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
            error={mobileAndEmailFormik.errors.mobile}
            value={mobileAndEmailFormik.values.mobile}
            onChange={mobileAndEmailFormik.handleChange}
            disabled={
              profile.value ? profile.value.is_mobile_verified == true : false
            }
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
            required
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
            error={mobileAndEmailFormik.errors.email}
            value={mobileAndEmailFormik.values.email}
            onChange={mobileAndEmailFormik.handleChange}
            disabled={
              profile.value ? profile.value.is_email_verified == true : false
            }
            type="text"
            fullWidth
            isPrimary
          />
        </div>
        <Button
          text="ذخیره"
          className="sm:mt-14 self-center sm:self-end py-4 px-16"
          onClick={() => {
            return new Promise(async (resolve) => {
              await identityFormik.submitForm();
              await mobileAndEmailFormik.submitForm();
              onUpdate();
            });
          }}
          loading={
            identityFormik.isSubmitting || mobileAndEmailFormik.isSubmitting
          }
        />
      </div>
      <MobileAndPhoneVerifyModal
        active={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </ProfileFormLayout>
  );
};

export default IdentityFormBox;
