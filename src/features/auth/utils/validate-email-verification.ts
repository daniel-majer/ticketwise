import { prisma } from "@/lib/prisma";

export const validateEmailVerification = async (
  code: string,
  userId: string,
  email: string,
) => {
  const token = await prisma.emailVerificationToken.findFirst({
    where: { userId },
  });

  if (!token || token.code !== code) {
    return false;
  }

  await prisma.emailVerificationToken.delete({
    where: {
      id: token.id,
    },
  });

  const isExpired = Date.now() > token.expiresAt.getTime();

  if (isExpired) {
    return false;
  }

  if (email !== token.email) return false;

  return true;
};
