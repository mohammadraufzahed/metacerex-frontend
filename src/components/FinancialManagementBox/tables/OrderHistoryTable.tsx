import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { API_LIMIT } from "../../../constants/APILimit";
import { getOrderHistory } from "../../../functions/history";
import Search from "../../../svgs/Search";
import { OrderHistory } from "../../../types/API";
import Loading from "../../Loading";
import PaginationButton from "../../PaginationButton";
import { TCell, THead } from "../../Wallet/WalletTableUtils";
import TablePaginationButtons from "../TablePaginationButtons";

const columnHelper = createColumnHelper<OrderHistory>();
const columns = [
  columnHelper.accessor("order_id", {
    header: () => "شناسه عملیات",
    cell: (info) => <TCell title={info.getValue()} />,
  }),
  columnHelper.accessor("added_on", {
    header: () => "تاریخ",
    cell: (info) => (
      <TCell title={new Date(info.getValue()).toLocaleDateString("fa-ir")} />
    ),
  }),
  columnHelper.accessor("type", {
    header: () => "بازار",
    cell: (info) => (
      <TCell title={info.getValue() == "INSTANT" ? "سریع" : "اصلی"} />
    ),
  }),
  columnHelper.accessor("asset_unit_price_toman", {
    header: () => "قیمت",
    cell: (info) => <TCell title={info.getValue()?.toString() ?? ""} />,
  }),
  columnHelper.accessor("quantity", {
    header: () => "مقدار",
    cell: (info) => <TCell title={info.getValue()} />,
  }),
  columnHelper.accessor("amount_toman", {
    header: () => "مبلغ",
    cell: (info) => <TCell title={info.getValue()?.toString() ?? ""} />,
  }),
  columnHelper.accessor("fee_total", {
    header: () => "کارمزد",
    cell: (info) => <TCell title={info.getValue()?.toString() ?? ""} />,
  }),
  columnHelper.accessor("state", {
    header: () => "وضعیت",
    cell: (info) => {
      const titles = {
        CANCELED: "لغو شده",
        DONE: "انجام شده",
        EXPIRED: "منقضی شده",
        OPEN: "باز",
        REJECTED: "رد شده",
      };
      return <TCell title={titles[info.getValue()]} />;
    },
  }),
];

type PropsT = {};

const OrderHistoryTable: React.FC<PropsT> = ({}) => {
  // States
  const [paginated, setPaginated] = useState<number>(0);
  const [tableData, setTableData] = useState<OrderHistory[]>([]);
  const [search, setSearch] = useState<string>("");
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
  });
  // Queries
  const orderHistoryQuery = useQuery(
    ["order_history", paginated, search],
    () => getOrderHistory(paginated, search),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      suspense: false,
    }
  );
  // Effects
  useEffect(() => {
    if (orderHistoryQuery.data) {
      setTableData(orderHistoryQuery.data.results);
    }
  }, [orderHistoryQuery.data]);
  return (
    <>
      <motion.div className="w-full h-10 px-4 relative">
        <motion.input
          variants={{
            initial: {
              borderColor: "rgba(163, 163, 163 0)",
            },
            focus: {
              borderColor: "rgba(163, 163, 163 1)",
            },
            hover: {
              borderColor: "rgba(163, 163, 163 0.7)",
            },
          }}
          initial="initial"
          whileFocus="focus"
          whileHover="hover"
          value={search}
          onChange={({ currentTarget }) => setSearch(currentTarget.value)}
          className="w-full border-neu h-full border-[1px] rounded-lg font-vazir font-normal text-sm px-10 outline-none"
          placeholder="جستجو در تاریخچه سفارشات"
        />
        <Search className="absolute top-2 right-6 stroke-neutral-600" />
      </motion.div>
      {orderHistoryQuery.isFetching ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, type: "tween" }}
          className="w-full overflow-x-scroll scrollbar-vertical"
        >
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
        </motion.div>
      )}
      <TablePaginationButtons
        query={orderHistoryQuery}
        nextPaginated={() => setPaginated((paginated) => paginated + API_LIMIT)}
        previousePaginated={() =>
          setPaginated((paginated) => paginated - API_LIMIT)
        }
      />
    </>
  );
};

export default OrderHistoryTable;
