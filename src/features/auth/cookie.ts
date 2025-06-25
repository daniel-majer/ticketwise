"use server";

import { cache } from "react";
import { cookies } from "next/headers";

import { validateSession } from "./session";

const SESSION_COOKIE_NAME = "session";

/**
 * set a cookie with the session token when the user signs up/in and delete the cookie when the user signs out
 * way the information about the session is stored in the user's browser and can be send with every request to the server
 * @param sessionToken
 * @param expiresAt
 */
export const setSessionCookie = async (
  sessionToken: string,
  expiresAt: Date,
) => {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    attributes: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: expiresAt,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};

export const deleteSessionCookie = async () => {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: "",
    attributes: {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};

/**
 * validate the session cookie
 * if the cookie exists, we extract the session token from it and validate the session from the database
 * if the session is valid, we return the session and the user
 * @returns
 */
export const getAuth = cache(async () => {
  const sessionToken =
    (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;

  if (!sessionToken) {
    return { session: null, user: null };
  }

  return validateSession(sessionToken);
});
