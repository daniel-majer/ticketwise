import React from "react";
import Link from "next/link";

import { LucidePlus } from "lucide-react";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import OrganizationList from "@/features/organizations/components/organization-list";
import { organizationCreatePath } from "@/paths";

const OrganizationsPage = async () => {
  return (
    <div className="flex flex-1 flex-col">
      <Heading
        title="Organizations"
        description="All your organizations"
        trigger={
          <Button asChild>
            <Link href={organizationCreatePath()} className="text-white">
              <LucidePlus size={16} />
              Create Organization
            </Link>
          </Button>
        }
      />
      <OrganizationList />
    </div>
  );
};

export default OrganizationsPage;
