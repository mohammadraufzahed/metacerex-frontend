import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import React, { lazy, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userProfile } from "../atoms/userProfile";
import { userToken } from "../atoms/userToken";
import MenuItem from "../components/AuthenticationPage/MenuItem";
import { getIdentity } from "../functions/identityForm";
import LoginRequiredPage from "./LoginRequiredPage";

const PersonalInformationForm = lazy(
  () => import("../components/ProfilePage/forms/PersonalInformationForm")
);

const ProfilePage: React.FC = () => {
  // States
  const [currentTab, setCurrentTab] = useState<
    "personalInformation" | "bankInformation" | "securityInformation"
  >("personalInformation");
  const userTokenObject = useRecoilValue(userToken);
  const [userProfileD, setUserProfile] = useRecoilState(userProfile);
  // Authentication check
  if (!userTokenObject) return <LoginRequiredPage />;
  // Queries
  const identityData = useQuery(["identityDataFetcher"], getIdentity);
  // Effects
  useEffect(() => {
    if (identityData.data) {
      setUserProfile(identityData.data);
    }
  }, [identityData.data]);
  return (
    <div className="flex-auto flex flex-col px-4 py-10 lg:px-8">
      <div className="w-full grid grid-cols-3 lg:grid-cols-5">
        <MenuItem
          text="اطلاعات هویتی"
          onClick={() =>
            currentTab != "personalInformation"
              ? setCurrentTab("personalInformation")
              : null
          }
          active={currentTab === "personalInformation"}
        />
        <MenuItem
          text="حساب بانکی"
          onClick={() =>
            currentTab != "bankInformation"
              ? setCurrentTab("bankInformation")
              : null
          }
          active={currentTab === "bankInformation"}
        />
        <MenuItem
          text="امنیت"
          onClick={() => {
            currentTab != "securityInformation"
              ? setCurrentTab("securityInformation")
              : null;
          }}
          active={currentTab === "securityInformation"}
        />
        <MenuItem text="" onClick={() => {}} active={false} only="desktop" />
        <MenuItem text="" onClick={() => {}} active={false} only="desktop" />
      </div>
      <AnimatePresence exitBeforeEnter>
        {currentTab == "personalInformation" ? (
          <PersonalInformationForm />
        ) : currentTab == "bankInformation" ? null : currentTab ==
          "securityInformation" ? null : null}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;