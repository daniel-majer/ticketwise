import React, { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { LucidePlus } from "lucide-react";

import Loading from "@/app/loading";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { getOrganizations } from "@/features/organizations/actions/get-organizations";
import OrganizationList from "@/features/organizations/components/organization-list";
import { onboardingPath, organizationsPath } from "@/paths";

const SelectActiveOrganizationPage = async () => {
  const organizations = await getOrganizations();

  const hasActive = organizations.some((org) => org.membershipByUser.isActive);

  if (hasActive) redirect(organizationsPath());

  return (
    <div className="flex flex-1 flex-col">
      <Heading
        title="Select Organizations"
        description="Pick one organization to work with"
        trigger={
          <Button asChild>
            <Link href={onboardingPath()} className="text-white">
              <LucidePlus size={16} />
              Create Organization
            </Link>
          </Button>
        }
      />
      <Suspense fallback={<Loading />}>
        <OrganizationList limitedAccess />
      </Suspense>
    </div>
  );
};

export default SelectActiveOrganizationPage;
