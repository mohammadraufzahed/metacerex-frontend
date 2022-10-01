import React from "react";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import { useRecoilState } from "recoil";
import { userToken } from "../../atoms/userToken";
import { httpClient } from "../../axios";
import useCustomToast from "../../hooks/useCustomToast";
import { useNavigate } from "react-router-dom";

const GoogleButton: React.FC = () => {
  // State
  const navigate = useNavigate();
  const [userTokenD, setUserTokenD] = useRecoilState(userToken);
  const login = useGoogleLogin({
    onSuccess(res) {
      httpClient
        .post("users/google/login/", {
          google_access_token: res.access_token,
        })
        .then((res) => {
          if (res.status == 200) {
            sessionStorage.setItem(
              "userToken",
              JSON.stringify({
                userToken: {
                  access: res.data.access_token,
                  refresh: res.data.refresh_token,
                },
              })
            );
            useCustomToast(
              "bottom-right",
              "success",
              "شما با موفقیت وارد شدید"
            );
            setTimeout(
              () =>
                (window.location.href = window.location.origin + "/dashboard"),
              1000
            );
          } else {
            useCustomToast("bottom-right", "error", "ورود با مشکل مواجه شد");
          }
        });
    },
  });
  return (
    <motion.button
      type="button"
      initial={{ scale: 1, borderWidth: 1, borderColor: "rgba(0 0 0 0)" }}
      whileHover={{ scale: 1.02, borderColor: "#086788" }}
      className="w-full rounded mb-10 mt-5 flex gap-5 flex-row bg-white py-4 items-center justify-center"
      onTap={() => login()}
    >
      <img src="/svgs/google.svg" width={23} />
      <span className="font-vazir font-bold text-xl text-neutral-400">
        ورود با گوگل
      </span>
    </motion.button>
  );
};

export default GoogleButton;
