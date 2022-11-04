import { signal } from "@preact/signals-react";
import {
  QueryErrorResetBoundary,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import React, { lazy, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilState, useRecoilValue } from "recoil";
import { tickers } from "../../atoms/tickers";
import { tickers_fav } from "../../atoms/tickers_fav";
import { userToken } from "../../atoms/userToken";
import { getTickers } from "../../hooks/useTickers";
import { TickerTable } from "../../types/API";
import ErrorFetch from "../ErrorFetch";

export const tickerSearch = signal<string>("");

const ListContainerMobile = lazy(() => import("./ListContainer.mobile"));
const ListContainerDesktop = lazy(() => import("./ListContainer.desktop"));

const ListSelector: React.FC = () => {
  const [actualSearch, setActualSearch] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [tickersList, setTickersList] = useRecoilState(tickers);
  const [tickersFavList, setTickersFavList] = useRecoilState(tickers_fav);
  const [favedEnabled, setFavedEnabled] = useState<boolean>(false);
  const userTokenD = useRecoilValue(userToken);
  const [ws, setWS] = useState<WebSocket | null>(null);
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
  const tickerFavReset = () => tickersFavouriteQuery.refetch();
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
    setTimer(setTimeout(() => setActualSearch(tickerSearch.value ?? ""), 150));
  }, [tickerSearch.value]);
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
  useEffect(() => {
    if (!ws) {
      const wsTemp = new WebSocket(
        import.meta.env.VITE_WS_BASE + "cryptobase/ticker/"
      );
      wsTemp.onopen = () => {
        console.log("Connected");
      };
      wsTemp.onmessage = (data) => {
        // console.dir(JSON.parse(data.data));
      };
    }
  }, []);
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFetch resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <div className="relative h-max lg:h-full lg:overflow-hidden">
            <ListContainerMobile
              onTapFav={tickerFavReset}
              onScroll={onHitEnd}
              onScrollFav={onHitEndFav}
            />
            <ListContainerDesktop
              onScroll={onHitEnd}
              onScrollFav={onHitEndFav}
              onFavTap={tickerFavReset}
            />
          </div>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ListSelector;
