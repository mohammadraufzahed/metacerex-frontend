import React from "react";
import type { ChangeEventHandler } from "react";
import { FaAsterisk } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type PropsT = {
  label: string;
  value: string;
  onChange: ChangeEventHandler;
  error?: string;
  name: string;
  id: string;
  type: string;
  required?: boolean;
};

const Input: React.FC<PropsT> = ({
  label,
  id,
  name,
  error,
  value,
  type,
  onChange,
  required,
}) => {
  return (
    <div className="w-full flex flex-col gap-2 items-center">
      <label
        className="font-vazir flex flex-row items-center gap-1 font-bold text-sm self-start mr-7"
        htmlFor={id}
      >
        {label}
        {required ? <FaAsterisk className="text-error" size={10} /> : null}
      </label>
      <input
        className="w-11/12 max-w-sm h-10 outline-none border-[1px] border-shades-100 rounded-[4px] font-vazir font-bold px-4 text-neutral-600 text-sm"
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
      <AnimatePresence>
        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, type: "spring" }}
            exit={{ opacity: 0 }}
            className="flex flex-row items-center self-start pr-4 gap-2 px-1"
          >
            <motion.div
              className="w-2.5 h-2.5 rounded-full"
              initial={{
                backgroundColor: "#525252",
                opacity: 0.8,
              }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.5,
                duration: 1,
              }}
            />
            <span className="w-full font-vazir font-light text-xs text-neutral-600">
              {error}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Input;
