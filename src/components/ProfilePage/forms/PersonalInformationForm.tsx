import React, { useEffect } from "react";
import IdentityFormBox from "../Boxes/IdentityFormBox";
import InformationAuthStatusBox from "../Boxes/InformationAuthStatusBox";
import PasswordChangeFormBox from "../Boxes/PasswordChangeFormBox";
import ReferralCodeBox from "../Boxes/ReferralCodeBox";
import { motion } from "framer-motion";
import { getIdentity } from "../../../functions/identityForm";
import { useQuery } from "@tanstack/react-query";
import { userProfile } from "../../../atoms/userProfile";
import { useRecoilState } from "recoil";
import { Helmet } from "react-helmet";

const PersonalInformationForm: React.FC = () => {
  // States
  const [userProfileD, setUserProfile] = useRecoilState(userProfile);
  // Queries
  const identityData = useQuery(["identityDataFetcher"], getIdentity, {
    networkMode: "offlineFirst",
  });
  // Effects
  useEffect(() => {
    if (identityData.data) {
      setUserProfile(identityData.data);
    }
  }, [identityData.data]);
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
        <IdentityFormBox />
        <PasswordChangeFormBox />
        <ReferralCodeBox />
      </motion.div>
    </>
  );
};

export default PersonalInformationForm;
