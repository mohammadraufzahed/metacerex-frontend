import React from "react";
import { motion } from "framer-motion";
import { NewsArticleList } from "../../types/API";
import { useDateToString } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import { colorMode } from "../../signals/colorMode";

const NewsItem: React.FC<NewsArticleList> = ({
  title,
  added_on,
  description,
  slug,
  pk,
}) => {
  // States
  const date = useDateToString(added_on);
  const navigate = useNavigate();
  return (
    <article
      className="font-vazir flex flex-col gap-2 w-10/12"
      onClick={() => navigate(`/news/${pk}/${slug}`)}
    >
      <div className="flex flex-row items-center gap-3">
        <motion.div
          className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-800"
          initial={{ backgroundColor: "rgb(163 163 163 1)" }}
          animate={{ backgroundColor: "rgb(115, 115, 115)" }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
          }}
        />
        <span className="font-light text-xs text-neutral-400 dark:text-neutral-800">{`${date.day} ${date.month} ${date.year} - ${date.hours}:${date.minute}`}</span>
      </div>
      <motion.h1
        className="text-neutral-400 cursor-pointer font-bold text-base"
        whileHover={{
          color:
            colorMode.value == "dark"
              ? "rgb(38, 38, 38)"
              : "rgb(115, 115, 115)",
        }}
      >
        {title}
      </motion.h1>
      <p className="font-light text-xs text-neutral-900 dark:text-neutral-50 leading-5">
        {description}
      </p>
    </article>
  );
};

export default NewsItem;
