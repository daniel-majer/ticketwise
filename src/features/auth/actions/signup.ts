"use server";

import { redirect } from "next/navigation";

import z from "zod";

import { setSessionCookie } from "../queries/cookie";
import { hashPassword } from "../queries/password";
import { createSession, generateRandomSessionToken } from "../queries/session";

import { ActionState, toErrorState } from "@/components/form/utils";
import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";
import { tickets } from "@/paths";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine((value) => !value.includes(" "), {
        message: "Username cannot contain spaces",
      }),
    email: z.string().min(1, "Email is required").max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must match",
        path: ["confirmPassword"],
      });
    }
  });

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData),
    );

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    const invitations = await prisma.invitation.findMany({
      where: {
        email,
      },
    });

    await prisma.$transaction([
      prisma.invitation.deleteMany({
        where: {
          email,
        },
      }),

      prisma.membership.createMany({
        data: invitations.map((invitation) => ({
          organizationId: invitation.organizationId,
          userId: user.id,
          membershipRole: "MEMBER",
          isActive: false,
        })),
      }),
    ]);

    await inngest.send({
      name: "app/email.email-verify",
      data: {
        userId: user.id,
      },
    });

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (err) {
    return toErrorState(err, formData);
  }

  redirect(tickets());
};
