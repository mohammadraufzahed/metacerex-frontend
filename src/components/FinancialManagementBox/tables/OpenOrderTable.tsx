import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userToken } from "../../../atoms/userToken";
import { getOpenOrders } from "../../../functions/history";
import LoginRequiredPage from "../../../pages/LoginRequiredPage";
import { OrdersOpen } from "../../../types/API";
import { TCell, THead, TTitleCell } from "../../Wallet/WalletTableUtils";
import { motion } from "framer-motion";
import PaginationButton from "../../PaginationButton";
import { API_LIMIT } from "../../../constants/APILimit";
import Loading from "../../Loading";
import TablePaginationButtons from "../TablePaginationButtons";
import { httpClient } from "../../../axios";
import useCustomToast from "../../../hooks/useCustomToast";

const columnHelper = createColumnHelper<OrdersOpen>();

const tableColumns = [
  columnHelper.accessor("side", {
    header: () => "نوع عملیات",
    cell: (info) => (
      <TCell title={info.getValue() == "BUY" ? "خرید" : "فروش"} />
    ),
    size: 100,
  }),
  columnHelper.accessor("base_asset", {
    header: () => "نام ارز",
    size: 170,
    cell: (info) => {
      const value = info.getValue();
      return (
        <TTitleCell
          name={value.name_farsi ? value.name_farsi : value.name ?? ""}
          icon={value.icon}
        />
      );
    },
  }),
  columnHelper.accessor("added_on", {
    header: () => "تاریخ",
    size: 120,
    cell: (info) => (
      <TCell title={new Date(info.getValue()).toLocaleDateString("fa-ir")} />
    ),
  }),
  columnHelper.accessor("api_quantity", {
    header: () => "تعداد",
    size: 150,
    cell: (info) => <TCell title={info.getValue()?.toString() ?? ""} />,
  }),
  columnHelper.display({
    id: "cancell",
    header: () => "عملیات",
    cell: (info) => (
      <div className="w-full flex items-center justify-center">
        <motion.button
          className="bg-error rounded-lg py-1.5 w-[70px] font-vazir font-normal text-base text-neutral-50 dark:text-neutral-900"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 1.04 }}
          onTap={() => {
            httpClient
              .delete("spot/orders/main/cancel", {
                params: { order_id: info.row.original.order_id },
              })
              .then((res) => {
                if (res.status == 204) {
                  useCustomToast(
                    "bottom-right",
                    "success",
                    "درخواست شما با موفقیت انجام شد."
                  );
                }
              });
          }}
        >
          لغو
        </motion.button>
      </div>
    ),
  }),
];

const OpenOrderTable = () => {
  // States
  const [paginated, setPaginated] = useState<number>(0);
  const [tableData, setTableData] = useState<OrdersOpen[]>([]);
  const userTokenD = useRecoilValue(userToken);
  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
  });
  //  Conditions
  if (!userTokenD) return <LoginRequiredPage />;
  //  Queries
  const openOrdersQuery = useQuery(
    ["open_orders_query", paginated],
    () => getOpenOrders(paginated),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  //  Effects
  useEffect(() => {
    if (openOrdersQuery.data) {
      setTableData([...openOrdersQuery.data.results]);
      table.reset();
    }
  }, [openOrdersQuery.data]);
  return (
    <>
      {!openOrdersQuery.isFetching ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, type: "tween" }}
          className="w-full w-max-full overflow-scroll scrollbar-vertical"
        >
          <table className="min-w-full">
            <thead className="border-b-[1px] border-neutral-900 dark:border-b-neutral-50">
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
                <tr key={row.id} className="border-b-[1px] border-b-neutral-50">
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
      ) : (
        <Loading />
      )}
      <TablePaginationButtons
        query={openOrdersQuery}
        nextPaginated={() => setPaginated((paginated) => paginated + API_LIMIT)}
        previousePaginated={() =>
          setPaginated((paginated) => paginated - API_LIMIT)
        }
      />
    </>
  );
};

export default OpenOrderTable;
