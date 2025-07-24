"use server";

import z from "zod";

import {
  ActionState,
  toActionState,
  toErrorState,
} from "@/components/form/utils";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-redirect";
import { verifyPasswordHash } from "@/features/auth/queries/password";
import { inngest } from "@/lib/inngest";

const signInSchema = z.object({
  password: z.string().min(6).max(191),
});

export const passwordChange = async (
  _actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

  try {
    const { password } = signInSchema.parse(Object.fromEntries(formData));

    const validPassword = verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return toActionState("ERROR", "Incorrect password", formData);
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
