import React, { useEffect } from "react";
import IdentityFormBox from "../Boxes/IdentityFormBox";
import InformationAuthStatusBox from "../Boxes/InformationAuthStatusBox";
import PasswordChangeFormBox from "../Boxes/PasswordChangeFormBox";
import ReferralCodeBox from "../Boxes/ReferralCodeBox";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { useQueryClient } from "@tanstack/react-query";

const PersonalInformationForm: React.FC = () => {
  const queryClient = useQueryClient();
  return (
    <>
      <Helmet>
        <title>صرافی - اطلاعات شخصی</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full py-2 lg:py-8 flex flex-col gap-6 lg:gap-8"
      >
        <InformationAuthStatusBox />
        <IdentityFormBox
          onUpdate={() => queryClient.refetchQueries(["identityDataFetcher"])}
        />
        <PasswordChangeFormBox />
        <ReferralCodeBox />
      </motion.div>
    </>
  );
};

export default PersonalInformationForm;
