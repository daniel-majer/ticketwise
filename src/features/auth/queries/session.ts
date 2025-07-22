import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";

import { prisma } from "@/lib/prisma";

// create a session token for a user
export const generateRandomSessionToken = () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
};

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15; // 15 days
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2; // 30 days

/**
 * hashes the sessionToken to create the session's id, so that the token and the id are not the same
 * @param sessionToken
 * @returns
 */
const fromSessionTokenToSessionId = (sessionToken: string) => {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)));
};

/**
 * creates a session for a user when a user signs up/in
 * @param sessionToken
 * @param userId
 * @returns
 */
export const createSession = async (sessionToken: string, userId: string) => {
  const sessionId = fromSessionTokenToSessionId(sessionToken);

  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };

  await prisma.session.create({
    data: session,
  });

  return session;
};

/**
 * validates a user's session whenever the user sends a request to the server
 * check if the session exists, if it's expired, if it needs to be refreshed, and if everything is fine
 * return the session and the user
 * @param sessionToken
 * @returns
 */
export const validateSession = async (sessionToken: string) => {
  const sessionId = fromSessionTokenToSessionId(sessionToken);

  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  // if there is no session, return null
  if (!result) {
    return { session: null, user: null };
  }

  const { user, ...session } = result;

  // if the session is expired, delete it
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({
      where: {
        id: sessionId,
      },
    });

    return { session: null, user: null };
  }

  // if 15 days are left until the session expires, refresh the session
  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    session.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);

    await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  return { session, user };
};

/**
 * deletes a user's session when the user signs out
 * @param sessionId
 */
export const invalidateSession = async (sessionId: string) => {
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });
};
