import React from "react";
import { motion } from "framer-motion";
import LoginHistoryBox from "../Boxes/LoginHistoryBox";
import TwoSecActivateBox from "../Boxes/TwoSecActivateBox";
import { Helmet } from "react-helmet";

const SecurityForm: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>صرافی - امنیت</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="py-2 flex flex-col gap-6 md:gap-8"
      >
        <TwoSecActivateBox />
        <LoginHistoryBox />
      </motion.div>
    </>
  );
};

export default SecurityForm;
