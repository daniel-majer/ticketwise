"use server";

import { redirect } from "next/navigation";

import z from "zod";

import { setSessionCookie } from "../cookie";
import { verifyPasswordHash } from "../password";
import { createSession, generateRandomSessionToken } from "../session";

import {
  ActionState,
  toActionState,
  toErrorState,
} from "@/components/form/utils";
import { prisma } from "@/lib/prisma";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").max(191).email(),
  password: z.string().min(6, "Password is required").max(191),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const data = signInSchema.parse(Object.fromEntries(formData));

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }
    const validPassword = await verifyPasswordHash(
      user.passwordHash,
      data.password,
    );

    if (!validPassword) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (err) {
    return toErrorState(err, formData);
  }

  redirect("/dashboard");
};
