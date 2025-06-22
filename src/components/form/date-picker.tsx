"use client";

import * as React from "react";

import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Input } from "../ui/input";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DataPickerProps = {
  defaultValue: string;
  name: string;
  imperativeHandleRef: React.RefObject<{ reset: () => void } | null>;
};

export function DatePicker({
  defaultValue,
  name,
  imperativeHandleRef,
}: DataPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined,
  );

  const formatStringDate = date ? format(date, "yyyy-MM-dd") : "";

  React.useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => setDate(undefined),
  }));

  console.log(date);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id={name}
          className="w-48 justify-between font-normal"
        >
          {date ? formatStringDate : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <Input type="hidden" name={name} value={formatStringDate} />
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
