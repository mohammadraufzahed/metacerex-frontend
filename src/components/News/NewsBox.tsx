import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { useNews } from "../../hooks/useNews";
import ArrowLeft from "../../svgs/ArrowLeft";
import ErrorFetch from "../ErrorFetch";
import NotFound from "../NotFound";
const NewsItem = lazy(() => import("./NewsItem"));

const NewsBox: React.FC = () => {
  // States
  const { data } = useQuery(["posts"], useNews);
  const navigate = useNavigate();
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFetch resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <div className="w-full h-[45.5vh] overflow-scroll scrollbar-vertical hidden bg-neutral-50 dark:bg-neutral-900  mt-3 rounded-lg lg:block text-neutral-900 dark:text-neutral-50">
            <div className="h-[37.5vh] min-h-[400px] lg:flex flex-col items-center justify-evenly pt-8 gap-6">
              {data ? (
                data.map((item) => <NewsItem key={item.pk} {...item} />)
              ) : (
                <NotFound text="هیچ اخباری پیدا نشد" />
              )}
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
                  onTap={() => navigate("/news", { replace: true })}
                />
                <span className="max-h-max max-wmax">مشاهده همه خبرها</span>
                <ArrowLeft className="stroke-primary-500" width={20} />
              </motion.div>
            </div>
          </div>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default NewsBox;
