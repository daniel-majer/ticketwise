"use server";

import z from "zod";

import {
  ActionState,
  toActionState,
  toErrorState,
} from "@/components/form/utils";
import { inngest } from "@/lib/inngest";
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

    await inngest.send({
      name: "app/password.password-reset",
      data: {
        userId: user.id,
      },
    });
  } catch (err) {
    return toErrorState(err, formData);
  }

  return toActionState("SUCCESS", "Check your email");
};
