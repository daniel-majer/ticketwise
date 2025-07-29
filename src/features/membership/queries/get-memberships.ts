import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { prisma } from "@/lib/prisma";

export const getMemberships = async (orgId: string) => {
  await getAuthOrRedirect();

  return await prisma.membership.findMany({
    where: {
      organizationId: orgId,
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
          emailVerified: true,
        },
      },
    },
  });
};
