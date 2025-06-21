"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { tickets } from "@/paths";
import { setCookieByKey } from "@/utils/cookies";

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });

  revalidatePath(tickets());
  await setCookieByKey("toast", "Ticket deleted!");
  redirect(tickets());
};
