import React from "react";
import { notFound } from "next/navigation";

import CardWrapper from "@/components/card-custom";
import { CreateUpdateForm } from "@/features/ticket/components/create-update-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketEditProps = {
  params: Promise<{ ticketId: string }>;
};

const TicketEdit = async ({ params }: TicketEditProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  return (
    <CardWrapper
      className="mx-auto mb-4 flex w-full max-w-[480px] rounded-md"
      title="Update Ticket"
      desc="Edit Ticket by Id"
      content={<CreateUpdateForm ticket={ticket} />}
    />
  );
};

export default TicketEdit;
