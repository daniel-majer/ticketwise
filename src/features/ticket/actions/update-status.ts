"use server";

import { revalidatePath } from "next/cache";

import { TicketStatus } from "@prisma/client";

import { toActionState, toErrorState } from "@/components/form/utils";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/isOwner";
import { prisma } from "@/lib/prisma";
import { tickets } from "@/paths";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  const { user } = await getAuthOrRedirect();

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({
        where: {
          id,
        },
      });

      if (!ticket || !isOwner(user, ticket))
        return toActionState("ERROR", "Not authorized!");
    }

    await prisma.ticket.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    return toErrorState(error);
  }

  revalidatePath(tickets());

  return toActionState("SUCCESS", "Ticket status updated!");
};
