"use server";

import { revalidatePath } from "next/cache";

import { toActionState, toErrorState } from "@/components/form/utils";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/isOwner";
import { prisma } from "@/lib/prisma";
import { ticketById } from "@/paths";

export const deleteComment = async (id: string) => {
  //authorization control
  const { user } = await getAuthOrRedirect();

  //authorization control
  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });

  if (!comment || !isOwner(user, comment)) {
    return toActionState("ERROR", "Not authorized");
  }

  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    return toErrorState(err);
  }

  revalidatePath(ticketById(comment.ticketId));

  return toActionState("SUCCESS", "Comment deleted");
};
