import { motion } from "framer-motion";
import React, { useState } from "react";

type PropsT = {
  placeholder: string;
  onChange: (name: string) => void;
  list: { text: string; value: string }[];
};

const DropboxSelect: React.FC<PropsT> = ({ placeholder, list, onChange }) => {
  // States
  const [open, setOpen] = useState<boolean>(false);
  return (
    <motion.div
      initial="close"
      variants={{
        open: {
          height: 350,
        },
        close: {
          height: 41,
        },
      }}
      animate={open ? "open" : "close"}
      transition={{ duration: 0.5, type: "tween" }}
      className="w-full overflow-y-hidden scrollbar-vertical flex flex-col"
    >
      <div
        className="w-full cursor-pointer flex flex-row px-4 py-2 items-center justify-between border-b-[1px] border-b-primary-700"
        onClick={() => setOpen((open) => !open)}
      >
        <span className="font-vazir font-normal text-base">{placeholder}</span>
        <motion.img
          variants={{
            open: {
              rotate: 180,
            },
            close: {
              rotate: 0,
            },
          }}
          initial="close"
          animate={open ? "open" : "close"}
          transition={{ duration: 0.4, type: "spring" }}
          src="/svgs/arrow-down.svg"
        />
      </div>
      <div className="flex-auto bg-neutral-50 flex flex-col overflow-y-scroll scrollbar-vertical">
        {list.map((item, key) => (
          <span
            className="w-full text-center font-vazir text-primary-700 px-2 py-2 border-b-[1px] border-neutral-300 font-bold"
            key={key}
            onClick={() => {
              onChange(item.text);
              setOpen(false);
            }}
          >
            {item.text}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default DropboxSelect;
