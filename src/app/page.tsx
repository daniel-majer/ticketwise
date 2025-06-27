import { Suspense } from "react";

import Loading from "./loading";

import { Heading } from "@/components/heading";
import TicketList from "@/components/ticket-list";

export default function Home() {
  return (
    <div>
      <Heading
        title="Tickets"
        description="All tickets by everyone at one place"
      />

      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </div>
  );
}
