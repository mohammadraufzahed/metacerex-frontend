import React from "react";
import ProfileDelete from "../../svgs/ProfileDelete";
import Button from "../AuthenticationPage/Button";
import { AiOutlineUserDelete } from "react-icons/ai";

const InformationAuthStatusBox: React.FC = () => {
  return (
    <div className="font-vazir bg-neutral-50 rounded-2xl flex flex-col items-center justify-center gap-10 py-3 lg:flex-row lg:justify-between lg:px-8 lg:py-6">
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-9">
        <ProfileDelete className="stroke-error text-2xl scale-125" />
        <div className="font-bold flex flex-row gap-2 text-sm">
          <span>وضعیت احراز هویت:</span>
          <span>انجام نشده</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 lg:flex-row-reverse lg:gap-14">
        <Button text="احراز هویت" className="px-12 py-3" />
        <span className="font-normal text-sm text-primary-700">
          آموزش احراز هویت
        </span>
      </div>
    </div>
  );
};

export default InformationAuthStatusBox;
