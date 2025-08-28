"use server";

import { revalidatePath } from "next/cache";

import { getAdminOrRedirect } from "../queries/get-admin-or-redirect";

import { toActionState } from "@/components/form/utils";
import { prisma } from "@/lib/prisma";
import { membershipsPath } from "@/paths";

type permissionKey = "canDeleteTickets";

export const togglePermission = async ({
  userId,
  organizationId,
  permissionKey,
}: {
  userId: string;
  organizationId: string;
  permissionKey: permissionKey;
}) => {
  await getAdminOrRedirect(organizationId);

  const where = {
    membershipId: {
      organizationId,
      userId,
    },
  };

  const membership = await prisma.membership.findUnique({
    where,
  });

  if (!membership) return toActionState("ERROR", "Membership not found");

  await prisma.membership.update({
    where,
    data: {
      [permissionKey]: membership[permissionKey] === true ? false : true,
    },
  });

  revalidatePath(membershipsPath(organizationId));

  return toActionState("SUCCESS", "Permission updated");
};
