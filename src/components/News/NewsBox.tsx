import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNews } from "../../hooks/useNews";
import ArrowLeft from "../../svgs/ArrowLeft";
import { NewsArticleList } from "../../types/API";
import Loading from "../Loading";
const NewsItem = lazy(() => import("./NewsItem"));

const NewsBox: React.FC = () => {
  const { data } = useQuery(["posts"], useNews);
  return (
    <div className="hidden bg-neutral-50 mt-3 flex-auto rounded-lg lg:flex flex-col items-center pt-8 gap-6">
      {data?.slice(0, 2).map((item) => (
        <NewsItem key={item.pk} {...item} />
      ))}
      <motion.div
        className="self-start pr-9 cursor-pointer flex items-center gap-3 pb-5 font-vazir font-bold text-base text-primary-500"
        whileHover={{ scale: 1.04 }}
      >
        <motion.div
          className="bg-primary-500 w-2 h-2 rounded-full"
          initial={{ backgroundColor: "rgb(36 196 249 0.5)" }}
          animate={{ backgroundColor: "rgb(36 196 249 1)" }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
          }}
        />
        <span className="max-h-max max-wmax">مشاهده همه خبرها</span>
        <ArrowLeft className="stroke-primary-500" width={20} />
      </motion.div>
    </div>
  );
};

export default NewsBox;
