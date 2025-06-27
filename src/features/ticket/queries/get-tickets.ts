import { prisma } from "@/lib/prisma";

export const getTickets = async (id: string | undefined) => {
  return await prisma.ticket.findMany({
    where: { id },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      User: {
        select: {
          username: true,
        },
      },
    },
  });
};
