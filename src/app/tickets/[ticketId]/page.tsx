import React from "react";
import Link from "next/link";

import { LucideTriangleAlert } from "lucide-react";

import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialState } from "@/data";
import { TicketCard } from "@/features/ticket/components/ticket-card";
import { tickets } from "@/paths";

type TicketProps = {
  params: {
    ticketId: string;
  };
};

const Ticket = ({ params }: TicketProps) => {
  const { ticketId } = params;

  const ticket = initialState.find((ticket) => ticket.id === ticketId);

  if (!ticket)
    return (
      <Placeholder
        icon={<LucideTriangleAlert />}
        text="Ticket not found"
        button={
          <Button variant={"outline"} asChild>
            <Link href={tickets()}>Go to Tickets</Link>
          </Button>
        }
      />
    );

  return (
    <div className="w-full">
      <TicketCard ticket={ticket} isDetail />
    </div>
  );
};

export default Ticket;
