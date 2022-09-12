import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import PaginationButton from "../PaginationButton";

type PropsT = {
  query: UseQueryResult<any, any>;
  nextPaginated: () => void;
  previousePaginated: () => void;
};

const TablePaginationButtons: React.FC<PropsT> = ({
  query,
  nextPaginated,
  previousePaginated,
}) => {
  return (
    <>
      {(query.data && !query.isFetching && query.data.previous) ||
      query.data?.next ? (
        <div className="mx-auto w-max flex flex-row gap-3 my-4">
          <PaginationButton
            text="بعدی"
            onClick={nextPaginated}
            disabled={query.data && !query.data.next}
          />
          <PaginationButton
            onClick={previousePaginated}
            text="قبلی"
            disabled={query.data && !query.data.previous}
          />
        </div>
      ) : null}
    </>
  );
};

export default TablePaginationButtons;
