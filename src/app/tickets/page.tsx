import { Suspense } from "react";

import Loading from "../loading";

import CardWrapper from "@/components/card-custom";
import { Heading } from "@/components/heading";
import TicketList from "@/components/ticket-list";
import { getAuth } from "@/features/auth/queries/cookie";
import { CreateUpdateForm } from "@/features/ticket/components/create-update-form";

const Tickets = async () => {
  const { user } = await getAuth();
  return (
    <>
      <Heading title="My tickets" description="All your tickets at one place" />

      <CardWrapper
        className="mx-auto mb-4 flex w-full max-w-[480px] rounded-md"
        title="Create Ticket"
        desc="Ticket Description"
        content={<CreateUpdateForm />}
      />

      <Suspense fallback={<Loading />}>
        <TicketList userId={user?.id} />
      </Suspense>
    </>
  );
};

export default Tickets;
