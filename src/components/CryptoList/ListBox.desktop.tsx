import React, { lazy } from "react";
import { useRecoilValue } from "recoil";
import { tickers } from "../../atoms/tickers";

const ListItem = lazy(() => import("./ListItem.desktop"));

const ListBox: React.FC = () => {
  const tickersList = useRecoilValue(tickers);
  return (
    <div className="flex-auto min-h-[400px] max-h-[400px] overflow-y-scroll scrollbar-vertical">
      <table className="table-auto w-full border-spacing-y-5 border-separate">
        <thead className="w-full border-b-neutral-900 border-b-[1px]">
          <tr className='w-full font-vazir relative font-bold text-base after:content-[""] after:w-full after:h-[1px] after:bg-neutral-900 after:absolute after:left-0 after:-bottom-2'>
            <th className="text-center">نماد</th>
            <th className="text-center">قیمت</th>
            <th className="text-center">عملیات</th>
          </tr>
        </thead>
        <tbody className="">
          {tickersList.map((item, key) => (
            <ListItem {...item} key={key} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBox;
