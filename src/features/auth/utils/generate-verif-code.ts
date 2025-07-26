import { prisma } from "@/lib/prisma";
import { generateRandomCode } from "@/utils/crypto";

const EMAIL_VERIFICATION_TOKEN_LIFETIME_MS = 1000 * 60 * 15;

export const generateVerificationCode = async (
  email: string,
  userId: string,
) => {
  //secure always one-to-one → just last code is valid
  await prisma.emailVerificationToken.deleteMany({
    where: {
      userId,
    },
  });

  const code = generateRandomCode();

  await prisma.emailVerificationToken.create({
    data: {
      code,
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TOKEN_LIFETIME_MS),
      email,
      userId,
    },
  });

  return code;
};
