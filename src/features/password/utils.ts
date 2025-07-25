import { prisma } from "@/lib/prisma";
import { resetPasswordPath } from "@/paths";
import { generateRandomToken, hashToken } from "@/utils/crypto";
import { baseUrl } from "@/utils/url";

const PASSWORD_RESET_TOKEN_LIFETIME_MS = 1000 * 60 * 60 * 4;

export const generatePasswordForgotLink = async (userId: string) => {
  await prisma.passwordSession.deleteMany({
    where: { userId },
  });

  const tokenId = generateRandomToken();
  const hashTokenId = hashToken(tokenId);

  await prisma.passwordSession.create({
    data: {
      tokenHash: hashTokenId,
      expiresAt: new Date(Date.now() + PASSWORD_RESET_TOKEN_LIFETIME_MS),
      userId,
    },
  });

  const passwordResetLink = baseUrl() + resetPasswordPath() + `/${tokenId}`;

  return passwordResetLink;
};
