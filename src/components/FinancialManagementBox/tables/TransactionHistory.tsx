import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { TransactionHistory as TransactionHistoryType } from "../../../types/API";
import { TCell, THead } from "../../Wallet/WalletTableUtils";
import { useQuery } from "@tanstack/react-query";
import { getTransactionHistory } from "../../../functions/history";
import Loading from "../../Loading";
import { API_LIMIT } from "../../../constants/APILimit";
import TablePaginationButtons from "../TablePaginationButtons";

const columnHelper = createColumnHelper<TransactionHistoryType>();

const columns = [
  columnHelper.accessor("nanoid", {
    header: () => "شناسه سفارش",
    cell: (info) => <TCell title={info.getValue()} />,
  }),
  columnHelper.accessor("added_on", {
    header: () => "تاریخ",
    cell: (info) => (
      <TCell title={new Date(info.getValue()).toLocaleDateString("fa-ir")} />
    ),
  }),
  columnHelper.accessor("quantity", {
    header: () => "مقدار",
    cell: (info) => <TCell title={info.getValue()} />,
  }),
  columnHelper.accessor("type", {
    header: "نوع",
    cell: (info) => (
      <TCell title={info.getValue() == "DEPOSIT" ? "واریز" : "برداشت"} />
    ),
  }),
  columnHelper.accessor("state", {
    header: () => "وضعیت",
    cell: (info) => {
      const titles = {
        NEW: "جدید",
        PROGRESS: "درحال پردازش",
        DONE: "انجام شده",
        CANCELLED: "لغو شده",
        REJECTED: "رد شده",
      };
      return <TCell title={titles[info.getValue()]} />;
    },
  }),
  columnHelper.accessor("description", {
    header: "توضیحات",
    cell: (info) => <TCell title={info.getValue()} />,
  }),
];

const TransactionHistory = () => {
  // States
  const [currencyFilter, setCurrencyFilter] = useState<"crypto" | "toman" | "">(
    ""
  );
  const [typeFilter, setTypeFilter] = useState<"DEPOSIT" | "WITHDRAW" | "">("");
  const [paginated, setPaginated] = useState<number>(0);
  const [tableData, setTableData] = useState<TransactionHistoryType[]>([]);
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
  });
  // Queries
  const transactionHistoryQuery = useQuery(
    ["transaction_query", currencyFilter, typeFilter, paginated],
    () => getTransactionHistory(paginated, currencyFilter, typeFilter),
    { refetchOnMount: true, refetchOnWindowFocus: true, suspense: false }
  );
  // Effects
  useEffect(() => {
    if (transactionHistoryQuery.data) {
      setTableData(transactionHistoryQuery.data.results);
    }
  }, [transactionHistoryQuery.data]);
  return (
    <>
      <div className="px-6 py-4">
        <div className="w-full rounded-lg px-2 py-4 flex flex-col justify-between items-center gap-3 lg:flex-row lg:px-6 border-shades-100 border-[1px]">
          <span className="hidden lg:block font-vazir font-normal text-base">
            فیلتر سریع
          </span>
          <div className="flex flex-row gap-4 items-center">
            <span className="hidden lg:block font-vazir font-normal text-base">
              نوع:
            </span>
            <div className="flex flex-row gap-4 items-center">
              <FilterItem
                onClick={() => setTypeFilter("DEPOSIT")}
                active={typeFilter == "DEPOSIT"}
                text="واریز"
              />
              <FilterItem
                onClick={() => setTypeFilter("WITHDRAW")}
                active={typeFilter == "WITHDRAW"}
                text="برداشت"
              />
              <FilterItem
                onClick={() => setTypeFilter("")}
                active={typeFilter == ""}
                text="همه"
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <span className="hidden lg:block font-vazir font-normal text-base">
              ارز:
            </span>
            <div className="flex flex-row items-center gap-4">
              <FilterItem
                onClick={() => setCurrencyFilter("crypto")}
                active={currencyFilter == "crypto"}
                text="رمز ارز"
              />
              <FilterItem
                onClick={() => setCurrencyFilter("toman")}
                active={currencyFilter == "toman"}
                text="تومان"
              />
              <FilterItem
                onClick={() => setCurrencyFilter("")}
                active={currencyFilter == ""}
                text="همه"
              />
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, type: "tween" }}
        className="w-full overflow-x-scroll scrollbar-vertical"
      >
        {transactionHistoryQuery.isFetching ? (
          <Loading />
        ) : (
          <table className="min-w-full">
            <thead className="border-b-[1px] border-b-black">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <THead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        minWidth: header.getSize(),
                        position: "relative",
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </THead>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b-[1px] border-b-neutral-300"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
      <TablePaginationButtons
        query={transactionHistoryQuery}
        nextPaginated={() => setPaginated((paginated) => paginated + API_LIMIT)}
        previousePaginated={() =>
          setPaginated((paginated) => paginated - API_LIMIT)
        }
      />
    </>
  );
};

type PropsT = {
  active?: boolean;
  text: string;
  onClick: () => void;
};

const FilterItem: React.FC<PropsT> = ({ active, text, onClick }) => (
  <motion.span
    variants={{
      active: {
        borderColor: "rgba(0 0 0 1)",
      },
      deactive: {
        borderColor: "rgba(0 0 0 0)",
      },
      hover: {
        borderColor: "rgba(0 0 0 0.5)",
      },
    }}
    initial="deactive"
    animate={active ? "active" : "deactive"}
    whileHover="hover"
    whileTap="active"
    onTap={onClick}
    className="font-vazir cursor-pointer border-[1px] px-2 py-1 rounded-lg font-normal text-sm"
  >
    {text}
  </motion.span>
);

export default TransactionHistory;
