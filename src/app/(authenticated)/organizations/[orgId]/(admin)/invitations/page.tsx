import { Suspense } from "react";

import OrganizationBreadcrumbs from "../_navigation/tabs";

import Loading from "@/app/loading";
import { Heading } from "@/components/heading";
import InvitationList from "@/features/invitations/components/invitation-list";

type InvitationsPageProps = {
  params: Promise<{
    orgId: string;
  }>;
};

const InvitationsPage = async ({ params }: InvitationsPageProps) => {
  const { orgId } = await params;

  return (
    <div className="flex flex-1 flex-col">
      <Heading
        title="Invitations"
        description="Manages your organization's invitations"
        tabs={<OrganizationBreadcrumbs />}
      />
      <Suspense fallback={<Loading />}>
        <InvitationList orgId={orgId} />
      </Suspense>
    </div>
  );
};

export default InvitationsPage;
