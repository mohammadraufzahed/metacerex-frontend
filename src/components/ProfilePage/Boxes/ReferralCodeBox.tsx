import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userProfile } from "../../../atoms/userProfile";
import ProfileFormLayout from "../../../layouts/ProfileFormLayout";
import AnimatedCopy from "../../../svgs/AnimatedCopy";
import Input from "../../Input";

const ReferralCodeBox: React.FC = () => {
  const userProfileD = useRecoilValue(userProfile);
  const [copy, setCopy] = useState<boolean>(false);
  return (
    <ProfileFormLayout title="کد معرف">
      <div className="flex flex-col items-center justify-center md:flex-row-reverse md:justify-between md:items-center">
        <img src="/svgs/maskMan.svg" alt="مردی با ماسک" />
        <div className="flex flex-row items-center justify-center">
          <Input
            label="کد معرف اختصاصی شما"
            isPrimary
            id=""
            value={userProfileD?.referral_code ?? ""}
            name=""
            onChange={() => {}}
            type="text"
            error=""
            disabled
            className="h-max"
          />
          <button className="bg-primary-700 px-5 py-2 mt-7 -mr-1 w-max h-max rounded-l-md">
            <AnimatedCopy
              copied={copy ? 1 : 0}
              className="stroke-white"
              onClick={() => {
                navigator.clipboard.writeText(
                  userProfileD?.referral_code ?? ""
                );
                setCopy((copy) => !copy);
                setTimeout(() => setCopy((copy) => !copy), 2000);
              }}
            />
          </button>
        </div>
      </div>
    </ProfileFormLayout>
  );
};

export default ReferralCodeBox;
