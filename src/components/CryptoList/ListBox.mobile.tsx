import React, { lazy } from "react";
import { useRecoilValue } from "recoil";
import { tickers } from "../../atoms/tickers";
import type { TickerTable } from "../../types/API";

const ListItem = lazy(() => import("./ListItem.mobile"));

type PropsT = {
  title?: string;
};

const ListBox: React.FC<PropsT> = ({ title }) => {
  const tickersList = useRecoilValue(tickers);
  return (
    <div className="flex flex-col pt-6 pr-3 border-b-[1px] border-b-neutral-800 pb-8">
      <span className="font-vazir font-normal text-sm text-neutral-700">
        {title}
      </span>
      <div className="mt-5 flex flex-col gap-2">
        {tickersList.map((item, key) => (
          <ListItem key={key} {...item} />
        ))}
      </div>
    </div>
  );
};

ListBox.defaultProps = {
  title: "محبوب ترین ارز ها",
};

export default ListBox;
