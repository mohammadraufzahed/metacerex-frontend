import { TickerTable } from "../types/API";

export default function filterTickersList(
  tickerList: TickerTable[],
  searchText: string
): TickerTable[] {
  return tickerList.filter(
    (item) =>
      item.code.includes(searchText) ||
      item.base_asset.code.includes(searchText) ||
      item.base_asset.name?.includes(searchText) ||
      item.base_asset.name_farsi?.includes(searchText)
  );
}
