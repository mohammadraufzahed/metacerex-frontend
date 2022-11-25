import React, { lazy, useEffect, useRef, useState } from "react";
import type { SVGProps, LazyExoticComponent } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { screen } from "../signals/screen";
import { effect, signal } from "@preact/signals-react";

const StatusUp = lazy(() => import("../svgs/StatusUp"));
const CallIncome = lazy(() => import("../svgs/CallIncome"));
const ElementOne = lazy(() => import("../svgs/ElementOne"));
const Notification = lazy(() => import("../svgs/Notification"));
const Layer = lazy(() => import("../svgs/Layer"));
const Profile = lazy(() => import("../svgs/Profile"));
const Activity = lazy(() => import("../svgs/Activity"));
const EmptyWallet = lazy(() => import("../svgs/EmptyWallet"));
const HomeTrendUp = lazy(() => import("../svgs/HomeTrendUp"));
const Sound = lazy(() => import("../svgs/Sound"));
const Login = lazy(() => import("../svgs/Login"));

export const showSidebar = signal(false);
effect(() =>
  screen.value.width >= 1024
    ? (showSidebar.value = true)
    : (showSidebar.value = false)
);

type SidebarBoxDataT = {
  [key: number]: SidebarItemT[];
};
const SidebarBoxData: SidebarBoxDataT = {
  1: [
    {
      text: "لیست ارزها",
      Icon: ElementOne,
      href: "/dashboard/list",
    },
    // {
    //   text: "onchain",
    //   Icon: Layer,
    //   href: "/dashboard/onchain",
    // },
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
      text: "آتی",
      Icon: StatusUp,
      href: "/ati",
    },
    {
      text: "کیف پول",
      Icon: EmptyWallet,
      href: "/dashboard/wallet",
    },
  ],
  2: [
    {
      text: "مدیریت حساب",
      Icon: HomeTrendUp,
      href: "/dashboard/profile/information",
      onlyMobile: true,
    },
    {
      text: "اعلان ها",
      href: "/dashboard/notification",
      Icon: Notification,
      onlyMobile: true,
    },
    {
      text: "تماس باما",
      href: "/contact-us",
      onlyMobile: true,
      Icon: CallIncome,
    },
    {
      text: "اخبار",
      Icon: Sound,
      href: "/news",
      onlyMobile: true,
    },
  ],
  3: [
    {
      text: "اخبار",
      Icon: Sound,
      href: "/news",
      onlyDesk: true,
    },
    {
      text: "خروج",
      Icon: Login,
      href: "/dashboard/logout",
    },
  ],
};

const DashboardSidebar: React.FC = () => {
  const ContainerVariant = {
    show: {
      translateX: 0,
    },
    hide: {
      translateX: "100vw",
    },
  };
  return (
    <motion.div
      className="w-[170px] h-[94vh] flex flex-col lg:justify-between items-center z-50 py-5 bg-neutral-50 dark:bg-neutral-900 fixed top-14 lg:min-w-[3rem] lg:max-w-[3rem] overflow-x-hidden"
      variants={ContainerVariant}
      animate={showSidebar.value ? "show" : "hide"}
      transition={{ type: "tween", duration: 0.4 }}
      initial={{ translateX: 0 }}
    >
      <div className="w-full">
        <SidebarBox items={SidebarBoxData[1]} />
        <SidebarBox items={SidebarBoxData[2]} />
      </div>
      <div className="w-full">
        <SidebarBox items={SidebarBoxData[3]} />
      </div>
    </motion.div>
  );
};

type SidebarBoxT = {
  items: SidebarItemT[];
};
const SidebarBox: React.FC<SidebarBoxT> = ({ items }) => {
  return (
    <div className="w-full my-0 border-b-neutral-200 dark:border-b-neutral-700 border-b-[1px] lg:border-transparent">
      {items.map((item, key) => (
        <SidebarItem
          text={item.text}
          Icon={item.Icon}
          href={item.href}
          key={key}
          onlyMobile={item.onlyMobile}
          onlyDesk={item.onlyDesk}
        />
      ))}
    </div>
  );
};

type SidebarItemT = {
  text: string;
  Icon: LazyExoticComponent<React.FC<SVGProps<SVGSVGElement>>>;
  href: string;
  onlyMobile?: boolean;
  onlyDesk?: boolean;
};
const SidebarItem: React.FC<SidebarItemT> = ({
  text,
  Icon,
  href,
  onlyMobile,
  onlyDesk,
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
      className={`group w-full ${
        onlyDesk && !onlyMobile ? "hidden lg:flex" : "flex"
      } items-center justify-center ${
        onlyMobile && !onlyDesk ? "lg:hidden" : ""
      }`}
      title={text}
      ref={link}
    >
      <div
        className={`flex-1 flex flex-row h-10 items-center pr-6 lg:pr-0 lg:justify-center gap-3 font-vazir font-light text-sm ${
          isActive
            ? "bg-primary-700 text-neutral-50 lg:bg-neutral-200 lg:dark:bg-neutral-700"
            : "text-primary-700 dark:text-primary-500"
        }`}
      >
        <Icon
          className={`${
            isActive
              ? "stroke-neutral-50"
              : "stroke-primary-700 dark:stroke-primary-500"
          } lg:stroke-primary-700 lg:dark:stroke-primary-500`}
        />
        <span className="lg:hidden w-max">{text}</span>
      </div>
    </NavLink>
  );
};

export default DashboardSidebar;
