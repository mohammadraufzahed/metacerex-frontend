import React, { MouseEventHandler } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactLoading from "react-loading";

type PropsT = {
  text: string;
  loading?: boolean;
  onClick?: MouseEventHandler;
  fullWidth?: boolean;
  className?: string;
};

const Button: React.FC<PropsT> = ({
  text,
  loading,
  onClick,
  fullWidth,
  className,
}) => {
  const buttonVariant = {
    loading: {},
    loaded: {
      backgroundColor: "#086788",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  return (
    <motion.button
      onClick={onClick}
      initial={{
        backgroundColor: "#086788",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      variants={buttonVariant}
      animate={loading ? "loading" : "loaded"}
      transition={{ type: "spring", duration: 1 }}
      className={`cursor-pointer text-shades-0 ${
        fullWidth ? "w-11/12" : "w-max"
      } py-3.5 rounded font-vazir font-bold text-lg ${className}`}
    >
      <AnimatePresence exitBeforeEnter>
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
    </motion.button>
  );
};

export default Button;
