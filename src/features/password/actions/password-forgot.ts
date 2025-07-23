"use server";

import z from "zod";

import { generatePasswordForgotLink } from "../utils";

import {
  ActionState,
  toActionState,
  toErrorState,
} from "@/components/form/utils";
import { prisma } from "@/lib/prisma";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").max(191).email(),
});

export const passwordForgot = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  try {
    const { email } = signInSchema.parse(Object.fromEntries(formData));

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return toActionState("ERROR", "Incorrect email", formData);
    }

    const passResetLink = await generatePasswordForgotLink(user.id);

    console.log(passResetLink);
  } catch (err) {
    return toErrorState(err, formData);
  }

  return toActionState("SUCCESS", "Check your email");
};
