import React, { useState } from "react";
import Search from "../../svgs/Search";
import { motion } from "framer-motion";
import { searchQuery } from "../../pages/NewsListPage";

const NewsSearchBox: React.FC = () => {
  // States
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  return (
    <div className="bg-neutral-50 rounded-2xl gap-2 flex flex-col w-full px-2 py-4 md:py-10 md:px-4">
      <span className="font-vazir font-bold text-sm">اخبار</span>
      <div className="relative">
        <motion.input
          variants={{
            normal: {
              borderWidth: 0.5,
              borderColor: "rgb(212 212 212)",
            },
            focus: {
              borderWidth: 1.5,
              borderColor: "rgb(163, 163, 163)",
            },
          }}
          initial="normal"
          animate="normal"
          whileFocus="focus"
          placeholder="جستجو در میان همه خبرها"
          className="w-full h-10 rounded-lg pr-10 outline-none font-vazir font-normal text-sm"
          onChange={({ currentTarget }) => {
            if (searchQuery.value !== currentTarget.value) {
              clearTimeout(searchTimeout);
              setSearchTimeout(
                setTimeout(() => (searchQuery.value = currentTarget.value), 400)
              );
            }
          }}
        />
        <Search className="absolute bottom-2 right-2 stroke-neutral-400" />
      </div>
    </div>
  );
};

export default NewsSearchBox;
