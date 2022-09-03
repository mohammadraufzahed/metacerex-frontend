import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useRecoilValue } from "recoil";
import { newsSearch } from "../atoms/newsSearch";
import Loading from "../components/Loading";
import NewsBlogBox from "../components/News/NewsBlogBox";
import NewsSearchBox from "../components/News/NewsSearchBox";
import NotFound from "../components/NotFound";
import PaginationButton from "../components/PaginationButton";
import { API_LIMIT } from "../constants/APILimit";
import { getNewsPaginated } from "../functions/news";

const NewsListPage: React.FC = () => {
  // States
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const searchQuery = useRecoilValue(newsSearch);
  // Queries
  const newsQuery = useQuery(
    ["news", page, search],
    () => getNewsPaginated(page, search),
    {
      keepPreviousData: true,
    }
  );
  // Effects
  useEffect(() => {
    if (searchQuery !== search) {
      setPage(0);
      setSearch(searchQuery);
    }
  }, [searchQuery]);
  return (
    <>
      <Helmet>
        <title>صرافی - اخبار</title>
      </Helmet>
      <div className="flex-auto flex flex-col px-4 py-2 gap-4 md:py-4 md:grid md:grid-cols-12 max-w-[1600px] 2xl:mx-auto 2xl:gap-10">
        <div className="w-full md:col-span-4 xl:col-span-3">
          <NewsSearchBox />
        </div>
        <div className="flex flex-col w-full gap-4 md:gap-6 md:col-span-8 xl:col-span-9">
          <AnimatePresence mode="wait">
            {newsQuery.isFetching ? (
              <Loading />
            ) : newsQuery.data && newsQuery.data.results.length !== 0 ? (
              <>
                {newsQuery.data.results.map((item) => (
                  <NewsBlogBox key={item.pk} post={item} />
                ))}
                <div className="w-full flex flex-row items-center justify-center gap-5">
                  <PaginationButton
                    text="بعدی"
                    disabled={newsQuery.data?.next == null}
                    onClick={() => setPage((page) => page + API_LIMIT)}
                  />
                  <PaginationButton
                    text="قبلی"
                    disabled={newsQuery.data?.previous == null}
                    onClick={() => setPage((page) => page - API_LIMIT)}
                  />
                </div>
              </>
            ) : (
              <NotFound text="اخبار مورد نظر پیدا نشد!" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default NewsListPage;
