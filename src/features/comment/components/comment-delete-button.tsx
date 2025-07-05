"use client";

import React from "react";

import { LucideTrash } from "lucide-react";

import { deleteComment } from "../actions/delete-comment";

import { useConfirmDialog } from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";

type CommentDeleteButtonProps = {
  id: string;
};

export function CommentDeleteButton({ id }: CommentDeleteButtonProps) {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteComment.bind(null, id),
    trigger: (
      <Button variant="outline" size="icon" className="cursor-pointer">
        <LucideTrash className="size-4" />
      </Button>
    ),
  });
  return (
    <>
      {deleteButton}
      {deleteDialog}
    </>
  );
}
