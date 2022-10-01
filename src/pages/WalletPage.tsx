import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { table } from "console";
import React, { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userToken } from "../atoms/userToken";
import Button from "../components/AuthenticationPage/Button";
import Loading from "../components/Loading";
import PaginationButton from "../components/PaginationButton";
import WalletPopularCurrency from "../components/Wallet/WalletPopularCurrency";
import WalletPopularCurrencyNotFound from "../components/Wallet/WalletPopularCurrencyNotFound";
import WalletTable from "../components/Wallet/WalletTable";
import WalletTableMobile from "../components/Wallet/WalletTableMobile";
import { API_LIMIT } from "../constants/APILimit";
import { getPortfolio, getWallet } from "../functions/wallet";
import { getTickers } from "../hooks/useTickers";
import Layer from "../svgs/Layer";
import Search from "../svgs/Search";

const WalletPage: React.FC = () => {
  // Refs
  const tableDesktop = useRef<HTMLDivElement | null>(null);
  // States
  const userTokenD = useRecoilValue(userToken);
  const [search, setSearch] = useState<string>("");
  const [currectSearch, setCurrectSearch] = useState<string>("");
  const [assetQuote, setAssetQuote] = useState<"usdt" | "toman">("toman");
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [paginated, setPaginated] = useState<number>(0);
  const queryClient = useQueryClient();
  // Conditions
  if (!userTokenD) return <Navigate to="/auth" replace />;
  // Queries
  const portfolioQuery = useQuery(["portfolio"], getPortfolio);
  const walletQuery = useQuery(
    ["wallet", paginated, currectSearch, assetQuote],
    () => getWallet(paginated, currectSearch, assetQuote),
    {
      suspense: false,
    }
  );
  const tickersFavouriteQuery = useQuery(
    ["tickers_favourite"],
    () => getTickers(undefined, "yes", ""),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      suspense: true,
    }
  );
  // Effects
  useEffect(() => {
    clearTimeout(timer);
    setTimer(setTimeout(() => setCurrectSearch(search), 200));
  }, [search]);
  return (
    <div className="h-[93vh] overflow-y-scroll scrollbar-vertical py-6 px-4 flex flex-col gap-7 flex-auto max-w-[95vw] overflow-hidden lg:gap-10">
      <div className="w-full flex flex-col gap-6 lg:flex-row-reverse">
        <div className="w-full flex flex-col gap-6 lg:w-5/12">
          <div className="grid grid-cols-2 items-center justify-center w-full">
            <Button
              text="مبنای قیمت ریال"
              fullWidth
              outlined={assetQuote !== "toman"}
              onClick={() => setAssetQuote("toman")}
            />
            <Button
              text="مبنای قیمت تتر"
              fullWidth
              outlined={assetQuote !== "usdt"}
              className="justify-self-end"
              onClick={() => setAssetQuote("usdt")}
            />
          </div>
          <div className="font-vazir font-bold text-sm text-primary-700 bg-neutral-50 py-3 px-5 rounded flex flex-row justify-between items-center drop-shadow lg:py-9 lg:px-2 lg:text-base">
            <span className="flex flex-row gap-3 items-center justify-center">
              <Layer className="stroke-primary-700 hidden md:block" /> ارزش لحظه
              ای پرتفو
            </span>
            <span>
              {portfolioQuery.data && portfolioQuery.data.value >= 0
                ? portfolioQuery.data.value
                : "-"}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 lg:flex-auto lg:gap-7 lg:justify-between overflow-x-scroll scrollbar-vertical lg:w-2/12">
          <span className="font-vazir font-bold text-sm lg:text-2xl lg:font-normal">
            ارز های محبوب شما
          </span>
          {tickersFavouriteQuery.data &&
          tickersFavouriteQuery.data.results.length != 0 ? (
            <div className="w-full flex flex-col items-center justify-start gap-2 lg:flex-row lg:w-max">
              {tickersFavouriteQuery.data.results.map((item, key) => (
                <WalletPopularCurrency key={key} ticker={item} />
              ))}
            </div>
          ) : (
            <WalletPopularCurrencyNotFound />
          )}
        </div>
      </div>
      <div className="w-full flex-auto flex flex-col gap-7">
        <div className="flex flex-row w-full items-center justify-between">
          <span className="font-vazir font-bold text-sm lg:text-2xl lg:font-normal">
            همه ارزها
          </span>
          <div className="w-8/12 relative lg:max-w-[612px]">
            <input
              value={search}
              onChange={({ currentTarget }) => {
                setSearch((currentTarget as HTMLInputElement).value);
              }}
              className="w-full h-8 rounded-lg placeholder:opacity-0 lg:placeholder:opacity-100 p-2 text-base font-vazir font-normal py-5 placeholder:text-neutral-700 outline-none border-[1px] border-primary-700 text-neutral-700"
              placeholder="جستجو در میان همه ارز ها"
            />
            <Search className="absolute left-2 stroke-neutral-800 bottom-1 lg:hidden" />
          </div>
        </div>
        <div className="w-full flex flex-col h-max" ref={tableDesktop}>
          {walletQuery.isFetching ? (
            <Loading />
          ) : (
            <>
              <WalletTable
                wallets={walletQuery.data ? walletQuery.data.results : []}
              />
              <WalletTableMobile
                quote={assetQuote}
                wallets={walletQuery.data ? walletQuery.data.results : []}
              />
            </>
          )}
          <div className="w-full flex flex-row items-center justify-center gap-3 py-10">
            <PaginationButton
              text="بعدی"
              disabled={
                walletQuery.data ? walletQuery.data.next == null : false
              }
              onClick={() => setPaginated((paginated) => paginated + API_LIMIT)}
            />
            <PaginationButton
              text="قبلی"
              disabled={
                walletQuery.data ? walletQuery.data.previous == null : false
              }
              onClick={() => setPaginated((paginated) => paginated - API_LIMIT)}
            />
          </div>
          {/* {walletQuery.isFetching ? <Loading /> : null} */}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
