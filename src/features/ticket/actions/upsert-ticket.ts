"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from "zod";

import {
  type ActionState,
  toActionState,
  toErrorState,
} from "@/components/form/utils";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/isOwner";
import { prisma } from "@/lib/prisma";
import { tickets } from "@/paths";
import { setCookieByKey } from "@/utils/cookies";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  bounty: z.coerce.number().positive(),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date is required"),
});

export const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user, activeOrganization } = await getAuthOrRedirect();

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

    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      bounty: formData.get("bounty"),
      deadline: formData.get("deadline"),
    });

    const dbData = {
      ...data,
      userId: user?.id,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: { id: id || "" },
      update: dbData,
      create: { ...dbData, organizationId: activeOrganization!.id },
    });
  } catch (err) {
    return toErrorState(err, formData);
  }

  revalidatePath(tickets());

  if (id) {
    await setCookieByKey("toast", "Ticket updated!");
    redirect(tickets());
  }

  return toActionState("SUCCESS", "Ticket created!");
};
