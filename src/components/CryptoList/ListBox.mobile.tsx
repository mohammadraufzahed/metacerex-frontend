import React, { lazy } from "react";
import type { PropsT as ListItemT } from "./ListItem.mobile";

const ListItem = lazy(() => import("./ListItem.mobile"));

type PropsT = {
  items?: ListItemT[];
  title?: string;
};

const ListBox: React.FC<PropsT> = ({ items, title }) => {
  return (
    <div className="flex flex-col pt-6 pr-3 border-b-[1px] border-b-neutral-800 pb-8">
      <span className="font-vazir font-normal text-sm text-neutral-700">
        {title}
      </span>
      <div className="mt-5 flex flex-col gap-2">
        {items?.map((item, key) => (
          <ListItem key={key} {...item} />
        ))}
      </div>
    </div>
  );
};

ListBox.defaultProps = {
  items: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
  title: "محبوب ترین ارز ها",
};

export default ListBox;
