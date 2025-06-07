import { Heading } from "@/components/heading";
import { initialState } from "@/data";
import { TicketCard } from "@/features/ticket/components/ticket-card";

const Tickets = () => {
  return (
    <>
      <Heading title="Tickets" description="All your tickets at one place" />
      <div className="animate-fade w-full space-y-4">
        {initialState.map((ticket) => {
          return <TicketCard key={ticket.id} ticket={ticket} />;
        })}
      </div>
    </>
  );
};

export default Tickets;
