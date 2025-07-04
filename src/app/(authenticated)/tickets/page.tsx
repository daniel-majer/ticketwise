import { Suspense } from "react";

import { SearchParams } from "nuqs/server";

import Loading from "./loading";

import CardWrapper from "@/components/card-custom";
import { Heading } from "@/components/heading";
import TicketList from "@/components/ticket-list";
import { getAuth } from "@/features/auth/queries/cookie";
import { CreateUpdateForm } from "@/features/ticket/components/create-update-form";
import { searchParamsCache } from "@/features/ticket/search-params";

type TicketsProps = {
  searchParams: Promise<SearchParams>;
};

const Tickets = async ({ searchParams }: TicketsProps) => {
  const { user } = await getAuth();

  return (
    <>
      <Heading title="My tickets" description="All your tickets at one place" />

      <CardWrapper
        className="mx-auto mb-8 flex w-full max-w-[480px] rounded-md"
        title="Create Ticket"
        desc="Ticket Description"
        content={<CreateUpdateForm />}
      />

      <Suspense fallback={<Loading />}>
        <TicketList
          userId={user?.id}
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </>
  );
};

export default Tickets;
