import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardRecive from "../../svgs/CardRecive";
import CardSend from "../../svgs/CardSend";
import MenuItem from "../AuthenticationPage/MenuItem";

type PropsT = {
  children: React.ReactNode;
};

const ActionsBox: React.FC<PropsT> = ({ children }) => {
  // States
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full h-[84vh] flex flex-col items-center gap-6 bg-neutral-50 px-2 py-4 rounded-2xl lg:max-w-[440px] lg:min-h-[750px] lg:max-h-[900px] mx-auto md:mx-0 md:py-6 md:px-5 overflow-y-scroll scrollbar-vertical">
      <div className="w-full grid grid-cols-2">
        <MenuItem
          text={
            <div className="flex w-full items-center justify-center gap-3">
              <CardRecive
                className={
                  location.pathname === "/dashboard/asset/deposit"
                    ? "stroke-primary-700"
                    : "stroke-neutral-400"
                }
              />
              واریز
            </div>
          }
          active={location.pathname === "/dashboard/asset/deposit"}
          onClick={() => navigate("/dashboard/asset/deposit")}
        />
        <MenuItem
          text={
            <div className="flex w-full items-center justify-center gap-3">
              <CardSend
                className={
                  location.pathname === "/dashboard/asset/withdraw"
                    ? "stroke-primary-700"
                    : "stroke-neutral-400"
                }
              />
              برداشت
            </div>
          }
          active={location.pathname === "/dashboard/asset/withdraw"}
          onClick={() => navigate("/dashboard/asset/withdraw")}
        />
      </div>
      {children}
    </div>
  );
};

export default ActionsBox;
