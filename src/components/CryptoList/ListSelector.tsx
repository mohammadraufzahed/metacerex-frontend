import {
  QueryErrorResetBoundary,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import React, { lazy, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilState, useRecoilValue } from "recoil";
import { tickers } from "../../atoms/tickers";
import { tickerSearch } from "../../atoms/tickerSearch";
import { tickers_fav } from "../../atoms/tickers_fav";
import { userToken } from "../../atoms/userToken";
import { getTickers } from "../../hooks/useTickers";
import { TickerTable } from "../../types/API";
import ErrorFetch from "../ErrorFetch";

const ListContainerMobile = lazy(() => import("./ListContainer.mobile"));
const ListContainerDesktop = lazy(() => import("./ListContainer.desktop"));

const ListSelector: React.FC = () => {
  const search = useRecoilValue(tickerSearch);
  const [actualSearch, setActualSearch] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [tickersList, setTickersList] = useRecoilState(tickers);
  const [tickersFavList, setTickersFavList] = useRecoilState(tickers_fav);
  const [favedEnabled, setFavedEnabled] = useState<boolean>(false);
  const userTokenD = useRecoilValue(userToken);
  // Queries
  const tickersQuery = useInfiniteQuery(
    ["tickers", actualSearch],
    ({ pageParam }) => getTickers(pageParam, "no", actualSearch),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      suspense: false,
    }
  );
  const tickersFavouriteQuery = useInfiniteQuery(
    ["tickers_favourite", actualSearch],
    ({ pageParam }) => getTickers(pageParam, "yes", actualSearch),
    {
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
      enabled: favedEnabled,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      suspense: false,
    }
  );
  // Functions
  const onHitEnd = (e: HTMLDivElement) => {
    if (e.scrollHeight - e.scrollTop - 1 < e.offsetHeight) {
      if (tickersQuery.data) {
        tickersQuery.fetchNextPage();
      }
    }
  };
  const onHitEndFav = (e: HTMLDivElement) => {
    if (e.scrollHeight - e.scrollTop - 1 < e.offsetHeight) {
      if (tickersFavouriteQuery.data) {
        tickersFavouriteQuery.fetchNextPage();
      }
    }
  };
  // Effects
  useEffect(() => {
    clearTimeout(timer);
    setTimer(setTimeout(() => setActualSearch(search ?? ""), 150));
  }, [search]);
  useEffect(() => {
    if (tickersQuery.data) {
      const tickers: TickerTable[] = [];
      tickersQuery.data.pages.map((item) => {
        item.results.map((item) => tickers.push(item));
      });
      setTickersList(tickers);
    }
  }, [tickersQuery.data]);
  useEffect(() => {
    if (tickersFavouriteQuery.data) {
      const tickers: TickerTable[] = [];
      tickersFavouriteQuery.data.pages.map((item) => {
        item.results.map((item) => tickers.push(item));
      });
      setTickersFavList(tickers);
    }
  }, [tickersFavouriteQuery.data]);
  useEffect(() => {
    if (userTokenD) {
      setFavedEnabled(true);
    }
  }, [userTokenD]);
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFetch resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <div className="relative h-max lg:h-[49.5vh] lg:overflow-hidden">
            <ListContainerMobile
              onScroll={onHitEnd}
              onScrollFav={onHitEndFav}
            />
            <ListContainerDesktop
              onScroll={onHitEnd}
              onScrollFav={onHitEndFav}
            />
          </div>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ListSelector;
