"use client";

import { useRouter } from "next/navigation";

import { LucideLoaderCircle, LucideTrash } from "lucide-react";

import { deleteOrganization } from "../actions/delete-organization";

import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";

type OrganizationDeleteButtonProps = {
  orgId: string;
};

const OrganizationDeleteButton = ({ orgId }: OrganizationDeleteButtonProps) => {
  const router = useRouter();

  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteOrganization.bind(null, orgId),
    trigger: (isPending) => (
      <Button size="icon" variant="destructive">
        {isPending ? (
          <LucideLoaderCircle size={16} className="animate-spin" />
        ) : (
          <LucideTrash size={16} />
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

export default OrganizationDeleteButton;
