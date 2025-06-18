import { notFound } from "next/navigation";

import { TicketCard } from "@/features/ticket/components/ticket-card";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  return (
    <div className="w-full">
      <TicketCard ticket={ticket} isDetail />
    </div>
  );
};

export default TicketPage;
