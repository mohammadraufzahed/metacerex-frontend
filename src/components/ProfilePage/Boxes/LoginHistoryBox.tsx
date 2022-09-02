import { useQuery } from "@tanstack/react-query";
import React, { MouseEventHandler, useState } from "react";
import { getUserLogs } from "../../../functions/user";
import ProfileFormLayout from "../../../layouts/ProfileFormLayout";
import { useDateToString } from "../../../utils/date";
import { API_LIMIT } from "../../../constants/APILimit";
import PaginationButton from "../../PaginationButton";

const LoginHistoryBox = () => {
  // States
  const [nextPage, setNextPage] = useState<number>(0);
  // Queries
  const logsQuery = useQuery(
    ["userLogs", nextPage],
    () => getUserLogs(nextPage),
    {
      keepPreviousData: true,
    }
  );
  return (
    <ProfileFormLayout title="تاریخچه ورود">
      <table className="w-full">
        <thead className="border-b-[1px] border-b-black pb-2 text-center0">
          <TableHead text="تاریخ" className="w-1/2 md:w-auto" />
          <TableHead text="نوع عملیات" className="w-1/2 md:w-auto" />
          <TableHead text="آی پی" className="hidden md:table-cell" />
          <TableHead text="توضیحات" className="hidden w-[50%] md:table-cell" />
        </thead>
        <tbody className="py-2 space-y-2">
          {logsQuery.data?.results.map(
            ({ action, remote_addr, requested_at }) => {
              const persianDateStr = useDateToString(requested_at);
              const persianDate = new Date(requested_at).toLocaleDateString(
                "fa-ir"
              );
              return (
                <tr className=" border-b-[1px] border-b-neutral-300">
                  <TableTD text={persianDate} />
                  <TableTD text={action} />
                  <TableTD
                    text={remote_addr}
                    className="hidden md:table-cell"
                  />
                  <TableTD
                    text={`ورود در ساعت ${persianDateStr.hours}:${persianDateStr.minute} مورخ ${persianDate}`}
                    className="hidden md:table-cell"
                  />
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <div className="w-full flex flex-row items-center justify-center gap-4 mt-5">
        <PaginationButton
          text="بعدی"
          disabled={logsQuery.data && logsQuery.data.next == null}
          onClick={() => setNextPage((nextPage) => nextPage + API_LIMIT)}
        />
        <PaginationButton
          text="قبلی"
          disabled={logsQuery.data && logsQuery.data.previous == null}
          onClick={() => setNextPage((nextPage) => nextPage - API_LIMIT)}
        />
      </div>
    </ProfileFormLayout>
  );
};

type TableHeadT = {
  text: string;
  className?: string;
};

const TableHead: React.FC<TableHeadT> = ({ text, className }) => (
  <th
    className={`font-vazir font-normal text-center text-base ${className}`}
    colSpan={1}
  >
    {text}
  </th>
);

type TableTDType = {
  text: string;
  className?: string;
};

const TableTD: React.FC<TableTDType> = ({ text, className }) => (
  <td
    className={`text-center font-vazir font-light text-xs text-neutral-900 py-4 ${className}`}
  >
    {text}
  </td>
);

export default LoginHistoryBox;
