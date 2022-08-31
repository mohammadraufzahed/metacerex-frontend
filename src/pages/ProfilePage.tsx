import React, { lazy, useState } from "react";
import MenuItem from "../components/AuthenticationPage/MenuItem";

const PersonalInformationForm = lazy(
  () => import("../components/ProfilePage/forms/PersonalInformationForm")
);

const ProfilePage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<
    "personalInformation" | "bankInformation" | "securityInformation"
  >("personalInformation");
  return (
    <div className="flex-auto flex flex-col px-4 py-10 ">
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
      {currentTab == "personalInformation" ? (
        <PersonalInformationForm />
      ) : currentTab == "bankInformation" ? null : currentTab ==
        "securityInformation" ? null : null}
    </div>
  );
};

export default ProfilePage;
