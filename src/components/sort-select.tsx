"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortSelectProps = {
  defaultValue: string;
  options: { label: string; value: string }[];
};

const SortSelect = ({ defaultValue, options }: SortSelectProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === defaultValue) {
      params.delete("sort");
    } else if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      onValueChange={handleSearch}
      defaultValue={searchParams.get("sort")?.toString() || defaultValue}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => {
          return (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
