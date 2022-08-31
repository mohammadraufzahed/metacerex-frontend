import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/AuthenticationPage/Button";

const LoginRequiredPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-auto flex flex-col items-center justify-center gap-8">
      <img src="/svgs/window.svg" />
      <span className="font-vazir font-bold text-sm text-primary-500 max-w-[205px] text-center">
        دسترسی به اطلاعات این بخش نیازمند ورود به حساب کاربری میباشد
      </span>
      <div className="flex flex-col gap-6 md:gap-5 md:flex-row">
        <Button
          text="ورود"
          className="px-16 py-2"
          onClick={() => navigate("/auth")}
        />
        <Button
          text="ثبت نام"
          outlined
          className="px-[52px] py-2"
          onClick={() => navigate("/auth")}
        />
      </div>
    </div>
  );
};

export default LoginRequiredPage;
