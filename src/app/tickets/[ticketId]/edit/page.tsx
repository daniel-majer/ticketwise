import React from "react";
import { notFound } from "next/navigation";

import CardWrapper from "@/components/card-custom";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/isOwner";
import { CreateUpdateForm } from "@/features/ticket/components/create-update-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketEditProps = {
  params: Promise<{ ticketId: string }>;
};

const TicketEdit = async ({ params }: TicketEditProps) => {
  const { ticketId } = await params;
  const { user } = await getAuthOrRedirect();
  const ticket = await getTicket(ticketId);

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
    notFound();
  }

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
