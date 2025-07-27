"use server";
import { revalidatePath } from "next/cache";

import { toActionState, toErrorState } from "@/components/form/utils";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { prisma } from "@/lib/prisma";
import { organizationsPath } from "@/paths";

export const switchOrganization = async (orgId: string) => {
  const { user } = await getAuthOrRedirect();
  try {
    await prisma.membership.updateMany({
      where: {
        userId: user.id,
        organizationId: { not: orgId },
      },
      data: {
        isActive: false,
      },
    });

    await prisma.membership.update({
      where: {
        organizationId_userId: {
          organizationId: orgId,
          userId: user.id,
        },
      },
      data: {
        isActive: true,
      },
    });
  } catch (e) {
    return toErrorState(e);
  }
  revalidatePath(organizationsPath());
  return toActionState("SUCCESS", "Active organization has been switched");
};
