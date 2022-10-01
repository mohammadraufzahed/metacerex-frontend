import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CardSend from "../../svgs/CardSend";
import WalletAdd from "../../svgs/WalletAdd";
import MenuItem from "../AuthenticationPage/MenuItem";

type PropsT = {
  children: React.ReactNode;
};

const MarketAction: React.FC<PropsT> = ({ children }) => {
  // States
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex-auto w-full flex flex-col items-center gap-4 bg-neutral-50 px-2 py-4 rounded-2xl lg:max-w-[440px] lg:h-[90vh] lg:overflow-y-scroll scrollbar-vertical mx-auto md:mx-0 md:py-6 md:px-5">
      <div className="w-full grid grid-cols-2">
        <MenuItem
          activeColor="rgba(96, 211, 148 1)"
          text={
            <div className="flex w-full items-center justify-center gap-3">
              <WalletAdd
                className={
                  location.pathname === "/dashboard/market/buy"
                    ? "stroke-success"
                    : "stroke-neutral-400"
                }
              />
              خرید
            </div>
          }
          active={location.pathname === "/dashboard/market/buy"}
          onClick={() => navigate("/dashboard/market/buy")}
        />
        <MenuItem
          activeColor="rgba(238, 96, 85 1)"
          text={
            <div className="flex w-full items-center justify-center gap-3">
              <CardSend
                className={
                  location.pathname === "/dashboard/market/sell"
                    ? "stroke-error"
                    : "stroke-neutral-400"
                }
              />
              فروش
            </div>
          }
          active={location.pathname === "/dashboard/market/sell"}
          onClick={() => navigate("/dashboard/market/sell")}
        />
      </div>
      {children}
    </div>
  );
};

export default MarketAction;
