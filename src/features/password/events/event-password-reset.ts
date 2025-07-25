import { sendEmailPasswordReset } from "../emails/send-email-password-reset";
import { generatePasswordForgotLink } from "../utils";

import { inngest } from "@/lib/inngest";
import { prisma } from "@/lib/prisma";

export type PasswordResetEventArgs = {
  data: {
    userId: string;
  };
};

export const passwordResetEvent = inngest.createFunction(
  {
    id: "password-reset",
  },
  { event: "app/password.password-reset" },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });

    const passResetLink = await generatePasswordForgotLink(user.id);

    const result = await sendEmailPasswordReset(user.email, passResetLink);

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: result };
  },
);
