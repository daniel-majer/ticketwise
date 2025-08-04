"use server";

import { getMemberships } from "../queries/get-memberships";

import { toActionState } from "@/components/form/utils";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { prisma } from "@/lib/prisma";

export const membershipOrganization = async (orgId: string, userId: string) => {
  const { user } = await getAuthOrRedirect();

  const memberships = await getMemberships(orgId);

  const isLastMembership = (memberships ?? []).length <= 1;

  if (isLastMembership)
    return toActionState("ERROR", "You cannot delete the last membership");

  //check if membership exist
  const targetMembership = (memberships ?? []).find((membership) => {
    return membership.userId === userId;
  });

  if (!targetMembership) return toActionState("ERROR", "Membership not found");

  //check if user deleting last admin
  const adminMemberships = (memberships ?? []).filter((membership) => {
    return membership.membershipRole === "ADMIN";
  });

  const removesAdmin = targetMembership.membershipRole === "ADMIN";
  const isLastAdmin = adminMemberships.length <= 1;

  if (removesAdmin && isLastAdmin)
    return toActionState(
      "ERROR",
      "You cannot delete the last admin of organization",
    );

  //check if user is authorized
  const myMembership = (memberships ?? []).find((membership) => {
    return membership.userId === user.id;
  });

  const isMyself = userId === user.id;
  const isAdmin = myMembership?.membershipRole === "ADMIN";

  if (!isMyself && !isAdmin)
    return toActionState(
      "ERROR",
      "You can only delete memberships as an admin",
    );

  //okay everything checked 
  await prisma.membership.delete({
    where: {
      membershipId: {
        organizationId: orgId,
        userId,
      },
    },
  });

  return toActionState(
    "SUCCESS",
    isMyself
      ? "You have left the organization"
      : "The membership has been deleted",
  );
};
