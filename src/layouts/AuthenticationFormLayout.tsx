import React from "react";
import { motion } from "framer-motion";

type PropsT = {
  children: React.ReactNode;
};

const AuthenticationFormLayout: React.FC<PropsT> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
      }}
      className="mx-0 my-8 flex flex-col items-center gap-6 lg:gap-8 h-full"
    >
      {children}
    </motion.div>
  );
};

export default AuthenticationFormLayout;
