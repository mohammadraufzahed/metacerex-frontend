import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UserSquare from "../../../svgs/UserSquare";
import PersonalCard from "../../../svgs/PersonalCard";
import Input from "../../Input";
import Button from "../../AuthenticationPage/Button";
import { UnorderListItem } from "../../../pages/WithdrawPage";
import { useFormik } from "formik";
import * as yup from "yup";
import { httpClient } from "../../../axios";
import useCustomToast from "../../../hooks/useCustomToast";
import { colorMode } from "../../../signals/colorMode";

type PropsT = {
  onSuccess: () => void;
};

const AuthProcessData: React.FC<PropsT> = ({ onSuccess }) => {
  // States
  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      melli_code: "",
      file: "",
    },
    async onSubmit({ file, firstName, lastName, melli_code }): Promise<void> {
      return await httpClient
        .put("users/verify/identity/", null, {
          params: {
            melli_code,
            first_name: firstName,
            lastName: lastName,
            verify_photo: file,
          },
          headers: {
            "Content-Type": "application/x-www-from-urlencoded",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            useCustomToast(
              "bottom-right",
              "success",
              "درخواست شما با موفقیت ثبت شد"
            );
          }
        });
    },
  });
  // States
  const [level, setLevel] = useState<1 | 2>(1);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, type: "tween" }}
      className="w-full flex flex-col items-center px-3 gap-8 lg:gap-16 lg:px-16"
    >
      <div className="w-full flex max-w-[500px] flex-row justify-between items-center">
        <div className="bg-secondary-500 dark:bg-secondary-700 rounded-full p-1 flex flex-row items-center justify-center">
          <UserSquare className="stroke-primary-700 dark:stroke-primary-500" />
        </div>
        <div className="w-8/12 sm:w-10/12 h-[1px] bg-neutral-300" />
        <div className="bg-secondary-500 dark:bg-secondary-700 rounded-full p-1 flex flex-row items-center justify-center">
          <PersonalCard
            className={
              level == 2
                ? `stroke-primary-700 dark:stroke-primary-500`
                : `stroke-neutral-300 dark:stroke-neutral-600`
            }
          />
        </div>
      </div>
      <div className="w-full max-w-7xl xl:mx-auto text-neutral-900 dark:text-neutral-50">
        <AnimatePresence mode="wait">
          {level == 1 ? (
            <FormOne
              onSuccess={(firstName, lastName, melli_code) => {
                setLevel(2);
                form.setFieldValue("firstName", firstName);
                form.setFieldValue("lastName", lastName);
                form.setFieldValue("melli_code", melli_code);
              }}
            />
          ) : (
            <FormTwo
              onSuccess={(file: string) => {
                return new Promise(async (resolve) => {
                  form.setFieldValue("file", file);
                  await form.submitForm().then(() => {
                    onSuccess();
                    resolve("");
                  });
                });
              }}
              loading={form.isSubmitting}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

type FormOneT = {
  onSuccess: (firstName: string, lastName: string, melli_code: string) => void;
};

const FormOne: React.FC<FormOneT> = ({ onSuccess }) => {
  // States
  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      melli_code: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("نام وارد نشده است."),
      lastName: yup.string().required("نام خانوادگی وارد نشده است."),
      melli_code: yup
        .string()
        .required("کد ملی وارد نشده است")
        .matches(/^([0-9]){10}$/gi, "کد ملی وارد شده معتبر نمیباشد"),
    }),
    async onSubmit({ firstName, lastName, melli_code }) {
      onSuccess(firstName, lastName, melli_code);
    },
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, type: "tween" }}
      className="w-full items-center flex flex-col gap-6"
    >
      <span className="font-vazir font-bold text-lg lg:text-xl">مرحله اول</span>
      <p className="font-vazir font-normal text-xs lg:text-base text-center">
        کد ملی یا کد فراگیر اتباع را به همراه نام و نام خانوادگی منطبق با کارت
        شناسایی و اطلاعات کارت بانکی خود را را وارد کنید.
      </p>
      <div className="w-full grid grid-cols-1 mt-4 gap-10 sm:grid-cols-2 xl:grid-cols-3">
        <Input
          id="firstName"
          name="firstName"
          type="text"
          onChange={form.handleChange}
          value={form.values.firstName}
          error={form.errors.firstName}
          label="نام منطبق با کارت شناسایی"
          fullWidth
        />
        <Input
          id="lastName"
          name="lastName"
          type="text"
          onChange={form.handleChange}
          value={form.values.lastName}
          error={form.errors.lastName}
          label="نام و نام خانوادگی منطبق با کارت شناسایی"
          fullWidth
        />
        <Input
          id="melli_code"
          name="melli_code"
          type="text"
          onChange={form.handleChange}
          value={form.values.melli_code}
          error={form.errors.melli_code}
          label="کد ملی یا کد فراگیر اتباع"
          fullWidth
          className="sm:col-span-2 xl:col-span-1"
        />
      </div>
      <Button
        text="تایید و ادامه"
        className="px-10 lg:px-16"
        onClick={form.submitForm}
      />
    </motion.div>
  );
};

type FormTwoT = {
  onSuccess: (file: string) => void;
  loading?: boolean;
};

const FormTwo: React.FC<FormTwoT> = ({ onSuccess, loading }) => {
  const form = useFormik({
    initialValues: {
      file: "",
    },
    validationSchema: yup.object({
      file: yup.mixed().required("عکس انتخاب نشده است."),
    }),
    onSubmit({ file }) {
      onSuccess(file);
    },
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, type: "tween" }}
      className="w-full flex flex-col justify-center px-2 py-3 items-center gap-6"
    >
      <span className="font-vazir font-bold text-lg lg:text-xl">مرحله دوم</span>
      <p className="font-vazir font-normal text-xs lg:text-base text-center">
        لطفا متن احراز هویت را بر روی کاغذ نوشته و مطابق عکس نمونه به همراه کارت
        شناسایی و کارت بانکی که اطلاعات آن را در قسمت قبل وارد کردید عکس بگیرید
        و بارگذاری نمایید
      </p>
      <div className="flex flex-col items-center justify-center gap-10 xl:flex-row xl:justify-between w-full">
        <div className="flex flex-col gap-11 max-w-screen-sm">
          <div className="w-full flex justify-center gap-5 items-center flex-col lg:flex-row lg:gap-20">
            <img className="w-[180px]" src="/images/validation_man.png" />
            <div className="flex flex-col gap-2">
              <span className="font-vazir font-bold text-base">
                نمونه مورد تایید
              </span>
              <div className="flex flex-col gap-1">
                <UnorderListItem text="نمونه مورد تایید" />
                <UnorderListItem text="تمام رخ با نور کافی" />
                <UnorderListItem text="بدون عینک" />
                <UnorderListItem text="نوشته های کارت واضح و خوانا" />
                <UnorderListItem
                  text="عکس با دوربین اصلی و توسط فرد دیگری
گرفته شود تا نوشته ها برعکس نشود"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="font-vazir font-bold text-base">
              متن احراز هویت
            </span>
            <p className="font-vazir font-normal text-base text-justify">
              اینجانب .......... قصد معامله با شرکت الف را دارم و مدارک لازم جهت
              احراز هویت در این سایت ارسال گردیده است. ضمنا متعهد میشوم که حساب
              بنده تحت اختیار خودم میباشد و حساب به شخصی اجاره داده نشده است و
              خرید را برای خودم انجام میدهم (امضای شما)
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 items-center border-dashed border-2 border-primary-700 dark:border-primary-500 py-10 xl:justify-self-end max-w-[411px] xl:py-32">
          <img src={`/svgs/gallery-${colorMode.value}.svg`} className="mb-5" />
          <motion.div
            initial={{ y: 0 }}
            whileHover={{ y: -2 }}
            whileTap={{ y: -4 }}
            transition={{ duration: 0.5, type: "spring" }}
            className=""
          >
            <input
              accept="image/png, image/gif, image/jpeg"
              type="file"
              id="file"
              onChange={form.handleChange}
              value={form.values.file}
              className="hidden"
            />
            <label
              htmlFor="file"
              className="px-10 py-2 cursor-pointer bg-primary-700 stroke-pr dark:bg-primary-500 font-vazir font-normal text-base text-neutral-50 dark:text-neutral-900 rounded-lg"
            >
              بارگزاری تصویر
            </label>
          </motion.div>
          <p className="font-vazir font-light text-xs text-center text-primary-700 dark:text-primary-500">
            فایل انتخابی باید از نوع تصویر بوده و حجم آن کمتر از 2 مگابایت باشد
          </p>
        </div>
      </div>
      <motion.span
        variants={{
          hide: {
            opacity: 0,
          },
          show: {
            opacity: 1,
          },
        }}
        initial="hide"
        animate={form.errors.file ? "show" : "hide"}
        className="font-vazir text-base text-error"
      >
        لطفا عکس خود را انتخاب کنید!
      </motion.span>
      <Button
        onClick={form.submitForm}
        loading={loading}
        text="تایید احراز هویت"
        className="px-10 lg:px-16 mt-10"
      />
    </motion.div>
  );
};

export default AuthProcessData;
