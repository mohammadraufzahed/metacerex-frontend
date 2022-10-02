import { useSignal } from "@preact/signals-react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userToken } from "../atoms/userToken";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import PaginationButton from "../components/PaginationButton";
import { API_LIMIT } from "../constants/APILimit";
import getNotification from "../functions/notification";
import { useDateToString } from "../utils/date";

const NotificationPage = () => {
  // States
  const userTokenD = useRecoilValue(userToken);
  const page = useSignal<number>(0);
  // Queries
  const notificationQuery = useQuery(
    ["notification", page.value],
    () => getNotification(page.value),
    {
      refetchInterval: 12000,
      staleTime: 12000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchIntervalInBackground: true,
      suspense: false,
    }
  );
  if (!userTokenD || !userTokenD.access)
    return <Navigate to="/auth/login" replace />;
  return (
    <div className="h-[93vh] flex flex-col overflow-y-scroll scrollbar-vertical pb-4 gap-4 md:gap-6 w-full pt-16 px-16">
      {notificationQuery.isFetching ? (
        <Loading />
      ) : notificationQuery.data &&
        notificationQuery.data.results.length > 0 ? (
        notificationQuery.data.results.map((item, key) => (
          <Notification key={key} body={item.message} date={item.added_on} />
        ))
      ) : (
        <NotFound text="لیست اعلان ها خالی میباشد." />
      )}
      {notificationQuery.data &&
      (notificationQuery.data.next || notificationQuery.data.previous) ? (
        <div className="mx-auto flex flex-row gap-4">
          <PaginationButton
            text="بعدی"
            disabled={!notificationQuery.data || !notificationQuery.data.next}
            onClick={() => (page.value += API_LIMIT)}
          />
          <PaginationButton
            text="قبلی"
            disabled={
              !notificationQuery.data || !notificationQuery.data.previous
            }
            onClick={() => (page.value -= API_LIMIT)}
          />
        </div>
      ) : null}
    </div>
  );
};

type NotificationProps = {
  body: string;
  date: string;
};
const Notification: React.FC<NotificationProps> = ({ body, date }) => {
  const persianDate = useDateToString(date);
  return (
    <div className="w-full gap-4 font-vazir rounded-2xl drop-shadow-xl h-max flex flex-col items-start p-8 justify-center bg-neutral-50">
      <span className="text-base font-normal">{`${persianDate.year}/${persianDate.month_number}/${persianDate.day}`}</span>
      <div className="flex flex-row items-center justify-start w-full gap-4">
        <img className="self-center" src="/svgs/notification-bing.svg" alt="" />
        <p className="font-normal text-sm md:text-base">{body}</p>
      </div>
    </div>
  );
};

export default NotificationPage;
