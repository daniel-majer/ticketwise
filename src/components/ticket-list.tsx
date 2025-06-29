import React from "react";

import { LucideTriangleAlert } from "lucide-react";

import Placeholder from "./placeholder";

import { TicketCard } from "@/features/ticket/components/ticket-card";
import TicketPagination from "@/features/ticket/components/ticket-pagination";
import TicketSearchInput from "@/features/ticket/components/ticket-search-input";
import TicketSortInput from "@/features/ticket/components/ticket-sort-input";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { ParsedSearchParams } from "@/features/ticket/search-params";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const { list: tickets, metaData } = await getTickets(userId, searchParams);

  return (
    <div className="space-y-8">
      <div className="animate-fade flex w-full flex-1 flex-col items-center justify-center space-y-8">
        <div className="mb-4 flex w-full max-w-[480px] gap-x-4">
          <TicketSearchInput placeholder="Search item" />
          <TicketSortInput
            options={[
              { label: "Newest", sortValue: "desc", sortKey: "createdAt" },
              { label: "Bounty", sortValue: "desc", sortKey: "bounty" },
            ]}
          />
        </div>
        {tickets.length ? (
          tickets.map((ticket) => {
            return <TicketCard key={ticket.id} ticket={ticket} />;
          })
        ) : (
          <Placeholder text="Nothing found" icon={<LucideTriangleAlert />} />
        )}
      </div>
      <div className="mx-auto w-full max-w-[480px]">
        <TicketPagination metaData={metaData} />
      </div>
    </div>
  );
};

export default TicketList;
