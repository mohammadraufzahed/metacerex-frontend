import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed w-screen h-screen top-0 left-0 z-[340] bg-[#000322]">
      <div className="text-secondary-700 z-40 font-vazir  text-center flex flex-col items-center gap-6 mt-8 px-4 lg:mt-[100px] lg:gap-10">
        <span className="font-bold text-2xl lg:text-5xl">
          به موبیدکس خوش آمدید!
        </span>
        <p className="font-normal text-sm lg:text-lg lg:max-w-[900px]">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است
        </p>
      </div>
      <img
        className="absolute -bottom-24 -z-20 -left-24 min-w-[100vw] max-w-[550px] -rotate-6 lg:hidden"
        src="/svgs/wall.svg"
      />
      <img
        className="hidden absolute -bottom-[400px] -z-20 min-w-[1600px] -left-[300px] lg:block"
        src="/svgs/wall.svg"
      />
      <motion.button
        variants={{
          initial: {
            y: 0,
          },
          hover: {
            y: -2,
          },
          tap: {
            y: -2,
            scale: 1.03,
          },
        }}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onTap={() => navigate("/dashboard/list", { replace: true })}
        className="absolute left-[100px] bottom-[100px] px-8 py-2 rounded-lg font-vazir font-bold text-secondary-700 text-xl bg-[#000322] shadow-md"
      >
        شروع کنید
      </motion.button>
    </div>
  );
};

export default HomePage;
