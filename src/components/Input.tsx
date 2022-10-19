import React from "react";
import type { ChangeEventHandler } from "react";
import { FaAsterisk } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type PropsT = {
  label: string;
  value: any;
  onChange: ChangeEventHandler;
  error?: string;
  name: string;
  id: string;
  type: string;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
  isPrimary?: boolean;
  disabled?: boolean;
  placeholder?: string;
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
  fullWidth,
  className,
  isPrimary,
  disabled,
  placeholder,
}) => {
  return (
    <div
      className={`${
        fullWidth ? "w-full" : ""
      } flex flex-col gap-2 items-center ${className}`}
    >
      <label
        className={`font-vazir flex flex-row ${
          isPrimary
            ? "text-primary-700 dark:text-primary-500"
            : "text-neutral-900 dark:text-neutral-50 "
        } items-center gap-1 font-bold text-sm self-start`}
        htmlFor={id}
      >
        {label}
        {required ? <FaAsterisk className="text-error" size={10} /> : null}
      </label>
      <input
        className={`w-full h-10 outline-none border-[1px] ${
          isPrimary
            ? "border-primary-700 dark:border-primary-500"
            : "border-neutral-900 dark:border-neutral-50"
        } rounded-[4px] font-vazir font-bold px-4 text-neutral-600 placeholder:text-neutral-600 dark:text-neutral-50 dark:bg-neutral-900 dark:placeholder:text-neutral-50 text-sm`}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
      <AnimatePresence>
        {error ? (
          <motion.div
            initial={{ minHeight: 0, height: 0 }}
            animate={{ minHeight: 16, height: "max-content" }}
            transition={{ duration: 0.9, type: "spring" }}
            exit={{ height: 0 }}
            className="flex flex-row overflow-y-hidden items-center self-start pr-4 gap-2 px-1"
          >
            <motion.div
              className="w-2.5 h-2.5 rounded-full"
              initial={{
                backgroundColor: "#f23645",
                opacity: 0.5,
              }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.2,
                duration: 0.7,
              }}
            />
            <span className="w-full font-vazir font-light text-xs text-error">
              {error}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Input;
