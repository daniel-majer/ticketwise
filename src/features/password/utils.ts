import type { RandomReader } from "@oslojs/crypto/random";
import { generateRandomString } from "@oslojs/crypto/random";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";

import { prisma } from "@/lib/prisma";
import { resetPasswordPath } from "@/paths";
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

export const generateRandomToken = () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
};

export const hashToken = (token: string) => {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const random: RandomReader = {
  read(bytes) {
    crypto.getRandomValues(bytes);
  },
};

export const generateRandomCode = () => {
  return generateRandomString(random, ALPHABET, 8);
};
