import React, { lazy } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { showSidebar } from "./DashboardSidebar";
import { profile } from "../signals/profile";
import { notificationCount } from "../signals/notificationCount";
import { colorMode } from "../signals/colorMode";

const Hamburger = lazy(() => import("hamburger-react"));

const DashboardNavbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-screen fixed z-[200] flex flex-row-reverse justify-between bg-neutral-50 dark:bg-neutral-900 items-center px-5 min-h-[3.5rem] h-[7vh] max-h-[3.5rem] lg:flex-row lg:px-8 border-b-[1px] border-primary-700 dark:border-primary-500">
      <div className="flex flex-row gap-16 items-center h-full lg:flex-auto">
        <div
          className="flex flex-row items-center gap-5 cursor-pointer"
          onClick={() => navigate("/", { replace: true })}
        >
          <img
            src="/svgs/logo.svg"
            width={24}
            className="w-8 md:w-10"
            alt="Logo"
          />
          <strong className="font-vazir hidden font-normal text-neutral-900 dark:text-shades-0 text-2xl lg:block">
            شرکت الفبا
          </strong>
        </div>
        <div className="hidden lg:flex-auto flex-row items-center gap-6 font-vazir font-bold text-xl text-primary-700 dark:text-primary-500 lg:flex h-full">
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              "transition-all duration-300 " +
              (isActive
                ? "bg-primary-700 dark:bg-primary-500 h-full text-neutral-50 dark:text-neutral-900 px-5 flex items-center justify-center"
                : "")
            }
          >
            ارتباط با ما
          </NavLink>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="lg:hidden">
          <Hamburger
            rounded={true}
            duration={0.4}
            onToggle={(e) => (showSidebar.value = e.valueOf())}
            toggled={showSidebar.value}
            color={
              colorMode.value == "dark" ? "rgb(250, 250, 250)" : "rgb(23 23 23)"
            }
          />
        </div>
        <motion.div
          variants={{
            initial: {
              y: 0,
              backgroundColor: "rgb(255 255 255 / 0)",
            },
            dark: {
              backgroundColor: "rgb(8 103 136)",
              y: 0,
            },
            hover: {
              y: -2,
            },
            tap: {
              y: -3,
            },
          }}
          onTap={() =>
            colorMode.value == "dark"
              ? (colorMode.value = "light")
              : (colorMode.value = "dark")
          }
          initial="initial"
          animate="dark"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.6, type: "spring" }}
          className="w-max cursor-pointer p-2 rounded-sm"
        >
          <img
            src={colorMode.value == "dark" ? "/svgs/sun.svg" : "/svgs/moon.svg"}
          />
        </motion.div>
        {profile.value ? (
          <div className="hidden lg:flex flex-row items-center justify-center gap-2">
            <span className="hidden lg:block font-vazir font-bold text-base text-primary-700">
              {`${profile.value.first_name ?? ""} ${
                profile.value.last_name ?? ""
              }`}
            </span>
            <div
              onClick={() =>
                navigate("/dashboard/notification", { replace: true })
              }
              className="cursor-pointer relative"
            >
              <img width={24} height={24} src="/svgs/notification.svg" />
              <motion.div
                variants={{
                  initial: {
                    opacity: 0,
                  },
                  open: {
                    opacity: 1,
                  },
                }}
                initial="initial"
                animate={notificationCount.value == 0 ? "initial" : "open"}
                transition={{ duration: 0.2, type: "spring" }}
                className="absolute bottom-0.5 right-0.5 border-white border-[0.5px] bg-error w-2 h-2 rounded-full"
              />
            </div>
          </div>
        ) : (
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.01 }}
            className="hidden font-vazir font-bold text-base text-white bg-primary-700 dark:bg-primary-500 dark:text-neutral-900 px-6 py-2 rounded-lg text-center lg:block"
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
