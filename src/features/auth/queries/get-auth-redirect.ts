import { redirect } from "next/navigation";

import { getAuth } from "./cookie";

import { emailVerificationPath, signInPath } from "@/paths";

export const getAuthOrRedirect = async () => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  if (!user.emailVerified) redirect(emailVerificationPath());

  return { user };
};
