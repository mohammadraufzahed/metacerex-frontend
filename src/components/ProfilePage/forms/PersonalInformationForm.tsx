import React from "react";
import IdentityFormBox from "../Boxes/IdentityFormBox";
import InformationAuthStatusBox from "../Boxes/InformationAuthStatusBox";

const PersonalInformationForm = () => {
  return (
    <div className="w-full py-2 lg:py-8 flex flex-col gap-6 lg:gap-8">
      <InformationAuthStatusBox />
      <IdentityFormBox />
    </div>
  );
};

export default PersonalInformationForm;
