import { Suspense } from "react";

import { SearchParams } from "nuqs/server";

import Loading from "./loading";

import { Heading } from "@/components/heading";
import TicketList from "@/components/ticket-list";
import { searchParamsCache } from "@/features/ticket/search-params";

type TicketsProps = {
  searchParams: SearchParams;
};

export default async function Home({ searchParams }: TicketsProps) {
  return (
    <div>
      <Heading
        title="Tickets"
        description="All tickets by everyone at one place"
      />

      <Suspense fallback={<Loading />}>
        <TicketList searchParams={searchParamsCache.parse(searchParams)} />
      </Suspense>
    </div>
  );
}
