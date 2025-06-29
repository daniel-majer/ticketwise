import { ParsedSearchParams } from "../search-params";

import { prisma } from "@/lib/prisma";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams,
) => {
  const params = await searchParams;
  const search = params.search;

  const where = {
    userId,
    title: {
      contains: search,
      mode: "insensitive" as const,
    },
  };

  const skip = params.page * params.size;
  const take = params.size;

  const tickets = await prisma.ticket.findMany({
    where,
    skip,
    take,
    orderBy: {
      [params.sortKey]: params.sortValue,
    },
    include: {
      User: {
        select: {
          username: true,
        },
      },
    },
  });

  const count = await prisma.ticket.count({ where });
  return { list: tickets, metaData: { count, hasNext: count > skip + take } };
};
