"use server";

import z from "zod";

import {
  ActionState,
  toActionState,
  toErrorState,
} from "@/components/form/utils";

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
    const data = signUpSchema.parse(
      Object.fromEntries(formData),
      // username: formData.get("username"),
      // email: formData.get("email"),
      // password: formData.get("password"),
      // confirmPassword: formData.get("confirmPassword"),
    );
    console.log(data);

    // await prisma.user.create({
    //   data: {
    //     username: data.username,
    //     email: data.email,
    //     password: data.password,
    //   },
    // });
  } catch (err) {
    return toErrorState(err);
  }

  return toActionState("SUCCESS", "Sign up successful!");
};
