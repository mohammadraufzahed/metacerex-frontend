import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { Ref, RefObject, useState } from "react";
import { getWallet } from "../../functions/wallet";
import Star from "../../svgs/Star";
import { Wallet } from "../../types/API";
import { TAction, TCell, TTitleCell, THead } from "./WalletTableUtils";
import { motion } from "framer-motion";
import { setFavAsset } from "../../functions/assets";
import PaginationButton from "../PaginationButton";
import { API_LIMIT } from "../../constants/APILimit";

const columnHelper = createColumnHelper<Wallet>();
const walletTableColumns = [
  columnHelper.display({
    id: "favorite",
    header: () => "مورد علاقه",
    cell: (info) => {
      const [isFaved, setIsFaved] = useState<boolean>(
        info.row.original.is_faved
      );
      return (
        <motion.div
          variants={{
            initial: {
              scale: 1,
            },
            hover: {
              scale: 1.03,
            },
            tap: {
              scale: 1.05,
            },
          }}
          initial="initial"
          whileTap="tap"
          whileHover="hover"
          onTap={() => {
            setFavAsset(info.row.original.asset.code).then((res) => {
              setIsFaved((isFaved) => !isFaved);
            });
          }}
          className="w-full cursor-pointer flex items-center justify-center"
        >
          <Star active={isFaved} />
        </motion.div>
      );
    },
    size: 110,
  }),
  columnHelper.accessor("asset", {
    header: () => "نام ارز",
    size: 120,
    cell: (info) => {
      const value = info.getValue();
      return (
        <TTitleCell
          name={value.name ? value.name ?? "" : value.name_farsi ?? ""}
          icon={value.icon}
        />
      );
    },
  }),
  columnHelper.accessor("amount", {
    header: () => "مقدار",
    cell: (info) => {
      const value = info.getValue();
      return <TCell title={value ? value.toString() : "0"} />;
    },
    size: 110,
  }),
  columnHelper.accessor("value", {
    header: () => "ارزش",
    cell: (info) => {
      const value = info.getValue();
      return <TCell title={value ? value.toString() : "0"} />;
    },
    size: 80,
  }),
  columnHelper.accessor("price_buy", {
    header: () => "قیمت خرید",
    cell: (info) => {
      const value = info.getValue();
      return <TCell title={value ? value.toString() : "0"} />;
    },
    size: 120,
  }),
  columnHelper.accessor("price_sell", {
    header: () => "قیمت فروش",
    cell: (info) => {
      const value = info.getValue();
      return <TCell title={value ? value.toString() : "0"} />;
    },
    size: 120,
  }),
  columnHelper.display({
    id: "actions",
    header: () => "عملیات",
    cell: (info) => {
      // console.dir(info.row._getAllCellsByColumnId());
      return <TAction wallet={info.row.original} />;
    },
    maxSize: 20,
    size: 40,
  }),
];

type PropsT = {
  wallets: Wallet[];
};

const WalletTable: React.FC<PropsT> = ({ wallets }) => {
  // Tables
  const walletTable = useReactTable({
    data: wallets,
    columns: walletTableColumns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
  });

  return (
    <div className="hidden w-[92.5vw] lg:flex gap-10 flex-col bg-neutral-50 py-6 overflow-x-scroll rounded-lg">
      <table className="min-w-full max-w-max">
        <thead className="border-b-[1px] border-b-black">
          {walletTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <THead
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ minWidth: header.getSize(), position: "relative" }}
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
          {walletTable.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b-[1px] border-b-neutral-300">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WalletTable;
