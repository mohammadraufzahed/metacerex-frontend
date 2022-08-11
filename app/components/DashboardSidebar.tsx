import React, { useEffect, useRef, useState } from "react";
import type { SVGProps } from "react";
import { motion } from "framer-motion";
import ElementOne from "../svgs/ElementOne";
import { NavLink } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { showSidebar } from "~/atoms/showSidebar";
import Layer from "~/svgs/Layer";
import Profile from "~/svgs/Profile";
import Activity from "~/svgs/Activity";
import EmptyWallet from "~/svgs/EmptyWallet";
import Calendar from "~/svgs/Calender";
import ArchiveBook from "~/svgs/ArchiveBook";
import HomeTrendUp from "~/svgs/HomeTrendUp";
import Sound from "~/svgs/Sound";
import CallIncome from "~/svgs/CallIncome";
import Message from "~/svgs/Message";
import Login from "~/svgs/Login";

type SidebarBoxDataT = {
  [key: number]: SidebarItemT[];
};
const SidebarBoxData: SidebarBoxDataT = {
  1: [
    {
      text: "لیست ارزها",
      Icon: ElementOne,
      href: "/",
    },
    {
      text: "onchain",
      Icon: Layer,
      href: "/onchain",
    },
    {
      text: "پروفایل کاربری",
      Icon: Profile,
      href: "/profile",
    },
    {
      text: "بازار",
      Icon: Activity,
      href: "/market",
    },
    {
      text: "کیف پول",
      Icon: EmptyWallet,
      href: "/wallet",
    },
    {
      text: "تاریخچه",
      Icon: Calendar,
      href: "/history",
    },
  ],
  2: [
    {
      text: "واچ لیست",
      Icon: ArchiveBook,
      href: "/watchlist",
      onlyMobile: true,
    },
    {
      text: "مدیریت حساب",
      Icon: HomeTrendUp,
      href: "/settings/profile",
      onlyMobile: true,
    },
    {
      text: "اخبار",
      Icon: Sound,
      href: "/news",
      onlyMobile: true,
    },
    {
      text: "ارتباط با ما",
      Icon: CallIncome,
      href: "/contactus",
      onlyMobile: true,
    },
  ],
  3: [
    {
      text: "پشتیبانی",
      Icon: Message,
      href: "/support",
    },
    {
      text: "خروج",
      Icon: Login,
      href: "/logout",
    },
  ],
};

const DashboardSidebar: React.FC = () => {
  const [show, setShow] = useRecoilState(showSidebar);
  const ContainerVariant = {
    show: {
      x: 0,
    },
    hide: {
      x: "100vw",
    },
  };
  const showHandlerResize = (width: number) =>
    width >= 768 ? setShow(true) : setShow(false);
  useEffect(() => {
    if (window) {
      showHandlerResize(window.innerWidth);
      window.onresize = () => {
        showHandlerResize(window.innerWidth);
      };
    }
  }, []);
  return (
    <motion.div
      className="w-[170px] py-5 bg-neutral-50 md:w-12"
      variants={ContainerVariant}
      animate={"show"}
      transition={{ type: "tween", duration: 0.4 }}
    >
      <SidebarBox items={SidebarBoxData[1]} />
      <SidebarBox items={SidebarBoxData[2]} />
      <SidebarBox items={SidebarBoxData[3]} />
    </motion.div>
  );
};

type SidebarBoxT = {
  items: SidebarItemT[];
};
const SidebarBox: React.FC<SidebarBoxT> = ({ items }) => {
  return (
    <div className="w-full my-0 border-b-neutral-200 border-b-[1px] md:border-transparent">
      {items.map((item, key) => (
        <SidebarItem
          text={item.text}
          Icon={item.Icon}
          href={item.href}
          key={key}
          onlyMobile={item.onlyMobile}
        />
      ))}
    </div>
  );
};

type SidebarItemT = {
  text: string;
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  href: string;
  onlyMobile?: boolean;
};
const SidebarItem: React.FC<SidebarItemT> = ({
  text,
  Icon,
  href,
  onlyMobile,
}) => {
  const [isActive, setIsActive] = useState(false);
  const link = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (link.current) {
      setIsActive(link.current.className.includes("active"));
    }
  });
  return (
    <NavLink
      to={href}
      className={`group w-full flex items-center justify-center ${
        onlyMobile ? "md:hidden" : ""
      }`}
      ref={link}
    >
      <div
        className={`flex-1 flex flex-row h-10 items-center pr-6 md:pr-0 md:justify-center gap-3 font-vazir font-light text-sm ${
          isActive
            ? "bg-primary-700 text-neutral-50 md:bg-neutral-200"
            : "text-primary-700"
        }`}
      >
        <Icon
          className={`${
            isActive ? "stroke-neutral-50" : "stroke-primary-700 "
          } md:stroke-primary-700`}
        />
        <span className="md:hidden w-max">{text}</span>
      </div>
    </NavLink>
  );
};

export default DashboardSidebar;
