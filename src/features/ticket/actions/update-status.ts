"use server";

import { revalidatePath } from "next/cache";

import { TicketStatus } from "@prisma/client";

import { toActionState, toErrorState } from "@/components/form/utils";
import { prisma } from "@/lib/prisma";
import { tickets } from "@/paths";

export const updateTicketStatus = async (id: string, status: TicketStatus) => {
  try {
    await prisma.ticket.update({
      where: { id },
      data: { status },
    });
  } catch (error) {
    toErrorState(error);
  }

  revalidatePath(tickets());

  return toActionState("SUCCESS", "Ticket status updated!");
};
