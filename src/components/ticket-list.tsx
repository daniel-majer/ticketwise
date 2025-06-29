import React from "react";

import SortSelect from "./sort-select";

import SearchInput from "@/features/ticket/components/search-input";
import { TicketCard } from "@/features/ticket/components/ticket-card";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { SearchParams } from "@/features/ticket/search-params";

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="animate-fade flex w-full flex-1 flex-col items-center justify-center space-y-8">
      <div className="mb-4 flex w-full max-w-[480px] gap-x-4">
        <SearchInput placeholder="Search item" />
        <SortSelect
          defaultValue="newest"
          options={[
            { label: "Newest", value: "newest" },
            { label: "Bounty", value: "bounty" },
          ]}
        />
      </div>
      {tickets.map((ticket) => {
        return <TicketCard key={ticket.id} ticket={ticket} />;
      })}
    </div>
  );
};

export default TicketList;
