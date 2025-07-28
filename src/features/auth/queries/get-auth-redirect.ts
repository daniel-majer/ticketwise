import { redirect } from "next/navigation";

import { getAuth } from "./cookie";

import { getOrganizations } from "@/features/organizations/actions/get-organizations";
import {
  emailVerificationPath,
  onboardingPath,
  selectActiveOrganizationPath,
  signInPath,
} from "@/paths";

type GetAuthOrRedirectProps = {
  checkEmailVerified?: boolean;
  checkOrganization?: boolean;
  checkActiveOrganization?: boolean;
};

export const getAuthOrRedirect = async (options?: GetAuthOrRedirectProps) => {
  const {
    checkEmailVerified = true,
    checkOrganization = true,
    checkActiveOrganization = true,
  } = options ?? {};

  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  if (checkEmailVerified && !user.emailVerified)
    redirect(emailVerificationPath());

  if (checkOrganization || checkActiveOrganization) {
    const orgs = await getOrganizations();

    if (checkOrganization && !orgs.length) redirect(onboardingPath());

    const hasActiveOrg = orgs.some((org) => org.membershipByUser.isActive);

    if (checkActiveOrganization && !hasActiveOrg)
      redirect(selectActiveOrganizationPath());
  }

  return { user };
};
