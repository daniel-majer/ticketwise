import React, { Suspense } from "react";

import { SearchParams } from "nuqs";

import Loading from "../loading";

import CardWrapper from "@/components/card-custom";
import { Heading } from "@/components/heading";
import TicketList from "@/components/ticket-list";
import { CreateUpdateForm } from "@/features/ticket/components/create-update-form";
import { searchParamsCache } from "@/features/ticket/search-params";

type OurTicketsProps = {
  searchParams: Promise<SearchParams>;
};

const OurTicketsPage = async ({ searchParams }: OurTicketsProps) => {
  return (
    <>
      <Heading
        title="Our tickets"
        description="All tickets related to my organization"
      />

      <CardWrapper
        className="mx-auto mb-8 flex w-full max-w-[480px] rounded-md"
        title="Create Ticket"
        desc="A new ticket will be created"
        content={<CreateUpdateForm />}
      />

      <Suspense fallback={<Loading />}>
        <TicketList
          byOrganization
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </>
  );
};

export default OurTicketsPage;
