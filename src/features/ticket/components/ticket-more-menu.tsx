"use client";

import * as React from "react";

import { TicketStatus } from "@prisma/client";
import { LucideTrash2 } from "lucide-react";
import { toast } from "sonner";

import { updateTicketStatus } from "../actions/update-status";
import { TICKET_STATUS_LABELS } from "../constants";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DropwdownMenuProps = {
  trigger: React.ReactNode;
  value: TicketStatus;
  id: string;
};

export function TicketDropdownMenu({ trigger, value, id }: DropwdownMenuProps) {
  const handleStatusChange = async (status: string) => {
    const result = await updateTicketStatus(id, status as TicketStatus);

    if (result.status === "ERROR") {
      toast.error(result.message);
    } else {
      toast.success(result.message);
    }
  };

  const radioGroup = (
    <DropdownMenuRadioGroup value={value} onValueChange={handleStatusChange}>
      {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map(
        (status) => (
          <DropdownMenuRadioItem key={status} value={status}>
            <span>{TICKET_STATUS_LABELS[status]}</span>
          </DropdownMenuRadioItem>
        ),
      )}
    </DropdownMenuRadioGroup>
  );

  const deleteItem = (
    <DropdownMenuItem>
      <LucideTrash2 />
      <span>Delete</span>
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right">
        {radioGroup}
        <DropdownMenuSeparator />
        {deleteItem}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
