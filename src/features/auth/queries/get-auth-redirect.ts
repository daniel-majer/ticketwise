import { redirect } from "next/navigation";

import { getAuth } from "./cookie";

import { getOrganizations } from "@/features/organizations/actions/get-organizations";
import { emailVerificationPath, onboardingPath, signInPath } from "@/paths";

type GetAuthOrRedirectProps = {
  checkEmailVerified?: boolean;
  checkOrganization?: boolean;
};

export const getAuthOrRedirect = async (options?: GetAuthOrRedirectProps) => {
  const { checkEmailVerified = true, checkOrganization = true } = options ?? {};

  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  if (checkEmailVerified && !user.emailVerified)
    redirect(emailVerificationPath());

  if (checkOrganization) {
    const orgs = await getOrganizations();
    if (!orgs.length) redirect(onboardingPath());
  }

  return { user };
};
