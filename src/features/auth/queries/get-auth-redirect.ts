import { redirect } from "next/navigation";

import { getAuth } from "./cookie";

import { emailVerificationPath, signInPath } from "@/paths";

export const getAuthOrRedirect = async () => {
  const { user } = await getAuth();

  if (!user) return redirect(signInPath());

  if (!user.emailVerified) return redirect(emailVerificationPath());

  return { user };
};
