"use client";

import * as React from "react";

import { TicketStatus } from "@prisma/client";
import { LucideTrash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteTicket } from "../actions/delete-ticket";
import { updateTicketStatus } from "../actions/update-status";
import { TICKET_STATUS_LABELS } from "../constants";
import { TicketWithMeta } from "../types";

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
  ticket: TicketWithMeta;
  trigger: React.ReactNode;
};

export function TicketDropdownMenu({ ticket, trigger }: DropwdownMenuProps) {
  const [dialogButton, dialog] = useConfirmDialog({
    trigger: (
      <DropdownMenuItem disabled={!ticket.permissions.canDeleteTicket}>
        <LucideTrash2 />
        Delete
      </DropdownMenuItem>
    ),
    action: deleteTicket.bind(null, ticket.id),
  });

  const handleStatusChange = async (status: string) => {
    // const result = await updateTicketStatus(id, status as TicketStatus);
    const promise = updateTicketStatus(ticket.id, status as TicketStatus);

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
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleStatusChange}
    >
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
