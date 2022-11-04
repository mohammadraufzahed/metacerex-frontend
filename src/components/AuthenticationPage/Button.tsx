import React, { MouseEventHandler } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactLoading from "react-loading";
import { AnimatedOverlay } from "../../pages/AtiPage";

type PropsT = {
  text: string;
  loading?: boolean;
  onClick?: MouseEventHandler;
  fullWidth?: boolean;
  className?: string;
  outlined?: boolean;
  disabled?: boolean;
};

const Button: React.FC<PropsT> = ({
  text,
  loading,
  onClick,
  fullWidth,
  className,
  outlined,
  disabled,
}) => {
  const buttonVariant = {
    loading: {},
    loaded: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  return (
    <motion.button
      onClick={onClick}
      initial={{
        display: "flex",
        scale: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 1.015 }}
      variants={buttonVariant}
      animate={loading ? "loading" : "loaded"}
      transition={{ type: "spring", duration: 1 }}
      className={`${className} relative cursor-pointer ${
        outlined
          ? "text-primary-700 dark:text-primary-500 bg-transparent border-[1px] border-primary-700 dark:border-primary-500"
          : "text-neutral-50 dark:text-neutral-900 bg-primary-700 dark:bg-primary-500"
      } ${
        fullWidth ? "w-11/12" : "w-max"
      } py-3.5 rounded font-vazir font-bold text-lg`}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ReactLoading
              key="spinner"
              type="spin"
              width={25}
              height={25}
              color="#ffff"
            />
          </motion.div>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="text"
          >
            {text}
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatedOverlay accepted={disabled == undefined ? true : !disabled} />
    </motion.button>
  );
};

export default Button;
