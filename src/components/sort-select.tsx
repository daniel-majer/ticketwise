"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Options } from "@/features/ticket/components/ticket-sort-input";

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  options: Options[];
  value: SortObject;
  onChange: (sort: SortObject) => void;
};

const SortSelect = ({ options, value, onChange }: SortSelectProps) => {
  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");

    // setSort({ sortKey, sortValue: sort.sortKey === sortKey ? "asc" : "desc" });
    onChange({ sortKey, sortValue });
  };

  return (
    <Select
      onValueChange={handleSort}
      defaultValue={value.sortKey + "_" + value.sortValue}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => {
          return (
            <SelectItem
              key={opt.sortKey + opt.sortValue}
              value={opt.sortKey + "_" + opt.sortValue}
            >
              {opt.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
