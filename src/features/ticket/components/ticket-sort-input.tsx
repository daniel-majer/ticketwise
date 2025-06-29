"use client";

import React from "react";

import { useQueryStates } from "nuqs";

import { sortOptions, sortParser } from "../search-params";

import SortSelect from "@/components/sort-select";

export type Options = { label: string; sortValue: string; sortKey: string };

type TicketSortInputProps = {
  options: Options[];
};
const TicketSortInput = ({ options }: TicketSortInputProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);
  return <SortSelect value={sort} onChange={setSort} options={options} />;
};

export default TicketSortInput;
