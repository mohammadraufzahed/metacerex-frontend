import React, { lazy } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { showSidebar } from "../atoms/showSidebar";
import { user } from "../atoms/user";
import { motion } from "framer-motion";

const Hamburger = lazy(() => import("hamburger-react"));

const DashboardNavbar: React.FC = () => {
  const [showDashboardSidebar, setShowDashboardSidebar] =
    useRecoilState(showSidebar);
  const userD = useRecoilValue(user);
  const navigate = useNavigate();
  return (
    <nav className="w-full flex flex-row-reverse justify-between bg-neutral-50 items-center px-5 min-h-[3.5rem] h-[7vh] max-h-[3.5rem] lg:flex-row lg:px-8 border-b-[1px] border-primary-700">
      <div className="flex flex-row gap-16 items-center">
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
        <div className="hidden flex-row items-center gap-6 font-vazir font-bold text-xl text-primary-700 lg:flex">
          <Link to="#">اخبار</Link>
          <Link to="#">ارتباط با ما</Link>
        </div>
      </div>
      <div>
        <div className="lg:hidden">
          <Hamburger
            rounded={true}
            duration={0.4}
            onToggle={(e) => setShowDashboardSidebar(e.valueOf())}
            toggled={showDashboardSidebar}
          />
        </div>
        {userD ? (
          <span className="hidden lg:block font-vazir font-bold text-base text-primary-700">
            {userD.user_display_name}
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
