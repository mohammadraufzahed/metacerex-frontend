import React from "react";
import IdentityFormBox from "../Boxes/IdentityFormBox";
import InformationAuthStatusBox from "../Boxes/InformationAuthStatusBox";
import PasswordChangeFormBox from "../Boxes/PasswordChangeFormBox";
import ReferralCodeBox from "../Boxes/ReferralCodeBox";
import { motion } from "framer-motion";

const PersonalInformationForm: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full py-2 lg:py-8 flex flex-col gap-6 lg:gap-8"
    >
      <InformationAuthStatusBox />
      <IdentityFormBox />
      <PasswordChangeFormBox />
      <ReferralCodeBox />
    </motion.div>
  );
};

export default PersonalInformationForm;
