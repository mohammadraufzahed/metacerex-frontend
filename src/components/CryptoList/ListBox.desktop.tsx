import { AnimatePresence } from "framer-motion";
import React, { lazy } from "react";
import { TickerTable } from "../../types/API";
import NotFound from "../NotFound";

const ListItem = lazy(() => import("./ListItem.desktop"));

type PropsT = {
  onScroll: (e: HTMLDivElement) => void;
  list: TickerTable[];
};

const ListBox: React.FC<PropsT> = ({ onScroll, list }) => {
  return (
    <div
      onScroll={(e) => onScroll(e.currentTarget)}
      className="flex-auto h-[24vh] overflow-y-scroll scrollbar-vertical"
    >
      {list.length == 0 ? (
        <NotFound text="هیچ ارزی پیدا نشد" />
      ) : (
        <table className=" table-auto h-full w-full border-spacing-y-5 border-separate">
          <thead className="w-full border-b-neutral-900 border-b-[1px]">
            <tr className='w-full font-vazir relative font-bold text-base after:content-[""] after:w-full after:h-[1px] after:bg-neutral-900 after:absolute after:left-0 after:-bottom-2'>
              <th className="text-center">نماد</th>
              <th className="text-center">قیمت</th>
              <th className="text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="">
            <AnimatePresence mode="wait">
              {list.map((item, key) => (
                <ListItem {...item} key={key} />
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListBox;
