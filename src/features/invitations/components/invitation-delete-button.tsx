import React from "react";
import { useRouter } from "next/navigation";

import { LucideLoaderCircle, LucideTrash } from "lucide-react";

import { deleteInvitation } from "../actions/delete-invitation";

import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";

type InvitationDeleteButtonProps = {
  email: string;
  organizationId: string;
};

const InvitationDeleteButton = ({
  email,
  organizationId,
}: InvitationDeleteButtonProps) => {
  const router = useRouter();

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteInvitation.bind(null, { email, organizationId }),
    trigger: (isPending) => (
      <Button variant="destructive" size="icon" className="cursor-pointer">
        {isPending ? (
          <LucideLoaderCircle className="h-4 w-4" />
        ) : (
          <LucideTrash className="h-4 w-4" />
        )}
      </Button>
    ),
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  );
};

export default InvitationDeleteButton;
