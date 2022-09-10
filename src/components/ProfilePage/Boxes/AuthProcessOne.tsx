import React from "react";
import { motion } from "framer-motion";
import AnimatedCopy from "../../../svgs/AnimatedCopy";
import { TiWarningOutline } from "react-icons/ti";
import { UnorderListItem } from "../../../pages/WithdrawPage";
import Button from "../../AuthenticationPage/Button";

type PropsT = {
  onStartClick: () => void;
};

const AuthProcessOne: React.FC<PropsT> = ({ onStartClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, type: "tween" }}
      className="w-full h-full py-3 px-5 flex flex-col items-center lg:px-16 lg:py-20"
    >
      <div className="flex flex-col gap-8 w-full items-center lg:flex-row-reverse">
        <img src="/svgs/verify-process-1.svg" />
        <div className="w-full flex flex-col items-start gap-10">
          <div className="w-full flex flex-col items-start gap-6">
            <span className="font-vazir font-bold text-xl">احراز هویت</span>
            <span className="font-vazir font-normal text-base">
              احراز هویت علاوه بر افزایش امنیت حساب کاربری شما، برای انجام
              هرگونه عملیات مالی لازم است. برای احراز خویش کافیست اطلاعات هویتی
              مورد نیاز خود را طی 2 مرحله وارد کنید.
            </span>
          </div>
          <div className="w-full flex flex-col items-start gap-6">
            <span className="font-vazir font-bold text-base">
              مراحل انجام احراز هویت
            </span>
            <div className="flex flex-row gap-4 items-center">
              <img src="/svgs/copy-alone.svg" />
              <span className="font-vazir font-normal text-base">
                مرحله اول : وارد کردن اطلاعات هویتی و بانکی
              </span>
            </div>
            <div className="flex flex-row gap-4 items-start">
              <AnimatedCopy copied={0} />
              <span className="font-vazir font-normal text-base">
                مرحله دوم : بارگذاری تصویر سلفی خود با کارت ملی، کارت بانکی و
                متن احراز هویت
              </span>
            </div>
            <div className="flex flex-row gap-4 items-start mt-7">
              <TiWarningOutline className="text-2xl" />
              <span className="font-vazir font-normal text-base">
                با توجه به اهمیت کیفیت و دقت عکس ها، ترجیحا عکس‌ها توسط فرد دیگر
                و با دوربین اصلی موبایل گرفته شود.
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-6">
            <span className="font-vazir font-bold text-base">
              چه مدارکی برای احراز هویت لازم است؟
            </span>
            <span className="font-vazir font-normal text-base">
              برای تسریع در فرآیند احراز هویت، بهتر است مدارک ذیل را قبل از شروع
              پروسه آماده کنید:
            </span>
            <div className="flex flex-col gap-2.5">
              <UnorderListItem text="کارت ملی / کارت اقامت" />
              <UnorderListItem text="کارت بانکی به اسم شما" />
              <UnorderListItem text="کاغذ و قلم" />
            </div>
          </div>
        </div>
      </div>
      <Button
        text="شروع فرایند احراز هویت"
        className="px-10 mt-10 justify-self-center lg:px-16 lg:justify-self-end"
        onClick={onStartClick}
      />
    </motion.div>
  );
};

export default AuthProcessOne;
