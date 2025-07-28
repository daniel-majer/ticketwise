"use server";

import { getOrganizations } from "./get-organizations";

import { toActionState, toErrorState } from "@/components/form/utils";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { prisma } from "@/lib/prisma";

export const deleteOrganization = async (orgId: string) => {
  await getAuthOrRedirect();
  try {
    const organizations = await getOrganizations();

    const canDelete = organizations.some((org) => org.id === orgId);

    if (!canDelete)
      return toActionState("ERROR", "Not a member of this organization");

    await prisma.organization.delete({
      where: {
        id: orgId,
      },
    });
  } catch (e) {
    return toErrorState(e);
  }
  return toActionState("SUCCESS", "Active organization has been switched");
};
