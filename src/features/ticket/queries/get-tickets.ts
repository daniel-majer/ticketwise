import { SearchParams } from "../search-params";

import { prisma } from "@/lib/prisma";

export const getTickets = async (
  userId: string | undefined,
  searchParams: SearchParams,
) => {
  const params = await searchParams;
  const search = params.search;
  const sort = params.sort;

  return await prisma.ticket.findMany({
    where: {
      userId,
      ...(typeof search === "string" && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      ...(sort === undefined && {
        createdAt: "desc",
      }),
      ...(sort === "bounty" && {
        bounty: "desc",
      }),
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
