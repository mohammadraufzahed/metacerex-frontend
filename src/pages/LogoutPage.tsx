import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { twofactoryState } from "../atoms/twofactoryState";
import { userToken } from "../atoms/userToken";
import useCustomToast from "../hooks/useCustomToast";
import { profile } from "../signals/profile";

const LogoutPage: React.FC = () => {
  const [userTokenD, setUserToken] = useRecoilState(userToken);
  const [twotp, setTwotp] = useRecoilState(twofactoryState);
  if (userTokenD == null && profile.value == null)
    return <Navigate to="/auth" replace />;
  setUserToken(null);
  profile.value = null;
  setTwotp(false);
  useCustomToast(
    "bottom-right",
    "success",
    "شما با موفقیت از حساب خود خارج شدید"
  );
  return <Navigate to="/dashboard/list" replace />;
};

export default LogoutPage;
