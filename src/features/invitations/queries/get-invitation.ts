import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { prisma } from "@/lib/prisma";

export const getInvitations = async (orgId: string) => {
  await getAdminOrRedirect(orgId);

  return await prisma.invitation.findMany({
    where: {
      organizationId: orgId,
    },
    select: {
      email: true,
      createdAt: true,
      invitedByUser: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  });
};
