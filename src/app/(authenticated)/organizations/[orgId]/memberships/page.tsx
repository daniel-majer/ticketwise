import { Suspense } from "react";

import Loading from "@/app/loading";
import { Heading } from "@/components/heading";
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
      />
      <Suspense fallback={<Loading />}>
        <MembershipList orgId={orgId} />
      </Suspense>
    </div>
  );
};

export default MembershipsPage;
