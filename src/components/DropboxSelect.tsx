import { AnimatePresence, motion } from "framer-motion";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import Search from "../svgs/Search";
import Input from "./Input";

type PropsT = {
  placeholder: string;
  hasMemo?: boolean;
  onChange: (name: string) => void;
  list: {
    text: string | undefined;
    value: string;
    icon?: string;
    memo?: string;
  }[];
};

const DropboxSelect: React.FC<PropsT> = ({
  placeholder,
  hasMemo,
  list,
  onChange,
}) => {
  // States
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  return (
    <motion.div
      initial="close"
      variants={{
        open: {
          height: 400,
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
        {hasMemo ? (
          <span className="font-vazir font-normal text-base">ممو دارد</span>
        ) : null}
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
      <div className="relative mb-2 w-full">
        <Input
          type="text"
          isPrimary
          id={`search_${nanoid()}`}
          name={`search_${nanoid()}`}
          label=""
          value={search}
          onChange={({ currentTarget }) => {
            setSearch((currentTarget as HTMLInputElement).value);
          }}
        />
        <Search className="absolute top-4 left-2" />
      </div>
      <div className="flex-auto bg-neutral-50 flex flex-col overflow-y-scroll scrollbar-vertical">
        <AnimatePresence mode="sync">
          {list
            .filter(
              (item) =>
                item.text?.toLowerCase().includes(search.toLocaleLowerCase()) ||
                item.value.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, key) => (
              <motion.div
                initial={{ x: 430, background: "rgb(250 250 250)" }}
                whileHover={{ background: "rgb(245, 245, 245)" }}
                whileTap={{ background: "rgb(229, 229, 229)" }}
                className="w-full cursor-pointer font-vazir text-primary-700 px-2 py-2 border-b-[1px] font-bold flex flex-row items-center gap-2"
                animate={{ x: 0 }}
                exit={{ x: 430 }}
                transition={{ duration: 0.4, type: "tween" }}
                key={key}
                onTap={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
              >
                {item.icon ? <img src={item.icon} width={24} /> : null}
                <span>{item.text}</span>
                {item.memo ? <span className="mr-auto">ممو دارد</span> : null}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DropboxSelect;
