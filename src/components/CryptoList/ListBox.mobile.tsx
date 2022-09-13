import { AnimatePresence } from "framer-motion";
import React, { lazy } from "react";
import { useRecoilValue } from "recoil";
import { tickers } from "../../atoms/tickers";
import type { TickerTable } from "../../types/API";
import NotFound from "../NotFound";

const ListItem = lazy(() => import("./ListItem.mobile"));

type PropsT = {
  title?: string;
  onScroll: (e: HTMLDivElement) => void;
  list: TickerTable[];
};

const ListBox: React.FC<PropsT> = ({ title, onScroll, list }) => {
  return (
    <div
      onScroll={({ currentTarget }) => onScroll(currentTarget)}
      className="flex flex-col pt-6 h-3/6 max-h-[50%] pr-3 overflow-y-scroll scrollbar-vertical border-b-[1px] border-b-neutral-800 pb-8"
    >
      <span className="font-vazir font-normal text-sm text-neutral-700">
        {title}
      </span>
      {list.length == 0 ? (
        <NotFound text="هیچ ارزی پیدا نشد" />
      ) : (
        <div className="mt-5 flex flex-col gap-2">
          <AnimatePresence mode="wait">
            {list.map((item, key) => (
              <ListItem key={key} {...item} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

ListBox.defaultProps = {
  title: "محبوب ترین ارز ها",
};

export default ListBox;
