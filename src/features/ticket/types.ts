import { Prisma } from "@prisma/client";

export type TicketWithMeta = Prisma.TicketGetPayload<{
  include: {
    User: {
      select: {
        username: true;
      };
    };
  };
}> & { isTicketOwner: boolean };
