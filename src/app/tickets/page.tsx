import { Suspense } from "react";

import Loading from "../loading";

import { Heading } from "@/components/heading";
import TicketList from "@/components/ticket-list";

const Tickets = async () => {
  return (
    <>
      <Heading title="Tickets" description="All your tickets at one place" />
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </>
  );
};

export default Tickets;
