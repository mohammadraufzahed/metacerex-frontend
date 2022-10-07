import React, { useState } from "react";
import ListBox from "./ListBox.desktop";
import SearchBox from "./SearchBox";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { tickers_fav } from "../../atoms/tickers_fav";
import { tickers } from "../../atoms/tickers";
import { userToken } from "../../atoms/userToken";
import LoginRequiredPage from "../../pages/LoginRequiredPage";
import { colorMode } from "../../signals/colorMode";

type PropsT = {
  onScroll: (e: HTMLDivElement) => void;
  onScrollFav: (e: HTMLDivElement) => void;
  onFavTap: () => void;
};

const ListContainer: React.FC<PropsT> = ({
  onFavTap,
  onScroll,
  onScrollFav,
}) => {
  const [menu, setMenu] = useState<"all" | "fav">("all");
  const userTokenD = useRecoilValue(userToken);
  const favList = useRecoilValue(tickers_fav);
  const list = useRecoilValue(tickers);
  return (
    <>
      <div className="hidden w-full lg:flex flex-row gap-2">
        <MenuItem
          active={menu == "all"}
          text="لیست ارز ها"
          onTap={() => setMenu("all")}
        />
        <MenuItem
          active={menu == "fav"}
          text="ارز های مورد علاقه"
          onTap={() => setMenu("fav")}
        />
      </div>
      <div className="hidden lg:flex bg-neutral-50 dark:bg-neutral-900 px-5 py-6 rounded-l-lg flex-col gap-5 lg:h-full">
        {menu == "fav" && !userTokenD ? (
          <LoginRequiredPage />
        ) : (
          <>
            <SearchBox />
            <ListBox
              onFavTap={onFavTap}
              list={menu == "all" ? list : favList}
              onScroll={menu == "all" ? onScroll : onScrollFav}
            />
          </>
        )}
      </div>
    </>
  );
};

type MenuItemT = {
  active?: boolean;
  onTap: () => void;
  text: string;
};

const MenuItem: React.FC<MenuItemT> = ({ active, onTap, text }) => (
  <motion.div
    variants={{
      active: {
        background:
          colorMode.value == "dark"
            ? "rgba(23 23 23 1)"
            : "rgba(250 250 250 1)",
      },
      deactive: {
        background:
          colorMode.value == "dark"
            ? "rgba(23 23 23 0.6)"
            : "rgba(250 250 250 0.6)",
      },
      hover: {
        background:
          colorMode.value == "dark"
            ? "rgba(23 23 23 1.8)"
            : "rgba(250 250 250 1)",
      },
    }}
    initial="active"
    animate={active ? "active" : "deactive"}
    whileTap="active"
    whileHover="hover"
    onTap={onTap}
    className="w-max cursor-pointer px-4 py-2 rounded-t-2xl"
  >
    <span className="font-vazir font-normal text-base dark:text-shades-0">
      {text}
    </span>
  </motion.div>
);

export default ListContainer;
