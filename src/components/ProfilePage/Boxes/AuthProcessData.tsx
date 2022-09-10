import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UserSquare from "../../../svgs/UserSquare";
import PersonalCard from "../../../svgs/PersonalCard";
import Input from "../../Input";
import Button from "../../AuthenticationPage/Button";
import { UnorderListItem } from "../../../pages/WithdrawPage";

type PropsT = {
  onSuccess: () => void;
};

const AuthProcessData: React.FC<PropsT> = ({ onSuccess }) => {
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
        <div className="bg-secondary-500 rounded-full p-1 flex flex-row items-center justify-center">
          <UserSquare className="stroke-primary-700" />
        </div>
        <div className="w-8/12 sm:w-10/12 h-[1px] bg-neutral-300" />
        <div className="bg-secondary-500 rounded-full p-1 flex flex-row items-center justify-center">
          <PersonalCard
            className={level == 2 ? `stroke-primary-700` : `stroke-neutral-300`}
          />
        </div>
      </div>
      <div className="w-full max-w-7xl xl:mx-auto">
        <AnimatePresence mode="wait">
          {level == 1 ? (
            <FormOne onSuccess={() => setLevel(2)} />
          ) : (
            <FormTwo onSuccess={onSuccess} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

type FormOneT = {
  onSuccess: () => void;
};

const FormOne: React.FC<FormOneT> = ({ onSuccess }) => {
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
        <Input label="نام منطبق با کارت شناسایی" fullWidth />
        <Input label="نام و نام خانوادگی منطبق با کارت شناسایی" fullWidth />
        <Input
          label="کد ملی یا کد فراگیر اتباع"
          fullWidth
          className="sm:col-span-2 xl:col-span-1"
        />
      </div>
      <Button
        text="تایید و ادامه"
        className="px-10 lg:px-16"
        onClick={onSuccess}
      />
    </motion.div>
  );
};

type FormTwoT = {
  onSuccess: () => void;
};

const FormTwo: React.FC<FormTwoT> = ({ onSuccess }) => {
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
        <div className="w-full flex flex-col gap-4 items-center border-dashed border-2 border-primary-700 py-10 xl:justify-self-end max-w-[411px] xl:py-32">
          <img src="/svgs/gallery.svg" className="mb-5" />
          <motion.div
            initial={{ y: 0 }}
            whileHover={{ y: -2 }}
            whileTap={{ y: -4 }}
            transition={{ duration: 0.5, type: "spring" }}
            className=""
          >
            <input type="file" id="file" className="hidden" />
            <label
              htmlFor="file"
              className="px-10 py-2 cursor-pointer bg-primary-700 font-vazir font-normal text-base text-white rounded-lg"
            >
              بارگزاری تصویر
            </label>
          </motion.div>
          <p className="font-vazir font-light text-xs text-center text-primary-700">
            فایل انتخابی باید از نوع تصویر بوده و حجم آن کمتر از 2 مگابایت باشد
          </p>
        </div>
      </div>
      <Button
        onClick={onSuccess}
        text="تایید احراز هویت"
        className="px-10 lg:px-16 mt-10"
      />
    </motion.div>
  );
};

export default AuthProcessData;
