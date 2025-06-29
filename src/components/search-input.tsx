"use client";

import React from "react";

import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";

type SearchInputProps = {
  placeholder: string;
  search: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ placeholder, search, onChange }: SearchInputProps) => {
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    300,
  );

  return (
    <Input
      defaultValue={search}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
};

export default SearchInput;
