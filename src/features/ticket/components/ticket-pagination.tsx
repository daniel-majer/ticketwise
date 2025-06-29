"use client";

import React from "react";

import { useQueryStates } from "nuqs";

import { paginationOptions, paginationParser } from "../search-params";

import Pagination from "@/components/pagination";

type TicketPaginationProps = {
  metaData: { count: number; hasNext: boolean };
};

const TicketPagination = ({ metaData }: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  return (
    <Pagination
      pagination={pagination}
      onChange={setPagination}
      metaData={metaData}
    />
  );
};

export default TicketPagination;
