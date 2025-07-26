import { redirect } from "next/navigation";

import { getAuth } from "./cookie";

import { emailVerificationPath, signInPath } from "@/paths";

type GetAuthOrRedirectProps = {
  checkEmailVerified: boolean;
};

export const getAuthOrRedirect = async (options?: GetAuthOrRedirectProps) => {
  const { checkEmailVerified = true } = options ?? {};

  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  if (checkEmailVerified && !user.emailVerified)
    redirect(emailVerificationPath());

  return { user };
};
