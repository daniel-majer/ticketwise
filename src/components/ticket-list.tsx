import React from "react";

import { TicketCard } from "@/features/ticket/components/ticket-card";
import { getTickets } from "@/features/ticket/queries/get-tickets";

type TicketListProps = {
  userId?: string;
};

const TicketList = async ({ userId }: TicketListProps) => {
  const tickets = await getTickets(userId);

  return (
    <div className="animate-fade w-full space-y-8">
      {tickets.map((ticket) => {
        return <TicketCard key={ticket.id} ticket={ticket} />;
      })}
    </div>
  );
};

export default TicketList;
