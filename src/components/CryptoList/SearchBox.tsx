import React from "react";
import { useRecoilState } from "recoil";
import { tickerSearch } from "../../atoms/tickerSearch";
import Search from "../../svgs/Search";

const SearchBox: React.FC = () => {
  const [tickerSearchV, setTickerSearchV] = useRecoilState(tickerSearch);
  return (
    <div className="w-full relative drop-shadow-xl">
      <input
        className="w-full py-2 font-vazir font-normal text-sm text-neutral-400 outline-none pr-12 border-[1px] border-neutral-300 rounded-lg"
        placeholder="جستجو در میان بیش از 840 رمز ارز"
        value={tickerSearchV ?? ""}
        onChange={({ currentTarget }) => {
          setTickerSearchV(currentTarget.value);
        }}
      />
      <Search className="absolute bottom-1.5 right-3 stroke-neutral-400" />
    </div>
  );
};

export default SearchBox;
