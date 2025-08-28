import { prisma } from "@/lib/prisma";

type GetTicketPermissionType = {
  organizationId?: string;
  userId?: string;
};

export const getTicketPermission = async ({
  organizationId,
  userId,
}: GetTicketPermissionType) => {
  if (!userId || !organizationId) return { canDeleteTicket: false };

  const membership = await prisma.membership.findUnique({
    where: {
      membershipId: {
        organizationId,
        userId,
      },
    },
  });

  if (!membership) return { canDeleteTicket: false };

  return { canDeleteTicket: membership.canDeleteTickets };
};
