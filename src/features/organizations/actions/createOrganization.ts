"use server";

import { redirect } from "next/navigation";

import z from "zod";

import { ActionState, toErrorState } from "@/components/form/utils";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { prisma } from "@/lib/prisma";
import { tickets } from "@/paths";
import { setCookieByKey } from "@/utils/cookies";

const signInSchema = z.object({
  name: z.string().min(1).max(191),
});

export const createOrganization = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect({ checkOrganization: false });

  try {
    const data = signInSchema.parse(Object.fromEntries(formData));

    await prisma.organization.create({
      data: {
        ...data,
        memberships: {
          create: {
            userId: user.id,
            isActive: false,
          },
        },
      },
    });
  } catch (err) {
    return toErrorState(err, formData);
  }

  await setCookieByKey("toast", "Organization created!");
  redirect(tickets());
};
