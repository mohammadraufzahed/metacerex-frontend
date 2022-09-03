import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userProfile } from "../atoms/userProfile";
import { userToken } from "../atoms/userToken";
import useCustomToast from "../hooks/useCustomToast";

const LogoutPage: React.FC = () => {
  const [userTokenD, setUserToken] = useRecoilState(userToken);
  const [userD, setUser] = useRecoilState(userProfile);
  if (userTokenD == null && userD == null)
    return <Navigate to="/auth" replace />;
  setUserToken(null);
  setUser(null);
  useCustomToast(
    "bottom-right",
    "success",
    "شما با موفقیت از حساب خود خارج شدید"
  );
  return <Navigate to="/dashboard/list" replace />;
};

export default LogoutPage;
