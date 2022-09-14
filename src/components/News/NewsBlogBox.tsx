import React from "react";
import { useRecoilValue } from "recoil";
import { NewsArticleList } from "../../types/API";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { screen } from "../../signals/screen";

type PropsT = {
  post: NewsArticleList;
};

const NewsBlogBox: React.FC<PropsT> = ({ post }) => {
  const navigate = useNavigate();
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.03 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, type: "tween" }}
      onClick={() => navigate(`/news/${post.pk}/${post.slug}`)}
      className="w-full cursor-pointer h-[235px] bg-neutral-50 rounded-lg p-2 md:h-max md:p-4"
    >
      <div className="flex flex-row h-max gap-4">
        <div className="w-[64px] h-[64px] md:min-w-[300px] md:min-h-[168px]">
          <img src={post.cover.thumb} className="w-full h-full rounded" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-vazir font-light text-xs">
            {new Date(post.added_on).toLocaleDateString("fa-ir")}
          </span>
          <h1 className="font-vazir font-bold text-sm">
            {post.title.slice(0, screen.value.width > 690 ? 100 : 60)}
            {post.title.length > 60 && screen.value.width < 690
              ? "..."
              : post.title.length > 100
              ? "..."
              : null}
          </h1>
          <p className="hidden md:block font-vazir font-normal mt-3 text-base">
            {post.description}
          </p>
        </div>
      </div>
      <p className="md:hidden font-vazir font-normal mt-3 text-base">
        {post.description}
      </p>
    </motion.article>
  );
};

export default NewsBlogBox;
