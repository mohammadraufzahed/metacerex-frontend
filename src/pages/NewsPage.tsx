import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getNews } from "../functions/news";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const NewsPage = () => {
  // States
  const params = useParams();
  // Queries
  const newsQuery = useQuery(["news_single", params.id], () =>
    getNews(params.id ?? "")
  );
  const navigate = useNavigate();
  return (
    <div className="w-full h-[93vh] overflow-y-scroll scrollbar-vertical bg-background-100">
      <Helmet>
        <title>صرافی - {newsQuery.data?.title}</title>
      </Helmet>
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 1.04 }}
        className="flex py-2 px-1 flex-row gap-4 items-center justify-center w-max font-vazir font-bold text-base cursor-pointer text-primary-700 md:pt-12 md:px-16 max-w-[1600px] 2xl:w-full 2xl:mx-auto 2xl:justify-start"
        onClick={() =>
          navigate("/news", {
            replace: true,
          })
        }
      >
        <FaArrowRight />
        <span>بازگشت</span>
      </motion.div>
      <div className="p-4 flex flex-col gap-2 w-full md:block md:py-12 md:px-16 max-w-[1600px] 2xl:mx-auto">
        <div className="md:w-max self-end md:float-left md:pr-12 md:pb-2 lg:pr-24 lg:pb-10">
          <motion.img
            className="rounded-2xl  md:w-[420px] md:h-[250px] "
            src={newsQuery.data?.cover.crop}
          />
        </div>
        <div className="flex flex-col gap-2 md:block">
          <span className="font-vazir font-light text-xs">
            {new Date(newsQuery.data?.added_on ?? "").toLocaleDateString(
              "fa-ir"
            )}
          </span>
          <h1 className="font-vazir font-bold text-sm leading-8 md:text-xl md:my-2">
            {newsQuery.data?.title}
          </h1>
          <p
            className="font-vazir font-normal text-sm text-justify md:text-base"
            dangerouslySetInnerHTML={{ __html: newsQuery.data?.body ?? "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
