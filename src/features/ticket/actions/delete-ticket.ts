"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getTicketPermission } from "../permissions/get-ticket-permission";

import { toActionState, toErrorState } from "@/components/form/utils";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/isOwner";
import { prisma } from "@/lib/prisma";
import { tickets } from "@/paths";
import { setCookieByKey } from "@/utils/cookies";

export const deleteTicket = async (id: string) => {
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    if (!ticket || !isOwner(user, ticket))
      return toActionState("ERROR", "Not authorized!");

    const permission = await getTicketPermission({
      organizationId: ticket.organizationId,
      userId: user.id,
    });

    if (!permission.canDeleteTicket)
      return toActionState("ERROR", "Not authorized!");

    await prisma.ticket.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return toErrorState(error);
  }

  revalidatePath(tickets());
  await setCookieByKey("toast", "Ticket deleted!");
  redirect(tickets());
};
