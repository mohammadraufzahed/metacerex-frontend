import React from "react";
import ListBox from "./ListBox.desktop";
import SearchBox from "./SearchBox";

const ListContainer: React.FC = () => {
  return (
    <div className="hidden lg:flex bg-neutral-50 px-5 py-6 rounded-lg flex-col gap-5">
      <SearchBox />
      <ListBox />
    </div>
  );
};

export default ListContainer;
