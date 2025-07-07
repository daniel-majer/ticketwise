"use client";

import React from "react";

import { LucideLoaderCircle, LucideTrash } from "lucide-react";

import { deleteComment } from "../actions/delete-comment";

import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";

type CommentDeleteButtonProps = {
  id: string;
  onDeleteComment?: (id: string) => void;
};

export function CommentDeleteButton({
  id,
  onDeleteComment,
}: CommentDeleteButtonProps) {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (isPending) => (
      <Button variant="outline" size="icon" className="cursor-pointer">
        {isPending ? (
          <LucideLoaderCircle className="size-4 animate-spin" />
        ) : (
          <LucideTrash className="size-4" />
        )}
      </Button>
    ),
    onSuccess: () => onDeleteComment?.(id),
  });
  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  );
}
