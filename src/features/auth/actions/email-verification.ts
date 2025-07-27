"use server";

import { redirect } from "next/navigation";

import z from "zod";

import { setSessionCookie } from "../queries/cookie";
import { getAuthOrRedirect } from "../queries/get-auth-redirect";
import { createSession, generateRandomSessionToken } from "../queries/session";
import { validateEmailVerification } from "../utils/validate-email-verification";

import {
  ActionState,
  toActionState,
  toErrorState,
} from "@/components/form/utils";
import { prisma } from "@/lib/prisma";

const signInSchema = z.object({
  code: z.string().length(8),
});

export const emailVerification = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
  });

  try {
    const { code } = signInSchema.parse(Object.fromEntries(formData));

    const validCode = await validateEmailVerification(
      code,
      user.id,
      user.email,
    );

    if (!validCode) {
      return toActionState("ERROR", "Invalid code", formData);
    }

    await prisma.session.deleteMany({
      where: {
        userId: user.id,
      },
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: true,
      },
    });

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (err) {
    return toErrorState(err, formData);
  }

  // redirect("/dashboard");
  redirect("/");
};
