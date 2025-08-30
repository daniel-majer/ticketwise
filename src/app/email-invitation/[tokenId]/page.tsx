import React from "react";

import CardWrapper from "@/components/card-custom";
import InvitationAcceptForm from "@/features/invitations/components/invitation-accept-form";

type EmailInvitationPageProps = {
  params: Promise<{
    tokenId: string;
  }>;
};

const EmailInvitationPage = async ({ params }: EmailInvitationPageProps) => {
  const { tokenId } = await params;

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardWrapper
        title="Invitation to organization"
        desc="Accept the invitation to join the organization"
        className="w-full max-w-[420px]"
        content={<InvitationAcceptForm tokenId={tokenId} />}
      />
    </div>
  );
};

export default EmailInvitationPage;
