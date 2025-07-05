"use server";

import { revalidatePath } from "next/cache";

import z from "zod";

import {
  ActionState,
  toActionState,
  toErrorState,
} from "@/components/form/utils";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { prisma } from "@/lib/prisma";
import { ticketById } from "@/paths";

const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export const createComment = async (
  ticketId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const data = createCommentSchema.parse(Object.fromEntries(formData));

    await prisma.comment.create({
      data: {
        userId: user.id,
        ticketId,
        ...data,
      },
    });
  } catch (err) {
    return toErrorState(err);
  }

  revalidatePath(ticketById(ticketId));

  return toActionState("SUCCESS", "Comment created");
};
