"use server";
import { revalidatePath } from "next/cache";

import { getOrganizations } from "./get-organizations";

import { toActionState, toErrorState } from "@/components/form/utils";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { prisma } from "@/lib/prisma";
import { organizationsPath } from "@/paths";

export const switchOrganization = async (orgId: string) => {
  const { user } = await getAuthOrRedirect({ checkActiveOrganization: false });
  try {
    const organizations = await getOrganizations();

    const canSwitch = organizations.some((org) => org.id === orgId);

    if (!canSwitch)
      return toActionState("ERROR", "Not a member of this organization");

    await prisma.$transaction([
      prisma.membership.updateMany({
        where: {
          userId: user.id,
          organizationId: { not: orgId },
        },
        data: {
          isActive: false,
        },
      }),

      prisma.membership.update({
        where: {
          // organizationId_userId: {
          membershipId: {
            organizationId: orgId,
            userId: user.id,
          },
        },
        data: {
          isActive: true,
        },
      }),
    ]);
  } catch (e) {
    return toErrorState(e);
  }
  revalidatePath(organizationsPath());
  return toActionState("SUCCESS", "Active organization has been switched");
};
