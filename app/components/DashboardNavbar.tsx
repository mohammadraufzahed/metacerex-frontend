import React from "react";
import logo from "../../public/svgs/logo.svg";
import { Link } from "@remix-run/react";
import Hamburger from "hamburger-react";

const DashboardNavbar: React.FC = () => {
  return (
    <nav className="w-full flex flex-row-reverse justify-between bg-neutral-50 items-center px-5 min-h-[3.5rem] h-[7vh] max-h-[3.5rem] md:flex-row lg:px-8 border-b-[1px] border-primary-700">
      <div className="flex flex-row gap-16 items-center">
        <div className="flex flex-row items-center gap-5">
          <img src={logo} width={24} className="w-8 md:w-10" alt="Logo" />
          <strong className="font-vazir hidden font-normal text-neutral-900 text-2xl md:block">
            شرکت الفبا
          </strong>
        </div>
        <div className="hidden flex-row items-center gap-6 font-vazir font-bold text-xl text-primary-700 md:flex">
          <Link to="#">اخبار</Link>
          <Link to="#">ارتباط با ما</Link>
        </div>
      </div>
      <div>
        <div className="md:hidden">
          <Hamburger />
        </div>
        <span className="hidden md:block font-vazir font-bold text-base text-primary-700">
          محمدحسین اسماعیلی نژاد
        </span>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
