"use client";

import { useRouter } from "next/navigation";

import { LucideLoaderCircle, LucideLogOut } from "lucide-react";

import { membershipOrganization } from "../actions/delete-membership";

import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";

type OrganizationDeleteButtonProps = {
  orgId: string;
  userId: string;
};

const MembershipDeleteButton = ({
  orgId,
  userId,
}: OrganizationDeleteButtonProps) => {
  const router = useRouter();

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: membershipOrganization.bind(null, orgId, userId),
    trigger: (isPending) => (
      <Button size="icon" variant="destructive" className="cursor-pointer">
        {isPending ? (
          <LucideLoaderCircle size={16} className="animate-spin" />
        ) : (
          <LucideLogOut size={16} />
        )}
      </Button>
    ),
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <>
      {deleteDialog}
      {deleteButton}
    </>
  );
};

export default MembershipDeleteButton;
