import { redirect } from "next/navigation";

import { getAuth } from "./cookie";

import { getOrganizations } from "@/features/organizations/queries/get-organizations";
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

  const auth = await getAuth();

  if (!auth.user) redirect(signInPath());

  if (checkEmailVerified && !auth.user.emailVerified)
    redirect(emailVerificationPath());

  let activeOrganization;

  if (checkOrganization || checkActiveOrganization) {
    const orgs = await getOrganizations();

    activeOrganization = orgs.find((org) => org.membershipByUser.isActive);

    if (checkOrganization && !orgs.length) redirect(onboardingPath());

    const hasActiveOrg = !!activeOrganization;

    if (checkActiveOrganization && !hasActiveOrg)
      redirect(selectActiveOrganizationPath());
  }

  return { ...auth, activeOrganization };
};
