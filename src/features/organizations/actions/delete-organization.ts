"use server";

import { getOrganizations } from "../queries/get-organizations";

import { toActionState, toErrorState } from "@/components/form/utils";
import { getAdminOrRedirect } from "@/features/membership/queries/get-admin-or-redirect";
import { prisma } from "@/lib/prisma";

export const deleteOrganization = async (orgId: string) => {
  await getAdminOrRedirect(orgId);
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
