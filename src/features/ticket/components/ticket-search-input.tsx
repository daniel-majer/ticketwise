"use client";

import React from "react";

import { useQueryState } from "nuqs";

import { searchParser } from "../search-params";

import SearchInput from "@/components/search-input";

type SearchInputProps = {
  placeholder: string;
};

const TicketSearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  return (
    <SearchInput
      placeholder={placeholder}
      search={search}
      onChange={setSearch}
    />
  );
};

export default TicketSearchInput;
