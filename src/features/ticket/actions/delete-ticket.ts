"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { toErrorState } from "@/components/form/utils";
import { prisma } from "@/lib/prisma";
import { tickets } from "@/paths";
import { setCookieByKey } from "@/utils/cookies";

export const deleteTicket = async (id: string) => {
  try {
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
