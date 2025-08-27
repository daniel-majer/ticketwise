"use server";

import { revalidatePath } from "next/cache";

import { MembershipRole } from "@prisma/client";

import { getAdminOrRedirect } from "../queries/get-admin-or-redirect";
import { getMemberships } from "../queries/get-memberships";

import { toActionState } from "@/components/form/utils";
import { prisma } from "@/lib/prisma";
import { membershipsPath } from "@/paths";

export const updateMembershipRole = async ({
  userId,
  organizationId,
  membershipRole,
}: {
  userId: string;
  organizationId: string;
  membershipRole: MembershipRole;
}) => {
  await getAdminOrRedirect(organizationId);

  const memberships = await getMemberships(organizationId);

  //check if membership exists
  const targetMembership = (memberships ?? []).find((membership) => {
    return membership.userId === userId;
  });

  if (!targetMembership) return toActionState("ERROR", "Membership not found");

  //check if last admin
  const adminMemberships = (memberships ?? []).filter((membership) => {
    return membership.membershipRole === "ADMIN";
  });

  const removesAdmin = targetMembership.membershipRole === "ADMIN";
  const isLastAdmin = adminMemberships.length <= 1;

  if (removesAdmin && isLastAdmin)
    return toActionState(
      "ERROR",
      "You cannot remove the last admin of organization",
    );

  //okay everything checked
  await prisma.membership.update({
    where: {
      membershipId: {
        organizationId,
        userId,
      },
    },
    data: {
      membershipRole,
    },
  });

  revalidatePath(membershipsPath(organizationId));

  return toActionState("SUCCESS", "Membership role has been updated");
};
