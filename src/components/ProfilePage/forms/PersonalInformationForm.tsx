import React from "react";
import IdentityFormBox from "../Boxes/IdentityFormBox";
import InformationAuthStatusBox from "../Boxes/InformationAuthStatusBox";
import PasswordChangeFormBox from "../Boxes/PasswordChangeFormBox";
import ReferralCodeBox from "../Boxes/ReferralCodeBox";

const PersonalInformationForm: React.FC = () => {
  return (
    <div className="w-full py-2 lg:py-8 flex flex-col gap-6 lg:gap-8">
      <InformationAuthStatusBox />
      <IdentityFormBox />
      <PasswordChangeFormBox />
      <ReferralCodeBox />
    </div>
  );
};

export default PersonalInformationForm;
