import React from "react";

import { Heading } from "@/components/heading";
import OrganizationList from "@/features/organizations/components/organization-list";

const OrganizationsPage = async () => {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <Heading title="Organizations" description="All your organizations" />
      <OrganizationList />
    </div>
  );
};

export default OrganizationsPage;
