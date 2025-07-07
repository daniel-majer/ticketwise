import { getAuth } from "@/features/auth/queries/cookie";
import { isOwner } from "@/features/auth/utils/isOwner";
import { prisma } from "@/lib/prisma";

export const getTicket = async (id: string) => {
  const { user } = await getAuth();

  const ticket = await prisma.ticket.findUnique({
    where: {
      id,
    },
    include: {
      User: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!ticket) return null;

  return { ...ticket, isTicketOwner: isOwner(user, ticket) };
};
