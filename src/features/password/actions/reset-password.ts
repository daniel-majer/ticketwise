"use server";

import { redirect } from "next/navigation";

import z from "zod";

import {
  ActionState,
  toActionState,
  toErrorState,
} from "@/components/form/utils";
import { hashPassword } from "@/features/auth/queries/password";
import { prisma } from "@/lib/prisma";
import { signInPath } from "@/paths";
import { setCookieByKey } from "@/utils/cookies";
import { hashToken } from "@/utils/crypto";

const signUpSchema = z
  .object({
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

export const resetPassword = async (
  tokenId: string,
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const { password } = signUpSchema.parse(Object.fromEntries(formData));

    const tokenHash = hashToken(tokenId);

    const passwordResetToken = await prisma.passwordSession.findUnique({
      where: { tokenHash },
    });

    console.log(tokenHash, passwordResetToken);

    if (passwordResetToken) {
      await prisma.passwordSession.delete({
        where: { tokenHash },
      });
    }

    if (
      !passwordResetToken ||
      Date.now() > passwordResetToken.expiresAt.getTime()
    ) {
      return toActionState(
        "ERROR",
        "Token expired or invalid verification",
        formData,
      );
    }

    await prisma.session.deleteMany({
      where: { userId: passwordResetToken.userId },
    });

    const passwordHash = await hashPassword(password);

    await prisma.user.update({
      where: { id: passwordResetToken.userId },
      data: {
        passwordHash,
      },
    });
  } catch (err) {
    return toErrorState(err, formData);
  }

  await setCookieByKey("toast", "Successfully reset password");
  redirect(signInPath());
};
