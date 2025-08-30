"use server";

import { redirect } from "next/navigation";

import {
  ActionState,
  toActionState,
  toErrorState,
} from "@/components/form/utils";
import { prisma } from "@/lib/prisma";
import { signInPath } from "@/paths";
import { setCookieByKey } from "@/utils/cookies";
import { hashToken } from "@/utils/crypto";

export const acceptInvitation = async (
  tokenId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _actionState: ActionState,
) => {
  try {
    const tokenHash = hashToken(tokenId);
    const invitation = await prisma.invitation.findUnique({
      where: { tokenHash },
    });

    if (!invitation) {
      return toActionState("ERROR", "Invalid token");
    }

    const user = await prisma.user.findUnique({
      where: { email: invitation.email },
    });

    if (user) {
      await prisma.$transaction([
        prisma.invitation.delete({
          where: { tokenHash },
        }),
        prisma.membership.create({
          data: {
            organizationId: invitation.organizationId,
            userId: user.id,
            membershipRole: "MEMBER",
            isActive: false,
          },
        }),
      ]);
    } else {
      await prisma.invitation.update({
        where: { tokenHash },
        data: {
          status: "ACCEPTED_WITHOUT_ACCOUNT",
        },
      });
    }
  } catch (err) {
    return toErrorState(err);
  }

  await setCookieByKey("toast", "Invitation accepted!");
  redirect(signInPath());
};
