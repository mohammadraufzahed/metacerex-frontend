import React from "react";
import { motion } from "framer-motion";
import { NewsArticleList } from "../../types/API";
import { useDateToString } from "../../utils/date";

const NewsItem: React.FC<NewsArticleList> = ({
  title,
  added_on,
  description,
}) => {
  const date = useDateToString(added_on);
  return (
    <article className="font-vazir flex flex-col gap-2 w-10/12">
      <div className="flex flex-row items-center gap-3">
        <motion.div
          className="w-2 h-2 rounded-full bg-neutral-400"
          initial={{ backgroundColor: "rgb(163 163 163 1)" }}
          animate={{ backgroundColor: "rgb(115, 115, 115)" }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
          }}
        />
        <span className="font-light text-xs text-neutral-400">{`${date.day} ${date.month} ${date.year} - ${date.hours}:${date.minute}`}</span>
      </div>
      <motion.h1
        className="text-neutral-400 cursor-pointer font-bold text-base"
        whileHover={{ color: "rgb(115, 115, 115)" }}
      >
        {title}
      </motion.h1>
      <p className="font-light text-xs text-black leading-5">{description}</p>
    </article>
  );
};

NewsItem.defaultProps = {
  title: "فدرال رزرو مقررات مربوط به معاملات بیتکوین را رصد میکند...",
  added_on: "2022-08-19T12:53:51.141Z",
  description:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
};

export default NewsItem;
