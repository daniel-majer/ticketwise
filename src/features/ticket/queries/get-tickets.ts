import { ParsedSearchParams } from "../search-params";

import { getAuth } from "@/features/auth/queries/cookie";
import { isOwner } from "@/features/auth/utils/isOwner";
import { getActiveOrganization } from "@/features/organizations/queries/get-active-organization";
import { prisma } from "@/lib/prisma";

export const getTickets = async (
  userId: string | undefined,
  byOrganization: boolean,
  searchParams: ParsedSearchParams,
) => {
  const params = await searchParams;
  const search = params.search;
  const { user } = await getAuth();
  const activeOrganization = await getActiveOrganization();

  const where = {
    userId,
    title: {
      contains: search,
      mode: "insensitive" as const,
    },
    ...(byOrganization && activeOrganization
      ? { organizationId: activeOrganization?.id }
      : {}),
  };

  const skip = params.page * params.size;
  const take = params.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
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
    }),
    prisma.ticket.count({ where }),
  ]);
  return {
    list: tickets.map((ticket) => {
      return { ...ticket, isTicketOwner: isOwner(user, ticket) };
    }),
    metaData: { count, hasNextPage: count > skip + take },
  };
};
