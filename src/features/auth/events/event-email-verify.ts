import { emailVerifyCode } from "../emails/email-verify-code";
import { generateVerificationCode } from "../utils/generate-verif-code";

import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";

export type EmailVerifyCodeEvent = {
  data: {
    userId: string;
  };
};

export const emailVerifyCodeEvent = inngest.createFunction(
  {
    id: "email-verify",
  },
  { event: "app/email.email-verify" },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const verificationCode = await generateVerificationCode(
      user.email,
      user.id,
    );

    const result = await emailVerifyCode(user.email, verificationCode);

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: result };
  },
);
