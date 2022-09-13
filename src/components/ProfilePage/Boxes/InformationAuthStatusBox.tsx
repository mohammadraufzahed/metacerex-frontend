import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userProfile } from "../../../atoms/userProfile";
import ProfileDelete from "../../../svgs/ProfileDelete";
import Button from "../../AuthenticationPage/Button";
import { AnimatePresence, motion } from "framer-motion";
import AuthProcessOne from "./AuthProcessOne";
import AuthProcessData from "./AuthProcessData";

const InformationAuthStatusBox: React.FC = () => {
  // States
  const [currentForm, setCurrentForm] = useState<
    "done" | "undone" | "processing" | "processStart" | "processData"
  >("processing");
  const profile = useRecoilValue(userProfile);
  useEffect(() => {
    if (profile) {
      if (profile.is_identity_verified == false) {
        setCurrentForm("processing");
      } else if (profile.is_identity_verified == true) {
        setCurrentForm("done");
      } else {
        setCurrentForm("undone");
      }
    }
  }, [profile]);
  return (
    <div className="font-vazir bg-neutral-50 rounded-2xl flex flex-col items-center justify-center gap-10 py-3 lg:flex-row lg:justify-between lg:px-8 lg:py-6">
      {currentForm == "done" ||
      currentForm == "undone" ||
      currentForm == "processing" ? (
        <>
          <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-9">
            <ProfileDelete
              className={`${
                currentForm == "done"
                  ? "stroke-success"
                  : currentForm == "processing"
                  ? "stroke-warning"
                  : "stroke-error"
              } text-2xl scale-125`}
            />
            <div className="font-bold flex flex-row gap-2 text-sm">
              <span>وضعیت احراز هویت:</span>
              <span>
                {currentForm == "done"
                  ? "انجام شده"
                  : currentForm == "processing"
                  ? "درحال پردازش"
                  : "انجام نشده"}
              </span>
            </div>
          </div>
          {currentForm == "undone" ? (
            <div className="flex flex-col items-center justify-center gap-3 lg:flex-row-reverse lg:gap-14">
              <Button
                text="احراز هویت"
                className="px-12 py-3"
                onClick={() => setCurrentForm("processStart")}
              />
              <span className="font-normal text-sm text-primary-700">
                آموزش احراز هویت
              </span>
            </div>
          ) : currentForm == "processing" ? (
            <motion.img
              src="/svgs/logo-white.svg"
              width={28}
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 1.5,
              }}
            />
          ) : null}
        </>
      ) : (
        <>
          <AnimatePresence mode="wait">
            {currentForm == "processStart" ? (
              <AuthProcessOne
                onStartClick={() => setCurrentForm("processData")}
              />
            ) : (
              <AuthProcessData
                onSuccess={() => {
                  setCurrentForm("processing");
                }}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default InformationAuthStatusBox;
