import React, { lazy } from "react";

const ListItem = lazy(() => import("./ListItem.desktop"));

const ListBox: React.FC = () => {
  return (
    <div className="flex-auto max-h-[44vh] overflow-y-scroll">
      <table className="table-auto w-full border-spacing-y-5 border-separate">
        <thead className="w-full border-b-neutral-900 border-b-[1px]">
          <tr className='w-full font-vazir relative font-bold text-base after:content-[""] after:w-full after:h-[1px] after:bg-neutral-900 after:absolute after:left-0 after:-bottom-2'>
            <th className="text-start">نماد</th>
            <th className="text-start">قیمت</th>
            <th className="text-start">عملیات</th>
          </tr>
        </thead>
        <tbody className="">
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
          <ListItem />
        </tbody>
      </table>
    </div>
  );
};

export default ListBox;
