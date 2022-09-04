import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { TAction, TCell, TTitleCell, THead } from "./WalletTableUtils";

const fakeData = [
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
  {
    information: {
      code: "BTC",
      name_farsi: "بیت کوین",
      name: "bitcoin",
      icon: "/svgs/btc.svg",
    },
    asset_amount: 15231,
    price_toman: 512313,
    buy_price: 312313,
    sell_price: 3554311,
  },
];
const columnHelper = createColumnHelper<any>();
const walletTableColumns = [
  columnHelper.accessor("information", {
    header: () => "نام ارز",
    size: 120,
    cell: (info) => {
      const value = info.getValue();
      return <TTitleCell name={value.name} icon={value.icon} />;
    },
  }),
  columnHelper.accessor("asset_amount", {
    header: () => "مقدار",
    cell: (info) => <TCell title={info.getValue()} />,
    size: 110,
  }),
  columnHelper.accessor("price_toman", {
    header: () => "ارزش به ریال",
    cell: (info) => <TCell title={info.getValue()} />,
    size: 80,
  }),
  columnHelper.accessor("buy_price", {
    header: () => "قیمت خرید",
    cell: (info) => <TCell title={info.getValue()} />,
    size: 120,
  }),
  columnHelper.accessor("sell_price", {
    header: () => "قیمت فروش",
    cell: (info) => <TCell title={info.getValue()} />,
    size: 120,
  }),
  columnHelper.display({
    id: "actions",
    header: () => "عملیات",
    cell: (info) => {
      // console.dir(info.row._getAllCellsByColumnId());
      return <TAction />;
    },
    maxSize: 20,
    size: 40,
  }),
];

const WalletTable = () => {
  const walletTable = useReactTable({
    data: fakeData,
    columns: walletTableColumns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
  });

  return (
    <div className="hidden lg:block bg-neutral-50 w-full py-6 rounded-lg">
      <table className="w-full">
        <thead className="border-b-[1px] border-b-black">
          {walletTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <THead
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize(), position: "relative" }}
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
