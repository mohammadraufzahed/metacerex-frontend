import React from "react";
import Search from "../../svgs/Search";
import { tickerSearch } from "./ListSelector";

const SearchBox: React.FC = () => {
  return (
    <div className="w-full relative drop-shadow-xl">
      <input
        className="w-full py-2 font-vazir font-normal text-sm text-neutral-400 dark:text-neutral-50 outline-none pr-12 border-[1px] border-neutral-300 dark:border-neutral-50 placeholder:dark:text-neutral-50 dark:bg-neutral-900 rounded-lg"
        placeholder="جستجو در میان بیش از 840 رمز ارز"
        value={tickerSearch.value ?? ""}
        onChange={({ currentTarget }) => {
          tickerSearch.value = currentTarget.value;
        }}
      />
      <Search className="absolute bottom-1.5 right-3 stroke-neutral-400 dark:stroke-neutral-50" />
    </div>
  );
};

export default SearchBox;
