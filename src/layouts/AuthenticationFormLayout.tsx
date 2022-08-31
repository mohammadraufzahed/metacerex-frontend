import React from "react";
import { motion } from "framer-motion";

type PropsT = {
  children: React.ReactNode;
  key: string;
};

const AuthenticationFormLayout: React.FC<PropsT> = ({ children, key }) => {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
      }}
      className="mx-0 my-8 flex flex-col items-center gap-6 lg:gap-8"
    >
      {children}
    </motion.div>
  );
};

export default AuthenticationFormLayout;
