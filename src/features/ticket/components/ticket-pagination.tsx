"use client";

import React, { useEffect, useRef } from "react";

import { useQueryState, useQueryStates } from "nuqs";

import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "../search-params";

import Pagination from "@/components/pagination";

type TicketPaginationProps = {
  metaData: { count: number; hasNext: boolean };
};

const TicketPagination = ({ metaData }: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );
  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search);

  useEffect(() => {
    if (prevSearch.current === search) return;
    prevSearch.current = search;

    setPagination({ ...pagination, page: 0 });
  }, [pagination, search, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onChange={setPagination}
      metaData={metaData}
    />
  );
};

export default TicketPagination;
