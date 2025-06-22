"use server";

import z from "zod";

import {
  ActionState,
  toActionState,
  toErrorState,
} from "@/components/form/utils";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").max(191).email(),
  password: z.string().min(6, "Password is required").max(191),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    const data = signInSchema.parse(Object.fromEntries(formData));
    console.log(data);
  } catch (err) {
    return toErrorState(err);
  }

  return toActionState("SUCCESS", "Sign in successful!");
};
