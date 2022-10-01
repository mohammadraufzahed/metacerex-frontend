import React, { lazy } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { showSidebar } from "./DashboardSidebar";
import { profile } from "../signals/profile";

const Hamburger = lazy(() => import("hamburger-react"));

const DashboardNavbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-screen fixed z-[200] flex flex-row-reverse justify-between bg-neutral-50 items-center px-5 min-h-[3.5rem] h-[7vh] max-h-[3.5rem] lg:flex-row lg:px-8 border-b-[1px] border-primary-700">
      <div className="flex flex-row gap-16 items-center h-full lg:flex-auto">
        <div className="flex flex-row items-center gap-5">
          <img
            src="/svgs/logo.svg"
            width={24}
            className="w-8 md:w-10"
            alt="Logo"
          />
          <strong className="font-vazir hidden font-normal text-neutral-900 text-2xl lg:block">
            شرکت الفبا
          </strong>
        </div>
        <div className="hidden lg:flex-auto flex-row items-center gap-6 font-vazir font-bold text-xl text-primary-700 lg:flex h-full">
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              "transition-all duration-300 " +
              (isActive
                ? "bg-primary-700 h-full text-white px-5 flex items-center justify-center"
                : "")
            }
          >
            ارتباط با ما
          </NavLink>
        </div>
      </div>
      <div>
        <div className="lg:hidden">
          <Hamburger
            rounded={true}
            duration={0.4}
            onToggle={(e) => (showSidebar.value = e.valueOf())}
            toggled={showSidebar.value}
          />
        </div>
        {profile.value ? (
          <span className="hidden lg:block font-vazir font-bold text-base text-primary-700">
            {`${profile.value.first_name ?? ""} ${
              profile.value.last_name ?? ""
            }`}
          </span>
        ) : (
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.01 }}
            className="hidden font-vazir font-bold text-base text-white bg-primary-700 px-6 py-2 rounded-lg text-center lg:block"
            onClick={() => navigate("/auth", { replace: true })}
          >
            ورود / ثبت نام
          </motion.button>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavbar;
