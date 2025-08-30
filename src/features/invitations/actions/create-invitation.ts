"use server";

import { revalidatePath } from "next/cache";

import z from "zod";

import { generateInviteLink } from "../utils/generate-invite-link";

import {
  ActionState,
  toActionState,
  toErrorState,
} from "@/components/form/utils";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { invitationsPath } from "@/paths";

const InvitationSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).max(191).email(),
});

export const createInvitation = async (
  orgId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAdminOrRedirect(orgId);

  try {
    const { email } = InvitationSchema.parse(Object.fromEntries(formData));

    const targetMemberhsip = await prisma.membership.findFirst({
      where: {
        organizationId: orgId,
        user: {
          email,
        },
      },
    });

    if (targetMemberhsip) {
      return toActionState(
        "ERROR",
        "User is already a member of this organization",
      );
    }

    const emailInvitationLink = await generateInviteLink(user.id, orgId, email);

    await inngest.send({
      name: "app/invitation.created",
      data: {
        userId: user.id,
        organizationId: orgId,
        email,
        emailInvitationLink,
      },
    });
  } catch (err) {
    return toErrorState(err);
  }

  revalidatePath(invitationsPath(orgId));

  return toActionState("SUCCESS", "Invitation sent successfully");
};
