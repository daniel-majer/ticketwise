import { Suspense } from "react";

import OrganizationBreadcrumbs from "../_navigation/tabs";

import Loading from "@/app/loading";
import { Heading } from "@/components/heading";
import CreateInvitationButton from "@/features/invitations/components/create-invitation-button";
import MembershipList from "@/features/membership/components/membership-list";

type MembershipsPageProps = {
  params: Promise<{
    orgId: string;
  }>;
};

const MembershipsPage = async ({ params }: MembershipsPageProps) => {
  const { orgId } = await params;

  return (
    <div className="flex flex-1 flex-col">
      <Heading
        title="Memberships"
        description="Manage members in your organization"
        tabs={<OrganizationBreadcrumbs />}
        trigger={<CreateInvitationButton orgId={orgId} />}
      />
      <Suspense fallback={<Loading />}>
        <MembershipList orgId={orgId} />
      </Suspense>
    </div>
  );
};

export default MembershipsPage;
