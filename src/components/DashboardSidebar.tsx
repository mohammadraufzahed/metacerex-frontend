import React, { lazy, useEffect, useRef, useState } from "react";
import type { SVGProps } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { showSidebar } from "../atoms/showSidebar";
const ElementOne = lazy(() => import("../svgs/ElementOne"));
const Layer = lazy(() => import("../svgs/Layer"));
const Profile = lazy(() => import("../svgs/Profile"));
const Activity = lazy(() => import("../svgs/Activity"));
const EmptyWallet = lazy(() => import("../svgs/EmptyWallet"));
const Calendar = lazy(() => import("../svgs/Calender"));
const ArchiveBook = lazy(() => import("../svgs/ArchiveBook"));
const HomeTrendUp = lazy(() => import("../svgs/HomeTrendUp"));
const Sound = lazy(() => import("../svgs/Sound"));
const CallIncome = lazy(() => import("../svgs/CallIncome"));
const Message = lazy(() => import("../svgs/Message"));
const Login = lazy(() => import("../svgs/Login"));

type SidebarBoxDataT = {
  [key: number]: SidebarItemT[];
};
const SidebarBoxData: SidebarBoxDataT = {
  1: [
    {
      text: "لیست ارزها",
      Icon: ElementOne,
      href: "/dashboard",
    },
    {
      text: "onchain",
      Icon: Layer,
      href: "/dashboard/onchain",
    },
    {
      text: "پروفایل کاربری",
      Icon: Profile,
      href: "/dashboard/profile",
    },
    {
      text: "بازار",
      Icon: Activity,
      href: "/dashboard/market",
    },
    {
      text: "کیف پول",
      Icon: EmptyWallet,
      href: "/dashboard/wallet",
    },
    {
      text: "تاریخچه",
      Icon: Calendar,
      href: "/dashboard/history",
    },
  ],
  2: [
    {
      text: "واچ لیست",
      Icon: ArchiveBook,
      href: "/dashboard/watchlist",
      onlyMobile: true,
    },
    {
      text: "مدیریت حساب",
      Icon: HomeTrendUp,
      href: "/dashboard/settings/profile",
      onlyMobile: true,
    },
    {
      text: "اخبار",
      Icon: Sound,
      href: "/dashboard/news",
      onlyMobile: true,
    },
    {
      text: "ارتباط با ما",
      Icon: CallIncome,
      href: "/dashboard/contactus",
      onlyMobile: true,
    },
  ],
  3: [
    {
      text: "پشتیبانی",
      Icon: Message,
      href: "/dashboard/support",
    },
    {
      text: "خروج",
      Icon: Login,
      href: "/dashboard/logout",
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
      animate={show ? "show" : "hide"}
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
    const timer = setInterval(() => {
      if (link.current) {
        setIsActive(link.current.href === window.location.href);
      }
    }, 1);
    return () => {
      clearInterval(timer);
    };
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
