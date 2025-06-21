import { Suspense } from "react";

import Loading from "../loading";

import CardWrapper from "@/components/card-custom";
import { Heading } from "@/components/heading";
import TicketList from "@/components/ticket-list";
import { CreateUpdateForm } from "@/features/ticket/components/create-update-form";

const Tickets = async () => {
  return (
    <>
      <Heading title="Tickets" description="All your tickets at one place" />

      <CardWrapper
        className="mx-auto mb-4 flex w-full max-w-[480px] flex-1 rounded-md"
        title="Create Ticket"
        desc="Ticket Description"
        content={<CreateUpdateForm />}
      />

      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </>
  );
};

export default Tickets;
