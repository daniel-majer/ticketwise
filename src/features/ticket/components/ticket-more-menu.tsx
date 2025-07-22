"use client";

import * as React from "react";

import { TicketStatus } from "@prisma/client";
import { LucideTrash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteTicket } from "../actions/delete-ticket";
import { updateTicketStatus } from "../actions/update-status";
import { TICKET_STATUS_LABELS } from "../constants";

import { useConfirmDialog } from "@/components/confirm-dialog";
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
  const [dialogButton, dialog] = useConfirmDialog({
    trigger: (
      <DropdownMenuItem>
        <LucideTrash2 />
        Delete
      </DropdownMenuItem>
    ),
    action: deleteTicket.bind(null, id),
  });

  const handleStatusChange = async (status: string) => {
    // const result = await updateTicketStatus(id, status as TicketStatus);
    const promise = updateTicketStatus(id, status as TicketStatus);

    toast.promise(promise, {
      loading: "Updating status...",
    });

    const result = await promise;

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

  return (
    <>
      {dialog}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          {radioGroup}
          <DropdownMenuSeparator />
          {dialogButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
