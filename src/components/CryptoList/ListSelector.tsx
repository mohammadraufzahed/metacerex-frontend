import { QueryErrorResetBoundary, useQuery } from "@tanstack/react-query";
import React, { lazy, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilState, useRecoilValue } from "recoil";
import { screen } from "../../atoms/screen";
import { tickers } from "../../atoms/tickers";
import { useTickers } from "../../hooks/useTickers";
import ErrorFetch from "../ErrorFetch";

const ListContainerMobile = lazy(() => import("./ListContainer.mobile"));
const ListContainerDesktop = lazy(() => import("./ListContainer.desktop"));

const ListSelector: React.FC = () => {
  const tickersQuery = useQuery(["tickers"], useTickers, {
    staleTime: 60000,
    refetchIntervalInBackground: true,
    refetchInterval: 60000,
  });
  const screenR = useRecoilValue(screen);
  const [tickersList, setTickersList] = useRecoilState(tickers);
  useEffect(() => {
    setTickersList(tickersQuery.data ?? []);
  }, [tickersQuery]);
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorFetch resetErrorBoundary={resetErrorBoundary} />
          )}
        >
          <div className="relative lg:h-[49.5vh] lg:overflow-hidden">
            <ListContainerMobile />
            <ListContainerDesktop />
          </div>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ListSelector;
