"use server";

import { emailVerifyCode } from "../emails/email-verify-code";
import { getAuthOrRedirect } from "../queries/get-auth-redirect";
import { generateVerificationCode } from "../utils/generate-verif-code";

import { toActionState, toErrorState } from "@/components/form/utils";
import { prisma } from "@/lib/prisma";

export const emailResend = async () => {
  const { user } = await getAuthOrRedirect({
    checkEmailVerified: false,
    checkOrganization: false,
  });

  try {
    await prisma.emailVerificationToken.deleteMany({
      where: { userId: user.id },
    });

    const verificationCode = await generateVerificationCode(
      user.email,
      user.id,
    );

    const result = await emailVerifyCode(user.email, verificationCode);

    if (result.error) {
      return toActionState("ERROR", "Failed to send verification email");
    }
  } catch (err) {
    return toErrorState(err);
  }

  return toActionState("SUCCESS", "Verifications email has been sent");
};
