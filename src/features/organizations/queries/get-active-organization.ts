import { getAuth } from "@/features/auth/queries/cookie";
import { prisma } from "@/lib/prisma";

export const getActiveOrganization = async () => {
  const { user } = await getAuth();

  if (!user) return null;

  const activeOrganization = await prisma.organization.findFirst({
    where: {
      memberships: {
        some: {
          userId: user.id,
          isActive: true,
        },
      },
    },
  });

  return activeOrganization;
};
