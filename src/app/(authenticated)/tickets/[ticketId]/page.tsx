import { notFound } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { TicketCard } from "@/features/ticket/components/ticket-card";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { tickets } from "@/paths";

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
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: tickets() },
          { title: ticket.title },
        ]}
      />
      <Separator />

      <div className="w-full">
        <TicketCard ticket={ticket} isDetail={true} />
      </div>
    </div>
  );
};

export default TicketPage;
