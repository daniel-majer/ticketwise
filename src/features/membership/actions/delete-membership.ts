"use server";

import { getMemberships } from "../queries/get-memberships";

import { toActionState, toErrorState } from "@/components/form/utils";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { prisma } from "@/lib/prisma";

export const membershipOrganization = async (orgId: string, userId: string) => {
  await getAuthOrRedirect();
  try {
    const memberships = await getMemberships(orgId);

    const isLastMembership = (memberships ?? []).length <= 1;

    if (isLastMembership)
      return toActionState("ERROR", "You cannot delete the last membership");

    await prisma.membership.delete({
      where: {
        membershipId: {
          organizationId: orgId,
          userId,
        },
      },
    });
  } catch (e) {
    return toErrorState(e);
  }
  return toActionState("SUCCESS", "The membership has been deleted");
};
