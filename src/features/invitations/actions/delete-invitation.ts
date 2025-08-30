"use server";

import { toActionState } from "@/components/form/utils";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { prisma } from "@/lib/prisma";

export const deleteInvitation = async ({
  email,
  organizationId,
}: {
  email: string;
  organizationId: string;
}) => {
  await getAdminOrRedirect(organizationId);

  const invitation = await prisma.invitation.findUnique({
    where: {
      invitationId: {
        email,
        organizationId,
      },
    },
  });

  if (!invitation) return toActionState("ERROR", "Invitation not found");

  await prisma.invitation.delete({
    where: {
      invitationId: {
        email,
        organizationId,
      },
    },
  });

  return toActionState("SUCCESS", "Invitation deleted");
};
