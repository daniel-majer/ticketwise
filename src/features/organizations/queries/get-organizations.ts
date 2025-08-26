import { getAuth } from "@/features/auth/queries/cookie";
import { prisma } from "@/lib/prisma";

export const getOrganizations = async () => {
  const { user } = await getAuth();

  if (!user) return [];

  const organizations = await prisma.organization.findMany({
    where: {
      memberships: {
        some: {
          userId: user.id,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      memberships: { where: { userId: user.id } },
      _count: {
        select: {
          memberships: true,
        },
      },
    },
  });

  return organizations.map(({ memberships, ...organization }) => ({
    ...organization,
    membershipByUser: memberships[0],
  }));
};
